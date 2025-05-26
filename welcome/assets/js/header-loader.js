// First check if user is authenticated (using sessionStorage)
if (sessionStorage.getItem('authenticated') !== 'true') {
  // ❌ Not authenticated — redirect to main page
  window.location.href = '/';
} else {
  // ✅ Authenticated — load header content from Firebase
  firebase.database().ref('headerContent').once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      const container = document.getElementById('header-content');
      if (data && container) {
        container.innerHTML = `
          <h1>${data.title}</h1>
          <p>${data.paragraph}</p>
        `;
      }
    })
    .catch((error) => {
      console.error('❌ Failed to load header content:', error);
    });
}
