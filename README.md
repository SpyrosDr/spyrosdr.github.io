# My Resume Website

This is my personal resume site built using HTML/CSS and deployed via [GitHub Pages](https://pages.github.com/).

- 💻 Built with: [HTML5 UP](https://html5up.net/) and [CODEPEN](https://codepen.io/)
- 🌐 Hosted at: github.io/
- 🔐 Password gate powered by **Firebase Realtime Database**
  
---

## 🔧 Technologies Used

- **HTML5/CSS3** – static layout and styles
- **JavaScript** – password input logic, animations
- **Firebase Realtime Database** – stores the shared password securely
- **GitHub Pages** – hosting the static site

---

## 🔐 Authentication Flow

1. User lands on `/` (landing page)
2. Enters a password into a secure input field
3. Password is checked against Firebase Realtime Database
4. If valid, the user is redirected to `/welcome`
5. `sessionStorage` is used for in-page auth state

---
