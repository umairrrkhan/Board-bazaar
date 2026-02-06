(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyDQ-GgKmuI1Poo9Eogvv-_cnqpkuOYIqc8",
        authDomain: "board-bazaar.firebaseapp.com",
        projectId: "board-bazaar",
        storageBucket: "board-bazaar.firebasestorage.app",
        messagingSenderId: "627478213427",
        appId: "1:627478213427:web:866b467eaf520700ff8446",
        measurementId: "G-SCYYD46HMR"
    };

    if (!window.firebase) {
        const script1 = document.createElement('script');
        script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
        script1.onload = function() {
            const script2 = document.createElement('script');
            script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
            script2.onload = function() {
                initializeFirebase();
            };
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    } else {
        initializeFirebase();
    }

    function initializeFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    let initializedHandlers = new Set();

    function createContactForm(targetElement, options = {}) {
        const title = options.title || 'Get in Touch';
        const showHeader = options.showHeader !== false;
        const formId = options.formId || 'contactForm';

        const formHTML = `
            <div class="contact-info-card contact-form-card">
                ${showHeader ? `
                <div class="card-header">
                    <h2>${title}</h2>
                    <div class="card-decoration"></div>
                </div>
                ` : ''}
                <form id="${formId}" class="contact-form">
                    <div class="form-group">
                        <label for="name-${formId}">
                            <i class="fas fa-user"></i>
                            Your Name
                        </label>
                        <input type="text" id="name-${formId}" name="name" required placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone-${formId}">
                            <i class="fas fa-phone"></i>
                            Phone Number
                        </label>
                        <input type="tel" id="phone-${formId}" name="phone" required placeholder="Enter your phone number">
                    </div>
                    
                    <div class="form-group">
                        <label for="message-${formId}">
                            <i class="fas fa-comment-dots"></i>
                            Your Message
                        </label>
                        <textarea id="message-${formId}" name="message" rows="4" required placeholder="Tell us about your project requirements..."></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i>
                        Send Message
                    </button>
                    
                    <div id="formSuccess-${formId}" class="form-success">
                        <i class="fas fa-check-circle"></i>
                        Thank you! Your message has been sent successfully.
                    </div>
                    
                    <div id="formError-${formId}" class="form-error">
                        <i class="fas fa-exclamation-circle"></i>
                        Oops! Something went wrong. Please try again.
                    </div>
                </form>
            </div>
        `;

        targetElement.innerHTML = formHTML;
        initializeFormHandler(formId);
    }

    function initializeFormHandler(formId = 'contactForm') {
        if (initializedHandlers.has(formId)) return;
        
        const form = document.getElementById(formId);
        if (!form) return;

        initializedHandlers.add(formId);

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn') || this.querySelector('.luxury-submit-btn');
            const formSuccess = document.getElementById(`formSuccess-${formId}`);
            const formError = document.getElementById(`formError-${formId}`);
            
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            try {
                const formData = {
                    name: document.getElementById(`name-${formId}`).value,
                    phone: document.getElementById(`phone-${formId}`).value,
                    message: document.getElementById(`message-${formId}`).value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    status: 'new'
                };
                
                const db = firebase.firestore();
                await db.collection('contacts').add(formData);
                
                formSuccess.style.display = 'block';
                this.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                formError.style.display = 'block';
                formError.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message || 'Oops! Something went wrong. Please try again.'}`;
            } finally {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
                
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            }
        });
    }

    function createContactFormPopup(options = {}) {
        const buttonClass = options.buttonClass || 'contact-popup-btn';
        const buttonPosition = options.position || 'bottom-right';

        const existingPopup = document.getElementById('contactFormPopup');
        if (existingPopup) {
            existingPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return;
        }

        const popupHTML = `
            <div class="contact-form-popup-overlay" id="contactFormPopup">
                <div class="contact-form-popup-content">
                    <div class="contact-form-popup-header">
                        <h2>Get in Touch</h2>
                        <button class="contact-form-popup-close" id="closeContactForm">&times;</button>
                    </div>
                    <div class="contact-form-popup-body" id="contactFormContainer"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const overlay = document.getElementById('contactFormPopup');
        const closeBtn = document.getElementById('closeContactForm');
        const formContainer = document.getElementById('contactFormContainer');

        createContactForm(formContainer, { showHeader: false, formId: 'contactFormPopupForm' });

        const closePopup = () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                closePopup();
            }
        });

        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    window.ContactForm = {
        create: createContactForm,
        createPopup: createContactFormPopup,
        init: function(formId = 'contactForm') {
            initializeFormHandler(formId);
        }
    };

    window.dispatchEvent(new Event('ContactFormLoaded'));
})();
