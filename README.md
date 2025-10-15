# TripKit Mobile App

> React Native mobile application for TripKit - Your complete travel companion

[![React Native](https://img.shields.io/badge/React%20Native-0.82-blue.svg)](https://reactnative.dev/)
[![iOS](https://img.shields.io/badge/iOS-13+-black.svg)](https://www.apple.com/ios/)
[![Android](https://img.shields.io/badge/Android-6.0+-green.svg)](https://www.android.com/)

🚧 **Status:** In Development

---

## About

TripKit mobile app is the frontend for the TripKit travel companion platform. It helps groups manage expenses, itineraries, and documents for their trips.

**Core Features:**

- 💰 **Expense Tracking** - Quick expense logging with auto-split
- 📅 **Itinerary Management** - Daily schedules and activities
- 📎 **Document Storage** - Keep travel docs accessible
- 🌍 **Multi-Currency** - Switch currencies on the go
- 👥 **Real-time Collaboration** - Everyone stays in sync

---

## Screenshots

*Coming soon - Screenshots will be added as features are developed*

---

## Tech Stack

- React Native 0.82
- React Navigation (for routing)
- Axios (API calls)
- AsyncStorage (local data)
- JWT Authentication

---

## Backend API

This app connects to the TripKit Rails API backend.

**Repository:** [github.com/lmagsino/tripkit-api](https://github.com/lmagsino/tripkit-api)

**Local Development:** `http://localhost:3000/api/v1`

---

## Prerequisites

- Node.js 20+
- npm or yarn
- Xcode 16+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)
- Watchman

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install iOS pods

```bash
cd ios
pod install
cd ..
```

### 3. Configure API endpoint

Create a `.env` file in the root directory:

```
API_URL=http://localhost:3000/api/v1
```

### 4. Start Metro bundler

```bash
npm start
```

### 5. Run on iOS

In a new terminal:
```bash
npm run ios
```

### 6. Run on Android

```bash
npm run android
```

---

## Project Structure

```
TripKitApp/
├── src/
│   ├── screens/         # Screen components
│   ├── components/      # Reusable components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API services
│   ├── utils/           # Helper functions
│   └── constants/       # Constants and config
├── ios/                 # iOS native code
├── android/             # Android native code
└── App.tsx              # Root component
```

---

## Development Status

**Completed:**
- ✅ Project setup
- ✅ iOS simulator running

**In Progress:**
- 🔄 Authentication screens
- 📋 Navigation setup
- 📋 API integration

**Planned:**
- 📋 Trip management
- 📋 Expense tracking UI
- 📋 Itinerary screens
- 📋 Document management
- 📋 Settlement views

**Target completion:** December 2025

---

## Testing

Make sure the backend API is running before testing the mobile app:

```bash
# In the backend repository
cd ../tripkit-api
rails server
```

Then run the mobile app and it will connect to `http://localhost:3000`

---

**Backend API:** [github.com/lmagsino/tripkit-api](https://github.com/lmagsino/tripkit-api)
