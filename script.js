window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password-input');
  const toggleLink = document.getElementById('toggle-password');
  const MAX_LENGTH = 16;
  
  if (!passwordInput) return console.error("❌ Missing #password-input");

  // ✅ Already authenticated? Show resume immediately
  if (sessionStorage.getItem('authenticated') === 'true') {
    window.location.href = '/welcome';
    return;
  }


  // ✅ Ripple effect on typing
  passwordInput.addEventListener('input', () => {
    showKeyCircle();

    if (passwordInput.value.length >= MAX_LENGTH) {
      failAndReset();
    }
  });

  // ✅ Handle Enter key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      const typed = passwordInput.value.trim();
      if (!typed) return;

      console.log('🔐 ENTER pressed, checking password...');

      firebase.database().ref('auth/sharedPassword').once('value').then(snapshot => {
        const correctPassword = snapshot.val();

        if (typed === correctPassword) {
          sessionStorage.setItem('authenticated', 'true');
          status("success");

          setTimeout(() => {
             window.location.href = '/welcome';
          }, 2000);
        } else {
          failAndReset();
        }
      }).catch(error => {
        console.error('❌ Firebase error:', error);
        failAndReset();
      });
    }
  });

  // Toggle show/hide password
  if (toggleLink) {
    toggleLink.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      toggleLink.textContent = isHidden ? 'Hide' : 'Show';
    });
  }


  // ✅ Ripple animation
  function showKeyCircle() {
    const rect = passwordInput.getBoundingClientRect();
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = (rect.left + rect.width / 2) + 'px';
    circle.style.top = (rect.top + rect.height / 2) + 'px';
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 1000);
  }

  // ✅ Status transitions
  function status(state) {
    document.body.className = state || 'ready';

    const uiElements = ['logo', 'password-input', 'toggle-password'];
    uiElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (state === 'success' || state === 'error') ? 'none' : '';
    });

    const error = document.getElementById('error');
    const success = document.getElementById('success');
    if (error) error.style.display = (state === 'error') ? 'block' : 'none';
    if (success) success.style.display = (state === 'success') ? 'block' : 'none';
  }

  // ✅ Reset form
  function failAndReset() {
    status("error");
    setTimeout(() => reset(), 1200);
  }

  function reset() {
    passwordInput.value = '';
    document.body.className = 'ready';

    ['logo', 'password-input', 'toggle-password'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });

    const error = document.getElementById('error');
    const success = document.getElementById('success');
    if (error) error.style.display = 'none';
    if (success) success.style.display = 'none';
  }
});