#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


def send(proc: subprocess.Popen, payload: dict) -> None:
    body = json.dumps(payload).encode("utf-8")
    proc.stdin.write(f"Content-Length: {len(body)}\r\n\r\n".encode("utf-8") + body)
    proc.stdin.flush()


def recv(proc: subprocess.Popen) -> dict:
    headers = {}
    while True:
        line = proc.stdout.readline()
        if not line:
            raise RuntimeError("Server exited before response")
        if line in (b"\r\n", b"\n"):
            break
        key, value = line.decode("utf-8").split(":", 1)
        headers[key.lower()] = value.strip()
    length = int(headers["content-length"])
    body = proc.stdout.read(length)
    return json.loads(body.decode("utf-8"))


def main() -> int:
    proc = subprocess.Popen(
        [sys.executable, "mcp/server.py"],
        cwd=REPO_ROOT,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    try:
        send(
            proc,
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {},
                    "clientInfo": {"name": "smoke-test", "version": "1.0"},
                },
            },
        )
        init = recv(proc)
        assert init["result"]["serverInfo"]["name"] == "cs-website-readonly"

        send(proc, {"jsonrpc": "2.0", "method": "notifications/initialized", "params": {}})

        send(proc, {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}})
        tools = recv(proc)
        assert len(tools["result"]["tools"]) >= 10

        send(proc, {"jsonrpc": "2.0", "id": 3, "method": "resources/list", "params": {}})
        resources = recv(proc)
        assert any(item["uri"] == "cs-website://summary" for item in resources["result"]["resources"])

        send(
            proc,
            {
                "jsonrpc": "2.0",
                "id": 4,
                "method": "tools/call",
                "params": {"name": "get_course", "arguments": {"course_code": "CS446"}},
            },
        )
        course = recv(proc)
        assert course["result"]["structuredContent"]["course_code"] == "CS446"

        send(
            proc,
            {
                "jsonrpc": "2.0",
                "id": 5,
                "method": "tools/call",
                "params": {"name": "get_person_related_courses", "arguments": {"person_slug_or_name": "Sheng, Bo"}},
            },
        )
        related = recv(proc)
        related_codes = [item["course_code"] for item in related["result"]["structuredContent"]["related_courses"]]
        assert "CS446" in related_codes

        send(
            proc,
            {
                "jsonrpc": "2.0",
                "id": 6,
                "method": "tools/call",
                "params": {"name": "get_external_faculty_profile", "arguments": {"person_slug_or_name": "Daniel Haehn"}},
            },
        )
        external = recv(proc)
        external_structured = external["result"]["structuredContent"]
        assert external_structured["supplemental"] is True
        assert external_structured["profiles"][0]["extracted_field_names"] is not None

        send(
            proc,
            {
                "jsonrpc": "2.0",
                "id": 7,
                "method": "resources/read",
                "params": {"uri": "cs-website://summary"},
            },
        )
        summary = recv(proc)
        assert summary["result"]["contents"][0]["uri"] == "cs-website://summary"

        print("MCP stdio smoke test passed.")
        return 0
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        stderr = proc.stderr.read().decode("utf-8", "ignore").strip()
        if stderr:
            print(stderr, file=sys.stderr)


if __name__ == "__main__":
    raise SystemExit(main())
