# 🕉️ Ujjain360 - Digital Pilgrimage Platform



A comprehensive digital platform for the **Ujjain Simhastha** pilgrimage festival, featuring real-time navigation, AI-powered assistance, multilingual support, and admin management capabilities.

## 🌟 Features

- **🗺️ Real-time Navigation** - Interactive maps with crowd monitoring and AI-optimized routes
- **🤖 AI Chatbot** - Multilingual assistant powered by Google Gemini AI
- **📱 Mobile-First Design** - Responsive interface for all devices
- **🌍 Multilingual Support** - English, Hindi, and Tamil translations
- **🚨 Emergency Services** - SOS functionality and incident reporting
- **📊 Admin Dashboard** - Real-time analytics and report management
- **🎫 Booking System** - Transport and accommodation reservations
- **🎨 Modern UI/UX** - Clean, intuitive interface with dark mode support

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 + TypeScript 5.8.2
- **Build Tool**: Vite 6.3.6
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet 5.0.0
- **AI**: Google Gemini AI 1.17.0
- **Charts**: Recharts 3.2.0
- **Animations**: Framer Motion 12.23.12
- **Icons**: Lucide React 0.542.0

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

### Installation & Setup

#### Option 1: Download ZIP File (Recommended for beginners)

1. **Download the Project**
   - Go to the GitHub repository
   - Click the green **"Code"** button
   - Select **"Download ZIP"**
   - Extract the ZIP file to your desired location

2. **Navigate to Project Directory**
   ```bash
   # Open terminal/command prompt and navigate to the extracted folder
   cd path/to/extracted/ujain-folder
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration (Optional)**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Google Gemini AI API Key (Optional - Demo mode works without it)
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Development Configuration
   VITE_APP_MODE=development
   VITE_API_BASE_URL=http://localhost:3000
   ```

   **Note**: The app works in demo mode without the Gemini API key. To get a free API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an account and generate an API key
   - Add it to your `.env.local` file

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   
   The app will be available at:
   ```
   http://localhost:5173/
   ```
   (Port may vary if 5173 is in use - check terminal output)

#### Option 2: Using Git Clone

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ujain
   ```

2. **Follow steps 3-6 from Option 1 above**

### Troubleshooting Common Issues

**Issue: `npm install` fails**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

**Issue: Port already in use**
```bash
# The app will automatically find an available port
# Check terminal output for the correct URL
```

**Issue: Permission denied on Windows**
```bash
# Run command prompt as Administrator
# Or use PowerShell with execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🏗️ Project Structure

```
ujain/
├── 📁 components/          # Reusable UI components
│   ├── BottomNav.tsx      # Mobile navigation
│   ├── ChatModal.tsx      # AI chatbot interface
│   ├── Header.tsx         # App header
│   ├── Sidebar.tsx        # Desktop navigation
│   └── ...
├── 📁 pages/              # Application pages
│   ├── HomePage.tsx       # Main dashboard
│   ├── NavigationPage.tsx # Maps & navigation
│   ├── BookingPage.tsx    # Booking system
│   ├── EmergencyPage.tsx  # Emergency services
│   ├── ReportPage.tsx     # Incident reporting
│   └── ...
├── 📁 services/           # Backend services
│   ├── aiService.ts       # AI chatbot logic
│   ├── adminDataService.ts # Admin data management
│   └── geminiClient.ts    # Google AI integration
├── 📁 hooks/              # Custom React hooks
├── 📁 admin/              # Admin dashboard (separate app)
├── App.tsx                # Main application component
├── i18n.ts               # Internationalization
├── constants.ts          # App configuration
└── types.ts              # TypeScript definitions
```

## 🌐 Admin Dashboard

The project includes a separate admin dashboard for managing the platform:

### Running the Admin Dashboard

1. **Navigate to Admin Directory**
   ```bash
   cd admin
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Admin Server**
   ```bash
   npm run dev
   ```

4. **Access Admin Panel**
   ```
   http://localhost:5174/
   ```

### Admin Features
- **Real-time Analytics** - Live crowd metrics and incident tracking
- **Report Management** - Handle user reports and incidents
- **Crowd Monitoring** - Area-wise capacity management
- **Alert Broadcasting** - Emergency notifications
- **Performance Metrics** - System efficiency tracking

## 🎮 Usage Guide

### For Users
1. **Navigation**: Use the interactive map to find routes to temples and amenities
2. **Booking**: Reserve transport and accommodation through the booking system
3. **Emergency**: Access SOS services and report incidents
4. **Language**: Switch between English, Hindi, and Tamil
5. **AI Assistant**: Use the floating chat button for help and guidance

### For Administrators
1. **Login**: Access the admin dashboard with admin credentials
2. **Monitor**: Track real-time crowd levels and incidents
3. **Respond**: Manage and resolve user reports
4. **Analyze**: View performance metrics and trends
5. **Alert**: Broadcast emergency notifications

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

# Format code
npx prettier --write .
```

## 📝 Git Workflow

### Committing Changes

```bash
# Check current status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: add Tamil language support and admin integration"

# Push to repository
git push origin main
```

### Common Commit Types

```bash
# New features
git commit -m "feat: add multilingual chatbot support"

# Bug fixes
git commit -m "fix: resolve sidebar scrolling issue"

# Documentation updates
git commit -m "docs: update README with setup instructions"

# Style/UI improvements
git commit -m "style: improve responsive design for mobile"

# Refactoring code
git commit -m "refactor: optimize admin data service"

# Performance improvements
git commit -m "perf: optimize React component rendering"
```

### Branch Management

```bash
# Create new feature branch
git checkout -b feature/new-feature-name

# Switch between branches
git checkout main
git checkout feature/new-feature-name

# Merge feature branch
git checkout main
git merge feature/new-feature-name

# Delete completed feature branch
git branch -d feature/new-feature-name
```

## 🌍 Multilingual Support

The app supports three languages with complete translations:

- **English** - Default language
- **हिंदी (Hindi)** - Complete localization
- **தமிழ் (Tamil)** - Full translation support

Language switching is available in the sidebar and updates all UI elements in real-time.

## 📱 Responsive Design

- **Mobile-first** approach with touch-optimized controls
- **Tablet** support with adaptive layouts
- **Desktop** experience with sidebar navigation
- **PWA-ready** for mobile app-like experience

## 🔒 Security Features

- **Input validation** on all forms
- **XSS protection** with proper sanitization
- **CSRF protection** for admin actions
- **Rate limiting** on API endpoints
- **Secure headers** configuration

## 🎨 Team

- **Project Lead**: Sithick Sahil Ahamed
- **UX/UI Designer**: Parthiban
- **UX/UI Designer**: Surya Prassanna
- **Lead Developer**: Prasanna

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔗 Links

- **Live Demo**: [Ujjain360 Demo](https://your-demo-url.com)
- **Admin Panel**: [Admin Dashboard](https://your-admin-url.com)
- **API Documentation**: [API Docs](https://your-api-docs.com)

---

<div align="center">
  <p>Made with ❤️ for the Ujjain Simhastha</p>
  <p>🕉️ Har Har Mahadev 🕉️</p>
</div>
