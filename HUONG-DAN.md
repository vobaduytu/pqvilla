# 📖 HƯỚNG DẪN QUẢN LÝ WEBSITE PQ VILLA

## 🌐 Thông tin website
- **URL**: https://pqvilla-nhomkinh.netlify.app
- **Quản lý**: https://app.netlify.com/projects/pqvilla-nhomkinh
- **GitHub**: https://github.com/vobaduytu/pqvilla

---

## 📁 Cấu trúc thư mục

```
📦 Nhôm Kính/
├── index.html          ← Trang chủ
├── products.html       ← Trang tất cả sản phẩm
├── styles.css          ← Giao diện (CSS)
├── script.js           ← Chức năng (JavaScript)
├── images/
│   ├── hero/           ← Ảnh slider trang chủ
│   │   ├── hero-1.png
│   │   ├── hero-2.png
│   │   └── hero-3.png
│   └── products/       ← Ảnh sản phẩm
│       ├── cua-mo-quay.png
│       ├── cua-lua.png
│       ├── cua-xep-truot.png
│       ├── vach-kinh.png
│       └── mat-dung.png
└── HUONG-DAN.md        ← File này
```

---

## ✏️ CÁCH CẬP NHẬT NỘI DUNG

### 1. Thay đổi số điện thoại / email / địa chỉ

Mở `index.html`, tìm và thay thế:
- `0XXX XXX XXX` → số điện thoại thật
- `tel:0000000000` → `tel:09xxxxxxxx` (số thật, không có dấu cách)
- `email@pqvilla.com` → email thật
- `Địa chỉ sẽ được cập nhật` → địa chỉ thật

> ⚠️ Nhớ sửa cả trong `products.html` luôn!

### 2. Thay đổi ảnh slider trang chủ

1. Chuẩn bị ảnh mới (khuyến nghị: **1920x1080px**, file PNG hoặc JPG)
2. Đặt ảnh vào thư mục `images/hero/`
3. Đổi tên thành `hero-1.png`, `hero-2.png`, `hero-3.png`
4. Deploy lại (xem bên dưới)

### 3. Thay đổi ảnh sản phẩm

1. Chuẩn bị ảnh mới (khuyến nghị: **600x600px**)
2. Đặt ảnh vào thư mục `images/products/`
3. Giữ nguyên tên file cũ hoặc đổi tên trong HTML

---

## ➕ CÁCH THÊM SẢN PHẨM MỚI

### Bước 1: Thêm ảnh
Đặt ảnh sản phẩm vào `images/products/` (ví dụ: `lan-can-kinh.png`)

### Bước 2: Thêm HTML
Mở `products.html`, tìm dòng `<!-- KẾT THÚC DANH SÁCH SẢN PHẨM -->`, dán đoạn sau **TRƯỚC** dòng đó:

```html
<div class="product-item">
  <div class="product-item-img">
    <img src="images/products/lan-can-kinh.png" alt="Lan Can Kính">
  </div>
  <div class="product-item-info">
    <span class="product-item-tag">DANH MỤC</span>
    <h3>Lan Can Kính</h3>
    <p>Mô tả ngắn về sản phẩm, tối đa 2-3 dòng.</p>
  </div>
</div>
```

### Bước 3: Sửa nội dung
- Đổi `src="images/products/TEN-FILE.png"` → tên file ảnh thật
- Đổi `alt="..."` → tên sản phẩm
- Đổi `DANH MỤC` → loại sản phẩm (VD: CỬA NHÔM, VÁCH KÍNH, MẶT DỰNG)
- Đổi tên + mô tả

### Bước 4: Deploy lại (xem bên dưới)

---

## 🚀 CÁCH DEPLOY (CẬP NHẬT WEBSITE)

### Cách nhanh nhất: Terminal trong VS Code

1. Mở VS Code
2. Mở terminal: `Ctrl + ~` (dấu ngã)
3. Chạy lệnh:

```
netlify deploy --prod --dir=.
```

4. Chờ 10-20 giây → Website tự cập nhật!

### Hoặc nhờ Gemini AI
Mở Gemini, nói: *"Cập nhật website PQ VILLA, thêm sản phẩm mới..."* → AI sẽ làm hết cho bạn.

---

## 🔗 CÁCH THÊM LINK MẠNG XÃ HỘI

Mở `index.html`, tìm phần `footer-social`, thay `href="#"` bằng link thật:

```html
<a href="https://facebook.com/pqvilla" aria-label="Facebook">...</a>
<a href="https://youtube.com/@pqvilla" aria-label="YouTube">...</a>
<a href="https://instagram.com/pqvilla" aria-label="Instagram">...</a>
<a href="https://tiktok.com/@pqvilla" aria-label="TikTok">...</a>
```

---

## 🌍 CÁCH GẮN TÊN MIỀN RIÊNG (tuỳ chọn)

Nếu muốn URL là `pqvilla.com` hoặc `pqvilla.vn`:

1. Mua domain tại [tenten.vn](https://tenten.vn) hoặc [namecheap.com](https://namecheap.com)
2. Vào Netlify → **Domain management** → **Add custom domain**
3. Nhập tên miền → Netlify sẽ hướng dẫn trỏ DNS
4. Bật HTTPS (miễn phí, tự động)

---

## ❓ CÂU HỎI THƯỜNG GẶP

**Q: Deploy có mất phí không?**
A: KHÔNG. Netlify free vĩnh viễn cho website tĩnh.

**Q: Thêm ảnh bị vỡ/mờ?**
A: Dùng ảnh chất lượng cao, kích thước khuyến nghị:
- Slider: 1920x1080px
- Sản phẩm: 600x600px
- Dự án: 600x450px

**Q: Sửa xong mà website không thay đổi?**
A: Nhấn `Ctrl+Shift+R` để hard refresh trình duyệt.

**Q: Muốn thêm tính năng mới?**
A: Mở Gemini AI, mô tả tính năng → AI sẽ code cho bạn.
