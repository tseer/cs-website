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
