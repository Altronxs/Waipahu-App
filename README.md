

Readme · MD
# Waipahu High School App
 
A mobile app built for Waipahu High School students, staff, and families. Originally prototyped in HTML/CSS by past seniors, and rebuilt from the ground up in **React Native + Expo** with a modernized UI, native navigation, and expanded functionality.
 
<!-- Optional: add a screenshot or banner here -->
<!-- ![App Screenshot](./assets/images/whs-home.png) -->
 
## 📱 About
 
**WaipahuHighSchoolApp** is a student hub that brings together the information students and staff need most — schedules, campus navigation, news, clubs, and more — in one native mobile app. It builds on the vision of the original web prototype created by previous senior classes, reimagined with a polished UI and a more maintainable codebase.
 
## ✨ Features
 
- 🏠 **Home** — landing screen with quick access to key info
- 🎓 **Students** — student-facing resources and info hub
- 🗺️ **Campus Map** — interactive map of the WHS campus (`react-native-maps`)
- 🔔 **Bell Schedule** — daily class period times
- 🍽️ **Cafe** — cafeteria menu
- 📅 **Calendar** — school events and important dates
- 📰 **News** — school announcements and news
- 🏈 **Athletics** — sports info
- 🎭 **Clubs** — clubs & organizations directory
- 📋 **Registrar** — registrar info/resources
- ☎️ **Contacts** — school contact directory
- 🎯 **Vision** — school vision/mission info
- 👤 **Author** — credits/about page
## 🛠️ Tech Stack
 
- **[Expo](https://expo.dev/)** (SDK 57) — build, run, and deploy tooling
- **[React Native](https://reactnative.dev/)** 0.86 + **React** 19
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — file-based routing
- **NativeTabs** (`expo-router/unstable-native-tabs`) — native bottom tab bar
- **[NativeWind](https://www.nativewind.dev/)** + Tailwind CSS — utility-first styling
- **[react-native-maps](https://github.com/react-native-maps/react-native-maps)** — interactive campus map
- **@react-navigation** (bottom-tabs, native, elements)
- **TypeScript**
- **Expo Google Fonts** — Barlow Semi Condensed, Noto Serif, Roboto, Source Serif Pro
- **EAS** — build/deployment configuration (`eas.json`)
- **ESLint** (`eslint-config-expo`)
## 🚀 Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your phone, or an iOS/Android simulator
- Since this project uses `expo-dev-client` and native modules (e.g. `react-native-maps`), a [development build](https://docs.expo.dev/develop/development-builds/introduction/) is recommended over plain Expo Go for full functionality
### Installation
 
1. Clone the repository
```bash
   git clone https://github.com/Altronxs/Waipahu-App.git
   cd Waipahu-App
```
 
2. Install dependencies
```bash
   npm install
```
 
3. Start the development server
```bash
   npx expo start
```
 
4. Open the app
   - Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS), or
   - Press `i` for iOS simulator / `a` for Android emulator in the terminal
   - Or run natively: `npm run ios` / `npm run android`
### Linting
 
```bash
npm run lint
```
 
## 📂 Project Structure
 
```
Waipahu-App/
├── app/                      # Expo Router screens (file-based routing)
│   ├── (tabs)/                # Bottom tab screens
│   │   ├── index.tsx           # Home
│   │   ├── student.tsx         # Students
│   │   ├── map.tsx             # Campus Map
│   │   └── _layout.tsx         # NativeTabs navigation config
│   ├── _layout.tsx             # Root layout
│   ├── athletics.tsx
│   ├── author.tsx
│   ├── bell.tsx                 # Bell schedule
│   ├── cafe.tsx
│   ├── calendar.tsx
│   ├── clubs.tsx
│   ├── contacts.tsx
│   ├── news.tsx
│   ├── registrar.tsx
│   ├── vision.tsx
│   └── legacy.tsx               
├── assets/
│   ├── images/                  # Icons, backgrounds, campus/map assets
│   ├── json/                    # clubData, mapdata, calendar, school_schedule
│   └── pdf/                     # Campus map PDF
├── app.json                    # Expo app configuration
├── eas.json                    # EAS build configuration
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── package.json
```
 
## 🤝 Contributing
 
This project welcomes contributions from Waipahu High School students, alumni, and staff.
 
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
## 🙏 Credits
 
- **Original prototype**: Designed and built in HTML/CSS by previous Waipahu High School seniors
- **React Native/Expo rebuild, navigation, and UI redesign**: [Kyle Baldovi] ([@Altronxs](https://github.com/Altronxs))

## 📄 License
 
This project is maintained for Waipahu High School. License TBD.
 
## 📬 Contact
 
Questions or feedback? Reach out at kyleboy1010@gmail.com.
 

