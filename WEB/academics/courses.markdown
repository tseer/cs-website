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

<script type="text/javascript">

window.onload = function() {
  
  courses = loadCourses("courses.json");
  output = "";

  for (c in courses) {

    var number = c;
    var title = courses[c];

    var url1 = "<a href='academics/courses/" + number + "'>";
    var url2 = "</a>";
    output += url1 + number + ': ' + title + url2 + "<br>\n";

  }


  document.getElementById('courses').innerHTML = output;

}

</script>
