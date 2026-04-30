---
title: "Course Catalog"
layout: page
permalink: /academics/course-catalog/
summary: "Current and upcoming course offerings for the UMass Boston Computer Science Department, organized by academic year and term."
description: "Current and upcoming course offerings for the UMass Boston Computer Science Department, organized by academic year and term."
keywords:
  - "course catalog"
  - "course offerings"
  - "computer science courses"
  - "UMass Boston"
  - "academics"
---

{% assign offerings_data = site.data.course_offerings %}
{% assign course_pages = site.pages | where_exp: "item", "item.course_code" %}
{% assign catalog_position = 0 %}
{% assign first_catalog_item = true %}
{% capture catalog_items_json %}
{% for academic_year in offerings_data.academic_years %}
  {% for term in academic_year.terms %}
    {% for offering in term.offerings %}
      {% assign course_page = course_pages | where: "course_code", offering.course_code | first %}
      {% assign catalog_position = catalog_position | plus: 1 %}
      {% unless first_catalog_item %},{% endunless %}
      {
        "@type": "ListItem",
        "position": {{ catalog_position }},
        "name": {{ offering.course_code | append: ": " | append: offering.title | append: " - " | append: term.label | append: " Section " | append: offering.section | jsonify }},
        "url": {% if course_page %}{{ course_page.url | absolute_url | jsonify }}{% else %}{{ page.url | absolute_url | jsonify }}{% endif %}
      }
      {% assign first_catalog_item = false %}
    {% endfor %}
  {% endfor %}
{% endfor %}
{% endcapture %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": {{ page.title | jsonify }},
  "url": {{ page.url | absolute_url | jsonify }},
  "description": {{ page.description | jsonify }},
  "itemListElement": [{{ catalog_items_json | strip }}]
}
</script>

{% if offerings_data.academic_years and offerings_data.academic_years.size > 0 %}
  <div class="course-catalog-page">
    {% for academic_year in offerings_data.academic_years %}
      <section class="course-catalog-year">
        <h2>{{ academic_year.label }}</h2>

        {% for term in academic_year.terms %}
          <details class="catalog-term-details">
            <summary>
              <span class="catalog-term-summary-text">{{ term.label }}</span>
              <span class="catalog-term-summary-count">{{ term.offering_count }} offering{% if term.offering_count != 1 %}s{% endif %}</span>
            </summary>
            <div class="catalog-course-groups">
              {% assign grouped_offerings = term.offerings | group_by: "course_code" %}
              {% for course_group in grouped_offerings %}
                {% assign course_group_offerings = course_group.items %}
                {% assign first_offering = course_group_offerings.first %}
                {% assign course_page = course_pages | where: "course_code", course_group.name | first %}
                <details class="catalog-course-details">
                  <summary>
                    <span class="catalog-course-summary-text">
                      {% if course_page %}
                        <a href="{{ course_page.url | relative_url }}">{{ course_group.name }}: {{ first_offering.title }}</a>
                      {% else %}
                        {{ course_group.name }}: {{ first_offering.title }}
                      {% endif %}
                    </span>
                    <span class="catalog-course-summary-count">{{ course_group_offerings.size }} section{% if course_group_offerings.size != 1 %}s{% endif %}</span>
                  </summary>
                  {% include course-catalog-table.html offerings=course_group_offerings course_pages=course_pages hide_course=true hide_title=true %}
                </details>
              {% endfor %}
            </div>
          </details>
        {% endfor %}
      </section>
    {% endfor %}
  </div>
{% else %}
  <p>No current or upcoming course offerings are available yet.</p>
{% endif %}
