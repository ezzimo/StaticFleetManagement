// Smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Track Sign-Up button clicks (this logs to the console, for tracking in Google Analytics if needed)
function trackSignUpClick(buttonId) {
  console.log(`Sign Up button clicked: ${buttonId}`);
  if (window.gtag) {
    gtag('event', 'sign_up_click', {
      'event_category': 'engagement',
      'event_label': buttonId
    });
  }
}

// Attach event listeners to all sign-up buttons
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', function () {
    trackSignUpClick(button.id || 'SignUp');
  });
});

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateForm()) {
        submitForm(form);
      } else {
        console.log('Form validation failed');
      }
    });
  }
});

// Submit form using fetch
function submitForm(form) {
  const scriptURL = 'https://forms.gle/GS5AawkTSEGxtLxp6';
  const formData = new FormData(form);

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = 'Envoi en cours...';

  fetch(scriptURL, { 
    method: 'POST', 
    body: formData 
  })
  .then(response => {
    // Success handling
    alert('Merci ! Votre message a été envoyé.');
    form.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = 'Envoyer';
  })
  .catch(error => {
    // Error handling
    console.error('Error!', error.message);
    alert('Une erreur s\'est produite. Veuillez réessayer.');
    submitButton.disabled = false;
    submitButton.innerHTML = 'Envoyer';
  });
}

// Validate form fields
function validateForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll('#contact-form .form-control');
  
  requiredFields.forEach(field => {
    if (field.value.trim() === '') {
      isValid = false;
      field.classList.add('is-invalid');
      
      // Check if the error message container exists, if not, create it
      let errorMessage = field.nextElementSibling;
      if (!errorMessage || !errorMessage.classList.contains('invalid-feedback')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('invalid-feedback');
        field.parentNode.appendChild(errorMessage);
      }
      errorMessage.textContent = 'Ce champ est requis.';
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      
      // Remove the error message if present
      const errorMessage = field.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains('invalid-feedback')) {
        errorMessage.textContent = '';
      }
    }
  });
  
  return isValid;
}

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll("img.lazy");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    observer.observe(img);
  });
});