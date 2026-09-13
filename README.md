Readme · MD
# Waipahu High School App
 
A mobile app built for Waipahu High School students, staff, and families. It started as an HTML/CSS prototype from past seniors, and has since been rebuilt from the ground up in **React Native + Expo** with a modernized UI, native navigation, and a lot more functionality.
 
<!-- Optional: add a screenshot or banner here -->
<!-- ![App Screenshot](./assets/images/whs-home.png) -->
 
## 📱 About
 
**WaipahuHighSchoolApp** is a student hub that brings together the information students and staff need most, schedules, campus navigation, news, clubs, and more, all in 1 native mobile app. It builds on the vision of the original web prototype that previous senior classes put together, just reimagined with a polished UI and a codebase that's actually maintainable.
 
## ✨ Features
 
- 🏠 **Home** — landing screen with quick access to key info
- 🎓 **Students** — student-facing resources and info hub
- 🗺️ **Campus Map** — interactive map of the WHS campus (`react-native-maps`)
- 🔔 **Bell Schedule** — daily class period times
- 🍽️ **Cafe** — cafeteria menu
- 📅 **Calendar** — school events and important dates
- 🎉 **Events** — upcoming school events feed
- 📰 **News** — school announcements and news
- 🏈 **Athletics** — sports info
- 🎭 **Clubs** — clubs & organizations directory
- 🏫 **Academy** — WHS's career academies (Arts & Communication, Health & Sciences, Industrial & Engineering Technology, Natural Resources, Professional Public Services)
- 📋 **Registrar** — registrar info/resources
- 👩‍🏫 **Staff** — embedded staff directory
- ☎️ **Contacts** — school contact directory
- 🎯 **Vision** — school vision/mission info
- 🏛️ **Legacy** — social media links for classes, sports teams, and student groups
- 👤 **Author** — credits/about page

## 📚 Wiki

For deeper docs, data file schemas, project structure, and why this app is built the way it is, check out the [Wiki](https://github.com/Altronxs/Waipahu-App/wiki):

- [Getting Started](https://github.com/Altronxs/Waipahu-App/wiki/Getting-Started)
- [Features](https://github.com/Altronxs/Waipahu-App/wiki/Features)
- [Project Structure](https://github.com/Altronxs/Waipahu-App/wiki/Project-Structure)
- [Data Files](https://github.com/Altronxs/Waipahu-App/wiki/Data-Files)
- [Tech Stack](https://github.com/Altronxs/Waipahu-App/wiki/Tech-Stack)
- [Why React Native + Expo](https://github.com/Altronxs/Waipahu-App/wiki/Why-React-Native-Expo)
- [Contributing](https://github.com/Altronxs/Waipahu-App/wiki/Contributing)
- [FAQ](https://github.com/Altronxs/Waipahu-App/wiki/FAQ)

## 🛠️ Tech Stack
 
- **[Expo](https://expo.dev/)** (SDK 57) — build, run, and deploy tooling
- **[React Native](https://reactnative.dev/)** 0.86 + **React** 19.2
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — file-based routing
- **NativeTabs** (`expo-router/unstable-native-tabs`) — native bottom tab bar
- **[NativeWind](https://www.nativewind.dev/)** + Tailwind CSS — utility-first styling
- **[react-native-maps](https://github.com/react-native-maps/react-native-maps)** — interactive campus map
- **react-native-webview** — embedded web content (e.g. Staff directory)
- **@react-navigation** (bottom-tabs, native, elements)
- **TypeScript**
- **Expo Google Fonts** — Barlow Semi Condensed, Noto Serif, Roboto, Source Serif Pro
- **EAS** — build/deployment configuration (`eas.json`)
- **ESLint** (`eslint-config-expo` via flat config, `eslint.config.js`)

> **Why Expo instead of native Swift?** I'm developing this on Windows with no Mac and no paid Apple Developer account, so Expo, and Expo Go specifically, was really the only practical path to shipping on iOS. See [Why React Native + Expo](https://github.com/Altronxs/Waipahu-App/wiki/Why-React-Native-Expo) for the full reasoning and what it cost me.

## 🚀 Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your phone, or an iOS/Android simulator
- This project uses `expo-dev-client` and native modules like `react-native-maps`, so a [development build](https://docs.expo.dev/develop/development-builds/introduction/) is recommended over plain Expo Go for full functionality
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
│   ├── (tabs)/                 # Bottom tab screens
│   │   ├── index.tsx            # Home
│   │   ├── student.tsx          # Students
│   │   ├── map.tsx              # Campus Map
│   │   └── _layout.tsx          # NativeTabs navigation config
│   ├── _layout.tsx             # Root layout
│   ├── academy.tsx             # Career academies info
│   ├── athletics.tsx
│   ├── author.tsx
│   ├── bell.tsx                 # Bell schedule
│   ├── cafe.tsx
│   ├── calendar.tsx
│   ├── clubs.tsx
│   ├── contacts.tsx
│   ├── events.tsx               # Upcoming events feed
│   ├── globals.css              # Tailwind/NativeWind global styles
│   ├── legacy.tsx               # Legacy classes/teams social links
│   ├── news.tsx
│   ├── registrar.tsx
│   ├── staff.tsx                # Embedded staff directory (WebView)
│   └── vision.tsx
├── assets/
│   ├── images/                  # Icons, backgrounds, campus/map assets
│   ├── json/                    # clubData, mapdata, calendar, school_schedule, eventService, schedule
│   └── pdf/                     # Campus map PDF
├── app.json                    # Expo app configuration
├── eas.json                    # EAS build configuration
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
├── eslint.config.js
├── nativewind-env.d.ts
├── tsconfig.json
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
 
- **Original prototype**: designed and built in HTML/CSS by previous Waipahu High School seniors
- **React Native/Expo rebuild, navigation, and UI redesign**: [Kyle Baldovi] ([@Altronxs](https://github.com/Altronxs))

## 📄 License
 
This project is licensed under the Apache License 2.0. See the `LICENSE` file for the full terms.
 
## 📬 Contact
 
Questions or feedback? Reach out at kyleboy1010@gmail.com.
