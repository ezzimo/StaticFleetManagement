// Smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Track button clicks for analytics (e.g., Google Analytics)
function trackSignUpClick(buttonId) {
  console.log(`Sign Up button clicked: ${buttonId}`);
  if (window.gtag) {
    gtag('event', 'sign_up_click', {
      'event_category': 'engagement',
      'event_label': buttonId
    });
  }
}

// Attach click tracking to all primary buttons
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', function () {
    trackSignUpClick(button.id || 'SignUp');
  });
});

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
