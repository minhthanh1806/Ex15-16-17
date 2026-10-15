# Exercise 15, 16, 17: Node.js, Express, Mongoose & MVC Architecture

Dự án hoàn thành đầy đủ yêu cầu của **Bài 15**, **Bài 16**, và **Bài 17** trong thư mục `3. Exercises`.

---

## 📁 Cấu trúc thư mục (MVC Pattern - Bài 17)

```text
Ex15-16-17/
├── config/
│   └── db.js                   # Kết nối MongoDB bằng Mongoose
├── controllers/
│   ├── articleController.js    # Controller xử lý CRUD cho Article (Bài 17)
│   └── commentController.js    # Controller xử lý CRUD và populate Comment (Bài 16, 17)
├── models/
│   ├── article.js              # Mongoose Schema & Model Article (Bài 15, 16)
│   └── comment.js              # Mongoose Schema & Model Comment có reference tới Article (Bài 16)
├── routes/
│   ├── articleRouter.js        # Định tuyến RESTful API cho /articles (Bài 15, 17)
│   └── commentRouter.js        # Định tuyến RESTful API cho /comments (Bài 16)
├── .env                        # Biến môi trường (PORT, MONGODB_URI)
├── app.js                      # Entry point, cấu hình middleware và routes
├── package.json
└── README.md
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Cấu hình biến môi trường (`.env`)
File `.env` đã được tạo sẵn tại thư mục gốc:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/node-mongoose
```

### 3. Khởi chạy Server
- Chạy thông thường:
  ```bash
  npm start
  ```
- Hoặc chạy chế độ phát triển với Nodemon:
  ```bash
  npm run dev
  ```
Server mặc định chạy tại: `http://localhost:3000`

---

## 📌 Tổng hợp API & Hướng dẫn test Postman

### 1. Bài 15 & 17: Quản lý Articles (`/articles`)

| Method | Endpoint | Mô tả | Chi tiết / Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/articles` | Lấy danh sách tất cả bài viết | Trả về mảng JSON chứa các bài viết |
| **POST** | `/articles` | Tạo một bài viết mới | JSON Body:<br>`{ "title": "Exploring Paris", "text": "This article discusses the beauty of Paris and its sights.", "tags": ["travel", "france"] }` |
| **PUT** | `/articles` | Thao tác không được hỗ trợ | Trả về Status 403 Forbidden |
| **DELETE** | `/articles` | Xóa tất cả bài viết | Trả về Status 200 OK |
| **GET** | `/articles/:id` | Lấy chi tiết một bài viết theo ID | Trả về bài viết hoặc 404 nếu không tìm thấy |
| **POST** | `/articles/:id` | Thao tác không được hỗ trợ | Trả về Status 403 Forbidden |
| **PUT** | `/articles/:id` | Cập nhật bài viết theo ID | JSON Body:<br>`{ "title": "Updated Title", "text": "Updated content with more than 10 characters." }` |
| **DELETE** | `/articles/:id` | Xóa một bài viết theo ID | Trả về Status 204 No Content |

---

### 2. Bài 16: Mongoose Population (`/comments`)

Comments được tách thành một collection riêng và tham chiếu (`ref: 'Article'`) đến `Article`. Khi truy vấn danh sách comments, Mongoose sẽ tự động **populate** thông tin chi tiết của Article liên quan.

| Method | Endpoint | Mô tả | Chi tiết / Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/comments` | Lấy danh sách comments kèm Article đã populate | `Comment.find().populate('article')` |
| **POST** | `/comments` | Tạo comment mới gắn với Article | JSON Body:<br>`{ "body": "Great article!", "article": "<ARTICLE_ID>" }` |
| **PUT** | `/comments` | Thao tác không được hỗ trợ | Trả về Status 403 Forbidden |
| **DELETE** | `/comments` | Xóa tất cả comments | Trả về Status 200 OK |
| **GET** | `/comments/:id` | Lấy chi tiết 1 comment theo ID (populate) | Trả về comment hoặc 404 nếu không tìm thấy |
| **POST** | `/comments/:id` | Thao tác không được hỗ trợ | Trả về Status 403 Forbidden |
| **PUT** | `/comments/:id` | Cập nhật comment theo ID | JSON Body:<br>`{ "body": "Updated comment text" }` |
| **DELETE** | `/comments/:id` | Xóa comment theo ID | Trả về Status 204 No Content |
