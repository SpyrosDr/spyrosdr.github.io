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
        name: 'name',             // <span id="name"></span>
        message: 'message',     // <span id="message"></span>
        phone: 'phone',             // <span id="phone"></span>
        email: 'email',             // <span id="email"></span>
        image1des: 'image1des',
        aboutme1: 'aboutme1',
        aboutmetitle2: 'aboutmetitle2',
        aboutme2: 'aboutme2',
        aboutmetitle3: 'aboutmetitle3',
        aboutme31: 'aboutme31',
        aboutme32: 'aboutme32',
        aboutme33: 'aboutme33',
        aboutmetitle4: 'aboutmetitle4',
        aboutme41: 'aboutme41',
        aboutme42: 'aboutme42',
        aboutme43: 'aboutme43'
        // Add more as needed
      };

      // 🔁 Loop through and update elements IDs
      //Object.entries(contentMap).forEach(([key, elementId]) => {
        //const el = document.getElementById(elementId);
        //if (el && data[key]) {
          //el.innerHTML = data[key];
        //}
      //});
      
      // 🔁 Loop through and update elements Classes
      Object.entries(contentMap).forEach(([key, className]) => {
        const elements = document.querySelectorAll(`.${className}`);
        if (!elements.length || !data[key]) {
          console.warn(`⚠️ Missing: class=${className}, data[${key}]`);
          return;
        }
        elements.forEach(el => {
          el.innerHTML = data[key];
          console.log(`✅ Injected ${key} into .${className}`);
        });
      });

      // 🔁 Optional: innerHTML for header section if needed
      const header = document.getElementById('header-content');
      if (header && data.title && data.paragraph) {
        header.innerHTML = `
          <h1>${data.title}</h1>
          <p>${data.paragraph}</p>
        `;
      }

      // ✅ Update contact links once data is available
      if (data.phone) {
        document.getElementById('call-button')?.setAttribute('href', `tel:${data.phone}`);
      }
      if (data.email) {
        document.getElementById('email-button')?.setAttribute('href', `mailto:${data.email}`);
      }

    })
    .catch((error) => {
      console.error('❌ Failed to load secure content:', error);
    });
}
