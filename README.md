# TripKit Mobile App

> React Native mobile application for TripKit - Your complete travel companion

[![React Native](https://img.shields.io/badge/React%20Native-0.82-blue.svg)](https://reactnative.dev/)
[![iOS](https://img.shields.io/badge/iOS-13+-black.svg)](https://www.apple.com/ios/)

🎉 **Status:** Ready for Beta Testing (v1.0)

**Platform:** iOS only (Android support planned for v2.0)

---

## About

TripKit mobile app is the frontend for the TripKit travel companion platform. It helps groups manage expenses, itineraries, and documents for their trips.

**Core Features:**

- 💰 **Expense Tracking** - Quick expense logging with auto-split
- 📅 **Itinerary Management** - Daily schedules and activities
- 📎 **Document Storage** - Keep travel docs accessible
- 🌍 **Multi-Currency** - Switch currencies on the go
- 👥 **Real-time Collaboration** - Everyone stays in sync
- 💸 **Smart Settlement** - See who owes whom instantly

---

## Screenshots

*Coming soon - Screenshots will be added after beta testing*

---

## Tech Stack

- React Native 0.82
- React Navigation (native stack)
- Axios (API calls)
- AsyncStorage (token storage)
- DateTimePicker (native date selection)
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
- Xcode 16+ (required for iOS)
- CocoaPods (required for iOS)
- Watchman
- macOS (required for iOS development)

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

### 3. Start Metro bundler

```bash
npm start
```

### 4. Run on iOS

In a new terminal:
```bash
npm run ios
```

---

## Features

### ✅ Completed (v1.0)

**Authentication:**
- Email/password signup and login
- JWT token management
- Secure password fields
- Auto logout

**Trip Management:**
- Create trips with native date pickers
- Join trips with invite codes
- View all your trips
- Trip dashboard with balance display
- Member count display
- Auto-refresh on navigation

**Expense Tracking:**
- Quick expense entry with categories
- Category icons (🚕 🍽️ 🏨 🎫 🛒)
- Total spent display
- Edit/delete expenses
- Equal or custom split
- Auto date picker
- Formatted dates
- Pull-to-refresh

**Settlement:**
- Who owes whom calculations
- Balance shown on dashboard
- Celebration when all settled
- Per-currency settlements

**Itinerary:**
- Add activities with native date/time pickers
- Daily schedule view
- Location and notes
- Category-based organization
- Pull-to-refresh

**Documents:**
- Document metadata tracking
- Document type categories
- Shared access
- Pull-to-refresh

**Polish:**
- Native iOS date pickers
- Logout functionality
- Empty states with icons
- Loading indicators
- App version footer
- Pull-to-refresh on all lists

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

## Known Limitations (v1.0)

- iOS only (no Android support yet)
- File upload for documents (metadata only for now)
- Mark individual expense splits as paid
- Profile/settings screen
- Push notifications
- Offline mode

These features are planned for v2.0.

---

## Development Roadmap

**v1.0** ✅ (Current - October 2024)
- All core features complete
- iOS support
- Ready for beta testing

**v1.1** (December 2024)
- Real-world testing feedback
- Bug fixes from December trip
- Performance improvements

**v2.0** (Q1 2025)
- Android support
- Actual file uploads
- Push notifications
- Offline support
- Enhanced UI/UX
- Profile/settings

---

**Backend API:** [github.com/lmagsino/tripkit-api](https://github.com/lmagsino/tripkit-api)

**Version:** 1.0.0  
**Last Updated:** October 2024