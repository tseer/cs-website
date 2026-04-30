---
title: "CS Website Updates"
layout: page
permalink: /updates/
---

This page lists completed updates made to the CS website.

Austin Ashworth prepared the final handoff branch for professor review by keeping the completed static website and structured search work while removing unfinished local prototype code.

## Completed Changes

- Standardized course pages around `layout: course` with structured front matter including `course_code`, `course_name`, `credits`, `description`, `prerequisites`, `co_requisites`, and `keywords`.
- Added machine-readable course metadata through JSON-LD on course pages and structured search indexes for courses, pages, programs, people, groups, and resources.
- Built the department site search page and connected it to the generated static search index.
- Cleaned the search output by removing unnecessary response labels and fallback status text while keeping the results and fallback behavior intact.
- Finalized the handoff branch so static structured search remains available while unfinished MCP/Ollama and external-scraping prototypes are removed.
- Removed visible overview and summary sections from rendered pages while preserving summary data for metadata and structured data.
- Simplified course page rendering so course pages focus on the title, credits, description, prerequisites, and co-requisites.

## Project Documentation

- [Repository README](https://github.com/AustieKid/cs-website/blob/finalAsh/README.md) documents the final static-site handoff, including structured content, generated course offerings, JSON-LD metadata, and browser-based site search.

## Course Catalog & Schedule Modernization

- Added planning and implementation for a new **XLSX-driven course catalog system** using semester schedule files already stored in the website repository.
- Course offerings are generated from spreadsheet data instead of manually maintained listings.
- **Important:** when new schedule spreadsheets are added or existing ones are updated, the generator script must be rerun to refresh the catalog data.
- The catalog follows the academic-year model used by colleges:
  - Fall starts the academic year.
  - Example: Fall 2025 -> Spring 2026 -> Summer 2026.
- The system automatically stays current by showing only:
  - the current academic year
  - future academic years with available data
- Supports Fall -> Spring -> Summer ordering and multiple summer sessions when available:
  - Summer Session 1
  - Summer Session 2
  - Summer Session 3
- Schedule files are auto-discovered by filename pattern such as `schedule_fall_2025.xlsx` and `schedule_spring_2026.xlsx`, and future files can be added easily by dropping new XLSX files into the repo.

**Required update step:**

```bash
python3 scripts/build_course_offerings.py
```

If this step is skipped, the course catalog and “Current & Upcoming Offerings” sections will not reflect newly added or updated spreadsheet data.

## New Catalog Pages & Course Listings

- Added a planned new page under **Academics** to display live course offerings grouped by:
  - Academic Year
  - Semester / Session
- Includes expandable dropdown sections for cleaner browsing.
- Individual course pages will display **Current & Upcoming Offerings** when schedule data exists.
- Offerings include professor, meeting days, times, room/location, and section number.

## Link Integrity & Navigation Improvements

- Performed a full site audit for broken links.
- Updated outdated university and department resources.
- Removed dead media references.
- Improved navigation and page connectivity.
- Reduced stale external references across the site.

## Chimera Research Computing Page

- Added a dedicated Chimera page under **Research** to highlight the department's research computing resources, high-performance computing context, and GPU-supported workloads.
- Organized the page with a short overview, related research computing links, and guidance on who should use Chimera and what kinds of work it supports.

## Clone and Build Guide

This page documents the project’s clone-and-build workflow, including the steps needed to pull the repository, install dependencies if needed, and build the CS website so it can be tested locally or deployed in the project environment.

## Related Links

- [Clone and Build Guide]({{ '/resources/clone-and-build/' | relative_url }})
- [Course Catalog]({{ '/academics/course-catalog/' | relative_url }})
- [Chimera]({{ '/research/chimera/' | relative_url }})
- [Research Paper]({{ '/updates/research-paper/' | relative_url }})
- [Site Search]({{ '/search' | relative_url }})
- [Broken Links Repaired]({{ '/broken-links/' | relative_url }})
