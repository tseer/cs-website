---
title: "AI Assistant"
layout: page
permalink: "/ai-assistant"
description: "A lightweight on-site search assistant for the UMass Boston Computer Science Department website."
keywords:
  - "AI Assistant"
  - "Site Search"
  - "UMass Boston Computer Science"
  - "Courses"
  - "Programs"
  - "Resources"
---

This lightweight assistant searches the department website using the structured site data already published on the site. It does not use an external model and works by ranking matches across pages, courses, programs, and posts.

<div class="ai-assistant-search">
  <label for="ai-assistant-query"><strong>Search the site</strong></label>
  <div class="ai-assistant-suggestions">
    <p><strong>Try asking</strong></p>
    <div class="ai-assistant-suggestion-list">
      <button type="button" class="ai-assistant-suggestion" data-query="What are the prerequisites for CS410?">What are the prerequisites for CS410?</button>
      <button type="button" class="ai-assistant-suggestion" data-query="Show graduate programs">Show graduate programs</button>
      <button type="button" class="ai-assistant-suggestion" data-query="Find faculty resources">Find faculty resources</button>
      <button type="button" class="ai-assistant-suggestion" data-query="Research news">Research news</button>
      <button type="button" class="ai-assistant-suggestion" data-query="Computer vision course">Computer vision course</button>
    </div>
  </div>
  <div class="ai-assistant-controls">
    <input
      id="ai-assistant-query"
      type="text"
      placeholder="Try CS410, database certificate, office hours, faculty, admissions..."
      autocomplete="off"
    >
    <button id="ai-assistant-button" type="button">Search</button>
  </div>
  <div id="ai-assistant-status" class="ai-assistant-status">Type a question or keyword to begin.</div>
  <div id="ai-assistant-results" class="ai-assistant-results" aria-live="polite"></div>
</div>

<style>
  .ai-assistant-search {
    margin-top: 1.5rem;
  }

  .ai-assistant-controls {
    display: flex;
    gap: 0.75rem;
    margin: 0.75rem 0 1rem;
    flex-wrap: wrap;
  }

  .ai-assistant-suggestions {
    margin: 0.75rem 0;
  }

  .ai-assistant-suggestions p {
    margin: 0 0 0.5rem;
  }

  .ai-assistant-suggestion-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ai-assistant-suggestion {
    padding: 0.45rem 0.75rem;
    font: inherit;
    cursor: pointer;
  }

  .ai-assistant-controls input {
    flex: 1 1 24rem;
    min-width: 16rem;
    padding: 0.75rem;
    font: inherit;
  }

  .ai-assistant-controls button {
    padding: 0.75rem 1rem;
    font: inherit;
    cursor: pointer;
  }

  .ai-assistant-status {
    margin-bottom: 1rem;
  }

  .ai-assistant-results {
    display: grid;
    gap: 1rem;
  }

  .ai-assistant-result {
    border: 1px solid #d7d7d7;
    padding: 1rem;
    background: #fff;
  }

  .ai-assistant-result h3 {
    margin: 0 0 0.5rem;
  }

  .ai-assistant-result p {
    margin: 0 0 0.75rem;
  }
</style>

<script>
  (function() {
    const queryInput = document.getElementById('ai-assistant-query');
    const searchButton = document.getElementById('ai-assistant-button');
    const statusNode = document.getElementById('ai-assistant-status');
    const resultsNode = document.getElementById('ai-assistant-results');
    const suggestionButtons = Array.from(document.querySelectorAll('.ai-assistant-suggestion'));
    const dataUrl = '{{ "/ai-search.json" | relative_url }}';
    let searchIndex = null;

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function normalizeText(value) {
      if (Array.isArray(value)) {
        return value.join(' ');
      }

      if (value === null || value === undefined) {
        return '';
      }

      return String(value).toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function normalizeQuery(value) {
      const normalized = normalizeText(value);
      return {
        raw: normalized,
        compact: normalized.replace(/\s+/g, ''),
        tokens: normalized.split(/\s+/).filter(Boolean)
      };
    }

    function toArray(value) {
      if (Array.isArray(value)) {
        return value;
      }

      if (!value) {
        return [];
      }

      return [value];
    }

    function buildIndex(data) {
      const buckets = ['pages', 'courses', 'programs', 'posts'];
      const rows = [];

      for (const bucket of buckets) {
        for (const item of data[bucket] || []) {
          rows.push({
            bucket,
            raw: item,
            title: item.title || item.name || [item.course_code, item.course_name].filter(Boolean).join(': '),
            url: item.url,
            description: item.description || item.content_excerpt || '',
            excerpt: item.content_excerpt || item.description || '',
            keywords: toArray(item.keywords),
            courseCode: item.course_code || '',
            courseName: item.course_name || '',
            prerequisites: toArray(item.prerequisites),
            coRequisites: toArray(item.co_requisites),
            slug: normalizeText((item.url || '').split('/').filter(Boolean).pop() || '')
          });
        }
      }

      return rows;
    }

    function scoreItem(item, query) {
      const normalizedQuery = normalizeQuery(query);
      const cleanQuery = normalizedQuery.raw;
      const queryTokens = normalizedQuery.tokens;
      const title = normalizeText(item.title);
      const description = normalizeText(item.description);
      const excerpt = normalizeText(item.excerpt);
      const keywords = normalizeText(item.keywords);
      const courseCode = normalizeText(item.courseCode).replace(/\s+/g, '');
      const courseName = normalizeText(item.courseName);
      const prerequisites = normalizeText(item.prerequisites);
      const coRequisites = normalizeText(item.coRequisites);
      const slug = normalizeText(item.slug).replace(/-/g, ' ');
      const merged = [title, description, excerpt, keywords, courseCode, courseName, prerequisites, coRequisites, slug].join(' ');

      let score = 0;

      const courseCodePattern = /^[a-z]{2,4}\s?\d{3}[a-z]?$/i;
      const compactQuery = normalizedQuery.compact;

      if (courseCodePattern.test(cleanQuery) && courseCode && compactQuery === courseCode) {
        score += 1000;
      }

      if (title === cleanQuery) {
        score += 300;
      }

      if (courseName && courseName === cleanQuery) {
        score += 220;
      }

      if (slug === cleanQuery) {
        score += 140;
      }

      if (title.includes(cleanQuery)) {
        score += 120;
      }

      if (courseName.includes(cleanQuery)) {
        score += 90;
      }

      if (slug.includes(cleanQuery)) {
        score += 80;
      }

      if (keywords.includes(cleanQuery)) {
        score += 100;
      }

      if (description.includes(cleanQuery) || excerpt.includes(cleanQuery)) {
        score += 40;
      }

      if (prerequisites.includes(cleanQuery) || coRequisites.includes(cleanQuery)) {
        score += 35;
      }

      for (const token of queryTokens) {
        if (title.includes(token)) {
          score += 30;
        }
        if (courseName.includes(token)) {
          score += 20;
        }
        if (keywords.includes(token)) {
          score += 18;
        }
        if (slug.includes(token)) {
          score += 18;
        }
        if (courseCode.includes(token.replace(/\s+/g, ''))) {
          score += 60;
        }
        if (description.includes(token) || excerpt.includes(token)) {
          score += 8;
        }
        if (prerequisites.includes(token) || coRequisites.includes(token)) {
          score += 6;
        }
      }

      if (!merged.includes(cleanQuery) && queryTokens.every((token) => !merged.includes(token))) {
        return 0;
      }

      return score;
    }

    function renderResults(results) {
      if (!results.length) {
        resultsNode.innerHTML = '';
        statusNode.textContent = 'No strong matches were found. Try a course code, a faculty name, a program name, or a simpler keyword.';
        return;
      }

      statusNode.textContent = 'Top matches:';
      resultsNode.innerHTML = results.map((item, index) => {
        if (index === 0 && item.bucket === 'courses') {
          const prereqs = toArray(item.prerequisites).filter(Boolean);
          const coReqs = toArray(item.coRequisites).filter(Boolean);
          const courseHeading = [item.courseCode, item.courseName].filter(Boolean).join(': ') || item.title;

          return `
            <article class="ai-assistant-result">
              <h3><a href="${escapeHtml(item.url)}">${escapeHtml(courseHeading)}</a></h3>
              <p>${escapeHtml(item.description || 'No course description available.')}</p>
              <p><strong>Prerequisites:</strong> ${escapeHtml(prereqs.length ? prereqs.join(', ') : 'None listed')}</p>
              <p><strong>Co-requisites:</strong> ${escapeHtml(coReqs.length ? coReqs.join(', ') : 'None listed')}</p>
              <a href="${escapeHtml(item.url)}">View course page</a>
            </article>
          `;
        }

        const text = item.excerpt || item.description || 'No summary available.';
        return `
          <article class="ai-assistant-result">
            <h3><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(text)}</p>
            <a href="${escapeHtml(item.url)}">${escapeHtml(item.url)}</a>
          </article>
        `;
      }).join('');
    }

    function performSearch() {
      const query = queryInput.value.trim();

      if (!query) {
        statusNode.textContent = 'Type a question or keyword to begin.';
        resultsNode.innerHTML = '';
        return;
      }

      if (!searchIndex) {
        statusNode.textContent = 'Search data is still loading. Please try again in a moment.';
        return;
      }

      const ranked = searchIndex
        .map((item) => ({ item, score: scoreItem(item, query) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((entry) => entry.item);

      renderResults(ranked);
    }

    statusNode.textContent = 'Loading search index...';

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load search index.');
        }
        return response.json();
      })
      .then((data) => {
        searchIndex = buildIndex(data);
        statusNode.textContent = 'Type a question or keyword to begin.';
      })
      .catch(() => {
        statusNode.textContent = 'The search index could not be loaded right now. Please try again later.';
      });

    searchButton.addEventListener('click', performSearch);
    queryInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        performSearch();
      }
    });

    suggestionButtons.forEach((button) => {
      button.addEventListener('click', function() {
        queryInput.value = button.getAttribute('data-query') || '';
        performSearch();
      });
    });
  })();
</script>
