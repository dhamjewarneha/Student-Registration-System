// Retrieve existing students from localStorage
document.addEventListener("DOMContentLoaded", () => {
    displayStudents();
});

const form = document.getElementById("studentForm");
const studentTable = document.querySelector("#studentTable tbody");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!validateInputs(name, studentId, email, contact)) return;

    const student = { name, studentId, email, contact };
    addStudentToLocalStorage(student);
    form.reset();
});

function validateInputs(name, studentId, email, contact) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Student Name should only contain letters.");
        return false;
    }

    if (!numberRegex.test(studentId) || !numberRegex.test(contact)) {
        alert("Student ID and Contact Number should only contain numbers.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return false;
    }

    return true;
}

function addStudentToLocalStorage(student) {
    let students = getStudentsFromLocalStorage();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function getStudentsFromLocalStorage() {
    return localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];
}

function displayStudents() {
    const students = getStudentsFromLocalStorage();
    studentTable.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

function editStudent(index) {
    const students = getStudentsFromLocalStorage();
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = getStudentsFromLocalStorage();
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
