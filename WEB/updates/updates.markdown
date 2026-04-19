---
title: "CS Website Updates"
layout: page
permalink: /updates/
---

This page lists completed updates made to the CS website.

## Completed Changes

- Standardized course pages around `layout: course` with structured front matter including `course_code`, `course_name`, `credits`, `description`, `prerequisites`, `co_requisites`, and `keywords`.
- Added machine-readable course metadata through JSON-LD on course pages and structured search indexes for courses, pages, programs, people, groups, and resources.
- Built the site search assistant and connected it to the generated department search index.
- Cleaned the search assistant output by removing unnecessary response labels and fallback status text while keeping the results and fallback behavior intact.
- Removed visible overview and summary sections from rendered pages while preserving summary data for metadata and structured data.
- Simplified course page rendering so course pages focus on the title, credits, description, prerequisites, and co-requisites.

## Course Catalog & Schedule Modernization

- Added planning and implementation for a new **XLSX-driven course catalog system** using semester schedule files already stored in the website repository.
- Course offerings will be generated from spreadsheet data instead of manually maintained listings.
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
- [Course Catalog]({{ '/academics/courses/' | relative_url }})
- [Chimera]({{ '/research/chimera/' | relative_url }})
- [Search Assistant]({{ '/ai-assistant/' | relative_url }})
- [Broken Links Repaired]({{ '/broken-links/' | relative_url }})