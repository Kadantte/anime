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
