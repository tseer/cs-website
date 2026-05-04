---
title: "Faculty"
layout: page
permalink: "/faculty"
summary: Browse current and retired faculty in the UMass Boston Computer Science Department, including profile links and contact information.
entity_type: page
keywords:
  - faculty
  - professors
  - instructors
  - computer science faculty
aliases:
  - faculty directory
  - cs faculty
nav_label: Faculty
section_name: Faculty
parent_section: People
is_landing_page: true
menu_keywords:
  - faculty
  - people
related_topics:
  - faculty
  - department leadership
---

<div id='active_faculty' class='listing'>
  {% assign empty_array = "" | split: "" %}
  {% assign active_people = site.people | default: empty_array | where: "status", "active" | sort: "sort_order" %}
  {% comment %}
  Faculty cards intentionally link to generated internal profile pages. Original
  external faculty pages stay in each person's same_as field for structured data,
  search, AI-ready indexing, and clear outbound links from the internal profile.
  {% endcomment %}
  {% for person in active_people %}
  <div class="person">
    <a href="{{ person.url | relative_url }}"><img src="{{ person.image | relative_url }}" alt="{{ person.person_name }}"></a><br>
    <a href="{{ person.url | relative_url }}">{{ person.person_name }}</a><br>
    {{ person.job_title }}<br>
    {% if person.office %}{{ person.office }}<br>{% endif %}
    {% if person.telephone %}{{ person.telephone }}<br>{% endif %}
    {% if person.email %}<a href="mailto:{{ person.email }}">{{ person.email }}</a><br>{% endif %}
    {% if person.same_as and person.same_as.size > 0 %}
    <a href="{{ person.same_as | first }}" target="_blank" rel="noopener">External faculty page</a>
    {% endif %}
  </div>
  {% endfor %}
</div>


<div id='retired_faculty' class='listing'>
  <h3 style='width:100%'>Retired Faculty:</h3>

  <div class="person">
    <img src="/WEB/images/people/Alfred_Bird.jpg"><br>
    Alfred Bird<br>
    Lecturer (retired)<br>
    abird@cs.umb.edu<br><br>
    <br>
  </div>
    <div class="person">
    <a href="http://www.cs.umb.edu/~eb"><img src="/WEB/images/people/Ethan_Bolker.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~eb" target=_blank>Ethan Bolker</a><br>
    Emeritus Professor (retired)<br>
    eb@cs.umb.edu<br><br>
    <br>
  </div>
   <div class="person">
    <a href="http://www.cs.umb.edu/~cheungr"><img src="/WEB/images/people/Ron_Cheung.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~cheungr" target=_blank>Ron Cheung</a><br>
    Senior Lecturer II<br>
    M-3-201-06<br>
    617.287.6483<br>
    ronald.cheung@umb.edu<br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~fejer"><img src="/WEB/images/people/Peter_Fejer.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~fejer" target=_blank>Peter Fejer</a><br>
    Emeritus Professor (retired)<br>
    617.287.6453<br>
    peter.fejer@umb.edu<br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~cgodfrey"><img src="/WEB/images/people/Colin_Godgrey.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~cgodfrey" target=_blank>Colin Godfrey</a><br>
    Associate Professor (retired)<br>
    colin.godfrey@gmail.com<br>
    <br>
  </div>
  <div class="person">
    <img src="/WEB/images/people/No_Photo_Available.jpg"><br>
    George Lukas<br>
    Associate Professor (retired)<br>
    gl@cs.umb.edu<br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~joan"><img src="/WEB/images/people/Joan_Lukas.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~joan" target=_blank>Joan Lukas</a><br>
    Emeritus Professor (retired)<br>
    joan@cs.umb.edu<br>
    <br>
  </div>
  <div class="person">
    <img src="/WEB/images/people/No_Photo_Available.jpg"><br>
    Kenneth Newman<br>
    Associate Professor (retired)<br>
    kwn@cs.umb.edu<br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~offner/"><img src="/WEB/images/people/Carl_Offner.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~offner/" target=_blank>Carl Offner</a><br>
    Industrial Professor<br>
    M-3-201-32<br>
    617.287.6490<br>
    carl.offner@umb.edu<br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~eoneil"><img src="/WEB/images/people/Elizabeth_ONeil.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~eoneil" target=_blank>Elizabeth O'Neil</a><br>
    Emeritus Professor (retired)<br>
    617.287.6455<br>
    eoneil@cs.umb.edu<br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cfa.harvard.edu/dyslexia/LVL/"><img src="/WEB/images/people/Matthew_Schneps.jpg"></a><br>
    <a href="http://www.cfa.harvard.edu/dyslexia/LVL/" target=_blank>Matthew Schneps</a><br>
    Research Professor (retired)<br>
    matthew.schneps@umb.edu<br>
    <br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~rlt"><img src="/WEB/images/people/Richard_Tenney.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~rlt" target=_blank>Richard Tenney</a><br>
    Emeritus Professor (retired)<br>
    rlt@cs.umb.edu<br>
    <br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~bobw"><img src="/WEB/images/people/Robert_Wilson.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~bobw" target=_blank>Robert Wilson</a><br>
    Senior Lecturer (retired)<br>
    bobw@cs.umb.edu<br>
    <br>
    <br>
  </div>
    <div class="person">
    <a href="http://www.cs.umb.edu/~ming/"><img src="/WEB/images/people/Ming_Ouyang.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~ming/" target=_blank>Ming Ouyang</a><br>
    Associate Professor (retired)<br>
    <br>
  </div>
</div>

<div id='in_memorandum' class='listing'>
  <h3 style='width:100%'>In memoriam:</h3>
  <div class="person">
    <a href="http://www.cs.umb.edu/~poneil"><img src="/WEB/images/people/Patrick_ONeil.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~poneil" target=_blank>Patrick O'Neil</a><br>
    Emeritus Professor<br>
    <br>
    <br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~wrc"><img src="/WEB/images/people/Bill_Campbell.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~wrc" target=_blank>Bill Campbell</a><br>
    Associate Professor<br>
    <br>
    <br>
    <br>
  </div>
  <div class="person">
    <a href="http://www.cs.umb.edu/~ram"><img src="/WEB/images/people/Robert_Morris.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~ram" target=_blank>Robert Morris</a><br>
    Emeritus Professor<br>
    <br>
    <br>
    <br>
  </div>
    <div class="person">
    <a href="http://www.cs.umb.edu/~marc"><img src="/WEB/images/people/Marc_Pomplun.jpg"></a><br>
    <a href="http://www.cs.umb.edu/~marc" target=_blank>Marc Pomplun</a><br>
    Department Chair, Professor<br>
  </div>
</div>
