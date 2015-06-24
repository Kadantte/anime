/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/misc/drupal.js. */
(function () {
    var jquery_init = jQuery.fn.init;
    jQuery.fn.init = function (selector, context, rootjQuery) {
        if (selector && typeof selector === 'string') {
            var hash_position = selector.indexOf('#');
            if (hash_position >= 0) {
                var bracket_position = selector.indexOf('<');
                if (bracket_position > hash_position)throw'Syntax error, unrecognized expression: ' + selector
            }
        }
        ;
        return jquery_init.call(this, selector, context, rootjQuery)
    };
    jQuery.fn.init.prototype = jquery_init.prototype
})();
var Drupal = Drupal || {settings: {}, behaviors: {}, themes: {}, locale: {}};
Drupal.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;
Drupal.attachBehaviors = function (context) {
    context = context || document;
    if (Drupal.jsEnabled)jQuery.each(Drupal.behaviors, function () {
        this(context)
    })
};
Drupal.checkPlain = function (str) {
    str = String(str);
    var replace = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'};
    for (var character in replace) {
        var regex = new RegExp(character, 'g');
        str = str.replace(regex, replace[character])
    }
    ;
    return str
};
Drupal.t = function (str, args) {
    if (Drupal.locale.strings && Drupal.locale.strings[str])str = Drupal.locale.strings[str];
    if (args)for (var key in args) {
        switch (key.charAt(0)) {
            case'@':
                args[key] = Drupal.checkPlain(args[key]);
                break;
            case'!':
                break;
            case'%':
            default:
                args[key] = Drupal.theme('placeholder', args[key]);
                break
        }
        ;
        str = str.replace(key, args[key])
    }
    ;
    return str
};
Drupal.formatPlural = function (count, singular, plural, args) {
    var args = args || {};
    args['@count'] = count;
    var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);
    if (index == 0) {
        return Drupal.t(singular, args)
    } else if (index == 1) {
        return Drupal.t(plural, args)
    } else {
        args['@count[' + index + ']'] = args['@count'];
        delete args['@count'];
        return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args)
    }
};
Drupal.theme = function (func) {
    for (var i = 1, args = []; i < arguments.length; i++)args.push(arguments[i]);
    return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args)
};
Drupal.parseJson = function (data) {
    if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '['))return {
        status: 0,
        data: data.length ? data : Drupal.t('Unspecified error')
    };
    return eval('(' + data + ');')
};
Drupal.freezeHeight = function () {
    Drupal.unfreezeHeight();
    var div = document.createElement('div');
    $(div).css({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '1px',
        height: $('body').css('height')
    }).attr('id', 'freeze-height');
    $('body').append(div)
};
Drupal.unfreezeHeight = function () {
    $('#freeze-height').remove()
};
Drupal.encodeURIComponent = function (item, uri) {
    uri = uri || location.href;
    item = encodeURIComponent(item).replace(/%2F/g, '/');
    return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F')
};
Drupal.getSelection = function (element) {
    if (typeof(element.selectionStart) != 'number' && document.selection) {
        var range1 = document.selection.createRange(), range2 = range1.duplicate();
        range2.moveToElementText(element);
        range2.setEndPoint('EndToEnd', range1);
        var start = range2.text.length - range1.text.length, end = start + range1.text.length;
        return {start: start, end: end}
    }
    ;
    return {start: element.selectionStart, end: element.selectionEnd}
};
Drupal.ahahError = function (xmlhttp, uri) {
    if (xmlhttp.status == 200) {
        if (jQuery.trim($(xmlhttp.responseText).text())) {
            var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText})
        } else var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {
            '@uri': uri,
            '@text': xmlhttp.responseText
        })
    } else var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status});
    return message
};
if (Drupal.jsEnabled) {
    $(document.documentElement).addClass('js');
    document.cookie = 'has_js=1; path=/';
    $(document).ready(function () {
        Drupal.attachBehaviors(this)
    })
}
;
Drupal.theme.prototype = {
    placeholder: function (str) {
        return '<em>' + Drupal.checkPlain(str) + '</em>'
    }
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/misc/drupal.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/fivestar/js/fivestar.js. */
(function ($) {
    var buildRating = function ($obj) {
        var $widget = buildInterface($obj), $stars = $('.star', $widget), $cancel = $('.cancel', $widget), $summary = $('.fivestar-summary', $obj), feedbackTimerId = 0, summaryText = $summary.html(), summaryHover = $obj.is('.fivestar-labels-hover'), currentValue = $("select", $obj).val(), cancelTitle = $('label', $obj).html(), voteTitle = cancelTitle != Drupal.settings.fivestar.titleAverage ? cancelTitle : Drupal.settings.fivestar.titleUser, voteChanged = false;
        if ($obj.is('.fivestar-user-stars')) {
            var starDisplay = 'user'
        } else if ($obj.is('.fivestar-average-stars')) {
            var starDisplay = 'average';
            currentValue = $("input[name=vote_average]", $obj).val()
        } else if ($obj.is('.fivestar-combo-stars')) {
            var starDisplay = 'combo'
        } else var starDisplay = 'none';
        if ($obj.is('.fivestar-smart-stars'))var starDisplay = 'smart';
        if ($summary.size()) {
            var textDisplay = $summary.attr('class').replace(/.*?fivestar-summary-([^ ]+).*/, '$1').replace(/-/g, '_')
        } else var textDisplay = 'none';
        $stars.mouseover(function () {
            event.drain();
            event.fill(this)
        }).mouseout(function () {
            event.drain();
            event.reset()
        });
        $stars.children().focus(function () {
            event.drain();
            event.fill(this.parentNode)
        }).blur(function () {
            event.drain();
            event.reset()
        }).end();
        $cancel.mouseover(function () {
            event.drain();
            $(this).addClass('on')
        }).mouseout(function () {
            event.reset();
            $(this).removeClass('on')
        });
        $cancel.children().focus(function () {
            event.drain();
            $(this.parentNode).addClass('on')
        }).blur(function () {
            event.reset();
            $(this.parentNode).removeClass('on')
        }).end();
        $cancel.click(function () {
            currentValue = 0;
            event.reset();
            voteChanged = false;
            if ($("input.fivestar-path", $obj).size() && $summary.is('.fivestar-feedback-enabled'))setFeedbackText(Drupal.settings.fivestar.feedbackDeletingVote);
            $("select", $obj).val(0);
            cancelTitle = starDisplay != 'smart' ? cancelTitle : Drupal.settings.fivestar.titleAverage;
            $('label', $obj).html(cancelTitle);
            if ($obj.is('.fivestar-smart-text')) {
                $obj.removeClass('fivestar-user-text').addClass('fivestar-average-text');
                $summary[0].className = $summary[0].className.replace(/-user/, '-average');
                textDisplay = $summary.attr('class').replace(/.*?fivestar-summary-([^ ]+).*/, '$1').replace(/-/g, '_')
            }
            ;
            if ($obj.is('.fivestar-smart-stars'))$obj.removeClass('fivestar-user-stars').addClass('fivestar-average-stars');
            $("input.fivestar-path", $obj).each(function () {
                var token = $("input.fivestar-token", $obj).val();
                $.ajax({
                    type: 'GET',
                    data: {token: token},
                    dataType: 'xml',
                    url: this.value + '/' + 0,
                    success: voteHook
                })
            });
            return false
        });
        $stars.click(function () {
            currentValue = $('select option', $obj).get($stars.index(this) + $cancel.size() + 1).value;
            $("select", $obj).val(currentValue);
            voteChanged = true;
            event.reset();
            if ($("input.fivestar-path", $obj).size() && $summary.is('.fivestar-feedback-enabled'))setFeedbackText(Drupal.settings.fivestar.feedbackSavingVote);
            if ($obj.is('.fivestar-smart-text')) {
                $obj.removeClass('fivestar-average-text').addClass('fivestar-user-text');
                $summary[0].className = $summary[0].className.replace(/-average/, '-user');
                textDisplay = $summary.attr('class').replace(/.*?fivestar-summary-([^ ]+).*/, '$1').replace(/-/g, '_')
            }
            ;
            if ($obj.is('.fivestar-smart-stars'))$obj.removeClass('fivestar-average-stars').addClass('fivestar-user-stars');
            $("input.fivestar-path", $obj).each(function () {
                var token = $("input.fivestar-token", $obj).val();
                $.ajax({
                    type: 'GET',
                    data: {token: token},
                    dataType: 'xml',
                    url: this.value + '/' + currentValue,
                    success: voteHook
                })
            });
            return false
        });
        var event = {
            fill: function (el) {
                var index = $stars.index(el) + 1;
                $stars.children('a').css('width', '100%').end().filter(':lt(' + index + ')').addClass('hover').end();
                if (summaryHover && !feedbackTimerId) {
                    var summary = $("select option", $obj)[index + $cancel.size()].text, value = $("select option", $obj)[index + $cancel.size()].value;
                    $summary.html(summary != index + 1 ? summary : '&nbsp;');
                    $('label', $obj).html(voteTitle)
                }
            }, drain: function () {
                $stars.filter('.on').removeClass('on').end().filter('.hover').removeClass('hover').end();
                if (summaryHover && !feedbackTimerId) {
                    var cancelText = $("select option", $obj)[1].text;
                    $summary.html(($cancel.size() && cancelText != 0) ? cancelText : '&nbsp');
                    if (!voteChanged)$('label', $obj).html(cancelTitle)
                }
            }, reset: function () {
                var starValue = currentValue / 100 * $stars.size(), percent = (starValue - Math.floor(starValue)) * 100;
                $stars.filter(':lt(' + Math.floor(starValue) + ')').addClass('on').end();
                if (percent > 0)$stars.eq(Math.floor(starValue)).addClass('on').children('a').css('width', percent + "%").end().end();
                if (summaryHover && !feedbackTimerId)$summary.html(summaryText ? summaryText : '&nbsp;');
                if (voteChanged) {
                    $('label', $obj).html(voteTitle)
                } else $('label', $obj).html(cancelTitle)
            }
        }, setFeedbackText = function (text) {
            feedbackTimerId = 1;
            $summary.html(text)
        }, voteHook = function (data) {
            var returnObj = {
                result: {
                    count: $("result > count", data).text(),
                    average: $("result > average", data).text(),
                    summary: {
                        average: $("summary average", data).text(),
                        average_count: $("summary average_count", data).text(),
                        user: $("summary user", data).text(),
                        user_count: $("summary user_count", data).text(),
                        combo: $("summary combo", data).text(),
                        count: $("summary count", data).text()
                    }
                },
                vote: {
                    id: $("vote id", data).text(),
                    tag: $("vote tag", data).text(),
                    type: $("vote type", data).text(),
                    value: $("vote value", data).text()
                },
                display: {stars: starDisplay, text: textDisplay}
            };
            if (window.fivestarResult) {
                fivestarResult(returnObj)
            } else fivestarDefaultResult(returnObj);
            summaryText = returnObj.result.summary[returnObj.display.text];
            if ($(returnObj.result.summary.average).is('.fivestar-feedback-enabled')) {
                if (returnObj.vote.value != 0) {
                    setFeedbackText(Drupal.settings.fivestar.feedbackVoteSaved)
                } else setFeedbackText(Drupal.settings.fivestar.feedbackVoteDeleted);
                feedbackTimerId = setTimeout(function () {
                    clearTimeout(feedbackTimerId);
                    feedbackTimerId = 0;
                    $summary.html(returnObj.result.summary[returnObj.display.text])
                }, 2e3)
            }
            ;
            if (returnObj.vote.value == 0 && (starDisplay == 'average' || starDisplay == 'smart')) {
                currentValue = returnObj.result.average;
                event.reset()
            }
        };
        event.reset();
        return $widget
    }, buildInterface = function ($widget) {
        var $container = $('<div class="fivestar-widget clear-block"></div>'), $options = $("select option", $widget), size = $('option', $widget).size() - 1, cancel = 1;
        for (var i = 1, option; option = $options[i]; i++) {
            if (option.value == "0") {
                cancel = 0;
                $div = $('<div class="cancel"><a href="#0" title="' + option.text + '">' + option.text + '</a></div>')
            } else {
                var zebra = (i + cancel - 1) % 2 == 0 ? 'even' : 'odd', count = i + cancel - 1, first = count == 1 ? ' star-first' : '', last = count == size + cancel - 1 ? ' star-last' : '';
                $div = $('<div class="star star-' + count + ' star-' + zebra + first + last + '"><a href="#' + option.value + '" title="' + option.text + '">' + option.text + '</a></div>')
            }
            ;
            $container.append($div[0])
        }
        ;
        $container.addClass('fivestar-widget-' + (size + cancel - 1));
        $('select', $widget).after($container).css('display', 'none');
        return $container
    }

    function fivestarDefaultResult(voteResult) {
        $('div.fivestar-summary-' + voteResult.vote.tag + '-' + voteResult.vote.id).html(voteResult.result.summary[voteResult.display.text]);
        if (voteResult.display.stars == 'combo')$('div.fivestar-form-' + voteResult.vote.id).each(function () {
            var $stars = $('.fivestar-widget-static .star span', this), average = voteResult.result.average / 100 * $stars.size(), index = Math.floor(average);
            $stars.removeClass('on').addClass('off').css('width', 'auto');
            $stars.filter(':lt(' + (index + 1) + ')').removeClass('off').addClass('on');
            $stars.eq(index).css('width', ((average - index) * 100) + "%");
            var $summary = $('.fivestar-static-form-item .fivestar-summary', this);
            if ($summary.size()) {
                var textDisplay = $summary.attr('class').replace(/.*?fivestar-summary-([^ ]+).*/, '$1').replace(/-/g, '_');
                $summary.html(voteResult.result.summary[textDisplay])
            }
        })
    };
    $.fn.fivestar = function () {
        var stack = [];
        this.each(function () {
            var ret = buildRating($(this));
            stack.push(ret)
        });
        return stack
    };
    if ($.browser.msie == true)try {
        document.execCommand('BackgroundImageCache', false, true)
    } catch (err) {
    }
    ;
    Drupal.behaviors.fivestar = function (context) {
        $('div.fivestar-form-item:not(.fivestar-processed)', context).addClass('fivestar-processed').fivestar();
        $('input.fivestar-submit', context).css('display', 'none')
    }
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/fivestar/js/fivestar.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/lightbox2/js/lightbox.js. */
var Lightbox = {
    auto_modal: false,
    overlayOpacity: 0.8,
    overlayColor: '000',
    disableCloseClick: true,
    resizeSequence: 0,
    resizeSpeed: 'normal',
    fadeInSpeed: 'normal',
    slideDownSpeed: 'slow',
    minWidth: 240,
    borderSize: 10,
    boxColor: 'fff',
    fontColor: '000',
    topPosition: '',
    infoHeight: 20,
    alternative_layout: false,
    imageArray: [],
    imageNum: null,
    total: 0,
    activeImage: null,
    inprogress: false,
    disableResize: false,
    disableZoom: false,
    isZoomedIn: false,
    rtl: false,
    loopItems: false,
    keysClose: ['c', 'x', 27],
    keysPrevious: ['p', 37],
    keysNext: ['n', 39],
    keysZoom: ['z'],
    keysPlayPause: [32],
    slideInterval: 5e3,
    showPlayPause: true,
    autoStart: true,
    autoExit: true,
    pauseOnNextClick: false,
    pauseOnPrevClick: true,
    slideIdArray: [],
    slideIdCount: 0,
    isSlideshow: false,
    isPaused: false,
    loopSlides: false,
    isLightframe: false,
    iframe_width: 600,
    iframe_height: 400,
    iframe_border: 1,
    enableVideo: false,
    flvPlayer: '/flvplayer.swf',
    flvFlashvars: '',
    isModal: false,
    isVideo: false,
    videoId: false,
    modalWidth: 400,
    modalHeight: 400,
    modalHTML: null,
    initialize: function () {
        var s = Drupal.settings.lightbox2;
        Lightbox.overlayOpacity = s.overlay_opacity;
        Lightbox.overlayColor = s.overlay_color;
        Lightbox.disableCloseClick = s.disable_close_click;
        Lightbox.resizeSequence = s.resize_sequence;
        Lightbox.resizeSpeed = s.resize_speed;
        Lightbox.fadeInSpeed = s.fade_in_speed;
        Lightbox.slideDownSpeed = s.slide_down_speed;
        Lightbox.borderSize = s.border_size;
        Lightbox.boxColor = s.box_color;
        Lightbox.fontColor = s.font_color;
        Lightbox.topPosition = s.top_position;
        Lightbox.rtl = s.rtl;
        Lightbox.loopItems = s.loop_items;
        Lightbox.keysClose = s.keys_close.split(" ");
        Lightbox.keysPrevious = s.keys_previous.split(" ");
        Lightbox.keysNext = s.keys_next.split(" ");
        Lightbox.keysZoom = s.keys_zoom.split(" ");
        Lightbox.keysPlayPause = s.keys_play_pause.split(" ");
        Lightbox.disableResize = s.disable_resize;
        Lightbox.disableZoom = s.disable_zoom;
        Lightbox.slideInterval = s.slideshow_interval;
        Lightbox.showPlayPause = s.show_play_pause;
        Lightbox.showCaption = s.show_caption;
        Lightbox.autoStart = s.slideshow_automatic_start;
        Lightbox.autoExit = s.slideshow_automatic_exit;
        Lightbox.pauseOnNextClick = s.pause_on_next_click;
        Lightbox.pauseOnPrevClick = s.pause_on_previous_click;
        Lightbox.loopSlides = s.loop_slides;
        Lightbox.alternative_layout = s.use_alt_layout;
        Lightbox.iframe_width = s.iframe_width;
        Lightbox.iframe_height = s.iframe_height;
        Lightbox.iframe_border = s.iframe_border;
        Lightbox.enableVideo = s.enable_video;
        if (s.enable_video) {
            Lightbox.flvPlayer = s.flvPlayer;
            Lightbox.flvFlashvars = s.flvFlashvars
        }
        ;
        var layout_class = (s.use_alt_layout ? 'lightbox2-alt-layout' : 'lightbox2-orig-layout'), output = '<div id="lightbox2-overlay" style="display: none;"></div>\
      <div id="lightbox" style="display: none;" class="' + layout_class + '">\
        <div id="outerImageContainer"></div>\
        <div id="imageDataContainer" class="clearfix">\
          <div id="imageData"></div>\
        </div>\
      </div>', loading = '<div id="loading"><a href="#" id="loadingLink"></a></div>', modal = '<div id="modalContainer" style="display: none;"></div>', frame = '<div id="frameContainer" style="display: none;"></div>', imageContainer = '<div id="imageContainer" style="display: none;"></div>', details = '<div id="imageDetails"></div>', bottomNav = '<div id="bottomNav"></div>', image = '<img id="lightboxImage" alt="" />', hoverNav = '<div id="hoverNav"><a id="prevLink" href="#"></a><a id="nextLink" href="#"></a></div>', frameNav = '<div id="frameHoverNav"><a id="framePrevLink" href="#"></a><a id="frameNextLink" href="#"></a></div>', hoverNav = '<div id="hoverNav"><a id="prevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="nextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>', frameNav = '<div id="frameHoverNav"><a id="framePrevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="frameNextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>', caption = '<span id="caption"></span>', numberDisplay = '<span id="numberDisplay"></span>', close = '<a id="bottomNavClose" title="' + Drupal.t('Close') + '" href="#"></a>', zoom = '<a id="bottomNavZoom" href="#"></a>', zoomOut = '<a id="bottomNavZoomOut" href="#"></a>', pause = '<a id="lightshowPause" title="' + Drupal.t('Pause Slideshow') + '" href="#" style="display: none;"></a>', play = '<a id="lightshowPlay" title="' + Drupal.t('Play Slideshow') + '" href="#" style="display: none;"></a>';
        $("body").append(output);
        $('#outerImageContainer').append(modal + frame + imageContainer + loading);
        if (!s.use_alt_layout) {
            $('#imageContainer').append(image + hoverNav);
            $('#imageData').append(details + bottomNav);
            $('#imageDetails').append(caption + numberDisplay);
            $('#bottomNav').append(frameNav + close + zoom + zoomOut + pause + play)
        } else {
            $('#outerImageContainer').append(bottomNav);
            $('#imageContainer').append(image);
            $('#bottomNav').append(close + zoom + zoomOut);
            $('#imageData').append(hoverNav + details);
            $('#imageDetails').append(caption + numberDisplay + pause + play)
        }
        ;
        if (Lightbox.disableCloseClick)$('#lightbox2-overlay').click(function () {
            Lightbox.end();
            return false
        }).hide();
        $('#loadingLink, #bottomNavClose').click(function () {
            Lightbox.end('forceClose');
            return false
        });
        $('#prevLink, #framePrevLink').click(function () {
            Lightbox.changeData(Lightbox.activeImage - 1);
            return false
        });
        $('#nextLink, #frameNextLink').click(function () {
            Lightbox.changeData(Lightbox.activeImage + 1);
            return false
        });
        $('#bottomNavZoom').click(function () {
            Lightbox.changeData(Lightbox.activeImage, true);
            return false
        });
        $('#bottomNavZoomOut').click(function () {
            Lightbox.changeData(Lightbox.activeImage, false);
            return false
        });
        $('#lightshowPause').click(function () {
            Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
            return false
        });
        $('#lightshowPlay').click(function () {
            Lightbox.togglePlayPause("lightshowPlay", "lightshowPause");
            return false
        });
        $('#prevLink, #nextLink, #framePrevLink, #frameNextLink').css({paddingTop: Lightbox.borderSize + 'px'});
        $('#imageContainer, #frameContainer, #modalContainer').css({padding: Lightbox.borderSize + 'px'});
        $('#outerImageContainer, #imageDataContainer, #bottomNavClose').css({
            backgroundColor: '#' + Lightbox.boxColor,
            color: '#' + Lightbox.fontColor
        });
        if (Lightbox.alternative_layout) {
            $('#bottomNavZoom, #bottomNavZoomOut').css({
                bottom: Lightbox.borderSize + 'px',
                right: Lightbox.borderSize + 'px'
            })
        } else if (Lightbox.rtl == 1 && $.browser.msie)$('#bottomNavZoom, #bottomNavZoomOut').css({left: '0px'});
        if (s.force_show_nav)$('#prevLink, #nextLink').addClass("force_show_nav")
    },
    initList: function (context) {
        if (context == undefined || context == null)context = document;
        $("a[rel^='lightbox']:not(.lightbox-processed), area[rel^='lightbox']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            if (Lightbox.disableCloseClick) {
                $('#lightbox').unbind('click');
                $('#lightbox').click(function () {
                    Lightbox.end('forceClose')
                })
            }
            ;
            Lightbox.start(this, false, false, false, false);
            if (e.preventDefault)e.preventDefault();
            return false
        });
        $("a[rel^='lightshow']:not(.lightbox-processed), area[rel^='lightshow']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            if (Lightbox.disableCloseClick) {
                $('#lightbox').unbind('click');
                $('#lightbox').click(function () {
                    Lightbox.end('forceClose')
                })
            }
            ;
            Lightbox.start(this, true, false, false, false);
            if (e.preventDefault)e.preventDefault();
            return false
        });
        $("a[rel^='lightframe']:not(.lightbox-processed), area[rel^='lightframe']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            if (Lightbox.disableCloseClick) {
                $('#lightbox').unbind('click');
                $('#lightbox').click(function () {
                    Lightbox.end('forceClose')
                })
            }
            ;
            Lightbox.start(this, false, true, false, false);
            if (e.preventDefault)e.preventDefault();
            return false
        });
        if (Lightbox.enableVideo)$("a[rel^='lightvideo']:not(.lightbox-processed), area[rel^='lightvideo']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            if (Lightbox.disableCloseClick) {
                $('#lightbox').unbind('click');
                $('#lightbox').click(function () {
                    Lightbox.end('forceClose')
                })
            }
            ;
            Lightbox.start(this, false, false, true, false);
            if (e.preventDefault)e.preventDefault();
            return false
        });
        $("a[rel^='lightmodal']:not(.lightbox-processed), area[rel^='lightmodal']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            $('#lightbox').unbind('click');
            $('#lightbox').addClass($(this).attr('class'));
            $('#lightbox').removeClass('lightbox-processed');
            Lightbox.start(this, false, false, false, true);
            if (e.preventDefault)e.preventDefault();
            return false
        });
        $("#lightboxAutoModal:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function (e) {
            Lightbox.auto_modal = true;
            $('#lightbox').unbind('click');
            Lightbox.start(this, false, false, false, true);
            if (e.preventDefault)e.preventDefault();
            return false
        })
    },
    start: function (imageLink, slideshow, lightframe, lightvideo, lightmodal) {
        Lightbox.isPaused = !Lightbox.autoStart;
        Lightbox.toggleSelectsFlash('hide');
        var arrayPageSize = Lightbox.getPageSize();
        $("#lightbox2-overlay").hide().css({
            width: '100%',
            zIndex: '10090',
            height: arrayPageSize[1] + 'px',
            backgroundColor: '#' + Lightbox.overlayColor
        });
        if (lightvideo && this.detectMacFF2()) {
            $("#lightbox2-overlay").removeClass("overlay_default");
            $("#lightbox2-overlay").addClass("overlay_macff2");
            $("#lightbox2-overlay").css({opacity: null})
        } else {
            $("#lightbox2-overlay").removeClass("overlay_macff2");
            $("#lightbox2-overlay").addClass("overlay_default");
            $("#lightbox2-overlay").css({opacity: Lightbox.overlayOpacity})
        }
        ;
        $("#lightbox2-overlay").fadeIn(Lightbox.fadeInSpeed);
        Lightbox.isSlideshow = slideshow;
        Lightbox.isLightframe = lightframe;
        Lightbox.isVideo = lightvideo;
        Lightbox.isModal = lightmodal;
        Lightbox.imageArray = [];
        Lightbox.imageNum = 0;
        var anchors = $(imageLink.tagName), anchor = null, rel_parts = Lightbox.parseRel(imageLink), rel = rel_parts.rel, rel_group = rel_parts.group, title = (rel_parts.title ? rel_parts.title : imageLink.title), rel_style = null, i = 0;
        if (rel_parts.flashvars)Lightbox.flvFlashvars = Lightbox.flvFlashvars + '&' + rel_parts.flashvars;
        var alt = imageLink.title;
        if (!alt) {
            var img = $(imageLink).find("img");
            if (img && $(img).attr("alt")) {
                alt = $(img).attr("alt")
            } else alt = title
        }
        ;
        if ($(imageLink).attr('id') == 'lightboxAutoModal') {
            rel_style = rel_parts.style;
            Lightbox.imageArray.push(['#lightboxAutoModal > *', title, alt, rel_style, 1])
        } else if ((rel == 'lightbox' || rel == 'lightshow') && !rel_group) {
            Lightbox.imageArray.push([imageLink.href, title, alt])
        } else if (!rel_group) {
            rel_style = rel_parts.style;
            Lightbox.imageArray.push([imageLink.href, title, alt, rel_style])
        } else {
            for (i = 0; i < anchors.length; i++) {
                anchor = anchors[i];
                if (anchor.href && typeof(anchor.href) == "string" && $(anchor).attr('rel')) {
                    var rel_data = Lightbox.parseRel(anchor), anchor_title = (rel_data.title ? rel_data.title : anchor.title);
                    img_alt = anchor.title;
                    if (!img_alt) {
                        var anchor_img = $(anchor).find("img");
                        if (anchor_img && $(anchor_img).attr("alt")) {
                            img_alt = $(anchor_img).attr("alt")
                        } else img_alt = title
                    }
                    ;
                    if (rel_data.rel == rel)if (rel_data.group == rel_group) {
                        if (Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo)rel_style = rel_data.style;
                        Lightbox.imageArray.push([anchor.href, anchor_title, img_alt, rel_style])
                    }
                }
            }
            ;
            for (i = 0; i < Lightbox.imageArray.length; i++)for (j = Lightbox.imageArray.length - 1; j > i; j--)if (Lightbox.imageArray[i][0] == Lightbox.imageArray[j][0])Lightbox.imageArray.splice(j, 1);
            while (Lightbox.imageArray[Lightbox.imageNum][0] != imageLink.href)Lightbox.imageNum++
        }
        ;
        if (Lightbox.isSlideshow && Lightbox.showPlayPause && Lightbox.isPaused) {
            $('#lightshowPlay').show();
            $('#lightshowPause').hide()
        }
        ;
        var arrayPageScroll = Lightbox.getPageScroll(), lightboxTop = arrayPageScroll[1] + (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1, lightboxLeft = arrayPageScroll[0];
        $('#frameContainer, #modalContainer, #lightboxImage').hide();
        $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
        $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
        $('#outerImageContainer').css({width: '250px', height: '250px'});
        $('#lightbox').css({zIndex: '10500', top: lightboxTop + 'px', left: lightboxLeft + 'px'}).show();
        Lightbox.total = Lightbox.imageArray.length;
        Lightbox.changeData(Lightbox.imageNum)
    },
    changeData: function (imageNum, zoomIn) {
        if (Lightbox.inprogress === false) {
            if (Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) {
                if (imageNum >= Lightbox.total)imageNum = 0;
                if (imageNum < 0)imageNum = Lightbox.total - 1
            }
            ;
            if (Lightbox.isSlideshow)for (var i = 0; i < Lightbox.slideIdCount; i++)window.clearTimeout(Lightbox.slideIdArray[i]);
            Lightbox.inprogress = true;
            Lightbox.activeImage = imageNum;
            if (Lightbox.disableResize && !Lightbox.isSlideshow)zoomIn = true;
            Lightbox.isZoomedIn = zoomIn;
            $('#loading').css({zIndex: '10500'}).show();
            if (!Lightbox.alternative_layout)$('#imageContainer').hide();
            $('#frameContainer, #modalContainer, #lightboxImage').hide();
            $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
            $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
            if (!Lightbox.isLightframe && !Lightbox.isVideo && !Lightbox.isModal) {
                $("#lightbox #imageDataContainer").removeClass('lightbox2-alt-layout-data');
                imgPreloader = new Image();
                imgPreloader.onerror = function () {
                    Lightbox.imgNodeLoadingError(this)
                };
                imgPreloader.onload = function () {
                    var photo = document.getElementById('lightboxImage');
                    photo.src = Lightbox.imageArray[Lightbox.activeImage][0];
                    photo.alt = Lightbox.imageArray[Lightbox.activeImage][2];
                    var imageWidth = imgPreloader.width, imageHeight = imgPreloader.height, arrayPageSize = Lightbox.getPageSize(), targ = {
                        w: arrayPageSize[2] - (Lightbox.borderSize * 2),
                        h: arrayPageSize[3] - (Lightbox.borderSize * 6) - (Lightbox.infoHeight * 4) - (arrayPageSize[3] / 10)
                    }, orig = {w: imgPreloader.width, h: imgPreloader.height};
                    if (zoomIn !== true) {
                        var ratio = 1.0;
                        $('#bottomNavZoomOut, #bottomNavZoom').hide();
                        if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
                            ratio = ((targ.w / orig.w) < (targ.h / orig.h)) ? targ.w / orig.w : targ.h / orig.h;
                            if (!Lightbox.disableZoom && !Lightbox.isSlideshow)$('#bottomNavZoom').css({zIndex: '10500'}).show()
                        }
                        ;
                        imageWidth = Math.floor(orig.w * ratio);
                        imageHeight = Math.floor(orig.h * ratio)
                    } else {
                        $('#bottomNavZoom').hide();
                        if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w)if (!Lightbox.disableResize && Lightbox.isSlideshow === false && !Lightbox.disableZoom)$('#bottomNavZoomOut').css({zIndex: '10500'}).show()
                    }
                    ;
                    photo.style.width = imageWidth + 'px';
                    photo.style.height = imageHeight + 'px';
                    Lightbox.resizeContainer(imageWidth, imageHeight);
                    imgPreloader.onload = function () {
                    }
                };
                imgPreloader.src = Lightbox.imageArray[Lightbox.activeImage][0];
                imgPreloader.alt = Lightbox.imageArray[Lightbox.activeImage][2]
            } else if (Lightbox.isLightframe) {
                $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
                var src = Lightbox.imageArray[Lightbox.activeImage][0];
                $('#frameContainer').html('<iframe id="lightboxFrame" style="display: none;" src="' + src + '"></iframe>');
                if ($.browser.mozilla && src.indexOf('.swf') != -1)setTimeout(function () {
                    document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0]
                }, 1e3);
                if (!Lightbox.iframe_border) {
                    $('#lightboxFrame').css({border: 'none'});
                    $('#lightboxFrame').attr('frameborder', '0')
                }
                ;
                var iframe = document.getElementById('lightboxFrame'), iframeStyles = Lightbox.imageArray[Lightbox.activeImage][3];
                iframe = Lightbox.setStyles(iframe, iframeStyles);
                Lightbox.resizeContainer(parseInt(iframe.width, 10), parseInt(iframe.height, 10))
            } else if (Lightbox.isVideo || Lightbox.isModal) {
                $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
                var container = document.getElementById('modalContainer'), modalStyles = Lightbox.imageArray[Lightbox.activeImage][3];
                container = Lightbox.setStyles(container, modalStyles);
                if (Lightbox.isVideo) {
                    Lightbox.modalHeight = parseInt(container.height, 10) - 10;
                    Lightbox.modalWidth = parseInt(container.width, 10) - 10;
                    Lightvideo.startVideo(Lightbox.imageArray[Lightbox.activeImage][0])
                }
                ;
                Lightbox.resizeContainer(parseInt(container.width, 10), parseInt(container.height, 10))
            }
        }
    },
    imgNodeLoadingError: function (image) {
        var s = Drupal.settings.lightbox2, original_image = Lightbox.imageArray[Lightbox.activeImage][0];
        if (s.display_image_size !== "")original_image = original_image.replace(new RegExp("." + s.display_image_size), "");
        Lightbox.imageArray[Lightbox.activeImage][0] = original_image;
        image.onerror = function () {
            Lightbox.imgLoadingError(image)
        };
        image.src = original_image
    },
    imgLoadingError: function (image) {
        var s = Drupal.settings.lightbox2;
        Lightbox.imageArray[Lightbox.activeImage][0] = s.default_image;
        image.src = s.default_image
    },
    resizeContainer: function (imgWidth, imgHeight) {
        imgWidth = (imgWidth < Lightbox.minWidth ? Lightbox.minWidth : imgWidth);
        this.widthCurrent = $('#outerImageContainer').width();
        this.heightCurrent = $('#outerImageContainer').height();
        var widthNew = (imgWidth + (Lightbox.borderSize * 2)), heightNew = (imgHeight + (Lightbox.borderSize * 2));
        this.xScale = (widthNew / this.widthCurrent) * 100;
        this.yScale = (heightNew / this.heightCurrent) * 100;
        wDiff = this.widthCurrent - widthNew;
        hDiff = this.heightCurrent - heightNew;
        $('#modalContainer').css({width: imgWidth, height: imgHeight});
        if (Lightbox.resizeSequence) {
            var animate1 = {width: widthNew}, animate2 = {height: heightNew};
            if (Lightbox.resizeSequence == 2) {
                animate1 = {height: heightNew};
                animate2 = {width: widthNew}
            }
            ;
            $('#outerImageContainer').animate(animate1, Lightbox.resizeSpeed).animate(animate2, Lightbox.resizeSpeed, 'linear', function () {
                Lightbox.showData()
            })
        } else $('#outerImageContainer').animate({
            width: widthNew,
            height: heightNew
        }, Lightbox.resizeSpeed, 'linear', function () {
            Lightbox.showData()
        });
        if ((hDiff === 0) && (wDiff === 0))if ($.browser.msie) {
            Lightbox.pause(250)
        } else Lightbox.pause(100);
        var s = Drupal.settings.lightbox2;
        if (!s.use_alt_layout)$('#prevLink, #nextLink').css({height: imgHeight + 'px'});
        $('#imageDataContainer').css({width: widthNew + 'px'})
    },
    showData: function () {
        $('#loading').hide();
        if (Lightbox.isLightframe || Lightbox.isVideo || Lightbox.isModal) {
            Lightbox.updateDetails();
            if (Lightbox.isLightframe) {
                $('#frameContainer').show();
                if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
                    $('#lightboxFrame').css({zIndex: '10500'}).show()
                } else $('#lightboxFrame').css({zIndex: '10500'}).fadeIn(Lightbox.fadeInSpeed)
            } else if (Lightbox.isVideo) {
                $("#modalContainer").html(Lightbox.modalHTML).click(function () {
                    return false
                }).css('zIndex', '10500').show()
            } else {
                var src = unescape(Lightbox.imageArray[Lightbox.activeImage][0]);
                if (Lightbox.imageArray[Lightbox.activeImage][4]) {
                    $(src).appendTo("#modalContainer");
                    $('#modalContainer').css({zIndex: '10500'}).show()
                } else $("#modalContainer").hide().load(src, function () {
                    $('#modalContainer').css({zIndex: '10500'}).show()
                });
                $('#modalContainer').unbind('click')
            }
        } else {
            $('#imageContainer').show();
            if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
                $('#lightboxImage').css({zIndex: '10500'}).show()
            } else $('#lightboxImage').css({zIndex: '10500'}).fadeIn(Lightbox.fadeInSpeed);
            Lightbox.updateDetails();
            this.preloadNeighborImages()
        }
        ;
        Lightbox.inprogress = false;
        if (Lightbox.isSlideshow) {
            if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
                if (Lightbox.autoExit)Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {
                    Lightbox.end('slideshow')
                }, Lightbox.slideInterval)
            } else if (!Lightbox.isPaused && Lightbox.total > 1)Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {
                Lightbox.changeData(Lightbox.activeImage + 1)
            }, Lightbox.slideInterval);
            if (Lightbox.showPlayPause && Lightbox.total > 1 && !Lightbox.isPaused) {
                $('#lightshowPause').show();
                $('#lightshowPlay').hide()
            } else if (Lightbox.showPlayPause && Lightbox.total > 1) {
                $('#lightshowPause').hide();
                $('#lightshowPlay').show()
            }
        }
        ;
        var arrayPageSize = Lightbox.getPageSize(), arrayPageScroll = Lightbox.getPageScroll(), pageHeight = arrayPageSize[1];
        if (Lightbox.isZoomedIn && arrayPageSize[1] > arrayPageSize[3]) {
            var lightboxTop = (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
            pageHeight = pageHeight + arrayPageScroll[1] + lightboxTop
        }
        ;
        $('#lightbox2-overlay').css({height: pageHeight + 'px', width: arrayPageSize[0] + 'px'});
        if ($.browser.mozilla)if (Lightbox.imageArray[Lightbox.activeImage][0].indexOf(".pdf") != -1)setTimeout(function () {
            document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0]
        }, 1e3)
    },
    updateDetails: function () {
        $("#imageDataContainer").hide();
        var s = Drupal.settings.lightbox2;
        if (s.show_caption) {
            var caption = Lightbox.filterXSS(Lightbox.imageArray[Lightbox.activeImage][1]);
            if (!caption)caption = '';
            $('#caption').html(caption).css({zIndex: '10500'}).show()
        }
        ;
        var numberDisplay = null;
        if (s.image_count && Lightbox.total > 1) {
            var currentImage = Lightbox.activeImage + 1;
            if (!Lightbox.isLightframe && !Lightbox.isModal && !Lightbox.isVideo) {
                numberDisplay = s.image_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total)
            } else if (Lightbox.isVideo) {
                numberDisplay = s.video_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total)
            } else numberDisplay = s.page_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
            $('#numberDisplay').html(numberDisplay).css({zIndex: '10500'}).show()
        } else $('#numberDisplay').hide();
        $("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed, function () {
            $("#bottomNav").show()
        });
        if (Lightbox.rtl == 1)$("#bottomNav").css({'float': 'left'});
        Lightbox.updateNav()
    },
    updateNav: function () {
        $('#hoverNav').css({zIndex: '10500'}).show();
        var prevLink = '#prevLink', nextLink = '#nextLink';
        if (Lightbox.isSlideshow) {
            if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage !== 0) {
                $(prevLink).css({zIndex: '10500'}).show().click(function () {
                    if (Lightbox.pauseOnPrevClick)Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
                    Lightbox.changeData(Lightbox.activeImage - 1);
                    return false
                })
            } else $(prevLink).hide();
            if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage != (Lightbox.total - 1)) {
                $(nextLink).css({zIndex: '10500'}).show().click(function () {
                    if (Lightbox.pauseOnNextClick)Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
                    Lightbox.changeData(Lightbox.activeImage + 1);
                    return false
                })
            } else $(nextLink).hide()
        } else {
            if ((Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) && !Lightbox.alternative_layout) {
                $('#frameHoverNav').css({zIndex: '10500'}).show();
                $('#hoverNav').css({zIndex: '10500'}).hide();
                prevLink = '#framePrevLink';
                nextLink = '#frameNextLink'
            }
            ;
            if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage !== 0) {
                $(prevLink).css({zIndex: '10500'}).show().unbind().click(function () {
                    Lightbox.changeData(Lightbox.activeImage - 1);
                    return false
                })
            } else $(prevLink).hide();
            if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage != (Lightbox.total - 1)) {
                $(nextLink).css({zIndex: '10500'}).show().unbind().click(function () {
                    Lightbox.changeData(Lightbox.activeImage + 1);
                    return false
                })
            } else $(nextLink).hide()
        }
        ;
        if (!Lightbox.isModal)this.enableKeyboardNav()
    },
    enableKeyboardNav: function () {
        $(document).bind("keydown", this.keyboardAction)
    },
    disableKeyboardNav: function () {
        $(document).unbind("keydown", this.keyboardAction)
    },
    keyboardAction: function (e) {
        if (e === null) {
            keycode = event.keyCode;
            escapeKey = 27
        } else {
            keycode = e.keyCode;
            escapeKey = e.DOM_VK_ESCAPE
        }
        ;
        key = String.fromCharCode(keycode).toLowerCase();
        if (Lightbox.checkKey(Lightbox.keysClose, key, keycode)) {
            Lightbox.end('forceClose')
        } else if (Lightbox.checkKey(Lightbox.keysPrevious, key, keycode)) {
            if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage !== 0)Lightbox.changeData(Lightbox.activeImage - 1)
        } else if (Lightbox.checkKey(Lightbox.keysNext, key, keycode)) {
            if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage != (Lightbox.total - 1))Lightbox.changeData(Lightbox.activeImage + 1)
        } else if (Lightbox.checkKey(Lightbox.keysZoom, key, keycode) && !Lightbox.disableResize && !Lightbox.disableZoom && !Lightbox.isSlideshow && !Lightbox.isLightframe) {
            if (Lightbox.isZoomedIn) {
                Lightbox.changeData(Lightbox.activeImage, false)
            } else if (!Lightbox.isZoomedIn)Lightbox.changeData(Lightbox.activeImage, true);
            return false
        } else if (Lightbox.checkKey(Lightbox.keysPlayPause, key, keycode) && Lightbox.isSlideshow) {
            if (Lightbox.isPaused) {
                Lightbox.togglePlayPause("lightshowPlay", "lightshowPause")
            } else Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
            return false
        }
    },
    preloadNeighborImages: function () {
        if ((Lightbox.total - 1) > Lightbox.activeImage) {
            preloadNextImage = new Image();
            preloadNextImage.src = Lightbox.imageArray[Lightbox.activeImage + 1][0]
        }
        ;
        if (Lightbox.activeImage > 0) {
            preloadPrevImage = new Image();
            preloadPrevImage.src = Lightbox.imageArray[Lightbox.activeImage - 1][0]
        }
    },
    end: function (caller) {
        var closeClick = (caller == 'slideshow' ? false : true);
        if (Lightbox.isSlideshow && Lightbox.isPaused && !closeClick)return;
        if (Lightbox.inprogress === true && caller != 'forceClose')return;
        Lightbox.disableKeyboardNav();
        $('#lightbox').hide();
        $("#lightbox2-overlay").fadeOut();
        Lightbox.isPaused = true;
        Lightbox.inprogress = false;
        Lightbox.toggleSelectsFlash('visible');
        if (Lightbox.isSlideshow) {
            for (var i = 0; i < Lightbox.slideIdCount; i++)window.clearTimeout(Lightbox.slideIdArray[i]);
            $('#lightshowPause, #lightshowPlay').hide()
        } else if (Lightbox.isLightframe) {
            $('#frameContainer').empty().hide()
        } else if (Lightbox.isVideo || Lightbox.isModal) {
            if (!Lightbox.auto_modal)$('#modalContainer').hide().html("");
            Lightbox.auto_modal = false
        }
    },
    getPageScroll: function () {
        var xScroll, yScroll;
        if (self.pageYOffset || self.pageXOffset) {
            yScroll = self.pageYOffset;
            xScroll = self.pageXOffset
        } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            yScroll = document.documentElement.scrollTop;
            xScroll = document.documentElement.scrollLeft
        } else if (document.body) {
            yScroll = document.body.scrollTop;
            xScroll = document.body.scrollLeft
        }
        ;
        arrayPageScroll = [xScroll, yScroll];
        return arrayPageScroll
    },
    getPageSize: function () {
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY
        } else if (document.body.scrollHeight > document.body.offsetHeight) {
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight
        } else {
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight
        }
        ;
        var windowWidth, windowHeight;
        if (self.innerHeight) {
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth
            } else windowWidth = self.innerWidth;
            windowHeight = self.innerHeight
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight
        } else if (document.body) {
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight
        }
        ;
        if (yScroll < windowHeight) {
            pageHeight = windowHeight
        } else pageHeight = yScroll;
        if (xScroll < windowWidth) {
            pageWidth = xScroll
        } else pageWidth = windowWidth;
        arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
        return arrayPageSize
    },
    pause: function (ms) {
        var date = new Date(), curDate = null;
        do {
            curDate = new Date()
        } while (curDate - date < ms)
    },
    toggleSelectsFlash: function (state) {
        if (state == 'visible') {
            $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").show()
        } else if (state == 'hide') {
            $("select:visible, embed:visible, object:visible").not('#lightboxAutoModal select, #lightboxAutoModal embed, #lightboxAutoModal object').addClass("lightbox_hidden");
            $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").hide()
        }
    },
    parseRel: function (link) {
        var parts = [];
        parts.rel = parts.title = parts.group = parts.style = parts.flashvars = null;
        if (!$(link).attr('rel'))return parts;
        parts.rel = $(link).attr('rel').match(/\w+/)[0];
        if ($(link).attr('rel').match(/\[(.*)\]/)) {
            var info = $(link).attr('rel').match(/\[(.*?)\]/)[1].split('|');
            parts.group = info[0];
            parts.style = info[1];
            if (parts.style != undefined && parts.style.match(/flashvars:\s?(.*?);/))parts.flashvars = parts.style.match(/flashvars:\s?(.*?);/)[1]
        }
        ;
        if ($(link).attr('rel').match(/\[.*\]\[(.*)\]/))parts.title = $(link).attr('rel').match(/\[.*\]\[(.*)\]/)[1];
        return parts
    },
    setStyles: function (item, styles) {
        item.width = Lightbox.iframe_width;
        item.height = Lightbox.iframe_height;
        item.scrolling = "auto";
        if (!styles)return item;
        var stylesArray = styles.split(';');
        for (var i = 0; i < stylesArray.length; i++)if (stylesArray[i].indexOf('width:') >= 0) {
            var w = stylesArray[i].replace('width:', '');
            item.width = jQuery.trim(w)
        } else if (stylesArray[i].indexOf('height:') >= 0) {
            var h = stylesArray[i].replace('height:', '');
            item.height = jQuery.trim(h)
        } else if (stylesArray[i].indexOf('scrolling:') >= 0) {
            var scrolling = stylesArray[i].replace('scrolling:', '');
            item.scrolling = jQuery.trim(scrolling)
        } else if (stylesArray[i].indexOf('overflow:') >= 0) {
            var overflow = stylesArray[i].replace('overflow:', '');
            item.overflow = jQuery.trim(overflow)
        }
        ;
        return item
    },
    togglePlayPause: function (hideId, showId) {
        if (Lightbox.isSlideshow && hideId == "lightshowPause")for (var i = 0; i < Lightbox.slideIdCount; i++)window.clearTimeout(Lightbox.slideIdArray[i]);
        $('#' + hideId).hide();
        $('#' + showId).show();
        if (hideId == "lightshowPlay") {
            Lightbox.isPaused = false;
            if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
                Lightbox.end()
            } else if (Lightbox.total > 1)Lightbox.changeData(Lightbox.activeImage + 1)
        } else Lightbox.isPaused = true
    },
    triggerLightbox: function (rel_type, rel_group) {
        if (rel_type.length)if (rel_group && rel_group.length) {
            $("a[rel^='" + rel_type + "\[" + rel_group + "\]'], area[rel^='" + rel_type + "\[" + rel_group + "\]']").eq(0).trigger("click")
        } else $("a[rel^='" + rel_type + "'], area[rel^='" + rel_type + "']").eq(0).trigger("click")
    },
    detectMacFF2: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/firefox[\/\s](\d+\.\d+)/.test(ua)) {
            var ffversion = new Number(RegExp.$1);
            if (ffversion < 3 && ua.indexOf('mac') != -1)return true
        }
        ;
        return false
    },
    checkKey: function (keys, key, code) {
        return (jQuery.inArray(key, keys) != -1 || jQuery.inArray(String(code), keys) != -1)
    },
    filterXSS: function (str, allowed_tags) {
        var output = "";
        $.ajax({
            url: Drupal.settings.basePath + 'system/lightbox2/filter-xss',
            data: {string: str, allowed_tags: allowed_tags},
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                output = data
            }
        });
        return output
    }
};
Drupal.behaviors.initLightbox = function (context) {
    $('body:not(.lightbox-processed)', context).addClass('lightbox-processed').each(function () {
        Lightbox.initialize();
        return false
    });
    Lightbox.initList(context);
    $('#lightboxAutoModal', context).triggerHandler('click')
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/lightbox2/js/lightbox.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/superfish.js. */
(function ($) {
    $.fn.superfish = function (op) {
        var sf = $.fn.superfish, c = sf.c, $arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')), over = function () {
            var $$ = $(this), menu = getMenu($$);
            clearTimeout(menu.sfTimer);
            $$.showSuperfishUl().siblings().hideSuperfishUl()
        }, out = function () {
            var $$ = $(this), menu = getMenu($$), o = sf.op;
            clearTimeout(menu.sfTimer);
            menu.sfTimer = setTimeout(function () {
                o.retainPath = ($.inArray($$[0], o.$path) > -1);
                $$.hideSuperfishUl();
                if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1)over.call(o.$path)
            }, o.delay)
        }, getMenu = function ($menu) {
            var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
            sf.op = sf.o[menu.serial];
            return menu
        }, addArrow = function ($a) {
            $a.addClass(c.anchorClass).append($arrow.clone())
        };
        return this.each(function () {
            var s = this.serial = sf.o.length, o = $.extend({}, sf.defaults, op);
            o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function () {
                $(this).addClass([o.hoverClass, c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)
            });
            sf.o[s] = sf.op = o;
            $('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function () {
                if (o.autoArrows)addArrow($('>a:first-child', this))
            }).not('.' + c.bcClass).hideSuperfishUl();
            var $a = $('a', this);
            $a.each(function (i) {
                var $li = $a.eq(i).parents('li');
                $a.eq(i).focus(function () {
                    over.call($li)
                }).blur(function () {
                    out.call($li)
                })
            });
            o.onInit.call(this)
        }).each(function () {
            var menuClasses = [c.menuClass];
            if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7))menuClasses.push(c.shadowClass);
            $(this).addClass(menuClasses.join(' '))
        })
    };
    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};
    sf.IE7fix = function () {
        var o = sf.op;
        if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined)this.toggleClass(sf.c.shadowClass + '-off')
    };
    sf.c = {
        bcClass: 'sf-breadcrumb',
        menuClass: 'sf-js-enabled',
        anchorClass: 'sf-with-ul',
        arrowClass: 'sf-sub-indicator',
        shadowClass: 'sf-shadow'
    };
    sf.defaults = {
        hoverClass: 'sfHover',
        pathClass: 'overideThisToUse',
        pathLevels: 1,
        delay: 800,
        animation: {opacity: 'show'},
        speed: 'normal',
        autoArrows: true,
        dropShadows: true,
        disableHI: false,
        onInit: function () {
        },
        onBeforeShow: function () {
        },
        onShow: function () {
        },
        onHide: function () {
        }
    };
    $.fn.extend({
        hideSuperfishUl: function () {
            var o = sf.op, not = (o.retainPath === true) ? o.$path : '';
            o.retainPath = false;
            var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility', 'hidden');
            o.onHide.call($ul);
            return this
        }, showSuperfishUl: function () {
            var o = sf.op, sh = sf.c.shadowClass + '-off', $ul = this.addClass(o.hoverClass).find('>ul:hidden').css('visibility', 'visible');
            sf.IE7fix.call($ul);
            o.onBeforeShow.call($ul);
            $ul.animate(o.animation, o.speed, function () {
                sf.IE7fix.call($ul);
                o.onShow.call($ul)
            });
            return this
        }
    })
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/superfish.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/jquery.bgiframe.min.js. */
(function ($) {
    $.fn.bgIframe = $.fn.bgiframe = function (s) {
        if ($.browser.msie && parseInt($.browser.version) <= 6) {
            s = $.extend({
                top: 'auto',
                left: 'auto',
                width: 'auto',
                height: 'auto',
                opacity: true,
                src: 'javascript:false;'
            }, s || {});
            var prop = function (n) {
                return n && n.constructor == Number ? n + 'px' : n
            }, html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') + 'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';"/>';
            return this.each(function () {
                if ($('> iframe.bgiframe', this).length == 0)this.insertBefore(document.createElement(html), this.firstChild)
            })
        }
        ;
        return this
    };
    if (!$.browser.version)$.browser.version = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/jquery.bgiframe.min.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/jquery.hoverIntent.minified.js. */
(function ($) {
    $.fn.hoverIntent = function (f, g) {
        var cfg = {sensitivity: 7, interval: 100, timeout: 0};
        cfg = $.extend(cfg, g ? {over: f, out: g} : f);
        var cX, cY, pX, pY, track = function (ev) {
            cX = ev.pageX;
            cY = ev.pageY
        }, compare = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob)
                }, cfg.interval)
            }
        }, delay = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev])
        }, handleHover = function (e) {
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while (p && p != this)try {
                p = p.parentNode
            } catch (e) {
                p = this
            }
            ;
            if (p == this)return false;
            var ev = jQuery.extend({}, e), ob = this;
            if (ob.hoverIntent_t)ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if (e.type == "mouseover") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1)ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob)
                }, cfg.interval)
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1)ob.hoverIntent_t = setTimeout(function () {
                    delay(ev, ob)
                }, cfg.timeout)
            }
        };
        return this.mouseover(handleHover).mouseout(handleHover)
    }
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/superfish/js/jquery.hoverIntent.minified.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/nice_menus.js. */
(function ($) {
    $(document).ready(function () {
        $('ul.nice-menu').superfish({
            hoverClass: 'over',
            autoArrows: false,
            dropShadows: false,
            delay: Drupal.settings.nice_menus_options.delay,
            speed: Drupal.settings.nice_menus_options.speed
        }).find('ul').bgIframe({opacity: false});
        $('ul.nice-menu ul').css('display', 'none')
    })
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/nice_menus/nice_menus.js. */
/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.88 (08-JUN-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.2.6 or later
 */
(function ($) {
    var ver = "2.88";
    if ($.support == undefined) {
        $.support = {opacity: !($.browser.msie)};
    }
    function debug(s) {
        if ($.fn.cycle.debug) {
            log(s);
        }
    }

    function log() {
        if (window.console && window.console.log) {
            window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
        }
    }

    $.fn.cycle = function (options, arg2) {
        var o = {s: this.selector, c: this.context};
        if (this.length === 0 && options != "stop") {
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing slideshow");
                $(function () {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this;
        }
        return this.each(function () {
            var opts = handleArguments(this, options, arg2);
            if (opts === false) {
                return;
            }
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) {
                clearTimeout(this.cycleTimeout);
            }
            this.cycleTimeout = this.cyclePause = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                log("terminating; too few slides: " + els.length);
                return;
            }
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false) {
                return;
            }
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.rev);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10) {
                    startTime = 10;
                }
                debug("first timeout: " + startTime);
                this.cycleTimeout = setTimeout(function () {
                    go(els, opts2, 0, (!opts2.rev && !opts.backwards));
                }, startTime);
            }
        });
    };
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop == undefined) {
            cont.cycleStop = 0;
        }
        if (options === undefined || options === null) {
            options = {};
        }
        if (options.constructor == String) {
            switch (options) {
                case"destroy":
                case"stop":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        return false;
                    }
                    cont.cycleStop++;
                    if (cont.cycleTimeout) {
                        clearTimeout(cont.cycleTimeout);
                    }
                    cont.cycleTimeout = 0;
                    $(cont).removeData("cycle.opts");
                    if (options == "destroy") {
                        destroy(opts);
                    }
                    return false;
                case"toggle":
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    return false;
                case"pause":
                    cont.cyclePause = 1;
                    return false;
                case"resume":
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    return false;
                case"prev":
                case"next":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {fx: options};
            }
            return options;
        } else {
            if (options.constructor == Number) {
                var num = options;
                options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not advance slide");
                    return false;
                }
                if (num < 0 || num >= options.elements.length) {
                    log("invalid slide index: " + num);
                    return false;
                }
                options.nextSlide = num;
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                if (typeof arg2 == "string") {
                    options.oneTimeFx = arg2;
                }
                go(options.elements, options, 1, num >= options.currSlide);
                return false;
            }
        }
        return options;
        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not resume");
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, (!opts.rev && !opts.backwards));
            }
        }
    }

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute("filter");
            } catch (smother) {
            }
        }
    }

    function destroy(opts) {
        if (opts.next) {
            $(opts.next).unbind(opts.prevNextEvent);
        }
        if (opts.prev) {
            $(opts.prev).unbind(opts.prevNextEvent);
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            $.each(opts.pagerAnchors || [], function () {
                this.unbind().remove();
            });
        }
        opts.pagerAnchors = null;
        if (opts.destroy) {
            opts.destroy(opts);
        }
    }

    function buildOptions($cont, $slides, els, options, o) {
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        if (opts.autostop) {
            opts.countdown = opts.autostopCount || els.length;
        }
        var cont = $cont[0];
        $cont.data("cycle.opts", opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        opts.after.unshift(function () {
            opts.busy = 0;
        });
        if (!$.support.opacity && opts.cleartype) {
            opts.after.push(function () {
                removeFilter(this, opts);
            });
        }
        if (opts.continuous) {
            opts.after.push(function () {
                go(els, opts, 0, (!opts.rev && !opts.backwards));
            });
        }
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
            clearTypeFix($slides);
        }
        if ($cont.css("position") == "static") {
            $cont.css("position", "relative");
        }
        if (opts.width) {
            $cont.width(opts.width);
        }
        if (opts.height && opts.height != "auto") {
            $cont.height(opts.height);
        }
        if (opts.startingSlide) {
            opts.startingSlide = parseInt(opts.startingSlide);
        } else {
            if (opts.backwards) {
                opts.startingSlide = els.length - 1;
            }
        }
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++) {
                opts.randomMap.push(i);
            }
            opts.randomMap.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            opts.randomIndex = 1;
            opts.startingSlide = opts.randomMap[1];
        } else {
            if (opts.startingSlide >= els.length) {
                opts.startingSlide = 0;
            }
        }
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({position: "absolute", top: 0, left: 0}).hide().each(function (i) {
            var z;
            if (opts.backwards) {
                z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i;
            } else {
                z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            }
            $(this).css("z-index", z);
        });
        $(els[first]).css("opacity", 1).show();
        removeFilter(els[first], opts);
        if (opts.fit && opts.width) {
            $slides.width(opts.width);
        }
        if (opts.fit && opts.height && opts.height != "auto") {
            $slides.height(opts.height);
        }
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0, maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
                if (!w) {
                    w = e.offsetWidth || e.width || $e.attr("width");
                }
                if (!h) {
                    h = e.offsetHeight || e.height || $e.attr("height");
                }
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (maxw > 0 && maxh > 0) {
                $cont.css({width: maxw + "px", height: maxh + "px"});
            }
        }
        if (opts.pause) {
            $cont.hover(function () {
                this.cyclePause++;
            }, function () {
                this.cyclePause--;
            });
        }
        if (supportMultiTransitions(opts) === false) {
            return false;
        }
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function () {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr("height") || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr("width") || 0);
            if ($el.is("img")) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function () {
                            $(o.s, o.c).cycle(options);
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false;
                    } else {
                        log("could not determine size of image: " + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (requeue) {
            return false;
        }
        opts.cssBefore = opts.cssBefore || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(":eq(" + first + ")").css(opts.cssBefore);
        if (opts.cssFirst) {
            $($slides[first]).css(opts.cssFirst);
        }
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout);
            if (opts.speed.constructor == String) {
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed);
            }
            if (!opts.sync) {
                opts.speed = opts.speed / 2;
            }
            var buffer = opts.fx == "shuffle" ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer) {
                opts.timeout += opts.speed;
            }
        }
        if (opts.easing) {
            opts.easeIn = opts.easeOut = opts.easing;
        }
        if (!opts.speedIn) {
            opts.speedIn = opts.speed;
        }
        if (!opts.speedOut) {
            opts.speedOut = opts.speed;
        }
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length) {
                opts.randomIndex = 0;
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.backwards) {
                opts.nextSlide = opts.startingSlide == 0 ? (els.length - 1) : opts.startingSlide - 1;
            } else {
                opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;
            }
        }
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init)) {
                init($cont, $slides, opts);
            } else {
                if (opts.fx != "custom" && !opts.multiFx) {
                    log("unknown transition: " + opts.fx, "; slideshow terminating");
                    return false;
                }
            }
        }
        var e0 = $slides[first];
        if (opts.before.length) {
            opts.before[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.after.length > 1) {
            opts.after[1].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next) {
            $(opts.next).bind(opts.prevNextEvent, function () {
                return advance(opts, opts.rev ? -1 : 1);
            });
        }
        if (opts.prev) {
            $(opts.prev).bind(opts.prevNextEvent, function () {
                return advance(opts, opts.rev ? 1 : -1);
            });
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            buildPager(els, opts);
        }
        exposeAddSlide(opts, els);
        return opts;
    }

    function saveOriginalOpts(opts) {
        opts.original = {before: [], after: []};
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function () {
            opts.original.before.push(this);
        });
        $.each(opts.after, function () {
            opts.original.after.push(this);
        });
    }

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(",") > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, "").split(",");
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log("discarding unknown transition: ", fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            if (!opts.fxs.length) {
                log("No valid transitions named; slideshow terminating.");
                return false;
            }
        } else {
            if (opts.fx == "all") {
                opts.multiFx = true;
                opts.fxs = [];
                for (p in txs) {
                    tx = txs[p];
                    if (txs.hasOwnProperty(p) && $.isFunction(tx)) {
                        opts.fxs.push(p);
                    }
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug("randomized fx sequence: ", opts.fxs);
        }
        return true;
    }

    function exposeAddSlide(opts, els) {
        opts.addSlide = function (newSlide, prepend) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount) {
                opts.countdown++;
            }
            els[prepend ? "unshift" : "push"](s);
            if (opts.els) {
                opts.els[prepend ? "unshift" : "push"](s);
            }
            opts.slideCount = els.length;
            $s.css("position", "absolute");
            $s[prepend ? "prependTo" : "appendTo"](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
                clearTypeFix($s);
            }
            if (opts.fit && opts.width) {
                $s.width(opts.width);
            }
            if (opts.fit && opts.height && opts.height != "auto") {
                $slides.height(opts.height);
            }
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder) {
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);
            }
            if ($.isFunction(opts.onAddSlide)) {
                opts.onAddSlide($s);
            } else {
                $s.hide();
            }
        };
    }

    $.fn.cycle.resetState = function (opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function () {
            opts.before.push(this);
        });
        $.each(opts.original.after, function () {
            opts.after.push(this);
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init)) {
            init(opts.$cont, $(opts.elements), opts);
        }
    };
    function go(els, opts, manual, fwd) {
        if (manual && opts.busy && opts.manualTrump) {
            debug("manualTrump in go(), stopping active transition");
            $(els).stop(true, true);
            opts.busy = false;
        }
        if (opts.busy) {
            debug("transition active, ignoring new tx request");
            return;
        }
        var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual) {
            return;
        }
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end) {
                opts.end(opts);
            }
            return;
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length) {
                    opts.lastFx = 0;
                }
                fx = opts.fxs[opts.lastFx];
                opts.currFx = fx;
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length) {
                $.each(opts.before, function (i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
            }
            var after = function () {
                $.each(opts.after, function (i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
            };
            debug("tx firing; currSlide: " + opts.currSlide + "; nextSlide: " + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn) {
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            } else {
                if ($.isFunction($.fn.cycle[opts.fx])) {
                    $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                } else {
                    $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                }
            }
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide) {
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
                }
            } else {
                if (opts.backwards) {
                    var roll = (opts.nextSlide - 1) < 0;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = 1;
                        opts.currSlide = 0;
                    } else {
                        opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                        opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                    }
                } else {
                    var roll = (opts.nextSlide + 1) == els.length;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = els.length - 2;
                        opts.currSlide = els.length - 1;
                    } else {
                        opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                        opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                    }
                }
            }
        }
        if (changed && opts.pager) {
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
        }
        var ms = 0;
        if (opts.timeout && !opts.continuous) {
            ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
        } else {
            if (opts.continuous && p.cyclePause) {
                ms = 10;
            }
        }
        if (ms > 0) {
            p.cycleTimeout = setTimeout(function () {
                go(els, opts, 0, (!opts.rev && !opts.backwards));
            }, ms);
        }
    }

    $.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
        $(pager).each(function () {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while ((t - opts.speed) < 250) {
                t += opts.speed;
            }
            debug("calculated timeout: " + t + "; speed: " + opts.speed);
            if (t !== false) {
                return t;
            }
        }
        return opts.timeout;
    }

    $.fn.cycle.next = function (opts) {
        advance(opts, opts.rev ? -1 : 1);
    };
    $.fn.cycle.prev = function (opts) {
        advance(opts, opts.rev ? 1 : -1);
    };
    function advance(opts, val) {
        var els = opts.elements;
        var p = opts.$cont[0], timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2) {
                opts.randomIndex = els.length - 2;
            } else {
                if (opts.randomIndex == -1) {
                    opts.randomIndex = els.length - 1;
                }
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.random) {
                opts.nextSlide = opts.randomMap[opts.randomIndex];
            } else {
                opts.nextSlide = opts.currSlide + val;
                if (opts.nextSlide < 0) {
                    if (opts.nowrap) {
                        return false;
                    }
                    opts.nextSlide = els.length - 1;
                } else {
                    if (opts.nextSlide >= els.length) {
                        if (opts.nowrap) {
                            return false;
                        }
                        opts.nextSlide = 0;
                    }
                }
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb)) {
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        }
        go(els, opts, 1, val >= 0);
        return false;
    }

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function (i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }

    $.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug("pagerAnchorBuilder(" + i + ", el) returned: " + a);
        } else {
            a = '<a href="#">' + (i + 1) + "</a>";
        }
        if (!a) {
            return;
        }
        var $a = $(a);
        if ($a.parents("body").length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function () {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            } else {
                $a.appendTo($p);
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        $a.bind(opts.pagerEvent, function (e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0], timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb)) {
                cb(opts.nextSlide, els[opts.nextSlide]);
            }
            go(els, opts, 1, opts.currSlide < i);
        });
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble) {
            $a.bind("click.cycle", function () {
                return false;
            });
        }
        if (opts.pauseOnPagerHover) {
            $a.hover(function () {
                opts.$cont[0].cyclePause++;
            }, function () {
                opts.$cont[0].cyclePause--;
            });
        }
    };
    $.fn.cycle.hopsFromLast = function (opts, fwd) {
        var hops, l = opts.lastSlide, c = opts.currSlide;
        if (fwd) {
            hops = c > l ? c - l : opts.slideCount - l;
        } else {
            hops = c < l ? l - c : l + opts.slideCount - c;
        }
        return hops;
    };
    function clearTypeFix($slides) {
        debug("applying clearType background-color hack");
        function hex(s) {
            s = parseInt(s).toString(16);
            return s.length < 2 ? "0" + s : s;
        }

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != "html"; e = e.parentNode) {
                var v = $.css(e, "background-color");
                if (v.indexOf("rgb") >= 0) {
                    var rgb = v.match(/\d+/g);
                    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != "transparent") {
                    return v;
                }
            }
            return "#ffffff";
        }

        $slides.each(function () {
            $(this).css("background-color", getBg(this));
        });
    }

    $.fn.cycle.commonReset = function (curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = "block";
        if (w !== false && next.cycleW > 0) {
            opts.cssBefore.width = next.cycleW;
        }
        if (h !== false && next.cycleH > 0) {
            opts.cssBefore.height = next.cycleH;
        }
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = "none";
        $(curr).css("zIndex", opts.slideCount + (rev === true ? 1 : 0));
        $(next).css("zIndex", opts.slideCount + (rev === true ? 0 : 1));
    };
    $.fn.cycle.custom = function (curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr), $n = $(next);
        var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == "number") {
                speedIn = speedOut = speedOverride;
            } else {
                speedIn = speedOut = 1;
            }
            easeIn = easeOut = null;
        }
        var fn = function () {
            $n.animate(opts.animIn, speedIn, easeIn, cb);
        };
        $l.animate(opts.animOut, speedOut, easeOut, function () {
            if (opts.cssAfter) {
                $l.css(opts.cssAfter);
            }
            if (!opts.sync) {
                fn();
            }
        });
        if (opts.sync) {
            fn();
        }
    };
    $.fn.cycle.transitions = {
        fade: function ($cont, $slides, opts) {
            $slides.not(":eq(" + opts.currSlide + ")").css("opacity", 0);
            opts.before.push(function (curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = {opacity: 1};
            opts.animOut = {opacity: 0};
            opts.cssBefore = {top: 0, left: 0};
        }
    };
    $.fn.cycle.ver = function () {
        return ver;
    };
    $.fn.cycle.defaults = {
        fx: "fade",
        timeout: 4000,
        timeoutFn: null,
        continuous: 0,
        speed: 1000,
        speedIn: null,
        speedOut: null,
        next: null,
        prev: null,
        onPrevNextEvent: null,
        prevNextEvent: "click.cycle",
        pager: null,
        onPagerEvent: null,
        pagerEvent: "click.cycle",
        allowPagerClickBubble: false,
        pagerAnchorBuilder: null,
        before: null,
        after: null,
        end: null,
        easing: null,
        easeIn: null,
        easeOut: null,
        shuffle: null,
        animIn: null,
        animOut: null,
        cssBefore: null,
        cssAfter: null,
        fxFn: null,
        height: "auto",
        startingSlide: 0,
        sync: 1,
        random: 0,
        fit: 0,
        containerResize: 1,
        pause: 0,
        pauseOnPagerHover: 0,
        autostop: 0,
        autostopCount: 0,
        delay: 0,
        slideExpr: null,
        cleartype: !$.support.opacity,
        cleartypeNoBg: false,
        nowrap: 0,
        fastOnEvent: 0,
        randomizeEffects: 1,
        rev: 0,
        manualTrump: true,
        requeueOnImageNotLoaded: true,
        requeueTimeout: 250,
        activePagerClass: "activeSlide",
        updateActivePagerLink: null,
        backwards: false
    };
})(jQuery);
/*
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.72
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    $.fn.cycle.transitions.none = function ($cont, $slides, opts) {
        opts.fxFn = function (curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    };
    $.fn.cycle.transitions.scrollUp = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore = {top: h, left: 0};
        opts.cssFirst = {top: 0};
        opts.animIn = {top: 0};
        opts.animOut = {top: -h};
    };
    $.fn.cycle.transitions.scrollDown = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst = {top: 0};
        opts.cssBefore = {top: -h, left: 0};
        opts.animIn = {top: 0};
        opts.animOut = {top: h};
    };
    $.fn.cycle.transitions.scrollLeft = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst = {left: 0};
        opts.cssBefore = {left: w, top: 0};
        opts.animIn = {left: 0};
        opts.animOut = {left: 0 - w};
    };
    $.fn.cycle.transitions.scrollRight = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst = {left: 0};
        opts.cssBefore = {left: -w, top: 0};
        opts.animIn = {left: 0};
        opts.animOut = {left: w};
    };
    $.fn.cycle.transitions.scrollHorz = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden").width();
        opts.before.push(function (curr, next, opts, fwd) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst = {left: 0};
        opts.cssBefore = {top: 0};
        opts.animIn = {left: 0};
        opts.animOut = {top: 0};
    };
    $.fn.cycle.transitions.scrollVert = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push(function (curr, next, opts, fwd) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst = {top: 0};
        opts.cssBefore = {left: 0};
        opts.animIn = {top: 0};
        opts.animOut = {left: 0};
    };
    $.fn.cycle.transitions.slideX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore = {left: 0, top: 0, width: 0};
        opts.animIn = {width: "show"};
        opts.animOut = {width: 0};
    };
    $.fn.cycle.transitions.slideY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore = {left: 0, top: 0, height: 0};
        opts.animIn = {height: "show"};
        opts.animOut = {height: 0};
    };
    $.fn.cycle.transitions.shuffle = function ($cont, $slides, opts) {
        var i, w = $cont.css("overflow", "visible").width();
        $slides.css({left: 0, top: 0});
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2;
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {left: -w, top: 15};
        opts.els = [];
        for (i = 0; i < $slides.length; i++) {
            opts.els.push($slides[i]);
        }
        for (i = 0; i < opts.currSlide; i++) {
            opts.els.push(opts.els.shift());
        }
        opts.fxFn = function (curr, next, opts, cb, fwd) {
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function () {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++) {
                    fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
                }
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++) {
                        $(opts.els[i]).css("z-index", len - i + count);
                    }
                } else {
                    var z = $(curr).css("z-index");
                    $el.css("z-index", parseInt(z) + 1 + count);
                }
                $el.animate({left: 0, top: 0}, opts.speedOut, opts.easeOut, function () {
                    $(fwd ? this : curr).hide();
                    if (cb) {
                        cb();
                    }
                });
            });
        };
        opts.cssBefore = {display: "block", opacity: 1, top: 0, left: 0};
    };
    $.fn.cycle.transitions.turnUp = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
        });
        opts.cssFirst = {top: 0};
        opts.cssBefore = {left: 0, height: 0};
        opts.animIn = {top: 0};
        opts.animOut = {height: 0};
    };
    $.fn.cycle.transitions.turnDown = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst = {top: 0};
        opts.cssBefore = {left: 0, top: 0, height: 0};
        opts.animOut = {height: 0};
    };
    $.fn.cycle.transitions.turnLeft = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore = {top: 0, width: 0};
        opts.animIn = {left: 0};
        opts.animOut = {width: 0};
    };
    $.fn.cycle.transitions.turnRight = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore = {top: 0, left: 0, width: 0};
        opts.animIn = {left: 0};
        opts.animOut = {width: 0};
    };
    $.fn.cycle.transitions.zoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn = {top: 0, left: 0, width: next.cycleW, height: next.cycleH};
            opts.animOut = {width: 0, height: 0, top: curr.cycleH / 2, left: curr.cycleW / 2};
        });
        opts.cssFirst = {top: 0, left: 0};
        opts.cssBefore = {width: 0, height: 0};
    };
    $.fn.cycle.transitions.fadeZoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn = {top: 0, left: 0, width: next.cycleW, height: next.cycleH};
        });
        opts.cssBefore = {width: 0, height: 0};
        opts.animOut = {opacity: 0};
    };
    $.fn.cycle.transitions.blindX = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore = {left: w, top: 0};
        opts.animIn = {left: 0};
        opts.animOut = {left: w};
    };
    $.fn.cycle.transitions.blindY = function ($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore = {top: h, left: 0};
        opts.animIn = {top: 0};
        opts.animOut = {top: h};
    };
    $.fn.cycle.transitions.blindZ = function ($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        var w = $cont.width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore = {top: h, left: w};
        opts.animIn = {top: 0, left: 0};
        opts.animOut = {top: h, left: w};
    };
    $.fn.cycle.transitions.growX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn = {left: 0, width: this.cycleW};
            opts.animOut = {left: 0};
        });
        opts.cssBefore = {width: 0, top: 0};
    };
    $.fn.cycle.transitions.growY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn = {top: 0, height: this.cycleH};
            opts.animOut = {top: 0};
        });
        opts.cssBefore = {height: 0, left: 0};
    };
    $.fn.cycle.transitions.curtainX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn = {left: 0, width: this.cycleW};
            opts.animOut = {left: curr.cycleW / 2, width: 0};
        });
        opts.cssBefore = {top: 0, width: 0};
    };
    $.fn.cycle.transitions.curtainY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn = {top: 0, height: next.cycleH};
            opts.animOut = {top: curr.cycleH / 2, height: 0};
        });
        opts.cssBefore = {left: 0, height: 0};
    };
    $.fn.cycle.transitions.cover = function ($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            if (d == "right") {
                opts.cssBefore.left = -w;
            } else {
                if (d == "up") {
                    opts.cssBefore.top = h;
                } else {
                    if (d == "down") {
                        opts.cssBefore.top = -h;
                    } else {
                        opts.cssBefore.left = w;
                    }
                }
            }
        });
        opts.animIn = {left: 0, top: 0};
        opts.animOut = {opacity: 1};
        opts.cssBefore = {top: 0, left: 0};
    };
    $.fn.cycle.transitions.uncover = function ($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == "right") {
                opts.animOut.left = w;
            } else {
                if (d == "up") {
                    opts.animOut.top = -h;
                } else {
                    if (d == "down") {
                        opts.animOut.top = h;
                    } else {
                        opts.animOut.left = -w;
                    }
                }
            }
        });
        opts.animIn = {left: 0, top: 0};
        opts.animOut = {opacity: 1};
        opts.cssBefore = {top: 0, left: 0};
    };
    $.fn.cycle.transitions.toss = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "visible").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (!opts.animOut.left && !opts.animOut.top) {
                opts.animOut = {left: w * 2, top: -h / 2, opacity: 0};
            } else {
                opts.animOut.opacity = 0;
            }
        });
        opts.cssBefore = {left: 0, top: 0};
        opts.animIn = {left: 0};
    };
    $.fn.cycle.transitions.wipe = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip)) {
                clip = "rect(0px 0px " + h + "px 0px)";
            } else {
                if (/r2l/.test(opts.clip)) {
                    clip = "rect(0px " + w + "px " + h + "px " + w + "px)";
                } else {
                    if (/t2b/.test(opts.clip)) {
                        clip = "rect(0px " + w + "px 0px 0px)";
                    } else {
                        if (/b2t/.test(opts.clip)) {
                            clip = "rect(" + h + "px " + w + "px " + h + "px 0px)";
                        } else {
                            if (/zoom/.test(opts.clip)) {
                                var top = parseInt(h / 2);
                                var left = parseInt(w / 2);
                                clip = "rect(" + top + "px " + left + "px " + top + "px " + left + "px)";
                            }
                        }
                    }
                }
            }
        }
        opts.cssBefore.clip = opts.cssBefore.clip || clip || "rect(0px 0px 0px 0px)";
        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0]), r = parseInt(d[1]), b = parseInt(d[2]), l = parseInt(d[3]);
        opts.before.push(function (curr, next, opts) {
            if (curr == next) {
                return;
            }
            var $curr = $(curr), $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = "block";
            var step = 1, count = parseInt((opts.speedIn / 13)) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count)) : 0;
                var ll = l ? l - parseInt(step * (l / count)) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1)) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1)) : w;
                $next.css({clip: "rect(" + tt + "px " + rr + "px " + bb + "px " + ll + "px)"});
                (step++ <= count) ? setTimeout(f, 13) : $curr.css("display", "none");
            })();
        });
        opts.cssBefore = {display: "block", opacity: 1, top: 0, left: 0};
        opts.animIn = {left: 0};
        opts.animOut = {left: 0};
    };
})(jQuery);
;
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/views_slideshow/contrib/views_slideshow_singleframe/views_slideshow.js. */
(function ($) {
    Drupal.behaviors.viewsSlideshowSingleFrame = function (context) {
        $('.views_slideshow_singleframe_main:not(.viewsSlideshowSingleFrame-processed)', context).addClass('viewsSlideshowSingleFrame-processed').each(function () {
            var fullId = '#' + $(this).attr('id');
            if (!Drupal.settings.viewsSlideshowSingleFrame || !Drupal.settings.viewsSlideshowSingleFrame[fullId])return;
            var settings = Drupal.settings.viewsSlideshowSingleFrame[fullId];
            settings.targetId = '#' + $(fullId + " :first").attr('id');
            settings.paused = false;
            settings.opts = {
                speed: settings.speed,
                timeout: parseInt(settings.timeout),
                delay: parseInt(settings.delay),
                sync: settings.sync == 1,
                random: settings.random == 1,
                pause: false,
                allowPagerClickBubble: (settings.pager_hover == 1 || settings.pager_click_to_page),
                prev: (settings.controls > 0) ? '#views_slideshow_singleframe_prev_' + settings.vss_id : null,
                next: (settings.controls > 0) ? '#views_slideshow_singleframe_next_' + settings.vss_id : null,
                pager: (settings.pager > 0) ? '#views_slideshow_singleframe_pager_' + settings.vss_id : null,
                nowrap: parseInt(settings.nowrap),
                pagerAnchorBuilder: function (idx, slide) {
                    var classes = 'pager-item pager-num-' + (idx + 1);
                    if (idx == 0)classes += ' first';
                    if ($(slide).siblings().length == idx)classes += ' last';
                    if (idx % 2) {
                        classes += ' odd'
                    } else classes += ' even';
                    var theme = 'viewsSlideshowPager' + settings.pager_type;
                    return Drupal.theme.prototype[theme] ? Drupal.theme(theme, classes, idx, slide, settings) : ''
                },
                after: function (curr, next, opts) {
                    if (settings.image_count) {
                        $('#views_slideshow_singleframe_image_count_' + settings.vss_id + ' span.num').html(opts.currSlide + 1);
                        $('#views_slideshow_singleframe_image_count_' + settings.vss_id + ' span.total').html(opts.slideCount)
                    }
                },
                before: function (curr, next, opts) {
                    if (settings.remember_slide)createCookie(settings.vss_id, opts.currSlide + 1, settings.remember_slide_days);
                    if (settings.fixed_height == 0) {
                        var $ht = $(this).height();
                        $(this).parent().animate({height: $ht})
                    }
                },
                cleartype: (settings.ie.cleartype == 'true') ? true : false,
                cleartypeNoBg: (settings.ie.cleartypenobg == 'true') ? true : false
            };
            if (settings.remember_slide) {
                var startSlide = readCookie(settings.vss_id);
                if (startSlide == null)startSlide = 0;
                settings.opts.startingSlide = startSlide
            }
            ;
            if (settings.pager_hover == 1) {
                settings.opts.pagerEvent = 'mouseover';
                settings.opts.pauseOnPagerHover = true
            }
            ;
            if (settings.effect == 'none') {
                settings.opts.speed = 1
            } else settings.opts.fx = settings.effect;
            if (settings.pause == 1)$('#views_slideshow_singleframe_teaser_section_' + settings.vss_id).hover(function () {
                $(settings.targetId).cycle('pause')
            }, function () {
                if (settings.paused == false)$(settings.targetId).cycle('resume')
            });
            if (settings.pause_on_click == 1)$('#views_slideshow_singleframe_teaser_section_' + settings.vss_id).click(function () {
                viewsSlideshowSingleFramePause(settings)
            });
            if (settings.advanced != "\n") {
                settings.advanced.toString();
                var advanced = settings.advanced.split("\n");
                for (i = 0; i < advanced.length; i++) {
                    var prop = '', value = '', property = advanced[i].split(":");
                    for (j = 0; j < property.length; j++)if (j == 0) {
                        prop = property[j]
                    } else if (j == 1) {
                        value = property[j]
                    } else value += ":" + property[j];
                    if (value == 'true' || value == 'false' || IsNumeric(value)) {
                        value = eval(value)
                    } else {
                        var func = value.match(/function\s*\((.*?)\)\s*\{(.*)\}/i);
                        if (func)value = new Function(func[1].match(/(\w+)/g), func[2])
                    }
                    ;
                    if (typeof value == "function" && prop in settings.opts) {
                        var callboth = function (before_func, new_func) {
                            return function () {
                                before_func.apply(null, arguments);
                                new_func.apply(null, arguments)
                            }
                        };
                        settings.opts[prop] = callboth(settings.opts[prop], value)
                    } else settings.opts[prop] = value
                }
            }
            ;
            $(settings.targetId).cycle(settings.opts);
            if (settings.start_paused)viewsSlideshowSingleFramePause(settings);
            if (settings.pause_when_hidden) {
                var checkPause = function (settings) {
                    var visible = viewsSlideshowSingleFrameIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
                    if (visible && settings.paused) {
                        viewsSlideshowSingleFrameResume(settings)
                    } else if (!visible && !settings.paused)viewsSlideshowSingleFramePause(settings)
                };
                $(window).scroll(function () {
                    checkPause(settings)
                });
                $(window).resize(function () {
                    checkPause(settings)
                })
            }
            ;
            $('#views_slideshow_singleframe_image_count_' + settings.vss_id).show();
            if (settings.controls > 0) {
                $('#views_slideshow_singleframe_controls_' + settings.vss_id).show();
                $('#views_slideshow_singleframe_playpause_' + settings.vss_id).click(function (e) {
                    if (settings.paused) {
                        viewsSlideshowSingleFrameResume(settings)
                    } else viewsSlideshowSingleFramePause(settings);
                    e.preventDefault()
                })
            }
        })
    };
    viewsSlideshowSingleFramePause = function (settings) {
        var resume = Drupal.t('Resume');
        $(settings.targetId).cycle('pause');
        if (settings.controls > 0)$('#views_slideshow_singleframe_playpause_' + settings.vss_id).addClass('views_slideshow_singleframe_play').addClass('views_slideshow_play').removeClass('views_slideshow_singleframe_pause').removeClass('views_slideshow_pause').text(resume);
        settings.paused = true
    };
    viewsSlideshowSingleFrameResume = function (settings) {
        var pause = Drupal.t('Pause');
        $(settings.targetId).cycle('resume');
        if (settings.controls > 0)$('#views_slideshow_singleframe_playpause_' + settings.vss_id).addClass('views_slideshow_singleframe_pause').addClass('views_slideshow_pause').removeClass('views_slideshow_singleframe_play').removeClass('views_slideshow_play').text(pause);
        settings.paused = false
    };
    Drupal.theme.prototype.viewsSlideshowPagerThumbnails = function (classes, idx, slide, settings) {
        var href = '#';
        if (settings.pager_click_to_page)href = $(slide).find('a').attr('href');
        var img = $(slide).find('img');
        return '<div class="' + classes + '"><a href="' + href + '"><img src="' + $(img).attr('src') + '" alt="' + $(img).attr('alt') + '" title="' + $(img).attr('title') + '"/></a></div>'
    };
    Drupal.theme.prototype.viewsSlideshowPagerNumbered = function (classes, idx, slide, settings) {
        var href = '#';
        if (settings.pager_click_to_page)href = $(slide).find('a').attr('href');
        return '<div class="' + classes + '"><a href="' + href + '">' + (idx + 1) + '</a></div>'
    }
    function IsNumeric(sText) {
        var ValidChars = "0123456789", IsNumber = true, Char;
        for (var i = 0; i < sText.length && IsNumber == true; i++) {
            Char = sText.charAt(i);
            if (ValidChars.indexOf(Char) == -1)IsNumber = false
        }
        ;
        return IsNumber
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1e3));
            var expires = "; expires=" + date.toGMTString()
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/"
    }

    function readCookie(name) {
        var nameEQ = name + "=", ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)return c.substring(nameEQ.length, c.length)
        }
        ;
        return null
    }

    function eraseCookie(name) {
        createCookie(name, "", -1)
    }

    function viewsSlideshowSingleFrameIsVisible(elem, type, amountVisible) {
        var docViewTop = $(window).scrollTop(), docViewBottom = docViewTop + $(window).height(), docViewLeft = $(window).scrollLeft(), docViewRight = docViewLeft + $(window).width(), elemTop = $(elem).offset().top, elemHeight = $(elem).height(), elemBottom = elemTop + elemHeight, elemLeft = $(elem).offset().left, elemWidth = $(elem).width(), elemRight = elemLeft + elemWidth, elemArea = elemHeight * elemWidth, missingLeft = 0, missingRight = 0, missingTop = 0, missingBottom = 0;
        if (elemLeft < docViewLeft)missingLeft = docViewLeft - elemLeft;
        if (elemRight > docViewRight)missingRight = elemRight - docViewRight;
        if (elemTop < docViewTop)missingTop = docViewTop - elemTop;
        if (elemBottom > docViewBottom)missingBottom = elemBottom - docViewBottom;
        if (type == 'full') {
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) && (elemLeft >= docViewLeft) && (elemRight <= docViewRight) && (elemLeft <= docViewRight) && (elemRight >= docViewLeft))
        } else if (type == 'vertical') {
            var verticalShowing = elemHeight - missingTop - missingBottom;
            if (amountVisible.indexOf('%')) {
                return (((verticalShowing / elemHeight) * 100) >= parseInt(amountVisible))
            } else return (verticalShowing >= parseInt(amountVisible))
        } else if (type == 'horizontal') {
            var horizontalShowing = elemWidth - missingLeft - missingRight;
            if (amountVisible.indexOf('%')) {
                return (((horizontalShowing / elemWidth) * 100) >= parseInt(amountVisible))
            } else return (horizontalShowing >= parseInt(amountVisible))
        } else if (type == 'area') {
            var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);
            if (amountVisible.indexOf('%')) {
                return (((areaShowing / elemArea) * 100) >= parseInt(amountVisible))
            } else return (areaShowing >= parseInt(amountVisible))
        }
    }
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/views_slideshow/contrib/views_slideshow_singleframe/views_slideshow.js. */
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/views_slideshow/contrib/views_slideshow_thumbnailhover/views_slideshow.js. */
(function ($) {
    Drupal.behaviors.viewsSlideshowThumbnailHover = function (context) {
        $('.views_slideshow_thumbnailhover_main:not(.viewsSlideshowThumbnailHover-processed)', context).addClass('viewsSlideshowThumbnailHover-processed').each(function () {
            var fullId = '#' + $(this).attr('id');
            if (!Drupal.settings.viewsSlideshowThumbnailHover || !Drupal.settings.viewsSlideshowThumbnailHover[fullId])return;
            var settings = Drupal.settings.viewsSlideshowThumbnailHover[fullId];
            settings.targetId = '#' + $(fullId + " :first").attr('id');
            settings.paused = false;
            settings.opts = {
                speed: settings.speed,
                timeout: parseInt(settings.timeout),
                delay: parseInt(settings.delay),
                sync: settings.sync == 1,
                random: settings.random == 1,
                pause: false,
                allowPagerClickBubble: (settings.pager_event == 'click') ? false : true,
                pager: (settings.pager_event == 'hoverIntent') ? null : '#views_slideshow_breakout_teasers_' + settings.vss_id,
                nowrap: parseInt(settings.nowrap),
                pagerAnchorBuilder: (settings.pager_event == 'hoverIntent') ? null : function (idx, slide) {
                    return '#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + idx
                },
                after: function (curr, next, opts) {
                    if (settings.image_count) {
                        $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id + ' span.num').html(opts.currSlide + 1);
                        $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id + ' span.total').html(opts.slideCount)
                    }
                },
                before: function (current, next, opts) {
                    if (settings.remember_slide)createCookie(settings.view_id, opts.currSlide + 1, settings.remember_slide_days);
                    if (settings.fixed_height == 0) {
                        var $ht = $(this).height();
                        $(this).parent().animate({height: $ht})
                    }
                    ;
                    var currId = (currId = $(current).attr('id')).substring(currId.lastIndexOf('_') + 1), nextId = (nextId = $(next).attr('id')).substring(nextId.lastIndexOf('_') + 1);
                    $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + currId).removeClass('activeSlide');
                    $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + nextId).addClass('activeSlide')
                },
                pagerEvent: (settings.pager_event == 'hoverIntent') ? null : settings.pager_event,
                prev: (settings.controls > 0) ? '#views_slideshow_thumbnailhover_prev_' + settings.vss_id : null,
                next: (settings.controls > 0) ? '#views_slideshow_thumbnailhover_next_' + settings.vss_id : null,
                cleartype: (settings.ie.cleartype == 'true') ? true : false,
                cleartypeNoBg: (settings.ie.cleartypenobg == 'true') ? true : false
            };
            if (settings.remember_slide) {
                var startSlide = readCookie(settings.view_id);
                if (startSlide == null)startSlide = 0;
                settings.opts.startingSlide = startSlide
            }
            ;
            if (settings.effect == 'none') {
                settings.opts.speed = 1
            } else settings.opts.fx = settings.effect;
            if (settings.pause == 1)$('#views_slideshow_thumbnailhover_teaser_section_' + settings.vss_id).hover(function () {
                $(settings.targetId).cycle('pause')
            }, function () {
                if (settings.paused == false)$(settings.targetId).cycle('resume')
            });
            if (settings.pause_on_click == 1)$('#views_slideshow_thumbnailhover_teaser_section_' + settings.vss_id).click(function () {
                viewsSlideshowThumbnailHoverPause(settings)
            });
            if (settings.advanced && settings.advanced != "\n") {
                settings.advanced = settings.advanced.toString();
                var advanced = settings.advanced.split("\n");
                for (i = 0; i < advanced.length; i++) {
                    var prop = '', value = '', property = advanced[i].split(":");
                    for (j = 0; j < property.length; j++)if (j == 0) {
                        prop = property[j]
                    } else if (j == 1) {
                        value = property[j]
                    } else value += ":" + property[j];
                    if (value == 'true' || value == 'false' || IsNumeric(value)) {
                        value = eval(value)
                    } else {
                        var func = value.match(/function\s*\((.*?)\)\s*\{(.*)\}/i);
                        if (func)value = new Function(func[1].match(/(\w+)/g), func[2])
                    }
                    ;
                    if (typeof value == "function" && prop in settings.opts) {
                        var callboth = function (before_func, new_func) {
                            return function () {
                                before_func.apply(null, arguments);
                                new_func.apply(null, arguments)
                            }
                        };
                        settings.opts[prop] = callboth(settings.opts[prop], value)
                    } else settings.opts[prop] = value
                }
            }
            ;
            $(settings.targetId).cycle(settings.opts);
            if (settings.start_paused)viewsSlideshowThumbnailHoverPause(settings);
            if (settings.pause_when_hidden) {
                var checkPause = function (settings) {
                    var visible = viewsSlideshowThumbnailHoverIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
                    if (visible && settings.paused) {
                        viewsSlideshowThumbnailHoverResume(settings)
                    } else if (!visible && !settings.paused)viewsSlideshowThumbnailHoverPause(settings)
                };
                $(window).scroll(function () {
                    checkPause(settings)
                });
                $(window).resize(function () {
                    checkPause(settings)
                })
            }
            ;
            $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id).show();
            if (settings.pager_event == 'hoverIntent')$('#views_slideshow_thumbnailhover_breakout_teasers_' + settings.vss_id + ' .views_slideshow_thumbnailhover_div_breakout_teaser').each(function (i, obj) {
                $(obj).hoverIntent(function () {
                    $('.views_slideshow_thumbnailhover_div_breakout_teaser').removeClass('activeSlide');
                    var id = $(this).attr('id');
                    id = parseInt(id.substring(id.lastIndexOf('_') + 1));
                    $(settings.targetId).cycle(id);
                    $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + id).addClass('activeSlide');
                    $(settings.targetId).cycle('stop')
                }, function () {
                    var id = $(this).attr('id');
                    settings.opts.startingSlide = parseInt(id.substring(id.lastIndexOf('_') + 1));
                    $(settings.targetId).cycle(settings.opts)
                })
            });
            if (settings.controls > 0) {
                $('#views_slideshow_thumbnailhover_controls_' + settings.vss_id).show();
                $('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id).click(function (e) {
                    if (settings.paused) {
                        viewsSlideshowThumbnailHoverResume(settings)
                    } else viewsSlideshowThumbnailHoverPause(settings);
                    e.preventDefault()
                })
            }
        })
    };
    viewsSlideshowThumbnailHoverPause = function (settings) {
        var resume = Drupal.t('Resume');
        $(settings.targetId).cycle('pause');
        if (settings.controls > 0)$('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id).addClass('views_slideshow_thumbnailhover_play').addClass('views_slideshow_play').removeClass('views_slideshow_thumbnailhover_pause').removeClass('views_slideshow_pause').text(resume);
        settings.paused = true
    };
    viewsSlideshowThumbnailHoverResume = function (settings) {
        var pause = Drupal.t('Pause');
        $(settings.targetId).cycle('resume');
        if (settings.controls > 0)$('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id).addClass('views_slideshow_thumbnailhover_pause').addClass('views_slideshow_pause').removeClass('views_slideshow_thumbnailhover_play').removeClass('views_slideshow_play').text(pause);
        settings.paused = false
    }
    function IsNumeric(sText) {
        var ValidChars = "0123456789", IsNumber = true, Char;
        for (var i = 0; i < sText.length && IsNumber == true; i++) {
            Char = sText.charAt(i);
            if (ValidChars.indexOf(Char) == -1)IsNumber = false
        }
        ;
        return IsNumber
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1e3));
            var expires = "; expires=" + date.toGMTString()
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/"
    }

    function readCookie(name) {
        var nameEQ = name + "=", ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)return c.substring(nameEQ.length, c.length)
        }
        ;
        return null
    }

    function eraseCookie(name) {
        createCookie(name, "", -1)
    }

    function viewsSlideshowThumbnailHoverIsVisible(elem, type, amountVisible) {
        var docViewTop = $(window).scrollTop(), docViewBottom = docViewTop + $(window).height(), docViewLeft = $(window).scrollLeft(), docViewRight = docViewLeft + $(window).width(), elemTop = $(elem).offset().top, elemHeight = $(elem).height(), elemBottom = elemTop + elemHeight, elemLeft = $(elem).offset().left, elemWidth = $(elem).width(), elemRight = elemLeft + elemWidth, elemArea = elemHeight * elemWidth, missingLeft = 0, missingRight = 0, missingTop = 0, missingBottom = 0;
        if (elemLeft < docViewLeft)missingLeft = docViewLeft - elemLeft;
        if (elemRight > docViewRight)missingRight = elemRight - docViewRight;
        if (elemTop < docViewTop)missingTop = docViewTop - elemTop;
        if (elemBottom > docViewBottom)missingBottom = elemBottom - docViewBottom;
        if (type == 'full') {
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) && (elemLeft >= docViewLeft) && (elemRight <= docViewRight) && (elemLeft <= docViewRight) && (elemRight >= docViewLeft))
        } else if (type == 'vertical') {
            var verticalShowing = elemHeight - missingTop - missingBottom;
            if (amountVisible.indexOf('%')) {
                return (((verticalShowing / elemHeight) * 100) >= parseInt(amountVisible))
            } else return (verticalShowing >= parseInt(amountVisible))
        } else if (type == 'horizontal') {
            var horizontalShowing = elemWidth - missingLeft - missingRight;
            if (amountVisible.indexOf('%')) {
                return (((horizontalShowing / elemWidth) * 100) >= parseInt(amountVisible))
            } else return (horizontalShowing >= parseInt(amountVisible))
        } else if (type == 'area') {
            var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);
            if (amountVisible.indexOf('%')) {
                return (((areaShowing / elemArea) * 100) >= parseInt(amountVisible))
            } else return (areaShowing >= parseInt(amountVisible))
        }
    }
})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/views_slideshow/contrib/views_slideshow_thumbnailhover/views_slideshow.js. */
/*
 * jQuery Form Plugin
 * version: 2.25 (08-APR-2009)
 * @requires jQuery v1.2.2 or later
 * @note This has been modified for ajax.module
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--)if (k[c])p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}(';(5($){$.B.1s=5(u){2(!4.G){R(\'1b: 2M 9 2N - 2O 2P 1t\');6 4}2(S u==\'5\')u={T:u};3 v=4.14(\'1c\')||1d.2Q.2R;v=(v.2S(/^([^#]+)/)||[])[1];v=v||\'\';u=$.1n({1e:v,H:4.14(\'1u\')||\'1Q\'},u||{});3 w={};4.L(\'C-1R-1S\',[4,u,w]);2(w.1T){R(\'1b: 9 1U 1o C-1R-1S L\');6 4}2(u.1v&&u.1v(4,u)===I){R(\'1b: 9 1f 1o 1v 1V\');6 4}3 a=4.1w(u.2T);2(u.J){u.O=u.J;K(3 n 1x u.J){2(u.J[n]2U 15){K(3 k 1x u.J[n])a.D({7:n,8:u.J[n][k]})}E a.D({7:n,8:u.J[n]})}}2(u.1y&&u.1y(a,4,u)===I){R(\'1b: 9 1f 1o 1y 1V\');6 4}4.L(\'C-9-1W\',[a,4,u,w]);2(w.1T){R(\'1b: 9 1U 1o C-9-1W L\');6 4}3 q=$.1z(a);2(u.H.2V()==\'1Q\'){u.1e+=(u.1e.2W(\'?\')>=0?\'&\':\'?\')+q;u.J=F}E u.J=q;3 x=4,V=[];2(u.2X)V.D(5(){x.1X()});2(u.2Y)V.D(5(){x.1Y()});2(!u.16&&u.17){3 y=u.T||5(){};V.D(5(a){$(u.17).2Z(a).P(y,1Z)})}E 2(u.T)V.D(u.T);u.T=5(a,b){K(3 i=0,M=V.G;i<M;i++)V[i].30(u,[a,b,x])};3 z=$(\'W:31\',4).18();3 A=I;K(3 j=0;j<z.G;j++)2(z[j])A=Q;2(u.20||A){2(u.21)$.32(u.21,1A);E 1A()}E $.33(u);4.L(\'C-9-34\',[4,u]);6 4;5 1A(){3 h=x[0];2($(\':W[7=9]\',h).G){35(\'36: 37 22 38 39 3a 3b "9".\');6}3 i=$.1n({},$.23,u);3 s=$.1n(Q,{},$.1n(Q,{},$.23),i);3 j=\'3c\'+(1B 3d().3e());3 k=$(\'<20 3f="\'+j+\'" 7="\'+j+\'" 24="25:26" />\');3 l=k[0];k.3g({3h:\'3i\',27:\'-28\',29:\'-28\'});3 m={1f:0,19:F,1g:F,3j:0,3k:\'n/a\',3l:5(){},2a:5(){},3m:5(){},3n:5(){4.1f=1;k.14(\'24\',\'25:26\')}};3 g=i.2b;2(g&&!$.1C++)$.1h.L("3o");2(g)$.1h.L("3p",[m,i]);2(s.2c&&s.2c(m,s)===I){s.2b&&$.1C--;6}2(m.1f)6;3 o=0;3 p=0;3 q=h.U;2(q){3 n=q.7;2(n&&!q.1i){u.O=u.O||{};u.O[n]=q.8;2(q.H=="X"){u.O[7+\'.x\']=h.Y;u.O[7+\'.y\']=h.Z}}}1j(5(){3 t=x.14(\'17\'),a=x.14(\'1c\');h.1k(\'17\',j);2(h.2d(\'1u\')!=\'2e\')h.1k(\'1u\',\'2e\');2(h.2d(\'1c\')!=i.1e)h.1k(\'1c\',i.1e);2(!u.3q){x.14({3r:\'2f/C-J\',3s:\'2f/C-J\'})}2(i.1D)1j(5(){p=Q;11()},i.1D);3 b=[];2g{2(u.O)K(3 n 1x u.O)b.D($(\'<W H="3t" 7="\'+n+\'" 8="\'+u.O[n]+\'" />\').2h(h)[0]);k.2h(\'1l\');l.2i?l.2i(\'2j\',11):l.3u(\'2k\',11,I);h.9()}3v{h.1k(\'1c\',a);t?h.1k(\'17\',t):x.3w(\'17\');$(b).2l()}},10);3 r=0;5 11(){2(o++)6;l.2m?l.2m(\'2j\',11):l.3x(\'2k\',11,I);3 c=Q;2g{2(p)3y\'1D\';3 d,N;N=l.2n?l.2n.2o:l.2p?l.2p:l.2o;2((N.1l==F||N.1l.2q==\'\')&&!r){r=1;o--;1j(11,2r);6}m.19=N.1l?N.1l.2q:F;m.1g=N.2s?N.2s:N;m.2a=5(a){3 b={\'3z-H\':i.16};6 b[a]};2(i.16==\'3A\'||i.16==\'3B\'){3 f=N.1E(\'1F\')[0];m.19=f?f.8:m.19}E 2(i.16==\'2t\'&&!m.1g&&m.19!=F){m.1g=2u(m.19)}d=$.3C(m,i.16)}3D(e){c=I;$.3E(i,m,\'2v\',e)}2(c){i.T(d,\'T\');2(g)$.1h.L("3F",[m,i])}2(g)$.1h.L("3G",[m,i]);2(g&&!--$.1C)$.1h.L("3H");2(i.2w)i.2w(m,c?\'T\':\'2v\');1j(5(){k.2l();m.1g=F},2r)};5 2u(s,a){2(1d.2x){a=1B 2x(\'3I.3J\');a.3K=\'I\';a.3L(s)}E a=(1B 3M()).3N(s,\'1G/2t\');6(a&&a.2y&&a.2y.1p!=\'3O\')?a:F}}};$.B.3P=5(c){6 4.2z().2A(\'9.C-1q\',5(){$(4).1s(c);6 I}).P(5(){$(":9,W:X",4).2A(\'2B.C-1q\',5(e){3 a=4.C;a.U=4;2(4.H==\'X\'){2(e.2C!=12){a.Y=e.2C;a.Z=e.3Q}E 2(S $.B.2D==\'5\'){3 b=$(4).2D();a.Y=e.2E-b.29;a.Z=e.2F-b.27}E{a.Y=e.2E-4.3R;a.Z=e.2F-4.3S}}1j(5(){a.U=a.Y=a.Z=F},10)})})};$.B.2z=5(){4.2G(\'9.C-1q\');6 4.P(5(){$(":9,W:X",4).2G(\'2B.C-1q\')})};$.B.1w=5(b){3 a=[];2(4.G==0)6 a;3 c=4[0];3 d=b?c.1E(\'*\'):c.22;2(!d)6 a;K(3 i=0,M=d.G;i<M;i++){3 e=d[i];3 n=e.7;2(!n)1H;2(b&&c.U&&e.H=="X"){2(!e.1i&&c.U==e)a.D({7:n+\'.x\',8:c.Y},{7:n+\'.y\',8:c.Z});1H}3 v=$.18(e,Q);2(v&&v.1r==15){K(3 j=0,2H=v.G;j<2H;j++)a.D({7:n,8:v[j]})}E 2(v!==F&&S v!=\'12\')a.D({7:n,8:v})}2(!b&&c.U){3 f=c.1E("W");K(3 i=0,M=f.G;i<M;i++){3 g=f[i];3 n=g.7;2(n&&!g.1i&&g.H=="X"&&c.U==g)a.D({7:n+\'.x\',8:c.Y},{7:n+\'.y\',8:c.Z})}}6 a};$.B.3T=5(a){6 $.1z(4.1w(a))};$.B.3U=5(b){3 a=[];4.P(5(){3 n=4.7;2(!n)6;3 v=$.18(4,b);2(v&&v.1r==15){K(3 i=0,M=v.G;i<M;i++)a.D({7:n,8:v[i]})}E 2(v!==F&&S v!=\'12\')a.D({7:4.7,8:v})});6 $.1z(a)};$.B.18=5(a){K(3 b=[],i=0,M=4.G;i<M;i++){3 c=4[i];3 v=$.18(c,a);2(v===F||S v==\'12\'||(v.1r==15&&!v.G))1H;v.1r==15?$.3V(b,v):b.D(v)}6 b};$.18=5(b,c){3 n=b.7,t=b.H,1a=b.1p.1I();2(S c==\'12\')c=Q;2(c&&(!n||b.1i||t==\'1m\'||t==\'3W\'||(t==\'1J\'||t==\'1K\')&&!b.1L||(t==\'9\'||t==\'X\')&&b.C&&b.C.U!=b||1a==\'13\'&&b.1M==-1))6 F;2(1a==\'13\'){3 d=b.1M;2(d<0)6 F;3 a=[],1N=b.3X;3 e=(t==\'13-2I\');3 f=(e?d+1:1N.G);K(3 i=(e?d:0);i<f;i++){3 g=1N[i];2(g.1t){3 v=g.8;2(!v)v=(g.1O&&g.1O[\'8\']&&!(g.1O[\'8\'].3Y))?g.1G:g.8;2(e)6 v;a.D(v)}}6 a}6 b.8};$.B.1Y=5(){6 4.P(5(){$(\'W,13,1F\',4).2J()})};$.B.2J=$.B.3Z=5(){6 4.P(5(){3 t=4.H,1a=4.1p.1I();2(t==\'1G\'||t==\'40\'||1a==\'1F\')4.8=\'\';E 2(t==\'1J\'||t==\'1K\')4.1L=I;E 2(1a==\'13\')4.1M=-1})};$.B.1X=5(){6 4.P(5(){2(S 4.1m==\'5\'||(S 4.1m==\'41\'&&!4.1m.42))4.1m()})};$.B.43=5(b){2(b==12)b=Q;6 4.P(5(){4.1i=!b})};$.B.2K=5(b){2(b==12)b=Q;6 4.P(5(){3 t=4.H;2(t==\'1J\'||t==\'1K\')4.1L=b;E 2(4.1p.1I()==\'2L\'){3 a=$(4).44(\'13\');2(b&&a[0]&&a[0].H==\'13-2I\'){a.45(\'2L\').2K(I)}4.1t=b}})};5 R(){2($.B.1s.46&&1d.1P&&1d.1P.R)1d.1P.R(\'[47.C] \'+15.48.49.4a(1Z,\'\'))}})(4b);', 62, 260, '||if|var|this|function|return|name|value|submit||||||||||||||||||||||||||||fn|form|push|else|null|length|type|false|data|for|trigger|max|doc|extraData|each|true|log|typeof|success|clk|callbacks|input|image|clk_x|clk_y||cb|undefined|select|attr|Array|dataType|target|a_fieldValue|responseText|tag|ajaxSubmit|action|window|url|aborted|responseXML|event|disabled|setTimeout|setAttribute|body|reset|extend|via|tagName|plugin|constructor|a_ajaxSubmit|selected|method|beforeSerialize|a_formToArray|in|beforeSubmit|param|fileUpload|new|active|timeout|getElementsByTagName|textarea|text|continue|toLowerCase|checkbox|radio|checked|selectedIndex|ops|attributes|console|GET|pre|serialize|veto|vetoed|callback|validate|a_resetForm|a_clearForm|arguments|iframe|closeKeepAlive|elements|ajaxSettings|src|about|blank|top|1000px|left|getResponseHeader|global|beforeSend|getAttribute|POST|multipart|try|appendTo|attachEvent|onload|load|remove|detachEvent|contentWindow|document|contentDocument|innerHTML|100|XMLDocument|xml|toXml|error|complete|ActiveXObject|documentElement|a_ajaxFormUnbind|bind|click|offsetX|offset|pageX|pageY|unbind|jmax|one|a_clearFields|a_selected|option|skipping|process|no|element|location|href|match|semantic|instanceof|toUpperCase|indexOf|resetForm|clearForm|html|apply|file|get|ajax|notify|alert|Error|Form|must|not|be|named|jqFormIO|Date|getTime|id|css|position|absolute|status|statusText|getAllResponseHeaders|setRequestHeader|abort|ajaxStart|ajaxSend|skipEncodingOverride|encoding|enctype|hidden|addEventListener|finally|removeAttr|removeEventListener|throw|content|json|script|httpData|catch|handleError|ajaxSuccess|ajaxComplete|ajaxStop|Microsoft|XMLDOM|async|loadXML|DOMParser|parseFromString|parsererror|a_ajaxForm|offsetY|offsetLeft|offsetTop|a_formSerialize|a_fieldSerialize|merge|button|options|specified|a_clearInputs|password|object|nodeType|a_enable|parent|find|debug|jquery|prototype|join|call|jQuery'.split('|'), 0, {}));
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/sites/all/modules/ajax/ajax.js. */
Drupal.Ajax = new Object();
Drupal.Ajax.plugins = {};
Drupal.Ajax.firstRun = false;
Drupal.Ajax.init = function (context) {
    var f, s;
    if (f = $('.ajax-form', context)) {
        if (!Drupal.Ajax.firstRun) {
            Drupal.Ajax.invoke('init');
            Drupal.Ajax.firstRun = true
        }
        ;
        s = $('input[type="submit"]', f);
        s.click(function () {
            this.form.ajax_activator = $(this);
            return true
        });
        f.each(function () {
            this.ajax_activator = null;
            $(this).submit(function () {
                if (this.ajax_activator === null)this.ajax_activator = $('#edit-submit', this);
                if (this.ajax_activator.hasClass('ajax-trigger')) {
                    Drupal.Ajax.go($(this), this.ajax_activator);
                    return false
                } else return true
            });
            return true
        })
    }
    ;
    return true
};
Drupal.Ajax.invoke = function (hook, args) {
    var plugin, r, ret;
    ret = true;
    for (plugin in Drupal.Ajax.plugins) {
        r = Drupal.Ajax.plugins[plugin](hook, args);
        if (r === false)ret = false
    }
    ;
    return ret
};
Drupal.Ajax.go = function (formObj, submitter) {
    var submitterVal, submitterName, extraData;
    Drupal.Ajax.invoke('submit', {submitter: submitter});
    submitterVal = submitter.val();
    submitterName = submitter.attr('name');
    submitter.val(Drupal.t('Loading...'));
    extraData = {};
    extraData[submitterName] = submitterVal;
    extraData.drupal_ajax = '1';
    formObj.a_ajaxSubmit({
        extraData: extraData, beforeSubmit: function (data) {
            data[data.length] = {name: submitterName, value: submitterVal};
            data[data.length] = {name: 'drupal_ajax', value: '1'};
            return true
        }, dataType: 'json', error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.alert(Drupal.t('ajax.module: An unknown error has occurred.'));
            if (window.console)console.log('error', arguments);
            return true
        }, success: function (data) {
            submitter.val(submitterVal);
            Drupal.Ajax.response(submitter, formObj, data);
            return true
        }
    });
    return false
};
Drupal.Ajax.message = function (formObj, submitter, data, options) {
    var args;
    data.local = {submitter: submitter, form: formObj};
    if (Drupal.Ajax.invoke('message', data)) {
        Drupal.Ajax.writeMessage(data.local.form, data.local.submitter, options);
        Drupal.Ajax.invoke('afterMessage', data)
    }
    ;
    return true
};
Drupal.Ajax.writeMessage = function (formObj, submitter, options) {
    var i, _i, thisItem, log, errBox, h, data;
    if (options.action === 'notify') {
        $('.messages, .ajax-preview', formObj).remove();
        $('input, textarea').removeClass('error status warning required');
        if (options.type === 'preview') {
            log = $('<div>').addClass('ajax-preview');
            log.html(options.messages);
            formObj.prepend(log)
        } else {
            log = $('<ul>');
            errBox = $(".messages." + options.type, formObj[0]);
            for (i = 0, _i = options.messages.length; i < _i; i++) {
                thisItem = $('#' + options.messages[i].id, formObj[0]);
                thisItem.addClass(options.type);
                if (options.messages[i].required)thisItem.addClass('required');
                log.append('<li>' + options.messages[i].value + '</li>')
            }
            ;
            if (errBox.length === 0) {
                errBox = $("<div class='messages " + options.type + "'>");
                formObj.prepend(errBox)
            }
            ;
            errBox.html(log)
        }
    } else if (options.action === 'clear')$('.messages, .ajax-preview', formObj).remove();
    return true
};
Drupal.Ajax.updater = function (updaters) {
    var i, _i, elm;
    for (i = 0, _i = updaters.length; i < _i; i++) {
        elm = $(updaters[i].selector);
        if (updaters[i].type === 'html_in') {
            elm.html(updaters[i].value)
        } else if (updaters[i].type === 'html_out') {
            elm.replaceWith(updaters[i].value)
        } else if (updaters[i].type === 'field') {
            elm.val(updaters[i].value)
        } else if (updaters[i].type === 'remove')elm.remove()
    }
    ;
    return true
};
Drupal.Ajax.response = function (submitter, formObj, data) {
    var newSubmitter;
    data.local = {submitter: submitter, form: formObj};
    if (data.status === false) {
        Drupal.Ajax.updater(data.updaters);
        Drupal.Ajax.message(formObj, submitter, data, {action: 'notify', messages: data.messages_error, type: 'error'})
    } else if (data.preview !== null) {
        Drupal.Ajax.updater(data.updaters);
        Drupal.Ajax.message(formObj, submitter, data, {
            action: 'notify',
            messages: decodeURIComponent(data.preview),
            type: 'preview'
        })
    } else if (data.redirect === null) {
        if (data.messages_status.length > 0)Drupal.Ajax.message(formObj, submitter, data, {
            action: 'notify',
            messages: data.messages_status,
            type: 'status'
        });
        if (data.messages_warning.length > 0)Drupal.Ajax.message(formObj, submitter, data, {
            action: 'notify',
            messages: data.messages_warning,
            type: 'warning'
        });
        if (data.messages_status.length === 0 && data.messages_warning.length === 0)Drupal.Ajax.message(formObj, submitter, data, {action: 'clear'})
    } else if (Drupal.Ajax.invoke('redirect', data)) {
        Drupal.Ajax.redirect(data.redirect)
    } else {
        Drupal.Ajax.updater(data.updaters);
        if (data.messages_status.length === 0 && data.messages_warning.length === 0) {
            Drupal.Ajax.message(formObj, submitter, data, {action: 'clear'})
        } else Drupal.Ajax.message(formObj, submitter, data, {
            action: 'notify',
            messages: data.messages_status,
            type: 'status'
        })
    }
    ;
    return true
};
Drupal.Ajax.redirect = function (url) {
    window.location.href = url
};
Drupal.behaviors.Ajax = Drupal.Ajax.init;
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/sites/all/modules/ajax/ajax.js. */
