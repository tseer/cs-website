
function loadCourses(filename) {

  var url = filename;

  var req = new XMLHttpRequest();

  req.open("GET", url, false);

  req.onload = function(e) {

    courses = JSON.parse(req.responseText);

  }

  req.send();
  
  return courses;

}

function getCourseEntry(courses, code) {
  if (!courses || !courses.hasOwnProperty(code)) {
    return null;
  }

  var entry = courses[code];
  if (typeof entry === 'string') {
    return {
      title: entry,
      url: 'academics/courses/' + code
    };
  }

  return entry;
}

function printOfficeHours(url, element) {
  var req = new XMLHttpRequest();

  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = function(e) {

    NAME_MAP = {
      'Junichi Suzuki': 'Jun Suzuki',
      'Ronald Cheung': 'Ron Cheung',
      'Swaminathan Raghunathan Iyer':  'Swami Iyer',
      'Tiago Soares Cogumbreiro Garcia': 'Tiago Cogumbreiro',
      'Funda Durupinar Babur' : 'Funda Durupinar',
      'Daniel Felix Haehn': 'Daniel Haehn',
      'Kenneth Kofi Fletcher': 'Kenneth Fletcher',
      'Glenn Alfred Hoffman': 'Glenn Hoffman',
      'TBD' : 'CS Faculty',
      'BLANK' : 'CS Faculty',
      'Unassigned': 'CS Faculty',
      'Christopher Grant Kelly': 'Chris Kelly',
      'Management Instructor': 'Management Faculty'
    }

    var wb = XLSX.read(req.response);

    json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    var all_html = '';

    for (var row in json) {
      
      var row = json[row];
      aaaa = row
      
      var instructor = row['Name'];
      if (instructor === undefined) {
        instructor = '';
      }

      var email = row['UMass Boston Email'];
      var urlEmail = "<a href=" + "mailto:" + email + ">" + email + "</a>";
      var officeLocation = row['Office Location'];
      var officePhoneNumber = row['Office Phone Number'];
      var officeHours = row['Office Hours'];

      var html = "<tr>";
      html += "<td>"+instructor+"</td>";
      html += "<td>"+urlEmail+"</td>";
      html += "<td>"+officeLocation+"</td>";
      html += "<td>"+officePhoneNumber+"</td>";
      html += "<td>"+officeHours+"</td>";
      html += "</tr>";

      all_html += html;

    }

    element.innerHTML = all_html;
  
  }

  req.send();

}

function printSchedule(url, element) {

  var req = new XMLHttpRequest();

  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = function(e) {

    NAME_MAP = {
            'Junichi Suzuki': 'Jun Suzuki',
            'Ronald Cheung': 'Ron Cheung',
            'Swaminathan Raghunathan Iyer':  'Swami Iyer',
            'Tiago Soares Cogumbreiro Garcia': 'Tiago Cogumbreiro',
            'Funda Durupinar Babur' : 'Funda Durupinar',
            'Daniel Felix Haehn': 'Daniel Haehn',
            'Kenneth Kofi Fletcher': 'Kenneth Fletcher',
            'Glenn Alfred Hoffman': 'Glenn Hoffman',
            'TBD' : 'CS Faculty',
            'BLANK' : 'CS Faculty',
            'Unassigned': 'CS Faculty',
            'Christopher Grant Kelly': 'Chris Kelly',
            'Management Instructor': 'Management Faculty'
    }



    var courses = loadCourses("courses.json");

    var wb = XLSX.read(req.response);

    json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    var all_html = '';

    for (var row in json) {
      
      var row = json[row];
      aaaa = row
      var course = row['Subject'].toString().trim()+row['Ctlg #'].toString().trim();
      var section = row['Sect'].toString();
      var courseEntry = getCourseEntry(courses, course);
      var title = courseEntry ? courseEntry.title : '';
      var room = row['Fac Id'];
      var days = row['Mtg Ptrn'];
      var time = row['Mtg Start'] + '-' + row['Mtg End'];
      if (row['Mtg Start'] == null) {
        time = "";
      }

      var instructor = row['Emp Name'];
      if (instructor === undefined) {
        instructor = '';
      }
      instructor = instructor.toString().split(',');
      var firstname = instructor[1];
      var lastname = instructor[0];

      if (firstname === undefined) {
        firstname = '';
      }

      instructor = firstname + " " + lastname;
      if (NAME_MAP.hasOwnProperty(instructor.trim())) {
        instructor = NAME_MAP[instructor.trim()];
      }
    


      var remark = '';

      if (section.toLowerCase().endsWith('d')) {
        remark = "Discussion";
        section = section.substr(0,section.length-1);
      } else if (section.toLowerCase().endsWith('l')) {
        remark = "Lab";
        section = section.substr(0,section.length-1);
      } else if (section.toLowerCase().endsWith('c')) {
        remark = "Capstone";
        section = section.substr(0,section.length-1);
      }  

      var courseLabel = course;
      if (courseEntry && courseEntry.url) {
        courseLabel = "<a href='" + courseEntry.url + "'>" + course + "</a>";
      }

      var html = "<tr>";
      html += "<td>"+courseLabel+"</td>";
      html += "<td>"+section+"</td>";
      html += "<td>"+title+"</td>";
      html += "<td>"+room+"</td>";
      html += "<td>"+days+"</td>";
      html += "<td>"+time+"</td>";
      html += "<td>"+instructor+"</td>";
      html += "<td>"+remark+"</td>";
      html += "</tr>";

      all_html += html;

    }

    element.innerHTML = all_html;

  }

  req.send();

}
