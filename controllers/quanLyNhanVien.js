import { NhanVien } from "../models/NhanVien.js";
import {
  kiemTraRong,
  kiemTraDoDai,
  kiemTraChu,
  kiemTraEmail,
  kiemTraMatKhau,
  kiemTraNgay,
  kiemTraGiaTri,
  kiemTraChucVu,
} from "../assets/util/validation.js";
import {
  getApiDataAsync,
  getApiDataIDAsync,
  postApiDataAsync,
  resetInput,
  deleteApiDataAsync,
  putApiDataAsync,
  stringToSlug,
} from "../assets/util/method.js";

let BASE_USR =
  "https://6675ff6aa8d2b4d072f21f4a.mockapi.io/Api/DanhSachNhanVien";
let arrInput = document.querySelectorAll("#frmThemNhanVien .inputData");
let arrTB = document.querySelectorAll(".text-tb");
let thisID = 0;

document.querySelector("#btnDong").onclick = function () {
  resetTb(arrTB);
};

document.querySelector("#searchName").oninput = async function () {
  try {
    let searchName = document.querySelector("#searchName").value;
    let danhSachNhanVien = await getApiDataAsync(BASE_USR);
    let arrNhanVien = danhSachNhanVien.filter((nv) => {
      return (
        stringToSlug(nv.loaiNhanVien).indexOf(stringToSlug(searchName)) !== -1
      );
    });

    renderTableNhanVien(arrNhanVien);
  } catch (e) {
    console.log(e);
  }
};

document.querySelector("#btnThem").onclick = function () {
  resetTb(arrTB);
  resetInput(arrInput);
  displayButton("1");
};

document.querySelector("#btnThemNV").onclick = async function () {
  try {
    let newNhanVien = new NhanVien();

    for (const key in newNhanVien) {
      if (typeof newNhanVien[key] !== "function") {
        newNhanVien[key] = document.querySelector(`#${key}`).value;
      } else {
        newNhanVien[key] = newNhanVien[key]();
      }
    }

    let valid = validationFormInput(newNhanVien);

    if (!valid) {
      return;
    }

    await postApiDataAsync(BASE_USR, newNhanVien);
    $("#myModal").modal("hide");
    getDataApi();
    document.querySelectorAll(".text-tb").innerHTML = "";
    resetInput(arrInput);
  } catch (e) {
    console.log(e);
  }
};

document.querySelector("#btnCapNhat").onclick = async function () {
  try {
    let newNhanVien = new NhanVien();

    for (const key in newNhanVien) {
      if (typeof newNhanVien[key] !== "function") {
        newNhanVien[key] = document.querySelector(`#${key}`).value;
      } else {
        newNhanVien[key] = newNhanVien[key]();
      }
    }

    let valid = validationFormInput(newNhanVien);

    if (!valid) {
      return;
    }

    await putApiDataAsync(BASE_USR, thisID, newNhanVien);
    $("#myModal").modal("hide");
    getDataApi();
    resetInput(arrInput);
  } catch (e) {
    console.log(e);
  }
};

window.renderTableNhanVien = function (arrNhanVien) {
  let stringHtml = "";

  for (const nhanVien of arrNhanVien) {
    stringHtml += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.loaiNhanVien}</td>
        <td>
          <button onclick="xoaNhanVien('${nhanVien.id}')" class="btn btn-danger">Xoá</button>
          <button onclick="suaNhanVien('${nhanVien.id}')" class="btn btn-black mt-2" data-toggle="modal" data-target="#myModal">Sửa</button>
        </td>
      </tr>
    `;
  }

  document.querySelector("#tableDanhSach").innerHTML = stringHtml;
};

window.xoaNhanVien = async function (id) {
  try {
    await deleteApiDataAsync(BASE_USR, id);
    getDataApi();
  } catch (e) {
    console.log(e);
  }
};

window.suaNhanVien = async function (id) {
  try {
    resetTb(arrTB);
    displayButton("2");

    let nhanVien = await getApiDataIDAsync(BASE_USR, id);

    for (const key in nhanVien) {
      if (key != "tongLuong" && key != "loaiNhanVien" && key != "id") {
        document.querySelector(`#${key}`).value = nhanVien[key];
      }
    }

    thisID = id;
  } catch (e) {
    console.log(e);
  }
};

window.getDataApi = async function () {
  try {
    let data = await getApiDataAsync(BASE_USR);

    renderTableNhanVien(data);
  } catch (e) {
    console.log(e);
  }
};

function displayButton(type) {
  let btnThem = document.querySelector("#btnThemNV");
  let btnLuu = document.querySelector("#btnCapNhat");

  switch (type) {
    // Form thêm nhân viên
    case "1":
      btnThem.style.display = "block";
      btnLuu.style.display = "none";
      break;
    // Form cập nhật nhân viên
    case "2":
      btnThem.style.display = "none";
      btnLuu.style.display = "block";
      break;
    default:
      break;
  }
}

function validationFormInput(arr) {
  let valid = true;
  let arrInput = document.querySelectorAll(
    "#frmThemNhanVien input[data-typeNull=null]"
  );
  let { taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam } =
    arr;

  for (const input of arrInput) {
    valid &= kiemTraRong(input.value, `#tb-${input.id}`, input.placeholder);
  }

  if (kiemTraRong(taiKhoan, "#tb-taiKhoan", "Tài khoản")) {
    valid &= kiemTraDoDai(taiKhoan, "#tb-taiKhoan", "Tài khoản", 4, 6);
  }

  if (kiemTraRong(hoTen, "#tb-hoTen", "Họ tên")) {
    valid &= kiemTraChu(hoTen, "#tb-hoTen", "Họ tên");
  }

  if (kiemTraRong(email, "#tb-email", "Email")) {
    valid &= kiemTraEmail(email, "#tb-email", "Email");
  }

  if (kiemTraRong(matKhau, "#tb-matKhau", "Mật khẩu")) {
    valid &= kiemTraMatKhau(matKhau, "#tb-matKhau", "Mật khẩu");
  }

  if (kiemTraRong(ngayLam, "#tb-ngayLam", "Ngày làm")) {
    valid &= kiemTraNgay(ngayLam, "#tb-ngayLam", "Ngày làm");
  }

  if (kiemTraRong(luongCoBan, "#tb-luongCoBan", "Lương cơ bản")) {
    valid &= kiemTraGiaTri(
      luongCoBan,
      "#tb-luongCoBan",
      "Lương cơ bản",
      1e6,
      2e7
    );
  }

  if (kiemTraRong(gioLam, "#tb-gioLam", "Giờ làm")) {
    valid &= kiemTraGiaTri(gioLam, "#tb-gioLam", "Giờ làm", 80, 200);
  }

  valid &= kiemTraChucVu(chucVu, "#tb-chucVu", "Chức vụ");

  return valid;
}

function resetTb(arr) {
  for (const tb of arr) {
    tb.innerHTML = "";
  }
}

getDataApi();
