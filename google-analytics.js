<!-- Global site tag (gtag.js) - Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SCYYD46HMR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SCYYD46HMR', {
    page_title: 'Board Bazaar - Professional Signage Solutions',
    page_location: window.location.href,
    custom_map: {'custom_parameter_1': 'signage_type'}
  });

  // Track page views for all pages
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href
  });

  // Track contact form submissions
  function trackContactFormSubmission() {
    gtag('event', 'contact_form_submission', {
      event_category: 'engagement',
      event_label: 'contact_page',
      value: 1
    });
  }

  // Track phone number clicks
  function trackPhoneCall(phoneNumber) {
    gtag('event', 'phone_click', {
      event_category: 'interaction',
      event_label: phoneNumber,
      value: 1
    });
  }

  // Track WhatsApp clicks
  function trackWhatsAppClick() {
    gtag('event', 'whatsapp_click', {
      event_category: 'social',
      event_label: 'whatsapp_button',
      value: 1
    });
  }

  // Track Instagram clicks
  function trackInstagramClick() {
    gtag('event', 'instagram_click', {
      event_category: 'social',
      event_label: 'instagram_profile',
      value: 1
    });
  }

  // Track email clicks
  function trackEmailClick() {
    gtag('event', 'email_click', {
      event_category: 'interaction',
      event_label: 'email_address',
      value: 1
    });
  }
</script>