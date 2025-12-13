# 🎰 HƯỚNG DẪN SETUP GOOGLE APPS SCRIPT - QUAY SỐ MAY MẮN

## 📋 Các bước thực hiện:

### 1. Tạo Google Sheet
1. Tạo một Google Sheet mới
2. Tạo 2 sheet:
   - **Employees**: Chứa danh sách nhân viên
   - **Winners**: Chứa danh sách trúng thưởng
3. Trong sheet "Employees", tạo header:
   ```
   STT | MSNV | Họ và Tên | Phòng ban
   ```
4. Copy **SPREADSHEET_ID** từ URL (phần giữa `/d/` và `/edit`)

### 2. Tạo Google Apps Script Project
1. Vào https://script.google.com
2. Tạo project mới
3. Xóa code mặc định trong `Code.gs`
4. Copy code từ file `Code.gs` vào
5. Thay đổi `YOUR_SPREADSHEET_ID_HERE` thành ID thực của bạn

### 3. Thêm HTML file
1. Trong Apps Script Editor: **File > New > HTML file**
2. Đặt tên: `index`
3. Copy toàn bộ nội dung từ `index.html` vào

### 4. Deploy Web App
1. Click **Deploy > New deployment**
2. **Type**: Web app
3. **Execute as**: Me
4. **Who has access**: Anyone (hoặc Anyone with Google account)
5. Click **Deploy**
6. Copy **Web app URL**

### 5. Cấp quyền truy cập
1. Khi deploy lần đầu, sẽ cần cấp quyền
2. Click **Authorize access**
3. Chọn tài khoản Google
4. Allow các quyền cần thiết

## 🗂️ Cấu trúc file Excel upload:
```
STT | MSNV     | Họ và Tên      | Phòng ban
1   | NV001    | Nguyễn Văn A   | Kỹ thuật  
2   | NV002    | Trần Thị B     | Kinh doanh
3   | NV003    | Lê Văn C       | Nhân sự
```

## ⚙️ Tính năng:
- ✅ Upload danh sách từ file Excel
- ✅ Quay số ngẫu nhiên với hiệu ứng
- ✅ Lưu danh sách trúng thưởng 
- ✅ In danh sách trúng thưởng
- ✅ Reset toàn bộ
- ✅ 5 theme màu sắc
- ✅ Responsive design

## 🔧 Troubleshooting:
- **Lỗi quyền truy cập**: Kiểm tra cấu hình "Who has access"
- **Không load được data**: Kiểm tra SPREADSHEET_ID
- **Lỗi upload Excel**: Đảm bảo format đúng cột STT, MSNV, Tên, Phòng ban

## 📱 Demo Mode:
Nếu chạy ngoài Apps Script, app sẽ tự động chuyển sang Demo Mode với 5 nhân viên mẫu và lưu trữ local.