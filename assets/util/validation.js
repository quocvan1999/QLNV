export function kiemTraRong(value, selectorError, name) {
  if (value.trim() === "") {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} không được bỏ trống!`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

export function kiemTraChu(value, selectorError, name) {
  let regexString = /^[A-Za-z]+$/;
  if (regexString.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }

  document.querySelector(selectorError).innerHTML = `${name} phải là chữ!`;
  return false;
}

export function kiemTraEmail(value, selectorError, name) {
  let regexEmail = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
  return false;
}

export function kiemTraDoDai(value, selectorError, name, min, max) {
  let length = value.length;
  if (length > max || length < min) {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} từ ${min} - ${max} ký tự !`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = ``;
  return true;
}

export function kiemTraMatKhau(value, selectorError, name) {
  let rexgeMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_])\S{6,10}$/;
  if (rexgeMatKhau.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }

  document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
  return false;
}

export function kiemTraNgay(value, selectorError, name) {
  let rexgeNgay =
    /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(19|20)\d{2}$/;

  if (rexgeNgay.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }

  document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
  return false;
}

export function kiemTraGiaTri(value, selectorError, name, min, max) {
  let number = +value;
  if (number < min || number > max) {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} có giá trị nhập từ ${formatNumberWithCommas(
      min
    )} - ${formatNumberWithCommas(max)}`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = ``;
  return true;
}

export function kiemTraChucVu(value, selectorError, name) {
  if (value.trim() === "") {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} Chọn chức vụ hợp lệ!`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function formatNumberWithCommas(numberString) {
  // Chuyển chuỗi thành số
  const number = parseFloat(numberString);
  // Kiểm tra nếu giá trị chuyển đổi là số hợp lệ
  if (isNaN(number)) {
    throw new Error("Input is not a valid number");
  }
  // Sử dụng phương thức toLocaleString để định dạng số
  return number.toLocaleString("en-US");
}
