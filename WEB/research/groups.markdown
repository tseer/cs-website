---
title: "Groups"
layout: page
permalink: "/groups"
description: Research groups and laboratories in the UMass Boston Computer Science Department.
summary: Explore CS department research groups, their lead faculty, and the topics they study.
keywords:
- research groups
- research labs
- UMass Boston
- Computer Science Department
---

The Computer Science Department supports research groups and laboratories across computing, data, software, systems, security, and human-centered technologies.

<div class="group-listing">
  {% assign groups = site.groups | sort: "sort_order" %}
  {% for group in groups %}
  {% assign lead_people = site.people | where_exp: "person", "group.lead_people contains person.slug" %}
  <article class="group-listing-card">
    <h2><a href="{{ group.url | relative_url }}">{{ group.group_name | default: group.title }}</a></h2>

    {% if group.summary %}
    <p>{{ group.summary }}</p>
    {% endif %}

    {% if lead_people.size > 0 %}
    <p><strong>Lead People:</strong>
      {% for person in lead_people %}
      <a href="{{ person.url | relative_url }}">{{ person.person_name }}</a>{% unless forloop.last %}, {% endunless %}
      {% endfor %}
    </p>
    {% endif %}

    {% if group.related_topics and group.related_topics.size > 0 %}
    <p><strong>Topics:</strong> {{ group.related_topics | join: ", " }}</p>
    {% endif %}

    <p><a href="{{ group.url | relative_url }}">View group page</a></p>
  </article>
  {% endfor %}
</div>
