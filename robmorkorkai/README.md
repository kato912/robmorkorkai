# 📍 RobMorKorKai (รอบ มข.)

แพลตฟอร์มค้นหาร้านอาหาร คาเฟ่ และธุรกิจยอดฮิตรอบมหาวิทยาลัยขอนแก่น พร้อม AI Assistant ช่วยแนะนำร้าน (Frontend Version)

## 🛠 Tech Stack
* **Framework:** React + TypeScript (Vite)
* **Styling:** Bootstrap 5 (SCSS/CSS)
* **Icons:** Lucide React
* **Routing:** React Router Dom v6

---

## 📦 การติดตั้งและ Library ที่ใช้ (Dependencies)
### 1. ติดตั้งทั้งหมดในครั้งเดียว (One-click Install)
สำหรับคนที่ clone โปรเจกต์มาใหม่ ให้รันคำสั่งนี้เพื่อลงทุกอย่าง:

```bash
npm install bootstrap react-router-dom lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-checkbox

1. Core Framework & Routing
  npm install bootstrap react-router-dom

2. Icon
  npm install lucide-react

3. Advanced UI Components & Utils
  # Utility สำหรับจัดการ Class names
  npm install class-variance-authority clsx tailwind-merge

# Headless UI Primitives (Radix UI)
  npm install @radix-ui/react-slot @radix-ui/react-checkbox
  
```text
src/
├── components/
│   ├── login/                 # Component ย่อยของหน้า Login
│   │   ├── AuthContent.tsx      <-- ส่วนเนื้อหาปุ่ม Login (ใช้ร่วมกันทั้ง 2 จอ)
│   │   ├── LoginMobileView.tsx  <-- Layout สำหรับมือถือ (มี Header สีน้ำเงิน)
│   │   ├── LoginDesktopView.tsx <-- Layout สำหรับ PC (แบ่งครึ่งจอ)
│   │   └── ...
│   └── (future-features)/     # ฟีเจอร์อื่นๆ ในอนาคต
│
├── pages/
│   ├── Login.tsx              # หน้าหลัก (ทำหน้าที่สลับ Mobile/Desktop View)
│   └── ...
│
├── App.tsx                    # Main Routing
└── main.tsx                   # Entry Point