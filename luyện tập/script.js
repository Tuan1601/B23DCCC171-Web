class SinhVien {
  constructor(maSV, hoTen, gioiTinh, ngaySinh, queQuan) {
    this.maSV = maSV;
    this.hoTen = hoTen;
    this.gioiTinh = gioiTinh;
    this.ngaySinh = ngaySinh;
    this.queQuan = queQuan;
  }
}
class QuanLySinhVien {
  constructor() {
    this.students = this.getStudentsFromStorage();
    this.renderTable();
  }

  getStudentsFromStorage() {
    const students = localStorage.getItem("students");
    return students ? JSON.parse(students) : [];
  }

  saveToStorage() {
    localStorage.setItem("students", JSON.stringify(this.students));
  }

  renderTable() {
    const tableBody = document.getElementById("student-table");
    tableBody.innerHTML = "";

    this.students.forEach((student, index) => {
      const row = tableBody.insertRow();

      row.innerHTML = `
              <td>${student.maSV}</td>
              <td>${student.hoTen}</td>
              <td>${student.gioiTinh}</td>
              <td>${student.ngaySinh}</td>
              <td>${student.queQuan}</td>
              <td>
                  <button onclick="app.editStudent(${index})">Sửa</button>
                  <button onclick="app.deleteStudent(${index})">Xóa</button>
              </td>
          `;
    });
  }
  addStudent(student) {
    this.students.push(student);
    this.saveToStorage();
    this.renderTable();
  }

  deleteStudent(index) {
    this.students.splice(index, 1);
    this.saveToStorage();
    this.renderTable();
  }

  editStudent(index) {
    const student = this.students[index];
    document.getElementById("student-id").value = student.maSV;
    document.getElementById("student-name").value = student.hoTen;
    document.getElementById("student-gender").value = student.gioiTinh;
    document.getElementById("student-dob").value = student.ngaySinh;
    document.getElementById("student-hometown").value = student.queQuan;

    document.getElementById("add-student").textContent = "Cập Nhật";
    document.getElementById("add-student").onclick = () =>
      this.updateStudent(index);
  }

  updateStudent(index) {
    const student = this.students[index];
    student.maSV = document.getElementById("student-id").value;
    student.hoTen = document.getElementById("student-name").value;
    student.gioiTinh = document.getElementById("student-gender").value;
    student.ngaySinh = document.getElementById("student-dob").value;
    student.queQuan = document.getElementById("student-hometown").value;

    this.saveToStorage();
    this.renderTable();
    document.getElementById("add-student").textContent = "Thêm Sinh Viên";
    document.getElementById("add-student").onclick = () => this.addNewStudent();
  }

  addNewStudent() {
    const maSV = document.getElementById("student-id").value;
    const hoTen = document.getElementById("student-name").value;
    const gioiTinh = document.getElementById("student-gender").value;
    const ngaySinh = document.getElementById("student-dob").value;
    const queQuan = document.getElementById("student-hometown").value;

    const student = new SinhVien(maSV, hoTen, gioiTinh, ngaySinh, queQuan);
    this.addStudent(student);
  }
}
const app = new QuanLySinhVien();
document.getElementById("add-student").onclick = () => app.addNewStudent();
