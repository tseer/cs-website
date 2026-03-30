---
title: "Course Schedule"
layout: page
permalink: "/course-schedule"
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<div markdown="0">
<select id="semester" onChange='javascript:update_schedule();'>
{% for sched in site.data.schedules.items %}
  <option value="{{ sched.schedule_file }}" {% if forloop.first %}selected{% endif %}>{{ sched.semester }}</option>
{% endfor %}
</select>
</div>

<table id="schedule">
  <thead>
    <tr>
      <th>Course</th>
      <th>Section</th>
      <th>Title</th>
      <th>Room</th>
      <th>Days</th>
      <th>Time</th>
      <th>Instructor</th>
      <th>Remark</th>
    </tr>
  </thead>
  <tbody id="schedule_listing">
  </tbody>
</table>

<script type="text/javascript">

window.onload = function() {

  update_schedule();

}

function update_schedule() {

  var url = document.getElementById('semester').value;
  var element = document.getElementById("schedule_listing");

  printSchedule( url, element );

}

</script>
