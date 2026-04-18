CS Website Read-Only MCP

This directory contains a read-only MCP server for the CS website repo.

What it exposes

- Internal authoritative data from:
  - `_people/*.md`
  - `_groups/*.md`
  - `WEB/academics/courses/*.markdown`
  - structured markdown pages in `WEB/`
  - `_data/course_offerings.yml`
  - `_data/menu.yml`
  - `_data/section_indexes.yml`
- Supplemental external enrichment from:
  - `_data/external_faculty_profiles.yml`

Authority model

- Internal repo content is authoritative.
- External faculty-profile enrichment is supplemental.
- External profile data is returned with provenance, confidence, and `last_checked` when present.

How to run

From the repo root:

```bash
python3 mcp/server.py
```

The server speaks MCP over stdio using JSON-RPC framing with `Content-Length` headers.

Environment

- Runtime: Python 3.12+
- Python dependencies already used by the repo-side loaders:
  - `PyYAML`
- No MCP SDK is required; the server implements the stdio MCP framing directly.

How to test locally

From the repo root:

```bash
python3 mcp/test_stdio_client.py
```

This runs a smoke test against the live stdio server and verifies:

- MCP initialize handshake
- `tools/list`
- `resources/list`
- `get_course`
- `get_person_related_courses`
- `get_external_faculty_profile`
- `resources/read` for `cs-website://summary`

Local Ollama workflow

This MCP is easiest to test locally by running both the MCP server and Ollama on the same laptop.

1. Regenerate the repo data you want the MCP to serve:

```bash
COURSE_OFFERINGS_TODAY=2026-04-18 python3 scripts/build_course_offerings.py
EXTERNAL_PROFILES_TODAY=2026-04-18 python3 scripts/build_external_faculty_profiles.py
```

2. Start Ollama locally:

```bash
ollama serve
```

3. In another terminal, confirm your model is available:

```bash
ollama list
```

4. Run the MCP smoke test:

```bash
python3 mcp/test_stdio_client.py
```

5. Run a grounded Ollama query through the MCP:

```bash
python3 mcp/ollama_grounded_chat.py --model llama3.2:1b "What does Bo Sheng research?"
```

By default the helper now uses a small-model prompt path with hard caps:

- search hits: 3
- offerings: 5
- related courses: 8
- recent news: 3
- links: 5

To inspect the exact MCP context sent to Ollama:

```bash
python3 mcp/ollama_grounded_chat.py --model llama3.2:1b --show-context "Who teaches networking-related courses?"
```

To verify retrieval without waiting on the model:

```bash
python3 mcp/ollama_grounded_chat.py --context-only "What current or upcoming courses is Swami Iyer associated with?"
```

To disable the small-model trimming and allow a somewhat larger prompt:

```bash
python3 mcp/ollama_grounded_chat.py --no-small-model --model llama3.2:1b "What does Bo Sheng research?"
```

Example local test queries

- `What does Bo Sheng research?`
- `Who teaches networking-related courses?`
- `What current or upcoming courses is Swami Iyer associated with?`
- `Which faculty work on machine learning or visual computing?`

How Ollama fits in

- Ollama is only the local model runtime.
- The retrieval layer is still the repo MCP.
- `mcp/ollama_grounded_chat.py` starts the stdio MCP server, gathers structured repo context with MCP tool calls, and sends that grounded context to Ollama over the local Ollama HTTP API.
- This avoids needing ChatGPT developer access or an MCP-capable desktop client for first-pass local testing.

Remote later

- The current MCP transport is stdio only, not HTTP/SSE.
- For now, local use against a local checkout is the simplest path.
- If the MCP later runs on the CS server, the practical near-term option is to SSH to that server and run the stdio server there from a compatible client or wrapper.
- An HTTP/SSE deployment can be added later if remote browser/app access becomes necessary, but that is not required for local testing.

Example client config

See [cs-website-mcp.example.json](/Users/austinashworth/Documents/UMB/25-26/CS410/Lproj/cs-website/mcp/cs-website-mcp.example.json).

Tools

- `search_site_entities(query, limit=15)`
- `search_courses(query, limit=10)`
- `search_people(query, limit=10)`
- `search_faculty_by_topic(topic, limit=10)`
- `get_course(course_code)`
- `get_person(person_slug_or_name)`
- `get_course_offerings(course_code)`
- `get_person_related_courses(person_slug_or_name)`
- `get_external_faculty_profile(person_slug_or_name)`
- `get_program(program_slug_or_name)`
- `get_recent_updates(limit=5)`
- `get_person_teaching_context(person_slug_or_name)`
- `get_course_context(course_code)`
- `get_entity_relationships(entity_id)`

Resources

- `cs-website://summary`
- `cs-website://courses`
- `cs-website://people`
- `cs-website://programs`
- `cs-website://groups`
- `cs-website://course-offerings`
- `cs-website://external-faculty-profiles`
- `cs-website://menu`
- `cs-website://section-indexes`

Matching behavior

- Course matching is case-insensitive and normalizes formats like `CS446`, `cs 446`, and known aliases.
- Person matching is case-insensitive and supports:
  - slug
  - `person_name`
  - page title
  - aliases
  - `First Last`
  - `Last, First`
- Matching is conservative. Ambiguous person matches return no result rather than guessing.

Notes

- The server is read-only.
- It does not expose arbitrary filesystem reads.
- It builds an in-memory index at startup directly from repo data; no extra export/index file is required.
- The transport is stdio, not HTTP/SSE.
- Internal repo content is authoritative. External profile data is returned as supplemental and includes provenance/confidence metadata when available.
