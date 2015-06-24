/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/admin_menu/admin_menu.js. */
$(document).ready(function () {
    if (!$('#admin-menu').length)return;
    if (Drupal && Drupal.settings && Drupal.settings.admin_menu) {
        if (Drupal.settings.admin_menu.margin_top)$('body').addClass('admin-menu');
        if (Drupal.settings.admin_menu.position_fixed)$('#admin-menu').css('position', 'fixed');
        if (Drupal.settings.admin_menu.tweak_tabs) {
            $('ul.tabs.primary li').each(function () {
                $(this).addClass('admin-menu-tab').appendTo('#admin-menu > ul')
            });
            $('ul.tabs.secondary').appendTo('#admin-menu > ul > li.admin-menu-tab.active').removeClass('secondary')
        }
        ;
        if (Drupal.settings.admin_menu.tweak_modules)$('#system-modules fieldset:not(.collapsed), #system-modules-1 fieldset:not(.collapsed)').addClass('collapsed')
    }
    ;
    if ($.browser.msie && parseInt(jQuery.browser.version) == 6)$('#admin-menu li').hover(function () {
        $(this).addClass('iehover')
    }, function () {
        $(this).removeClass('iehover')
    });
    $('#admin-menu li').hover(function () {
        clearTimeout(this.sfTimer);
        $('> ul', this).css({
            left: 'auto',
            display: 'block'
        }).parent().siblings('li').children('ul').css({left: '-999em', display: 'none'})
    }, function () {
        var uls = $('> ul', this);
        this.sfTimer = setTimeout(function () {
            uls.css({left: '-999em', display: 'none'})
        }, 400)
    })
});
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/admin_menu/admin_menu.js. */
