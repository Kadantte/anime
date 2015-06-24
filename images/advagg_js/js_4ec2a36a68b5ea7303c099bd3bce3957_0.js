/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/views/js/base.js. */
Drupal.Views = {};
Drupal.behaviors.viewsTabs = function (context) {
    $('#views-tabset:not(.views-processed)').addClass('views-processed').each(function () {
        new Drupal.Views.Tabs($(this), {selectedClass: 'active'})
    });
    $('a.views-remove-link').addClass('views-processed').click(function () {
        var id = $(this).attr('id').replace('views-remove-link-', '');
        $('#views-row-' + id).hide();
        $('#views-removed-' + id).attr('checked', true);
        return false
    })
};
Drupal.behaviors.viewsHoverlinks = function () {
    if ($.browser.msie) {
        $("div.view:not(.views-hover-processed)").addClass('views-hover-processed').hover(function () {
            $('div.views-hide', this).addClass("views-hide-hover");
            return true
        }, function () {
            $('div.views-hide', this).removeClass("views-hide-hover");
            return true
        });
        $("div.views-admin-links:not(.views-hover-processed)").addClass('views-hover-processed').hover(function () {
            $(this).addClass("views-admin-links-hover");
            return true
        }, function () {
            $(this).removeClass("views-admin-links-hover");
            return true
        })
    }
};
Drupal.Views.parseQueryString = function (query) {
    var args = {}, pos = query.indexOf('?');
    if (pos != -1)query = query.substring(pos + 1);
    var pairs = query.split('&');
    for (var i in pairs)if (typeof(pairs[i]) == 'string') {
        var pair = pairs[i].split('=');
        if (pair[0] != 'q' && pair[1])args[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, ' '))
    }
    ;
    return args
};
Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {}, path = Drupal.Views.getPath(href);
    if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
        var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
        returnObj.view_args = args;
        returnObj.view_path = path
    }
    ;
    return returnObj
};
Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) == protocol)href = href.substring(href.indexOf('/', protocol.length + 2));
    return href
};
Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(Drupal.settings.basePath.length, href.length);
    if (href.substring(0, 3) == '?q=')href = href.substring(3, href.length);
    var chars = ['#', '?', '&'];
    for (i in chars)if (href.indexOf(chars[i]) > -1)href = href.substr(0, href.indexOf(chars[i]));
    return href
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/views/js/base.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/views/js/dependent.js. */
Drupal.Views = Drupal.Views || {};
Drupal.Views.dependent = {bindings: {}, activeBindings: {}, activeTriggers: []};
Drupal.Views.dependent.inArray = function (array, search_term) {
    var i = array.length;
    if (i > 0)do {
        if (array[i] == search_term)return true
    } while (i--);
    return false
};
Drupal.Views.dependent.autoAttach = function () {
    for (i in Drupal.Views.dependent.activeTriggers)jQuery(Drupal.Views.dependent.activeTriggers[i]).unbind('change');
    Drupal.Views.dependent.activeTriggers = [];
    Drupal.Views.dependent.activeBindings = {};
    Drupal.Views.dependent.bindings = {};
    if (!Drupal.settings.viewsAjax)return;
    for (id in Drupal.settings.viewsAjax.formRelationships) {
        Drupal.Views.dependent.activeBindings[id] = 0;
        for (bind_id in Drupal.settings.viewsAjax.formRelationships[id].values) {
            if (!Drupal.Views.dependent.bindings[bind_id])Drupal.Views.dependent.bindings[bind_id] = [];
            Drupal.Views.dependent.bindings[bind_id].push(id);
            if (bind_id.substring(0, 6) == 'radio:') {
                var trigger_id = "input[name='" + bind_id.substring(6) + "']"
            } else var trigger_id = '#' + bind_id;
            Drupal.Views.dependent.activeTriggers.push(trigger_id);
            if (jQuery(trigger_id).attr('type') == 'checkbox')$(trigger_id).parent().addClass('hidden-options');
            var getValue = function (item, trigger) {
                if (item.substring(0, 6) == 'radio:') {
                    var val = jQuery(trigger + ':checked').val()
                } else switch (jQuery(trigger).attr('type')) {
                    case'checkbox':
                        var val = jQuery(trigger).attr('checked') || 0;
                        if (val) {
                            $(trigger).parent().removeClass('hidden-options').addClass('expanded-options')
                        } else $(trigger).parent().removeClass('expanded-options').addClass('hidden-options');
                        break;
                    default:
                        var val = jQuery(trigger).val()
                }
                ;
                return val
            }, setChangeTrigger = function (trigger_id, bind_id) {
                var changeTrigger = function () {
                    var val = getValue(bind_id, trigger_id);
                    for (i in Drupal.Views.dependent.bindings[bind_id]) {
                        var id = Drupal.Views.dependent.bindings[bind_id][i];
                        if (typeof id != 'string')continue;
                        if (!Drupal.Views.dependent.activeBindings[id])Drupal.Views.dependent.activeBindings[id] = {};
                        if (Drupal.Views.dependent.inArray(Drupal.settings.viewsAjax.formRelationships[id].values[bind_id], val)) {
                            Drupal.Views.dependent.activeBindings[id][bind_id] = 'bind'
                        } else delete Drupal.Views.dependent.activeBindings[id][bind_id];
                        var len = 0;
                        for (i in Drupal.Views.dependent.activeBindings[id])len++;
                        var object = jQuery('#' + id + '-wrapper');
                        if (!object.size())object = jQuery('#' + id).parent();
                        var rel_num = Drupal.settings.viewsAjax.formRelationships[id].num;
                        if (typeof rel_num === 'object')rel_num = Drupal.settings.viewsAjax.formRelationships[id].num[0];
                        if (rel_num <= len) {
                            object.show(0);
                            object.addClass('dependent-options')
                        } else object.hide(0)
                    }
                };
                jQuery(trigger_id).change(function () {
                    changeTrigger(trigger_id, bind_id)
                });
                changeTrigger(trigger_id, bind_id)
            };
            setChangeTrigger(trigger_id, bind_id)
        }
    }
};
Drupal.behaviors.viewsDependent = function (context) {
    Drupal.Views.dependent.autoAttach();
    $("select.views-master-dependent:not(.views-processed)").addClass('views-processed').change(function () {
        var val = $(this).val();
        if (val == 'all') {
            $('.views-dependent-all').show(0)
        } else {
            $('.views-dependent-all').hide(0);
            $('.views-dependent-' + val).show(0)
        }
    }).trigger('change')
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/views/js/dependent.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/views/js/ajax_view.js. */
Drupal.Views.Ajax = Drupal.Views.Ajax || {};
Drupal.Views.Ajax.ajaxViewResponse = function (target, response) {
    if (response.debug)alert(response.debug);
    var $view = $(target);
    if (response.status && response.display) {
        var $newView = $(response.display);
        $view.replaceWith($newView);
        $view = $newView;
        Drupal.attachBehaviors($view.parent())
    }
    ;
    if (response.messages)$view.find('.views-messages').remove().end().prepend(response.messages)
};
Drupal.behaviors.ViewsAjaxView = function () {
    if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
        var ajax_path = Drupal.settings.views.ajax_path;
        if (ajax_path.constructor.toString().indexOf("Array") != -1)ajax_path = ajax_path[0];
        $.each(Drupal.settings.views.ajaxViews, function (i, settings) {
            if (settings.view_dom_id) {
                var view = '.view-dom-id-' + settings.view_dom_id;
                if (!$(view).size())view = '.view-id-' + settings.view_name + '.view-display-id-' + settings.view_display_id
            }
            ;
            $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-')).filter(':not(.views-processed)').each(function () {
                $('input[name=q]', this).remove();
                var form = this;
                $.each(settings, function (key, setting) {
                    $(form).append('<input type="hidden" name="' + key + '" value="' + setting + '"/>')
                })
            }).addClass('views-processed').submit(function () {
                $('input[type=submit], button', this).after('<span class="views-throbbing">&nbsp</span>');
                var object = this;
                $(this).ajaxSubmit({
                    url: ajax_path, type: 'GET', success: function (response) {
                        if (response.__callbacks) {
                            $.each(response.__callbacks, function (i, callback) {
                                eval(callback)(view, response)
                            });
                            $('.views-throbbing', object).remove()
                        }
                    }, error: function (xhr) {
                        Drupal.Views.Ajax.handleErrors(xhr, ajax_path);
                        $('.views-throbbing', object).remove()
                    }, dataType: 'json'
                });
                return false
            });
            $(view).filter(':not(.views-processed)').filter(function () {
                return !$(this).parents('.view').size()
            }).each(function () {
                var target = this;
                $(this).addClass('views-processed').find('ul.pager > li > a, th.views-field a, .attachment .views-summary a').each(function () {
                    var viewData = {js: 1};
                    $.extend(viewData, Drupal.Views.parseQueryString($(this).attr('href')), Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path), settings);
                    $(this).click(function () {
                        $.extend(viewData, Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path));
                        $(this).addClass('views-throbbing');
                        $.ajax({
                            url: ajax_path, type: 'GET', data: viewData, success: function (response) {
                                $(this).removeClass('views-throbbing');
                                var offset = $(target).offset(), scrollTarget = target;
                                while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent())scrollTarget = $(scrollTarget).parent();
                                if (offset.top - 10 < $(scrollTarget).scrollTop())$(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
                                if (response.__callbacks)$.each(response.__callbacks, function (i, callback) {
                                    eval(callback)(target, response)
                                })
                            }, error: function (xhr) {
                                $(this).removeClass('views-throbbing');
                                Drupal.Views.Ajax.handleErrors(xhr, ajax_path)
                            }, dataType: 'json'
                        });
                        return false
                    })
                })
            })
        })
    }
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/views/js/ajax_view.js. */
