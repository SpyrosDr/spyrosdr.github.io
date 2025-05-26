// First check if user is authenticated (using sessionStorage)
if (sessionStorage.getItem('authenticated') !== 'true') {
  // ❌ Not authenticated — redirect to main page
  window.location.href = '/';
} else {
  // ✅ Authenticated — load header content from Firebase
  firebase.database().ref('secureContent').once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      // 🔁 Map keys from Firebase to HTML element IDs
      const contentMap = {
        name: 'name',             // <h1 id="name"></h1>
        message: 'message',     // <p id="message"></p>
        phone: 'phone',             // <span id="phone"></span>
        email: 'email',             // <span id="email"></span>
        location: 'location',       // <span id="location"></span>
        greeting: 'greeting',       // <p id="greeting"></p>
        cv: 'cvtext',               // <div id="cvtext"></div>
        // Add more as needed
      };

      // 🔁 Loop through and update elements
      Object.entries(contentMap).forEach(([key, elementId]) => {
        const el = document.getElementById(elementId);
        if (el && data[key]) {
          el.textContent = data[key];
        }
      });

      // 🔁 Optional: innerHTML for header section if needed
      const header = document.getElementById('header-content');
      if (header && data.title && data.paragraph) {
        header.innerHTML = `
          <h1>${data.title}</h1>
          <p>${data.paragraph}</p>
        `;
      }

    })
    .catch((error) => {
      console.error('❌ Failed to load secure content:', error);
    });
}
