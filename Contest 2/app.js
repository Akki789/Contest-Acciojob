let form = document.getElementById("myform");
let name = document.getElementById("name");
let course = document.getElementById("course");
let marks = document.getElementById("marks");

class student {
  constructor(name, course, marks) {
    this.name = name;
    this.course = course;
    this.marks = marks;
  }

  getGrade() {
    if (this.marks >= 40) {
      return "Pass";
    } else {
      return "Fail";
    }
  }
}

const tableBody = document.querySelector("#student tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];
renderTable();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const marks = document.getElementById("marks").value.trim();

  if (!name || !course || !marks) {
    alert("Please fill out all fields.");
    return;
  }

  const newStudent = new student(name, course, marks);
  students.push(newStudent);

  saveData();
  renderTable();
  form.reset();
});

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    let courseCell = document.createElement("td");
    let marksCell = document.createElement("td");
    let gradeCell = document.createElement("td");

    nameCell.textContent = student.name;
    courseCell.textContent = student.course;
    marksCell.textContent = student.marks;
    gradeCell.textContent = student.marks >= 40 ? "Pass" : "Fail";

    row.append(nameCell, courseCell, marksCell, gradeCell);
    tableBody.appendChild(row);
  });
}
