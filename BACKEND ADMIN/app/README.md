# PilgrimPath - Ujjain Simhastha App

A comprehensive digital platform for pilgrims attending the Ujjain Simhastha, providing navigation, booking, emergency services, and real-time crowd monitoring.

## Features

- **Multi-language Support** (English/Hindi)
- **Real-time Navigation** with crowd density monitoring
- **Booking System** for accommodations and transportation
- **Emergency Services** with quick access to authorities
- **AI-powered Chat Assistant** for personalized guidance
- **Report System** for incidents and feedback
- **Gallery** for sharing experiences
- **Admin Dashboard** for crowd monitoring and incident management

## Project Structure

This project contains two main applications:
- **`app/`** - Main user-facing application
- **`admin/`** - Admin dashboard for monitoring and management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Google Gemini API key (for AI features)

## How to Run This Project

### 1. Setup User App

```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Create environment file
# Create a .env file in the app folder and add:
VITE_API_KEY=your_google_gemini_api_key_here

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/` (or next available port)

### 2. Setup Admin Dashboard

```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Start development server
npm run dev
```

The admin dashboard will be available at `http://localhost:5174/` (or next available port)

### 3. Environment Configuration

Create a `.env` file in the `app` directory:
```
VITE_API_KEY=your_google_gemini_api_key_here
```

**Note:** Replace `your_google_gemini_api_key_here` with your actual Google Gemini API key.

## Available Scripts

### User App (`app/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Admin Dashboard (`admin/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Maps:** React Leaflet
- **AI:** Google Gemini API
- **Animations:** Framer Motion (admin)

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your `.env` file is in the `app` folder with the correct variable name `VITE_API_KEY`

2. **Port Already in Use**: The app will automatically find the next available port. Check the terminal output for the correct localhost URL.

3. **Missing Dependencies**: Run `npm install` in both `app` and `admin` directories.

4. **Tailwind Not Working**: Restart the development server after making changes to Tailwind configuration.

### Browser Console Errors

- If you see "Failed to load module" errors, ensure you have a stable internet connection for CDN resources.
- For "Cannot find React" errors, clear your browser cache and restart the dev server.

## Development Notes

- The app uses Vite's import maps for external dependencies
- Tailwind CSS is configured with custom animations
- The project supports both English and Hindi languages
- AI chat features require a valid Google Gemini API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in both user and admin apps
5. Submit a pull request

## License

This project is licensed under the MIT License.
