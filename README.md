# Project Title

UMass Boston CS Website Modernization

# Overview

This repository contains the Jekyll-based modernization of the University of Massachusetts Boston Computer Science Department website. The project preserves the department's existing content footprint while improving site structure, machine readability, course data handling, search, and AI/MCP readiness.

The work goes beyond a cosmetic refresh. It adds structured metadata, normalized academic content, generated course-offering data, lightweight on-site search, and a read-only MCP layer that makes the repository usable as a retrieval source for local AI workflows and future department tooling.

# Objectives

- Improve the public website's maintainability without forcing a full CMS migration.
- Make courses, programs, faculty, groups, and resources easier to discover.
- Add structured data and machine-readable exports for search engines, crawlers, and AI systems.
- Reduce brittle hand-maintained content where automation is practical.
- Create a foundation that future student teams can extend semester by semester.

# Key Improvements Delivered

- Standardized course pages around a consistent `layout: course` content model.
- Added JSON-LD for pages, people, groups, programs, courses, breadcrumbs, and list pages.
- Built generated site exports for AI/search use:
  - `site-index.json`
  - `ai-search.json`
  - `ai/index.json`
  - `llms.txt`
- Added a lightweight browser-based search assistant for courses, faculty, programs, groups, and resources.
- Added generated course offerings from repository schedule spreadsheets via `_data/course_offerings.yml`.
- Added offering summaries to course pages, including instructor, meeting pattern, room/location, section, and term context.
- Added support for current/future academic-year logic and ordered term handling across Fall, Spring, and Summer sessions.
- Added reusable section-index data and schema support for hub pages.
- Added a read-only MCP server and local Ollama integration path for grounded repository retrieval.
- Improved breadcrumbs, link integrity, and internal page connectivity.

# Technical Stack

- Jekyll 4.3.x
- Liquid templates
- SCSS
- Vanilla JavaScript
- YAML data files
- Python 3.12+ scripts for data generation and MCP support
- `openpyxl`, `PyYAML`, `BeautifulSoup` for schedule/profile processing
- Optional local Ollama workflow for grounded AI experiments

# AI / Structured Data Enhancements

- Head-level schema graph for `CollegeOrUniversity`, `WebSite`, and `WebPage`.
- Page-specific schema for:
  - courses
  - people
  - groups
  - programs
  - item lists / hubs
  - breadcrumbs
- AI-oriented exports:
  - `site-index.json` for broad machine-readable crawling
  - `ai-search.json` for lighter-weight retrieval payloads
  - `ai/index.json` for richer assistant-side entity ranking
  - `llms.txt` as a discovery entry point
- Read-only MCP server in `mcp/` exposing structured repo entities and relationships for local retrieval workflows.

# Search System

The site includes a client-side search assistant at `/ai-assistant` that loads generated index data and ranks results in the browser. It is designed as a lightweight retrieval layer rather than a hosted chatbot.

The current search stack supports:

- course code lookups
- person/program/group/resource discovery
- metadata-aware ranking
- related-entity context
- MCP reuse for local AI testing

This is a strong base for future upgrades such as embeddings, hybrid ranking, advisor workflows, or course/faculty recommendation systems.

# Site Architecture

- `_layouts/` contains page, course, home, person, group, and post templates.
- `_includes/` contains shared rendering and schema fragments.
- `_sass/` and `WEB/assets/main.scss` define the visual layer.
- `WEB/` holds the main site content.
- `_people/` and `_groups/` hold structured collection content.
- `_data/` contains navigation, section indexes, generated offerings, and external faculty enrichment.
- `scripts/` generates normalized backend data from spreadsheets and public profile sources.
- `mcp/` exposes repository data through a read-only MCP server.

# How to Run Locally

## Prerequisites

- Ruby with Bundler
- Python 3.12+

## Install

```bash
bundle install
```

## Regenerate generated data when needed

```bash
python3 scripts/build_course_offerings.py
python3 scripts/build_external_faculty_profiles.py
```

## Serve locally

```bash
bundle exec jekyll serve --config _config.yml,_config_local.yml
```

## Production-style build

```bash
bundle exec jekyll build --config _config.yml,_config_csserver.yml
```

# How to Deploy

The repository currently uses Jekyll config overlays rather than a formal CI/CD deployment pipeline.

Expected deployment flow:

1. Regenerate course offerings and any supplemental faculty data.
2. Build with the server config:

```bash
bundle exec jekyll build --config _config.yml,_config_csserver.yml
```

3. Publish the generated output or repository contents to the CS server using the existing department hosting workflow.

Recommended next step: replace manual deployment with a scripted build-and-sync process or CI job to reduce drift and accidental regressions.

# Repository Structure

```text
.
├── _config*.yml
├── _data/
├── _groups/
├── _includes/
├── _layouts/
├── _people/
├── _sass/
├── WEB/
├── ai/
├── mcp/
├── scripts/
├── llms.txt
├── site-index.json
└── ai-search.json
```

# Screenshots / Demo Links

- Public site: placeholder
- Search assistant demo: placeholder
- MCP demo / local Ollama demo: placeholder
- Course catalog / offerings demo: placeholder

# Future Roadmap

- Replace manual deployment with CI/CD and automated validation.
- Add true responsive design cleanup for navigation, cards, and content-heavy pages.
- Add automated broken-link checks and image optimization in CI.
- Add prerequisite graphing and pathway exploration for students.
- Add faculty expertise graph and research discovery tooling.
- Add a structured publications layer instead of relying only on external faculty pages.
- Add embeddings or hybrid search for better semantic retrieval.
- Add advising and course-planning workflows backed by generated course data.
- Add analytics and search telemetry to understand user intent and content gaps.

# Lessons Learned

- Jekyll remains viable for departmental sites when paired with strong data conventions.
- Structured metadata and retrieval exports provide outsized value even before full AI integration.
- Legacy content quality is the main long-term risk; data automation helps, but editorial cleanup is still necessary.
- A modernization project benefits most when content governance, not just code, is treated as part of the system.

# Contributors

Original Spring 2021 CS410.net team:

- John Kilfeather
- Jeffrey Handorff
- Yiming Jin
- Dennis Popovs
- Duyanh Nguyen
- Ritesh Shah
- Ananya Jude
- Sinan Liu
- Jonathan Ohop

Spring 2024 modernization team:

- Branden Favre
- Riley Choquette
- Khushbu Kapadia
- Mehya N. Tambi
- Bhavana Manneni
- Jacob Jashwanth Patoju

See `WEB/about/thankyou.markdown` for the in-site attribution page.

# License

No repository license file is currently present.

Recommended next step: add an explicit license after confirming department and course-project expectations. If public reuse is intended, `MIT` is the simplest default; if attribution and documentation preservation matter more, `Apache-2.0` is a stronger option.
