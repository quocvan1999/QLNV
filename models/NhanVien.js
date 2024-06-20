export class NhanVien {
  taiKhoan = "";
  hoVaTen = "";
  email = "";
  matKhau = "";
  ngayLam = "";
  luongCoBan = 0;
  chucVu = "";
  gioLam = "";
  tongLuong = 0;
  xepLoai = "";

  tinhLuong() {
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = +this.luongCoBan * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = +this.luongCoBan * 2;
        break;
      case "Nhân viên":
        this.tongLuong = +this.luongCoBan;
      default:
        break;
    }
  }

  tinhXepLoai() {
    let newGioLam = +this.gioLam;

    if (newGioLam >= 192) {
      this.xepLoai = "Xuất sắc";
    } else if (newGioLam >= 176) {
      this.xepLoai = "Giỏi";
    } else if (newGioLam >= 160) {
      this.xepLoai = "Khá";
    } else if (newGioLam <= 160) {
      this.xepLoai = "Trung bình";
    }
  }
}
