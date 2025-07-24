# مرحله Build
FROM node:18-alpine AS builder

# دایرکتوری کاری داخل کانتینر
WORKDIR /app

# کپی فایل‌های پروژه
COPY package.json package-lock.json* ./
COPY . .

# نصب وابستگی‌ها
RUN npm install

# ساخت پروژه
RUN npm run build

# مرحله اجرای نهایی (Nginx برای سرو کردن فایل‌های build شده)
FROM nginx:alpine

# پاک کردن کانفیگ پیش‌فرض Nginx
RUN rm -rf /usr/share/nginx/html/*

# کپی خروجی build به Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# کپی فایل کانفیگ ساده برای SPA routing (اختیاری)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# پورت Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
