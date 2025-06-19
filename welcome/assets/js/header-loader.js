// Wrapping code inside DOMContentLoaded event so that JS doesnt't run before the HTML is ready
document.addEventListener("DOMContentLoaded", () => {
  // First check if user is authenticated (using sessionStorage)
  if (sessionStorage.getItem('authenticated') !== 'true') {
    // ❌ Not authenticated — redirect to main page
    window.location.href = '/';
  } else {
    // ✅ Authenticated — load header content from Firebase
    firebase.database().ref('secureContent').once('value')
      .then((snapshot) => {
        let data = snapshot.val();
      
        console.log('🔍 Raw data from Firebase:', data);
        console.log('📦 Type of data:', typeof data);

        try {
          if (typeof data === 'string') {
            data = JSON.parse(data);
            console.log('✅ Parsed Firebase string into object');
          }
        } catch (err) {
          console.error('❌ Failed to parse Firebase data:', err);
          return;
        }

        if (!data) return;

        // 🔁 Map keys from Firebase to HTML element IDs
        const contentMap = {
          name: 'name',             // <span id="name"></span>
          message: 'message',     // <span id="message"></span>
          phone: 'phone',             // <span id="phone"></span>
          email: 'email',             // <span id="email"></span>
          image1des: 'image1des',
          aboutmetitle1: 'aboutmetitle1',
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
          aboutme43: 'aboutme43',
          aboutmetitle5: 'aboutmetitle5',
          aboutme51: 'aboutme51',
          cv_1_00: 'cv_1_00',
          cv_2_00: 'cv_2_00',
          cv_2_01: 'cv_2_01',
          cv_2_02: 'cv_2_02',
          cv_2_03: 'cv_2_03',
          cv_2_04: 'cv_2_04',
          cv_2_05: 'cv_2_05',
          cv_2_06: 'cv_2_06',
          cv_2_07: 'cv_2_07',
          cv_2_08: 'cv_2_08',
          cv_2_09: 'cv_2_09',
          cv_2_10: 'cv_2_10',
          cv_2_11: 'cv_2_11',
          cv_2_12: 'cv_2_12',
          cv_2_13: 'cv_2_13',
          cv_2_14: 'cv_2_14',
          cv_2_15: 'cv_2_15',
          cv_2_16: 'cv_2_16',
          cv_2_17: 'cv_2_17',
          cv_2_18: 'cv_2_18',
          cv_2_19: 'cv_2_19',
          cv_2_20: 'cv_2_20',
          cv_2_21: 'cv_2_21',
          cv_2_22: 'cv_2_22',
          cv_2_23: 'cv_2_23',
          cv_2_24: 'cv_2_24',
          cv_2_25: 'cv_2_25',
          cv_2_26: 'cv_2_26',
          cv_2_27: 'cv_2_27',
          cv_2_28: 'cv_2_28',
          cv_2_29: 'cv_2_29',
          cv_2_30: 'cv_2_30',
          cv_2_31: 'cv_2_31',
          cv_2_32: 'cv_2_32',
          cv_2_33: 'cv_2_33',
          cv_2_34: 'cv_2_34',
          cv_2_35: 'cv_2_35',
          cv_2_36: 'cv_2_36',
          cv_3_00: 'cv_3_00',
          cv_3_01: 'cv_3_01',
          cv_3_02: 'cv_3_02',
          cv_3_03: 'cv_3_03',
          cv_3_04: 'cv_3_04',
          cv_3_05: 'cv_3_05',
          cv_3_06: 'cv_3_06',
          cv_3_07: 'cv_3_07',
          cv_3_08: 'cv_3_08',
          cv_3_09: 'cv_3_09',
          cv_3_10: 'cv_3_10',
          cv_3_11: 'cv_3_11',
          cv_3_12: 'cv_3_12',
          cv_3_13: 'cv_3_13',
          cv_3_14: 'cv_3_14',
          cv_3_15: 'cv_3_15',
          cv_3_16: 'cv_3_16',
          cv_3_17: 'cv_3_17',
          cv_3_18: 'cv_3_18',
          cv_3_19: 'cv_3_19',
          cv_3_20: 'cv_3_20',
          cv_3_21: 'cv_3_21',
          cv_3_22: 'cv_3_22',
          cv_3_23: 'cv_3_23',
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
          //If the conditions aren't split it's harder to troubleshoot
          if (!data[key]) {
            console.warn(`⚠️ Firebase data missing for key: ${key}`);
            return;
          }
          if (!elements.length) {
            console.warn(`⚠️ No elements found with class: ${className}`);
            return;
          }
          elements.forEach(el => {
            if (typeof data[key] === 'object' && data[key].url && data[key].text) {
              el.innerHTML = `<a href="${data[key].url}" target="_blank" rel="noopener">${data[key].text}</a>`;
            } else {
              el.innerHTML = data[key];
            }
            console.log(`✅ Injected ${key} into .${className}`);
          });
        });

        // 🔁 Optional: innerHTML for header section if needed
        const header = document.getElementById('header-content');
        if (header && data.title && data.paragraph) {
          header.innerHTML = `
            <h1>${data.title}</h1>
            <p>${data.paragraph}</p>
        ` ;
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

//The foollowing closes the DOMContentLoaded event  
});  
                          
