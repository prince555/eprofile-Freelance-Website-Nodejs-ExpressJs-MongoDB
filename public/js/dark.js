(function($) { "use strict";

    $(document).ready(function() {
    $('body.hero-anime').removeClass('hero-anime');
  });

  //Switch light/dark
  
  $(".light, .dark").on('click', function () {
    if ($("body").hasClass("dak")) {
      $("body").removeClass("dak");
      $(".mh-fixed-nav, .navbar-nav, .mh-fixed-nav, .mh-home, .sidenav, .menu, .white-vertion, .light, .dark, .mh-about, .mh-about-tag, .btn.btn-fill, .mh-service, .section-title, .mh-skills, .mh-experince, .mh-pricing, .mh-footer, .candidatos, .mh-professional-skills, .mh-work, .res, .section-title, .mh-footer-address").removeClass("switched");
    }
    else {
      $("body").addClass("dak");
      $(".mh-fixed-nav, .navbar-nav, .mh-fixed-nav, .mh-home, .sidenav, .menu, .white-vertion, .light, .dark, .mh-about, .mh-about-tag, .btn.btn-fill, .mh-service, .section-title, .mh-skills, .mh-experince, .mh-pricing, .mh-footer, .candidatos, .mh-professional-skills, .mh-work, .res, .section-title, .mh-footer-address").addClass("switched");
    }
  });  
  
  })(jQuery);
