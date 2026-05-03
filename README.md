# UMass Boston CS Website Modernization

This repository contains a Jekyll modernization of the University of Massachusetts Boston Computer Science Department website. The final handoff branch focuses on completed static-site work: structured content, course data generation, JSON-LD metadata, and browser-based department search.

The branch intentionally excludes unfinished runtime prototypes for MCP/Ollama and external faculty-profile scraping. Those experiments were removed so the delivered project matches what is ready for static hosting and professor review.

## Delivered Features

- Modernized Jekyll site structure using layouts, includes, SCSS, YAML data, and collection content.
- Standardized course pages with structured front matter for course code, name, credits, prerequisites, co-requisites, descriptions, keywords, and related entities.
- Structured people, group, program, resource, and course metadata for consistent rendering and discovery.
- JSON-LD metadata for pages, people, groups, programs, courses, breadcrumbs, and list/hub pages.
- Generated course-offering data in `_data/course_offerings.yml`, built from schedule spreadsheets with `scripts/build_course_offerings.py`.
- Current and upcoming course offering summaries on course pages.
- Browser-based structured site search at `/search`.
- Static machine-readable indexes:
  - `site-index.json`
  - `search-data.json`
  - `search/index.json`
  - `llms.txt`

`llms.txt` is kept as optional machine-readable discovery metadata. It does not imply that the final branch includes a chatbot, MCP server, local model runtime, or hosted AI service.

## Search

The `/search` page is a static client-side search interface. It loads `/search/index.json`, builds a local in-browser index, ranks matching courses, faculty, programs, groups, facilities, resources, and pages, then renders links to matching site content.

The search page does not call MCP, Ollama, external scraping code, or a hosted language model.

`search-data.json` is a broader static retrieval/search export advertised in the page head as machine-readable JSON. `site-index.json` provides a compact section-oriented site index.

## Faculty Profiles

Faculty cards intentionally link to generated internal profile pages under `/people/<person-slug>/`. Original external or personal faculty pages are preserved in each `_people/*.md` file's `same_as` field and rendered from the internal profile page. This keeps navigation consistent while supporting structured data, site search, and AI-ready indexing.

## Course Offerings

Course offerings are generated from schedule spreadsheet files stored in the repository. The generator:

- auto-discovers files matching schedule naming patterns such as `schedule_fall_2025.xlsx` and `schedule_spring_2026.xlsx`
- normalizes terms into academic-year order
- builds course and instructor relationship data
- writes `_data/course_offerings.yml`

**Important maintenance note:** adding or updating schedule spreadsheet files does not automatically update the website. After any course-offering spreadsheet is added, removed, renamed, or edited, rerun the generator before rebuilding/deploying the site:

```bash
python3 scripts/build_course_offerings.py
```

This is a major design point of the catalog system: future maintainers can keep the catalog current by dropping in new schedule XLSX files, rerunning the generator, and then rebuilding the static Jekyll site. If this script is not rerun, `_data/course_offerings.yml` will remain stale and the course catalog/current-offering sections will not reflect the new spreadsheet data.

Recommended update workflow:

```bash
python3 scripts/build_course_offerings.py
bundle exec jekyll build --config _config.yml,_config_csserver.yml
```

## Local Build

Install dependencies:

```bash
bundle install
```

Serve locally:

```bash
bundle exec jekyll serve --config _config.yml,_config_local.yml
```

Build with the server config:

```bash
bundle exec jekyll build --config _config.yml,_config_csserver.yml
```

Clean generated output:

```bash
bundle exec jekyll clean
```

## Repository Structure

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
├── scripts/
├── search/
├── llms.txt
├── site-index.json
└── search-data.json
```

## Removed From Final Handoff

The final branch removes unfinished prototype work that was not part of the completed static website deliverable:

- `mcp/`
- local MCP server scripts and stdio clients
- local Ollama grounded-chat script
- MCP client configuration examples
- external faculty-profile scraping script
- generated external faculty enrichment data

The remaining site builds from hand-authored content, Jekyll templates, static data, generated course offerings, and static search indexes.

## Contributors

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

Additional final handoff updates:

- Austin Ashworth

See `WEB/about/thankyou.markdown` for the in-site attribution page.

## License

No repository license file is currently present.
