$(document).ready(function() {


  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 2000) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '320px', 'width': '22%'}, 400, swing = 'swing', function() {} );
    }

    
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    // 导航按钮被点击
    // this.style.backgroundColor = '#fff'; 设置颜色后会自动消失
  });  

  // Panel Toggle logic
  $('#panel-toggle').click(function() {
    if ($('.panel-cover').hasClass('panel-cover--narrow')) {
        $('.panel-cover').removeClass('panel-cover--narrow');
        $('.content-wrapper').removeClass('content-wrapper--expanded');
        $(this).find('i').removeClass('fa-chevron-right').addClass('fa-chevron-left');
    } else {
        $('.panel-cover').addClass('panel-cover--narrow');
        $('.content-wrapper').addClass('content-wrapper--expanded');
        $(this).find('i').removeClass('fa-chevron-left').addClass('fa-chevron-right');
    }
  });

  // Check if we should start narrow
  var isPostOrBlog = (window.location.pathname != "/" && window.location.pathname != "/index.html") || window.location.hash == "#blog";
  
  if (isPostOrBlog) {
    $('.panel-cover').addClass('panel-cover--narrow');
    $('.content-wrapper').addClass('content-wrapper--expanded');
    $('#panel-toggle i').removeClass('fa-chevron-left').addClass('fa-chevron-right');
  }

  // TOC Toggle logic
  $('#toc-toggle').click(function() {
    $('#post-toc').toggleClass('toc-collapsed');
    $(this).find('.toggle-icon').toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
  });

  // TOC Section Folding logic: Fold children by default
  $('.toc-content > ul > li:has(ul)').each(function() {
    var $li = $(this);
    var $link = $li.children('a');
    
    // Add fold icon if not exists
    if ($link.find('.section-toggle').length === 0) {
        $link.prepend('<i class="fa fa-caret-right section-toggle" style="margin-right:8px; cursor:pointer;"></i>');
    }
    
    $li.addClass('toc-section-folded');
  });

  // Handle clicking the fold icon
  $(document).on('click', '.section-toggle', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $icon = $(this);
    var $li = $icon.closest('li');
    if ($li.hasClass('toc-section-folded')) {
        $li.removeClass('toc-section-folded');
        $icon.removeClass('fa-caret-right').addClass('fa-caret-down');
    } else {
        $li.addClass('toc-section-folded');
        $icon.removeClass('fa-caret-down').addClass('fa-caret-right');
    }
  });
});