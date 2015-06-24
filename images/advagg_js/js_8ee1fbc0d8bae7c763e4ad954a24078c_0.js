/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/misc/tableheader.js. */
Drupal.tableHeaderDoScroll = function () {
    if (typeof(Drupal.tableHeaderOnScroll) == 'function')Drupal.tableHeaderOnScroll()
};
Drupal.behaviors.tableHeader = function (context) {
    if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7)return;
    var headers = [];
    $('table.sticky-enabled thead:not(.tableHeader-processed)', context).each(function () {
        var headerClone = $(this).clone(true).insertBefore(this.parentNode).wrap('<table class="sticky-header"></table>').parent().css({
            position: 'fixed',
            top: '0px'
        });
        headerClone = $(headerClone)[0];
        headers.push(headerClone);
        var table = $(this).parent('table')[0];
        headerClone.table = table;
        tracker(headerClone);
        $(table).addClass('sticky-table');
        $(this).addClass('tableHeader-processed')
    });
    var prevAnchor = ''

    function tracker(e) {
        var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (e.viewHeight != viewHeight) {
            e.viewHeight = viewHeight;
            e.vPosition = $(e.table).offset().top - 4;
            e.hPosition = $(e.table).offset().left;
            e.vLength = e.table.clientHeight - 100;
            var parentCell = $('th', e.table);
            $('th', e).each(function (index) {
                var cellWidth = parentCell.eq(index).css('width');
                if (cellWidth == 'auto')cellWidth = parentCell.get(index).clientWidth + 'px';
                $(this).css('width', cellWidth)
            });
            $(e).css('width', $(e.table).css('width'))
        }
        ;
        var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft, vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - e.vPosition, visState = (vOffset > 0 && vOffset < e.vLength) ? 'visible' : 'hidden';
        $(e).css({left: -hScroll + e.hPosition + 'px', visibility: visState});
        if (prevAnchor != location.hash) {
            if (location.hash != '') {
                var offset = $(document).find('td' + location.hash).offset();
                if (offset) {
                    var top = offset.top, scrollLocation = top - $(e).height();
                    $('body, html').scrollTop(scrollLocation)
                }
            }
            ;
            prevAnchor = location.hash
        }
    };
    if (!$('body').hasClass('tableHeader-processed')) {
        $('body').addClass('tableHeader-processed');
        $(window).scroll(Drupal.tableHeaderDoScroll);
        $(document.documentElement).scroll(Drupal.tableHeaderDoScroll)
    }
    ;
    Drupal.tableHeaderOnScroll = function () {
        $(headers).each(function () {
            tracker(this)
        })
    };
    var time = null, resize = function () {
        if (time)return;
        time = setTimeout(function () {
            $('table.sticky-header').each(function () {
                this.viewHeight = 0;
                tracker(this)
            });
            time = null
        }, 250)
    };
    $(window).resize(resize)
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/misc/tableheader.js. */
/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/misc/textarea.js. */
Drupal.behaviors.textarea = function (context) {
    $('textarea.resizable:not(.textarea-processed)', context).each(function () {
        if ($(this).is('textarea.teaser:not(.teaser-processed)'))return false;
        var textarea = $(this).addClass('textarea-processed'), staticOffset = null;
        $(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').mousedown(startDrag));
        var grippie = $('div.grippie', $(this).parent())[0];
        grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) + 'px'
        function startDrag(e) {
            staticOffset = textarea.height() - e.pageY;
            textarea.css('opacity', 0.25);
            $(document).mousemove(performDrag).mouseup(endDrag);
            return false
        }

        function performDrag(e) {
            textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
            return false
        }

        function endDrag(e) {
            $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
            textarea.css('opacity', 1)
        }
    })
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/misc/textarea.js. */
