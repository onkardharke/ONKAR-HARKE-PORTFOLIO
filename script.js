$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  
    // Update the active section in the header
    updateActiveSection();
  });

  // Mobile Menu Toggle
  $(".menu_icon").click(function() {
    $(".navbar").toggleClass("active");
  });

  // Smooth scrolling for navigation links
  $(".header ul li a").click(function(e) {
    e.preventDefault(); 

    var target = $(this).attr("href");

    // Close mobile menu on click if active
    $(".navbar").removeClass("active");

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0 
        },
        500
      );
    } else {
      var $targetElement = $(target);
      if ($targetElement.length) {
        var offset = $targetElement.offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing js via ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact form submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          msg.innerHTML = "Message sent successfully";
          setTimeout(function () {
            msg.innerHTML = "";
          }, 5000);
          form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });
  }

});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through both sections and the home element to update active class
  $("section, .FirstElement").each(function() {
    var target = $(this).attr("id");
    var $element = $(this);
    
    if (target && $element.length) {
      var offset = $element.offset().top;
      var height = $element.outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    }
  });
}
