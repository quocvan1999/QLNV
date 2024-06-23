import { NhanVien } from "../models/NhanVien.js";
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
let thisID = 0;

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

    await postApiDataAsync(BASE_USR, newNhanVien);
    getDataApi();
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

    await putApiDataAsync(BASE_USR, thisID, newNhanVien);
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

getDataApi();
