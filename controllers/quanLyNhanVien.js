import { NhanVien } from "../models/NhanVien.js";
import {
  setLocalStorage,
  getLocalStorage,
  stringToSlug,
} from "../assets/util/method.js";

let danhSachNhanVien = [];
let arrFormInputNV = document.querySelectorAll(".inputData");

document.querySelector("#btnTimNV").onclick = () => {
  document.querySelector("#searchName").value = "";
  renderTableNhanVien(danhSachNhanVien);
};

document.querySelector("#searchName").oninput = () => {
  let searchName = document.querySelector("#searchName").value;

  let arrSearchNhanVien = danhSachNhanVien.filter((nv) =>
    stringToSlug(nv.xepLoai).includes(stringToSlug(searchName))
  );
  renderTableNhanVien(arrSearchNhanVien);
};

document.querySelector("#btnCapNhat").onclick = () => {
  let newNhanVien = new NhanVien();

  for (const item of arrFormInputNV) {
    newNhanVien[item.name] = item.value;
    newNhanVien.tinhLuong();
    newNhanVien.tinhXepLoai();
  }

  let index = danhSachNhanVien.findIndex(
    (nv) => nv.taiKhoan === newNhanVien.taiKhoan
  );

  danhSachNhanVien.splice(index, 1, newNhanVien);
  setLocalStorage(danhSachNhanVien, "QuanLyNhanVien");
  renderTableNhanVien(danhSachNhanVien);
  resetInput(arrFormInputNV);
};

document.querySelector("#btnThem").onclick = () => {
  resetInput(arrFormInputNV);
  btnDisplay("1");
};

document.querySelector("#btnThemNV").onclick = () => {
  let nhanVien = new NhanVien();

  for (const item of arrFormInputNV) {
    nhanVien[item.name] = item.value;
    nhanVien.tinhLuong();
    nhanVien.tinhXepLoai();
  }

  danhSachNhanVien.push(nhanVien);
  setLocalStorage(danhSachNhanVien, "QuanLyNhanVien");
  renderTableNhanVien(danhSachNhanVien);
  resetInput(arrFormInputNV);
};

document.querySelector("#taiKhoan").oninput = () => {
  let taiKhoan = document.querySelector("#taiKhoan").value;
  let tbTKNV = document.querySelector("#tbTKNV");
  let status = checkAccount(taiKhoan, danhSachNhanVien);

  if (status === true) {
    tbTKNV.style.display = "block";
    tbTKNV.innerHTML = "Tài khoản đã tồn tại";
  } else {
    tbTKNV.style.display = "none";
    tbTKNV.innerHTML = "";
  }
};

window.renderTableNhanVien = (arr) => {
  let htmlString = "";

  for (const nhanVien of arr) {
    htmlString += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoVaTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.xepLoai}</td>
        <td>
          <button onclick="xoaNV('${nhanVien.taiKhoan}')" class="btn btn-danger d-block">
            Xoá
          </button>
          <button onclick="suaNV('${nhanVien.taiKhoan}')" class="btn btn-black d-block mt-2" data-toggle="modal" data-target="#myModal">
            Sửa
          </button>
        </td>
      </tr>
    `;
  }

  document.querySelector("#tableDanhSach").innerHTML = htmlString;
};

window.suaNV = (taiKhoan) => {
  let nvUpdate = danhSachNhanVien.find((nv) => nv.taiKhoan === taiKhoan);

  if (nvUpdate) {
    for (const key in nvUpdate) {
      let inputEdit = document.querySelector(`#${key}`);

      if (inputEdit !== null) {
        inputEdit.value = nvUpdate[key];
      }
    }
  }

  btnDisplay("2");
};

window.xoaNV = (taiKhoan) => {
  let index = danhSachNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === taiKhoan
  );

  if (index !== -1) {
    danhSachNhanVien.splice(index, 1);
    setLocalStorage(danhSachNhanVien, "QuanLyNhanVien");
    renderTableNhanVien(danhSachNhanVien);
  }
};

window.getDataFromLocalStorage = () => {
  let dataFromLocalStorage = getLocalStorage("QuanLyNhanVien");

  if (dataFromLocalStorage) {
    danhSachNhanVien = dataFromLocalStorage;
    renderTableNhanVien(danhSachNhanVien);
  }
};

function resetInput(arr) {
  for (const item of arr) {
    item.value = "";
  }
}

function checkAccount(account, arr) {
  let status = false;

  if (arr.length === 0) {
    status = false;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === account) {
        status = true;
        break;
      }
    }
  }

  return status;
}

function btnDisplay(type) {
  let btnThem = document.querySelector("#btnThemNV");
  let btnLuu = document.querySelector("#btnCapNhat");
  let inputTK = document.querySelector("#taiKhoan");

  switch (type) {
    case "1":
      btnThem.style.display = "block";
      btnLuu.style.display = "none";
      inputTK.disabled = false;
      break;
    case "2":
      btnThem.style.display = "none";
      btnLuu.style.display = "block";
      inputTK.disabled = true;
      break;
    default:
      break;
  }
}

getDataFromLocalStorage();
