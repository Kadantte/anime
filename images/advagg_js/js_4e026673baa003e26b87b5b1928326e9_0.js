/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/quicktabs/js/quicktabs.js. */
Drupal.settings.views = Drupal.settings.views || {ajax_path: 'views/ajax'};
Drupal.behaviors.quicktabs = function (context) {
    $('.quicktabs_wrapper:not(.quicktabs-processed)', context).addClass('quicktabs-processed').each(function () {
        Drupal.quicktabs.prepare(this)
    })
};
Drupal.quicktabs = Drupal.quicktabs || {};
Drupal.quicktabs.ajax = {};
Drupal.quicktabs.scripts = {};
Drupal.quicktabs.css = {};
Drupal.quicktabs.prepare = function (el) {
    var i = 0, qtid = el.id.substring(el.id.indexOf('-') + 1), $ul = $(el).find('ul.quicktabs_tabs:first');
    $ul.find('li a').each(function () {
        this.myTabIndex = i++;
        this.qtid = qtid;
        $(this).unbind('click').bind('click', quicktabsClick)
    });
    var $active_tab = $(el).children('.quicktabs_tabs').find('li.active a');
    if ($active_tab.hasClass('qt_tab') || $active_tab.hasClass('qt_ajax_tab')) {
        $active_tab.trigger('click')
    } else $(el).children('.quicktabs_tabs').find('li.first a').trigger('click');
    return false
};
Drupal.quicktabs.tab = function (el) {
    this.element = el;
    this.tabIndex = el.myTabIndex;
    this.qtid = el.qtid;
    var qtKey = 'qt_' + this.qtid, i = 0;
    for (var key in Drupal.settings.quicktabs[qtKey].tabs) {
        if (i == this.tabIndex) {
            this.tabObj = Drupal.settings.quicktabs[qtKey].tabs[key];
            this.tabKey = key
        }
        ;
        i++
    }
    ;
    this.tabpage_id = 'quicktabs_tabpage_' + this.qtid + '_' + this.tabKey;
    this.container = $('#quicktabs_container_' + this.qtid);
    this.tabpage = this.container.find('#' + this.tabpage_id);
    var tab = this;
    this.options = {
        success: function (response) {
            return tab.success(response)
        }, complete: function (response) {
            return tab.complete()
        }
    }
};
Drupal.quicktabs.tab.prototype.success = function (response) {
    this.container.append(Drupal.theme('quicktabsResponse', this, response.data.content));
    $.extend(true, Drupal.settings, response.data.js_css.js_settings);
    Drupal.quicktabs.ajax.scripts(response.data.js_css.js_files);
    Drupal.quicktabs.ajax.css_files(response.data.js_css.css_files);
    Drupal.attachBehaviors(this.container)
};
Drupal.quicktabs.tab.prototype.complete = function () {
    this.stopProgress()
};
Drupal.quicktabs.tab.prototype.stopProgress = function () {
    if (this.progress.element)$(this.progress.element).remove();
    $(this.element).removeClass('progress-disabled').attr('disabled', false)
};
Drupal.quicktabs.tab.prototype.startProgress = function () {
    var progressBar = new Drupal.progressBar('qt-progress-' + this.element.id, null, null, null);
    progressBar.setProgress(-1, Drupal.t('Loading'));
    this.progress = {};
    this.progress.element = $(progressBar.element).addClass('qt-progress qt-progress-bar');
    this.container.prepend(this.progress.element)
};
Drupal.quicktabs.tab.prototype.quicktabsAjaxView = function () {
    var tab = this;
    tab.container.append(Drupal.theme('quicktabsResponse', this, null));
    var target;
    target = $('#' + tab.tabpage_id + ' > div');
    var ajax_path = Drupal.settings.views.ajax_path;
    if (ajax_path.constructor.toString().indexOf("Array") != -1)ajax_path = ajax_path[0];
    var args;
    if (tab.tabObj.args != '') {
        args = tab.tabObj.args.join('/')
    } else args = '';
    var viewData = {view_name: tab.tabObj.vid, view_display_id: tab.tabObj.display, view_args: args};
    $.ajax({
        url: ajax_path, type: 'GET', data: viewData, success: function (response) {
            if (response.__callbacks)$.each(response.__callbacks, function (i, callback) {
                eval(callback)(target, response)
            })
        }, complete: function () {
            tab.stopProgress()
        }, error: function () {
            alert(Drupal.t("An error occurred at @path.", {'@path': ajax_path}))
        }, dataType: 'json'
    })
};
var quicktabsClick = function () {
    var tab = new Drupal.quicktabs.tab(this);
    $(this).parents('li').siblings().removeClass('active');
    $(this).parents('li').addClass('active');
    tab.container.children().addClass('quicktabs-hide');
    if (tab.tabpage.hasClass('quicktabs_tabpage')) {
        tab.tabpage.removeClass('quicktabs-hide')
    } else if ($(this).hasClass('qt_ajax_tab')) {
        tab.startProgress();
        if (tab.tabObj.type != 'view') {
            var qtAjaxPath = Drupal.settings.basePath + 'quicktabs/ajax/' + tab.tabObj.type + '/';
            switch (tab.tabObj.type) {
                case'node':
                    qtAjaxPath += tab.tabObj.nid + '/' + tab.tabObj.teaser + '/' + tab.tabObj.hide_title;
                    break;
                case'block':
                    qtAjaxPath += tab.qtid + '/' + tab.tabObj.bid + '/' + tab.tabObj.hide_title;
                    break;
                case'qtabs':
                    qtAjaxPath += tab.tabObj.machine_name;
                    break;
                case'callback':
                    qtAjaxPath += tab.tabObj.path;
                    break
            }
            ;
            $.ajax({
                url: qtAjaxPath,
                type: 'GET',
                data: null,
                success: tab.options.success,
                complete: tab.options.complete,
                dataType: 'json'
            })
        } else tab.quicktabsAjaxView()
    }
    ;
    return false
};
Drupal.theme.prototype.quicktabsResponse = function (tab, content) {
    var newDiv = tab.tabObj.type == 'view' ? '<div id="' + tab.tabpage_id + '" class="quicktabs_tabpage"><div></div></div>' : '<div id="' + tab.tabpage_id + '" class="quicktabs_tabpage">' + content + '</div>';
    return newDiv
};
Drupal.quicktabs.ajax.scripts = function (files) {
    var scripts = {};
    $('script').each(function () {
        Drupal.quicktabs.scripts[$(this).attr('src')] = $(this).attr('src')
    });
    var html = '', head = document.getElementsByTagName('head')[0];
    for (var i in files)if (!Drupal.quicktabs.scripts[files[i]] && !files[i].match(/^\/misc\/jquery\.js.*$/)) {
        Drupal.quicktabs.scripts[files[i]] = files[i];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = files[i];
        head.appendChild(script);
        html += '<script type="text/javascript" src="' + files[i] + '"></script>'
    }
    ;
    if (html)$('body').append($(html))
};
Drupal.quicktabs.ajax.css_files = function (files) {
    $('link:not(.qt-temporary-css)').each(function () {
        if ($(this).attr('type') == 'text/css')Drupal.quicktabs.css[$(this).attr('href')] = $(this).attr('href')
    });
    var html = '';
    for (var i in files)if (!Drupal.quicktabs.css[files[i].file])html += '<link class="qt-temporary-css" type="text/css" rel="stylesheet" media="' + files[i].media + '" href="' + files[i].file + '" />';
    if (html) {
        $('link.ctools-temporary-css').remove();
        $('body').append($(html))
    }
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/quicktabs/js/quicktabs.js. */
/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/disqus/disqus.js. */
var disqus_shortname = '', disqus_developer = 0, disqus_url = '', disqus_title = '', disqus_identifier = '', disqus_config = null, disqus_def_name = null, disqus_def_email = null;
Drupal.behaviors.disqus = function (context) {
    if (Drupal.settings.disqusCommentDomain || false) {
        disqus_shortname = Drupal.settings.disqusCommentDomain;
        jQuery.ajax({
            type: 'GET',
            url: 'http://' + disqus_shortname + '.disqus.com/count.js',
            dataType: 'script',
            cache: true
        })
    }
    ;
    if (Drupal.settings.disqus || false)if (jQuery("#disqus_thread").length) {
        var disqus = Drupal.settings.disqus;
        disqus_shortname = disqus.shortname;
        disqus_developer = disqus.developer || 0;
        disqus_url = disqus.url;
        disqus_title = disqus.title;
        disqus_identifier = disqus.identifier;
        disqus_def_name = disqus.name || null;
        disqus_def_email = disqus.email || null;
        disqus_config = function () {
            if (disqus.language || false)this.language = disqus.language;
            if (disqus.remote_auth_s3 || false)this.page.remote_auth_s3 = disqus.remote_auth_s3;
            if (disqus.api_key || false)this.page.api_key = disqus.api_key;
            if (disqus.sso || false)this.sso = disqus.sso
        };
        jQuery.ajax({
            type: 'GET',
            url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
            dataType: 'script',
            cache: true
        })
    }
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/disqus/disqus.js. */
