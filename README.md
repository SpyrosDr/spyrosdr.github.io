# 📄 My Resume Website

A minimalist **personal resume website**, built with **HTML5 UP templates** and enhanced with **Firebase password protection** for private access. Deployed via **GitHub Pages**.

---

## 🌟 Features

- **Sleek & Responsive Design** — Leveraging [HTML5 UP](https://html5up.net/) templates for modern aesthetics.
- **Password-Protected Access** — Secure landing page that requires a password (checked via Firebase Realtime Database) before accessing content.
- **Client-Side Authentication** — Lightweight JavaScript handles the auth flow using `sessionStorage`.
- **Deployed on GitHub Pages** — Free, fast, and easy to maintain.

---

## 🏗️ Technologies Used

| Technology                | Purpose                                   |
|---------------------------|-------------------------------------------|
| **HTML5 / CSS3**           | Static website structure and styling     |
| **JavaScript**             | Password input logic, animations         |
| **Firebase Realtime DB**   | Stores shared password securely          |
| **GitHub Pages**           | Static website hosting                   |

---

## 🔐 Authentication Flow

1. **Landing Page (`/`)** — User is prompted for a password.
2. **Password Input** — User enters password; JavaScript fetches password hash from Firebase.
3. **Validation Check** — If correct, the user is redirected to `/welcome`.
4. **Session Persistence** — Uses `sessionStorage` to maintain authentication across the session.
5. **Fallback** — If the session expires, user is redirected back to `/`.

---

## 🚀 Deployment Guide

### 1. Clone the Repository
git clone https://github.com/SpyrosDr/spyrosdr.github.io
cd spyrosdr.github.io

### 2. Setup Firebase Realtime Database
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (or use an existing one).
3. Navigate to **Realtime Database** → **Create Database**.
4. Choose the location and start in **Test Mode** (you can tighten security later).
5. Add a simple structure like:
    ```json
    {
      "auth": {
        "password": "your-secret-password"
      }
    }
    ```
6. Go to **Project Settings** → **General** → **Your Apps** and add a **Web App**.
7. Copy the Firebase config snippet provided.

### 3. Update Firebase Config in `main.js`
Open your project’s `main.js` and replace the Firebase configuration with your own:
```javascript
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR-PROJECT.firebaseio.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 ```
Make sure the database path and the key in your authentication fetch logic match /auth/password.

### 4. Deploy via GitHub Pages

### 🙌 Credits
-HTML5 UP — For the free, beautifully designed HTML/CSS templates.

-Firebase Realtime Database — For lightweight, real-time data storage used in the password gate.

-GitHub Pages — For free static hosting directly from the repository.

-CodePen — For quick prototyping and code snippets used in building UI components.
