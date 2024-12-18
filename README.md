# Student Smart Printing Service at HCMUT

Đây là Source code của dự án SPSS thuộc nhóm L03 - 15 môn CNPM HK241

# Tổng quan dự án

Hiện nay, nhu cầu in ấn tài liệu, báo cáo, bài luận,... của sinh viên là rất lớn. Nhưng việc thiếu các trang thiết bị phục vụ in ấn trong trường khiến cho các bạn sinh viên phải đến các tiệm in bên ngoài trường, dẫn đến bất tiện.

Nắm bắt được điều này, Trường Đại học Bách khoa - ĐHQG HCM quyết định sẽ triển khai một hệ thống in ấn tự động, dễ dàng sử dụng và quán lý trên toàn bộ các cơ sở, toà nhà của trường.

Đối với sinh viên, đây sẽ là hệ thống giúp cho việc in ấn trở nên dễ dàng và tiện lợi hơn. Hệ thống cũng sẽ có nhiều tuỳ chọn về loại file được in, số trang in, loại giấy, in 2 mặt,... Đồng thời cũng sẽ đảm bảo tính an toàn và bảo mật, tránh làm lộ nội dung, tài liệu của các sinh viên.

Đối với nhà trường nói chung và nhân viên quản lý hệ thống (SPSO) nói riêng, hệ thống sẽ giúp cho việc quản lý in ấn trở nên thuận tiện và chặt chẽ hơn với các chức năng báo cáo thông minh, tuỳ chỉnh thông số của hệ thống. Đối với nhà trường nói chung và nhân viên quản lý hệ thống (SPSO) nói riêng, hệ thống sẽ giúp cho việc quản lý in ấn trở nên thuận tiện và chặt chẽ hơn với các chức năng báo cáo thông minh, tuỳ chỉnh thông số của hệ thống.

# Yêu cầu hệ thống

## Yêu cầu chức năng

Đối với Sinh viên, hệ thống sẽ cung cấp các chức năng:

- Chọn máy in nhận tài liệu.
- Tải lên tệp tài liệu.
- Điều chỉnh kích cỡ, trang cần in, số mặt in, số lượng in.
- Kiểm tra lịch sử in.
- Được quyền in khi còn đủ số giấy.
- Mua giấy qua hệ thống thanh toán.

Đối với SPSO, hệ thống có các chức năng:

- Hạn chế và điều chỉnh loại tệp sinh viên được quyền in. 
- Xem lịch sử in ấn của tất cả sinh viên hoặc một sinh viên nào đó theo ngày và theo máy in.
- Điều chỉnh số lượng giấy và thời gian sinh viên nhận mỗi học kỳ.
- Xem báo cáo in ấn theo tháng, theo năm.
- Tùy chọn thêm, khởi động, vô hiệu hóa máy in

## Yêu cầu phi chức năng

Hệ thống sẽ cần đạt được các yêu cầu sau: 

- Yêu cầu về hiệu suất (Performance)
- Yêu cầu về độ tin cậy (Reliability) 
- Yêu cầu về bảo mật (Security)
- Yêu cầu về khả năng sử dụng (Usability) 
- Yêu cầu về khả năng mở rộng (Scalability)
- Yêu cầu về tính bảo trì (Maintainability)
- Yêu cầu về tính khả dụng (Avaibability)
- Yêu cầu về tính tương thích (Compatibility) 
- Yêu cầu về quản lý và báo cáo (Management and Reporting) 

# Mô hình hoá hệ thống

## Usecase Diagram

<p align="center"><img src="/docs/usecaseCNPM2.jpg"></p>

## Các Usecase chính
### In tài liệu
<p align="center" width=100%><img src="/docs/avtIntailieu.png" width=48%> <img src="/docs/sqIntailieu.png" width=51%></p>

### Mua trang in
<p align="center" width=100%><img src="/docs/avtmuathemtrangin.png" width=34%> <img src="/docs/sqmuatrangin.png" width=65%></p>

### Quản lý cấu hình
<p align="center" width=100%><img src="/docs/avtquanlicauhinh.png" width=54%> <img src="/docs/sqquanlicauhinh.png" width=45%></p>

### Quản lý máy in
<p align="center" width=100%><img src="/docs/avtquanlimayin.png" width=54.5%> <img src="/docs/sqquanlimayin.png" width=44.5%></p>

## Class Diagram

<p align="center"><img src="/docs/ClassDiagramCNPM2.jpg"></p>

# Kiến trúc hệ thống

Nhóm sử dụng kiến trúc MVC

- Model: Xử lý và quản lý dữ liệu, tập trung vào logic liên quan đến dữ liệu và quy trình nghiệp vụ, giúp hệ thống hoạt động mạch lạc và nhất quán.

- View: Phần giao diện tương tác với người dùng, chịu trách nhiệm trình bày dữ liệu từ Model và tiếp nhận các thao tác từ người dùng.

- Controller: Đảm nhiệm việc điều phối giữa Model và View, quản lý logic cốt lõi và xử lý yêu cầu của ngườidùng, giúp giữ cho hệ thống hoạt động trơn tru và nhất quán.

<p align="center"><img src="/docs/architec.png"></p>

# Cách khởi chạy hệ thống

Để khởi chạy server, hãy mở một Terminal lên và thực hiện các lệnh

```
cd server
npm start
```

Để khởi chạy client, tiếp đó ta sẽ mở thêm 1 Terminal nữa và nhập các lệnh

```
cd client
npm start
```

