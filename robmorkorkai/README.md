# 🏪 RobMorKorKai (รอบ มข.) - Frontend

**ระบบค้นหาร้านอาหาร คาเฟ่ และธุรกิจยอดฮิตรอบมหาวิทยาลัยขอนแก่น** 🍽️☕📍

แพลตฟอร์มทั้งคน เพื่อช่วยนักศึกษาหา ร้านดีๆ รอบรั้ว มข. พร้อม reviews ที่เชื่อถือได้ และแนะนำจากระบบ AI

---

## 📚 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [⚙️ Environment Setup](#️-environment-setup)
- [🚀 Running the App](#-running-the-app)
- [📂 Project Structure](#-project-structure)
- [🎨 Key Components](#-key-components)
- [🔌 API Integration](#-api-integration)
- [📱 Responsive Design](#-responsive-design)
- [🚀 Deployment](#-deployment)
- [📝 Development Guide](#-development-guide)

---

## ✨ Features

### 🔍 Search & Discover
- **Advanced Search** - ค้นหาร้านด้วยชื่อ หมวดหมู่ หรือโซน
- **Filter by Zone** - ค้นหาร้านตามพื้นที่รอบมข.
- **Filter by Category** - ประเภท: อาหาร, คาเฟ่, ร้านนั่งชิล
- **Sort Options** - เรียงตามคะแนน, จำนวน review, ชื่อ
- **Random Shop** - ปุ่มสุ่มร้านเด้อเมื่อไม่รู้จะเลือกอะไร

### ⭐ Reviews & Ratings
- **Write Reviews** - เขียน review พร้อมคะแนน 1-5 ดาว
- **Read Reviews** - อ่าน review จากคนอื่น
- **My Reviews** - จัดการ review ที่เขียนไว้

### 💖 Favorites
- **Save Favorites** - เก็บร้านโปรดไว้อ่านทีหลัง
- **View Favorites** - ดูรายชื่อร้านพื้นที่ในเมนูไว้

### 👤 User Profile
- **User Dashboard** - ดูข้อมูลและสถิติของตัวเอง
- **Edit Profile** - แก้ไขชื่อ และข้อมูลส่วนตัว
- **KKU Verification** - ยืนยันตัวตน KKU ผ่าน email
- **Authentication** - เข้าระบบด้วย Google Account

### 🎯 Performance & Optimization
- **Image Optimization** - โหลดรูป smart fallback เมื่อ Google rate limit
- **Lazy Loading** - โหลดรูปแบบเขียว (lazy)
- **Caching** - เก็บข้อมูลเพื่อให้โหลดเร็ว
- **Responsive** - ทำงานดีทั้ง mobile และ desktop

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | React 18 + TypeScript + Vite |
| **UI Framework** | Bootstrap 5 CSS |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Authentication** | Google OAuth 2.0 (NextAuth.js) |
| **Code Quality** | ESLint |

---

## 📦 Installation

### Prerequisites
- Node.js >= 18.0
- npm >= 9.0

### Step 1: Clone Repository
```bash
git clone https://github.com/yourname/robmorkorkai.git
cd robmorkorkai/robmorkorkai
```

### Step 2: Install Dependencies
```bash
npm install
```

**Key Dependencies:**
```bash
npm install react react-dom react-router-dom
npm install bootstrap lucide-react axios
npm install typescript -D
```

---

## ⚙️ Environment Setup

### 1. Create `.env` file
```bash
cp .env.example .env
```

### 2. Configure `.env`
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Environment
VITE_ENV=development
```

### Environment Files Reference

| File | Usage | Tracked in Git |
|------|-------|---|
| `.env` | Development (localhost) | ❌ NO - Added to .gitignore |
| `.env.example` | Template for developers | ✅ YES |
| `.env.production` | Production deployment | ❌ NO - Added to .gitignore |

---

## 🚀 Running the App

### Development Server
```bash
npm run dev
```
Opens at: `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

---

## 📂 Project Structure

```
robmorkorkai/
├── public/                    # Static assets
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── common/           # Shared components
│   │   │   ├── ScrollToTopButton.tsx
│   │   │   └── ...
│   │   ├── home/             # Homepage components
│   │   │   ├── HomeDesktopView.tsx
│   │   │   ├── HomeMobileView.tsx
│   │   │   ├── ShopCard.tsx
│   │   │   ├── ZoneFilter.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── FloatingActionButton.tsx
│   │   │   └── RandomShopButton.tsx
│   │   ├── search/           # Search page components
│   │   │   ├── SearchPage.tsx
│   │   │   ├── SearchShopCard.tsx
│   │   │   ├── SearchFilterSidebar.tsx
│   │   │   ├── MobileSearchHeader.tsx
│   │   │   └── css/
│   │   ├── layout/           # Layout components
│   │   │   ├── TopNavbar.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SearchPage.tsx
│   │   │   ├── ShopDetailPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AdminPage.tsx
│   │   │   └── css/
│   │   ├── profile/          # Profile related components
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileInfoCard.tsx
│   │   │   ├── MyStoreList.tsx
│   │   │   └── css/
│   │   ├── auth/             # Auth components
│   │   │   └── LoginForm.tsx
│   │   └── admin/            # Admin panel components
│   │       ├── AdminPage.tsx
│   │       ├── AdminComponents.tsx
│   │       ├── AdminMobile.tsx
│   │       └── types.tsx
│   │
│   ├── pages/                # (Deprecated - use components/pages/)
│   │
│   ├── context/              # React Context
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useShops.ts
│   │   └── useTypingEffect.ts
│   │
│   ├── services/             # API services
│   │   └── api.ts (Axios instance)
│   │
│   ├── utils/                # Utility functions
│   │   ├── constants.ts
│   │   ├── alertUtils.ts
│   │   └── (helper functions)
│   │
│   ├── types/                # TypeScript types
│   │   └── shop.ts
│   │
│   ├── data/                 # Mock data
│   │   └── mockData.ts
│   │
│   ├── assets/               # Images & static files
│   │   └── hero-campus-life.jpg
│   │
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles
│   └── (other root files)
│
├── .env                      # Development environment (NOT in git)
├── .env.example              # Template
├── .env.production           # Production config (NOT in git)
├── .gitignore                # Git ignore rules
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
├── eslint.config.js          # ESLint config
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 🎨 Key Components

### Page Components
- **HomePage** - Landing page with featured shops
- **SearchPage** - Advanced search with filters
- **ShopDetailPage** - Detailed shop info + reviews
- **ProfilePage** - User profile dashboard
- **LoginPage** - Authentication page
- **AdminPage** - Admin panel for shop management

### UI Components
- **ShopCard** - Display shop in grid/list
- **SearchShopCard** - Horizontal shop card for search
- **ZoneFilter** - Filter by location/zone
- **CategoryFilter** - Filter by shop category
- **TopNavbar** - Header navigation
- **BottomNav** - Mobile footer navigation

### Interactive Components
- **FloatingActionButton** - Toggle between random/scroll-to-top
- **ScrollToTopButton** - Smooth scroll to top
- **RandomShopButton** - Pick random shop

---

## 🔌 API Integration

### API Service Configuration
```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});
```

### Key Endpoints
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get shop details
- `POST /api/reviews` - Create review
- `GET /api/user/favorites` - Get user favorites
- `GET /api/user/reviews` - Get user reviews
- `PATCH /api/user/update` - Update user profile

### Image Optimization
App uses backend image proxy to avoid Google rate-limiting:
```
GET /api/images/proxy?url=ENCODED_IMAGE_URL
```

---

## 📱 Responsive Design

### Breakpoints (Bootstrap)
```css
Mobile:   < 576px
Tablet:   576px - 991px
Desktop:  ≥ 992px
```

### Responsive Components
- **Mobile View** - Optimized for small screens with touch-friendly UI
- **Tablet View** - Adjusted layout for medium screens
- **Desktop View** - Full-featured layout with sidebars

### Mobile-First Components
- `HomeMobileView.tsx` - Mobile homepage
- `MobileSearchHeader.tsx` - Mobile search interface
- `AdminMobile.tsx` - Mobile admin panel

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

### Deploy to Hosting Services

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📝 Development Guide

### Coding Standards
- **TypeScript** - Always use TypeScript for type safety
- **Naming** - camelCase for variables/functions, PascalCase for components
- **Styling** - Bootstrap classes first, then custom CSS
- **Comments** - Document complex logic with JSDoc

### Creating a New Component
```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface Props {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  return (
    <div className="my-component">
      <h3>{title}</h3>
      <button onClick={onAction}>Click Me</button>
    </div>
  );
};
```

### API Calls Example
```typescript
import api from '../../services/api';

const fetchShops = async () => {
  try {
    const response = await api.get('/api/shops');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Using Context
```typescript
import { useAuth } from '../../context/AuthContext';

export const MyComponent = () => {
  const { isLoggedIn, user, logout } = useAuth();
  
  return (
    <div>
      {isLoggedIn && <p>Welcome, {user?.name}</p>}
    </div>
  );
};
```

### Environment Variables
```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module"**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**API calls returning 404**
```bash
# Check .env file has VITE_API_URL set correctly
# Ensure backend server is running
cat .env | grep VITE_API_URL
```

**Images not loading**
```bash
# Check browser console for CORS errors
# Verify backend image proxy is running
# Check image URLs are valid
```

---

## 📞 Support & Contributions

### Issues & Bugs
Report bugs in GitHub Issues with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device info

### Feature Requests
- Describe the feature clearly
- Explain the use case
- Include mockups/examples if possible

### Pull Requests
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

- **Frontend Lead** - @กิตติ เจียมอนุกูลกิจ
- **Backend Lead** - @ธนกฤตโชติประเสริฐ
- **UI/UX Design** - @ธนันธร 

---

## 🎉 Getting Help

- 📖 Check existing documentation
- 💬 Ask in team Slack/Discord
- 🐛 Search GitHub Issues
- 📧 Contact the team

---

**Last Updated:** March 2026  
**Version:** 1.0.0