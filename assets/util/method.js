export function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}

/**
 * Hàm set dữ liệu lên local storage
 * @param {*} data hữ liệu cần đẩy lên
 * @param {*} nameData tên dữ liệu
 */
export function setLocalStorage(data, nameData) {
  localStorage.setItem(nameData, JSON.stringify(data));
}

/**
 * Hàm láy dữ liệu từ local storage về
 * @param {*} nameData tên dữ liệu cần lấy
 * @returns trả về dữ liệu lấy từ local storage
 */
export function getLocalStorage(nameData) {
  return JSON.parse(localStorage.getItem(nameData));
}

export function tinhLuong(luongCoBan, chucVu) {
  let tongLuong = 0;
  switch (chucVu) {
    case "Sếp":
      tongLuong = luongCoBan * 3;
      break;
    case "Trưởng phòng":
      tongLuong = luongCoBan * 2;
      break;
    case "Nhân viên":
      tongLuong = +luongCoBan;
    default:
      break;
  }

  return tongLuong;
}

export function xepLoai(gioLam) {
  let xepLoai = "";
  let newGioLam = +gioLam;

  if (newGioLam >= 192) {
    xepLoai = "Xuất sắc";
  } else if (newGioLam >= 176) {
    xepLoai = "Giỏi";
  } else if (newGioLam >= 160) {
    xepLoai = "Khá";
  } else if (newGioLam <= 160) {
    xepLoai = "Trung bình";
  }

  return xepLoai;
}

export function setId(arr) {
  let id = 0;

  if (arr.length === 0) {
    id = 0;
  } else {
    id = arr[arr.length - 1].maNhanVien + 1;
  }

  return id;
}
