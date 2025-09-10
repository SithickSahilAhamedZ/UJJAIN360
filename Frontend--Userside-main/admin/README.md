# 🏛️ Ujjain360 Admin Dashboard



**Real-time admin dashboard for managing the Ujjain360 pilgrimage platform**

A comprehensive admin control panel for monitoring crowd levels, managing incidents, analyzing performance metrics, and overseeing the entire Ujjain Simhastha digital ecosystem.

## 🌟 Admin Features

- **📊 Real-time Analytics** - Live crowd metrics and performance dashboards
- **🚨 Incident Management** - Track, assign, and resolve user reports
- **👥 Crowd Monitoring** - Area-wise capacity management and alerts
- **📈 Performance Metrics** - System efficiency and response time tracking
- **🔔 Alert Broadcasting** - Emergency notifications and announcements
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🌙 Dark Mode Support** - Professional interface with theme options

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 + TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Charts**: Recharts 3.1.2
- **Animations**: Framer Motion 12.23.12
- **Icons**: Custom stroke icons and Lucide React

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**

### Installation & Setup

#### Option 1: Download ZIP File (Recommended for beginners)

1. **Download the Project**
   - Go to the GitHub repository
   - Click the green **"Code"** button
   - Select **"Download ZIP"**
   - Extract the ZIP file to your desired location

2. **Navigate to Admin Directory**
   ```bash
   # Open terminal/command prompt and navigate to the admin folder
   cd path/to/extracted/ujain-folder/admin
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration (Optional)**
   
   Create a `.env.local` file in the admin directory:
   ```bash
   # Admin Configuration
   VITE_APP_MODE=development
   VITE_API_BASE_URL=http://localhost:3001
   VITE_ADMIN_SECRET=your_admin_secret_key
   ```

5. **Start Admin Dashboard**
   ```bash
   npm run dev
   ```

6. **Open Admin Panel**
   
   The admin dashboard will be available at:
   ```
   http://localhost:5174/
   ```
   (Port may vary if 5174 is in use - check terminal output)

#### Option 2: Using Git Clone

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ujain/admin
   ```

2. **Follow steps 3-6 from Option 1 above**

### Running Both User App and Admin Dashboard

To run the complete system:

1. **Terminal 1 - User App**
   ```bash
   cd ujain
   npm install
   npm run dev
   # Runs on http://localhost:5173/
   ```

2. **Terminal 2 - Admin Dashboard**
   ```bash
   cd ujain/admin
   npm install
   npm run dev
   # Runs on http://localhost:5174/
   ```

## 🏗️ Admin Dashboard Structure

```
admin/
├── 📁 components/          # Admin UI components
│   ├── Navbar.tsx         # Admin navigation
│   ├── DashboardCard.tsx  # Metric cards
│   ├── KpiCard.tsx        # KPI displays
│   ├── Sidebar.tsx        # Admin sidebar
│   └── charts/            # Chart components
│       ├── BarChartComponent.tsx
│       ├── LineChartComponent.tsx
│       └── PieChartComponent.tsx
├── 📁 pages/              # Admin pages
│   ├── AnalyticsDashboard.tsx  # Main analytics
│   ├── CrowdMonitoring.tsx     # Crowd management
│   ├── IncidentManagement.tsx  # Report handling
│   ├── ReportManagement.tsx    # Report analytics
│   ├── BookingOverview.tsx     # Booking stats
│   └── AlertBroadcasting.tsx   # Alert system
├── App.tsx                # Main admin app
├── constants.tsx          # Admin configuration
└── types.ts              # TypeScript definitions
```

## 🎮 Admin Usage Guide

### Dashboard Overview
1. **Analytics Dashboard** - View real-time system performance
2. **Crowd Monitoring** - Monitor area capacity and crowd levels
3. **Incident Management** - Handle user reports and emergencies
4. **Report Management** - Analyze trends and generate insights
5. **Booking Overview** - Track reservations and availability
6. **Alert Broadcasting** - Send emergency notifications

### Key Admin Functions

**Real-time Monitoring:**
```
- Live crowd count tracking
- Incident status updates
- Response time metrics
- Area capacity management
```

**Report Management:**
```
- Assign incidents to team members
- Update report status
- Add resolution notes
- Track response times
```

**Analytics & Insights:**
```
- Performance trend analysis
- Area-wise incident reports
- User satisfaction metrics
- System efficiency tracking
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## 🔒 Admin Security Features

- **Role-based access control** for different admin levels
- **Secure authentication** for admin panel access
- **Input validation** on all admin forms
- **Audit logging** for admin actions
- **Session management** with timeout protection

## 🌍 Admin Responsive Design

- **Desktop-first** approach for comprehensive admin tools
- **Tablet support** with touch-optimized controls
- **Mobile admin** for emergency management on-the-go
- **Progressive enhancement** for feature-rich admin experience

## 📊 Data Integration

The admin dashboard integrates with:
- **User App Data** - Real-time report submissions
- **Analytics Service** - Performance metrics and trends
- **Notification System** - Alert broadcasting capabilities
- **Booking System** - Reservation and availability data

## 🚨 Troubleshooting Admin Issues

**Issue: Admin dashboard not loading**
```bash
# Check if user app is running first
cd ../
npm run dev

# Then start admin in new terminal
cd admin
npm run dev
```

**Issue: Data not updating**
```bash
# Restart both applications
# User app provides data to admin dashboard
```

**Issue: Port conflicts**
```bash
# Admin automatically finds available ports
# Check terminal output for correct URLs
```

## 🎨 Admin Team

- **Project Lead**: Sithick Sahil Ahamed
- **UX/UI Designer**: Parthiban
- **UX/UI Designer**: Surya Prassanna
- **Lead Developer**: Prasanna

## 📞 Admin Support

For admin-specific support:
- Check the main project documentation
- Review admin component documentation
- Contact the development team for access issues

## 🔗 Related Links

- **Main User App**: `http://localhost:5173/`
- **Admin Dashboard**: `http://localhost:5174/`
- **Main Project README**: `../README.md`

---

<div align="center">
  <p>🏛️ Administrative Control for Ujjain360</p>
  <p>🕉️ Managing the Digital Pilgrimage Experience 🕉️</p>
</div>
