---
title: "Courses"
layout: page
permalink: "/courses"
summary: Browse the UMass Boston Computer Science and Information Technology course catalog with course descriptions and requirements.
redirect_from:
  - /academics/courses/
---

Our department offers the following courses.

{% assign empty_array = "" | split: "" %}
{% assign course_pages = site.pages | default: empty_array | where_exp: "item", "item.course_code" | sort: "course_code" %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Computer Science Course Catalog",
  "url": {{ page.url | absolute_url | jsonify }},
  "numberOfItems": {{ course_pages.size }},
  "itemListElement": [
    {% for course in course_pages %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": {{ course.url | absolute_url | jsonify }},
      "name": {{ course.course_code | append: ": " | append: course.course_name | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

<div id='courses'></div>
{% if course_pages.size > 0 %}
<ul class="course-catalog-list">
  {% for course in course_pages %}
  <li><a href="{{ course.url | relative_url }}">{{ course.title }}</a></li>
  {% endfor %}
</ul>
{% else %}
<p>No courses are currently listed.</p>
{% endif %}
