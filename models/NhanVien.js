export class NhanVien {
  taiKhoan = "";
  hoTen = "";
  email = "";
  matKhau = "";
  ngayLam = "";
  luongCoBan = 0;
  chucVu = "";
  gioLam = 0;

  tongLuong = function () {
    let luongCB = +this.luongCoBan;
    let tongLuong = 0;

    switch (this.chucVu) {
      case "Sếp":
        tongLuong = luongCB * 3;
        break;
      case "Trưởng phòng":
        tongLuong = luongCB * 2;
        break;
      case "Nhân viên":
        tongLuong = luongCB;
      default:
        break;
    }

    return tongLuong;
  };

  loaiNhanVien = function () {
    let gLam = +this.gioLam;
    let xepLoai = "";

    if (gLam >= 192) {
      xepLoai = "Xuất sắc";
    } else if (gLam >= 176) {
      xepLoai = "Giỏi";
    } else if (gLam >= 160) {
      xepLoai = "Khá";
    } else if (gLam <= 160) {
      xepLoai = "Trung bình";
    }

    return xepLoai;
  };
}
