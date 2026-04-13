---
title: "Groups"
layout: page
permalink: "/groups"
description: Research groups and laboratories in the UMass Boston Computer Science Department.
summary: Explore CS department research groups, their lead faculty, and the topics they study.
entity_type: page
keywords:
- research groups
- research labs
- UMass Boston
- Computer Science Department
aliases:
- groups
- labs
- research labs
nav_label: Groups
section_name: Groups
parent_section: Research
is_landing_page: true
menu_keywords:
- groups
- research groups
- labs
related_topics:
- research groups
- laboratories
- faculty research
---

The Computer Science Department supports research groups and laboratories across computing, data, software, systems, security, and human-centered technologies.

<div class="group-listing">
  {% assign empty_array = "" | split: "" %}
  {% assign groups = site.groups | default: empty_array | sort: "sort_order" %}
  {% for group in groups %}
  {% assign lead_people = site.people | default: empty_array | where_exp: "person", "group.lead_people contains person.slug" %}
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
