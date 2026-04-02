# UMass Boston CS Website

This repository contains the Jekyll site for the UMass Boston Computer Science Department.

## Current Change Summary

The site has been updated in several areas to improve consistency, structured data, navigation, and link quality without changing the visible design beyond breadcrumb presentation.

### 1. Course Page Standardization

- Course markdown files were normalized to the `course` layout format.
- Course pages now use structured front matter such as:
  - `course_code`
  - `course_name`
  - `credits`
  - `description`
  - `prerequisites`
  - `co_requisites`
  - `keywords`
- Older course files using inconsistent front matter were migrated to the newer structure.
- Prerequisite and co-requisite fields are rendered as structured sections.
- Course mentions inside course pages are automatically linkable to matching internal course pages.

### 2. Course Layout Improvements

File:
- `_layouts/course.html`

Changes:
- Added `Course` JSON-LD for individual course pages.
- Added support for linking exact prerequisite and co-requisite course codes to internal course pages.
- Added automatic linking of course-code mentions inside course page content.
- Removed the old separate "Back to All Courses" link after breadcrumb navigation was introduced.

### 3. Breadcrumb Navigation

Files:
- `_includes/breadcrumbs.html`
- `_layouts/page.html`
- `_layouts/post.html`
- `_layouts/course.html`
- `_includes/head.html`
- `WEB/assets/main.scss`

Changes:
- Added visible breadcrumb navigation across major page types.
- Added breadcrumb structured data in `head.html`.
- Styled breadcrumbs separately from the main site navigation.
- Removed overlap between breadcrumb styling and page controls.

### 4. Site-Wide Structured Data

Files:
- `_includes/head.html`
- `_includes/item-list-schema.html`
- `_layouts/page.html`
- `_includes/table.html`
- `_includes/umass-programms.html`
- `_data/section_indexes.yml`
- `site-index.json`
- `llms.txt`

Changes:
- Added site-level JSON-LD for:
  - `CollegeOrUniversity`
  - `WebSite`
  - `WebPage`
  - `BreadcrumbList`
- Added reusable `ItemList` include:
  - `_includes/item-list-schema.html`
- Added reusable section index data:
  - `_data/section_indexes.yml`
- Updated page layout so hub pages can emit `ItemList` schema from front matter or data keys.
- Added structured `ItemList` data for:
  - programs
  - academics
  - people
  - resources
  - research/news/events sections in `_includes/table.html`
- Updated `table.html` so list items now wrap `BlogPosting` data correctly.
- Added a dynamic machine-readable site export at `/site-index.json`.
- Added a plain-text crawler entry point at `llms.txt`.
- Added `<link rel="alternate" type="application/json" href="/site-index.json">` in `head.html` so tools can discover the site index automatically.

### 5. Program Page Structured Data

Files:
- `WEB/academics/u-programs.markdown`
- `WEB/academics/g-programs.markdown`
- `WEB/academics/h-programs.markdown`
- `WEB/academics/c-programs.markdown`

Changes:
- Added `description` front matter.
- Added `keywords` front matter.
- Added `EducationalOccupationalProgram` JSON-LD using:
  - `name`
  - `url`
  - `description`
  - `provider`

### 6. Hub Page Schema Support

Files:
- `WEB/toplevelmenu/academics.markdown`
- `WEB/toplevelmenu/people.markdown`
- `WEB/toplevelmenu/resources.markdown`
- `WEB/toplevelmenu/research.markdown`
- `_layouts/page.html`
- `_data/section_indexes.yml`

Changes:
- Hub pages can now declare section lists through:
  - `schema_collection_key`
  - `schema_collection_name`
  - `schema_collection_description`
  - `schema_collection_items`
- Academics, people, resources, and research now pull structured list data from `_data/section_indexes.yml`.
- Programs, resources, people, and academics are now centralized in `_data/section_indexes.yml` instead of repeating hardcoded arrays in multiple files.

### 7. Course Catalog Structured Data

File:
- `WEB/academics/courses.markdown`

Changes:
- Added `ItemList` JSON-LD for the course catalog page.
- Catalog entries use each course page’s absolute URL and course title.

### 8. Machine-Readable Site Index

Files:
- `site-index.json`
- `llms.txt`
- `_includes/head.html`

Changes:
- Added a dynamic Jekyll page at `/site-index.json` with:
  - site metadata
  - section index exports from `_data/section_indexes.yml`
  - research/news/events post lists
  - course listings derived from course pages
- Ensured the JSON output uses absolute URLs and stays current as content changes.
- Added `llms.txt` at the repository root as a plain-text entry point for AI crawlers and LLM tooling.
- Added a `rel="alternate"` JSON link in `head.html` to advertise `/site-index.json`.

### 9. Link Cleanup and External Link Audit

Files updated include:
- `WEB/academics/admissions.markdown`
- `WEB/academics/info.md`
- `WEB/academics/programs/c_ba.markdown`
- `WEB/academics/programs/c_ms.markdown`
- `WEB/about/dei.markdown`
- `WEB/about/360.markdown`
- `WEB/POSTS/research/_posts/2020-09-01-bitstobytes.md`
- `WEB/POSTS/research/_posts/2023-01-03-sloan.md`
- `WEB/jobs-intern/AI-videa-health.markdown`
- `WEB/POSTS/events/_posts/2022-11-02-allyssa.md`
- `WEB/POSTS/events/_posts/2022-11-07-jasmine.md`
- `WEB/POSTS/news/_posts/2023-11-17-datathon.md`
- `WEB/research/funding.markdown`
- `WEB/POSTS/news/_posts/2022-04-04-cs460.md`

Changes:
- Replaced stale UMass admissions and help links with current official destinations.
- Replaced outdated UMass news links with current URLs.
- Replaced outdated VideaHealth application link with the careers page.
- Replaced broken Three.js script URLs with current CDN-hosted versions.
- Removed broken Discord-hosted event images.
- Updated outdated funding/news links that clearly pointed to dead destinations.

### 10. Build and Sass Toolchain Fix

Files:
- `Gemfile`
- `Gemfile.lock` after local update

Changes:
- Pinned `jekyll-sass-converter` to the older stable line to avoid the embedded Sass failure.
- The site now builds successfully with the current project Ruby environment.

## Build

Use the repo root:

```bash
export PATH="$HOME/.rbenv/shims:$PATH"
bundle exec jekyll build
bundle exec jekyll serve
```

## Current Validation Status

### Internal Links

- Internal link checks on the generated `_site` passed.

### External Links

Most stale external links were corrected.

Remaining external URLs that still fail automated HTTP checks are:

- Vimeo embed URL in `WEB/POSTS/news/_posts/2022-04-04-cs460.md`
- Harvard CFA page in `WEB/jobs-intern/Summ-intern.markdown`
- `https://www.amnh.org/` in `WEB/research/funding.markdown`

These appear to be access-policy or embed restrictions rather than obvious broken internal site routing.

## Notes

- UI layout was intentionally preserved during structured-data work.
- Most changes were limited to metadata, schema, navigation, and link correction.
- `page.html` now emits reusable hub-page `ItemList` schema automatically when configured.
- `site-index.json` and `llms.txt` now provide machine-readable entry points for external AI systems.
