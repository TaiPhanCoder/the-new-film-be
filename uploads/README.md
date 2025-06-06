# Uploads Directory

Thư mục này chứa các file được upload bởi người dùng thông qua API.

## Cấu trúc thư mục:

```
uploads/
├── videos/     # Chứa các file video (.mp4, .avi, .mov, etc.)
├── posters/    # Chứa các poster phim (.jpg, .png, .webp, etc.)
├── banners/    # Chứa các banner quảng cáo (.jpg, .png, .webp, etc.)
└── misc/       # Chứa các file khác
```

## Quy tắc đặt tên file:

- Format: `{fieldname}-{timestamp}-{random}.{extension}`
- Ví dụ: `video-1640995200000-123456789.mp4`

## Giới hạn file:

- **Videos**: Tối đa 500MB
- **Images** (posters/banners): Tối đa 10MB
- **Misc**: Tối đa 10MB

## Truy cập file:

- URL pattern: `http://localhost:3000/uploads/{category}/{filename}`
- Ví dụ: `http://localhost:3000/uploads/videos/video-1640995200000-123456789.mp4`

## Lưu ý bảo mật:

- Chỉ admin mới có thể upload file
- File được validate về loại và kích thước
- Tên file được tự động generate để tránh conflict
