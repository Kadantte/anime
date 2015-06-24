/*
 * jQuery Nivo Slider v2.0
 * http://nivo.dev7studios.com
 *
 * Copyright 2010, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * May 2010 - Pick random effect from specified set of effects by toronegro
 * May 2010 - controlNavThumbsFromRel option added by nerd-sh
 * May 2010 - Do not start nivoRun timer if there is only 1 slide by msielski
 * April 2010 - controlNavThumbs option added by Jamie Thompson (http://jamiethompson.co.uk)
 * March 2010 - manualAdvance option added by HelloPablo (http://hellopablo.co.uk)
 */

eval(function (p, a, c, k, e, d) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function (e) {
            return d[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('(9($){$.1f.1q=9(1X){b 3=$.2i({},$.1f.1q.2c,1X);I g.E(9(){b 4={f:0,t:\'\',U:0,o:\'\',N:m,1k:m,1N:m};b 5=$(g);5.1S(\'7:4\',4);5.e(\'2h\',\'2g\');5.1n(\'1q\');b d=5.2j();d.E(9(){b j=$(g);b 1p=\'\';6(!j.K(\'B\')){6(j.K(\'a\')){j.1n(\'7-2k\');1p=j}j=j.1g(\'B:1s\')}b 1c=j.w();6(1c==0)1c=j.s(\'w\');b 1d=j.x();6(1d==0)1d=j.s(\'x\');6(1c>5.w()){5.w(1c)}6(1d>5.x()){5.x(1d)}6(1p!=\'\'){1p.e(\'P\',\'1h\')}j.e(\'P\',\'1h\');4.U++});6(3.1a>0){6(3.1a>=4.U)3.1a=4.U-1;4.f=3.1a}6($(d[4.f]).K(\'B\')){4.t=$(d[4.f])}n{4.t=$(d[4.f]).1g(\'B:1s\')}6($(d[4.f]).K(\'a\')){$(d[4.f]).e(\'P\',\'1w\')}5.e(\'W\',\'V(\'+4.t.s(\'D\')+\') R-Y\');2b(b i=0;i<3.h;i++){b G=X.27(5.w()/3.h);6(i==3.h-1){5.J($(\'<C z="7-c"></C>\').e({21:(G*i)+\'13\',w:(5.w()-(G*i))+\'13\'}))}n{5.J($(\'<C z="7-c"></C>\').e({21:(G*i)+\'13\',w:G+\'13\'}))}}5.J($(\'<C z="7-H"><p></p></C>\').e({P:\'1h\',y:3.1Y}));6(4.t.s(\'16\')!=\'\'){$(\'.7-H p\',5).1y(4.t.s(\'16\'));$(\'.7-H\',5).1x(3.q)}b l=0;6(!3.1i&&d.1j>1){l=1v(9(){F(5,d,3,m)},3.1m)}6(3.T){5.J(\'<C z="7-T"><a z="7-2a">2f</a><a z="7-29">2m</a></C>\');6(3.2d){$(\'.7-T\',5).24();5.25(9(){$(\'.7-T\',5).2l()},9(){$(\'.7-T\',5).24()})}$(\'a.7-2a\',5).1J(\'1I\',9(){6(4.N)I m;S(l);l=\'\';4.f-=2;F(5,d,3,\'1C\')});$(\'a.7-29\',5).1J(\'1I\',9(){6(4.N)I m;S(l);l=\'\';F(5,d,3,\'1A\')})}6(3.M){b 1b=$(\'<C z="7-M"></C>\');5.J(1b);2b(b i=0;i<d.1j;i++){6(3.20){b j=d.1B(i);6(!j.K(\'B\')){j=j.1g(\'B:1s\')}6(3.1Q){1b.J(\'<a z="7-1l" 11="\'+i+\'"><B D="\'+j.s(\'11\')+\'" 28="" /></a>\')}n{1b.J(\'<a z="7-1l" 11="\'+i+\'"><B D="\'+j.s(\'D\').2n(3.1R,3.1P)+\'" 28="" /></a>\')}}n{1b.J(\'<a z="7-1l" 11="\'+i+\'">\'+i+\'</a>\')}}$(\'.7-M a:1B(\'+4.f+\')\',5).1n(\'1o\');$(\'.7-M a\',5).1J(\'1I\',9(){6(4.N)I m;6($(g).2e(\'1o\'))I m;S(l);l=\'\';5.e(\'W\',\'V(\'+4.t.s(\'D\')+\') R-Y\');4.f=$(g).s(\'11\')-1;F(5,d,3,\'1l\')})}6(3.1M){$(2q).2A(9(1L){6(1L.1Z==\'2C\'){6(4.N)I m;S(l);l=\'\';4.f-=2;F(5,d,3,\'1C\')}6(1L.1Z==\'2D\'){6(4.N)I m;S(l);l=\'\';F(5,d,3,\'1A\')}})}6(3.1T){5.25(9(){4.1k=Q;S(l);l=\'\'},9(){4.1k=m;6(l==\'\'&&!3.1i){l=1v(9(){F(5,d,3,m)},3.1m)}})}5.2E(\'7:Z\',9(){4.N=m;$(d).E(9(){6($(g).K(\'a\')){$(g).e(\'P\',\'1h\')}});6($(d[4.f]).K(\'a\')){$(d[4.f]).e(\'P\',\'1w\')}6(l==\'\'&&!4.1k&&!3.1i){l=1v(9(){F(5,d,3,m)},3.1m)}3.1U.1z(g)})});9 F(5,d,3,19){b 4=5.1S(\'7:4\');6((!4||4.1N)&&!19)I m;3.1W.1z(g);6(!19){5.e(\'W\',\'V(\'+4.t.s(\'D\')+\') R-Y\')}n{6(19==\'1C\'){5.e(\'W\',\'V(\'+4.t.s(\'D\')+\') R-Y\')}6(19==\'1A\'){5.e(\'W\',\'V(\'+4.t.s(\'D\')+\') R-Y\')}}4.f++;6(4.f==4.U){4.f=0;3.1V.1z(g)}6(4.f<0)4.f=(4.U-1);6($(d[4.f]).K(\'B\')){4.t=$(d[4.f])}n{4.t=$(d[4.f]).1g(\'B:1s\')}6(3.M){$(\'.7-M a\',5).2F(\'1o\');$(\'.7-M a:1B(\'+4.f+\')\',5).1n(\'1o\')}6(4.t.s(\'16\')!=\'\'){6($(\'.7-H\',5).e(\'P\')==\'1w\'){$(\'.7-H p\',5).22(3.q,9(){$(g).1y(4.t.s(\'16\'));$(g).1x(3.q)})}n{$(\'.7-H p\',5).1y(4.t.s(\'16\'))}$(\'.7-H\',5).1x(3.q)}n{$(\'.7-H\',5).22(3.q)}b i=0;$(\'.7-c\',5).E(9(){b G=X.27(5.w()/3.h);$(g).e({x:\'O\',y:\'0\',W:\'V(\'+4.t.s(\'D\')+\') R-Y -\'+((G+(i*G))-G)+\'13 0%\'});i++});6(3.k==\'1t\'){b 10=2G 2B("1K","14","1F","17","1E","12","1D","1r");4.o=10[X.26(X.1t()*(10.1j+1))];6(4.o==2y)4.o=\'1r\'}6(3.k.2o(\',\')!=-1){b 10=3.k.2r(\',\');4.o=$.2z(10[X.26(X.1t()*10.1j)])}4.N=Q;6(3.k==\'2p\'||3.k==\'1K\'||4.o==\'1K\'||3.k==\'14\'||4.o==\'14\'){b u=0;b i=0;b h=$(\'.7-c\',5);6(3.k==\'14\'||4.o==\'14\')h=$(\'.7-c\',5).1e();h.E(9(){b c=$(g);c.e(\'1G\',\'O\');6(i==3.h-1){L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q,\'\',9(){5.18(\'7:Z\')})},(r+u))}n{L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q)},(r+u))}u+=1u;i++})}n 6(3.k==\'2t\'||3.k==\'1F\'||4.o==\'1F\'||3.k==\'17\'||4.o==\'17\'){b u=0;b i=0;b h=$(\'.7-c\',5);6(3.k==\'17\'||4.o==\'17\')h=$(\'.7-c\',5).1e();h.E(9(){b c=$(g);c.e(\'23\',\'O\');6(i==3.h-1){L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q,\'\',9(){5.18(\'7:Z\')})},(r+u))}n{L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q)},(r+u))}u+=1u;i++})}n 6(3.k==\'1E\'||3.k==\'2u\'||4.o==\'1E\'||3.k==\'12\'||4.o==\'12\'){b u=0;b i=0;b v=0;b h=$(\'.7-c\',5);6(3.k==\'12\'||4.o==\'12\')h=$(\'.7-c\',5).1e();h.E(9(){b c=$(g);6(i==0){c.e(\'1G\',\'O\');i++}n{c.e(\'23\',\'O\');i=0}6(v==3.h-1){L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q,\'\',9(){5.18(\'7:Z\')})},(r+u))}n{L(9(){c.A({x:\'r%\',y:\'1.0\'},3.q)},(r+u))}u+=1u;v++})}n 6(3.k==\'1D\'||4.o==\'1D\'){b u=0;b i=0;$(\'.7-c\',5).E(9(){b c=$(g);b 1H=c.w();c.e({1G:\'O\',x:\'r%\',w:\'O\'});6(i==3.h-1){L(9(){c.A({w:1H,y:\'1.0\'},3.q,\'\',9(){5.18(\'7:Z\')})},(r+u))}n{L(9(){c.A({w:1H,y:\'1.0\'},3.q)},(r+u))}u+=1u;i++})}n 6(3.k==\'1r\'||4.o==\'1r\'){b i=0;$(\'.7-c\',5).E(9(){$(g).e(\'x\',\'r%\');6(i==3.h-1){$(g).A({y:\'1.0\'},(3.q*2),\'\',9(){5.18(\'7:Z\')})}n{$(g).A({y:\'1.0\'},(3.q*2))}i++})}}};$.1f.1q.2c={k:\'1t\',h:15,q:2x,1m:2w,1a:0,T:Q,2d:Q,M:Q,20:m,1Q:m,1R:\'.1O\',1P:\'2v.1O\',1M:Q,1T:Q,1i:m,1Y:0.8,1W:9(){},1U:9(){},1V:9(){}};$.1f.1e=[].1e})(2s);', 62, 167, '|||settings|vars|slider|if|nivo||function||var|slice|kids|css|currentSlide|this|slices||child|effect|timer|false|else|randAnim||animSpeed|100|attr|currentImage|timeBuff||width|height|opacity|class|animate|img|div|src|each|nivoRun|sliceWidth|caption|return|append|is|setTimeout|controlNav|running|0px|display|true|no|clearInterval|directionNav|totalSlides|url|background|Math|repeat|animFinished|anims|rel|sliceUpDownLeft|px|sliceDownLeft||title|sliceUpLeft|trigger|nudge|startSlide|nivoControl|childWidth|childHeight|reverse|fn|find|none|manualAdvance|length|paused|control|pauseTime|addClass|active|link|nivoSlider|fade|first|random|50|setInterval|block|fadeIn|html|call|next|eq|prev|fold|sliceUpDown|sliceUpRight|top|origWidth|click|live|sliceDownRight|event|keyboardNav|stop|jpg|controlNavThumbsReplace|controlNavThumbsFromRel|controlNavThumbsSearch|data|pauseOnHover|afterChange|slideshowEnd|beforeChange|options|captionOpacity|keyCode|controlNavThumbs|left|fadeOut|bottom|hide|hover|floor|round|alt|nextNav|prevNav|for|defaults|directionNavHide|hasClass|Prev|relative|position|extend|children|imageLink|show|Next|replace|indexOf|sliceDown|window|split|jQuery|sliceUp|sliceUpDownRight|_thumb|3000|500|undefined|trim|keypress|Array|37|39|bind|removeClass|new'.split('|'), 0, {}))
;
/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/modules/views_nivo_slider/js/views_nivo_slider.js. */
Drupal.behaviors.views_nivo_sliderBehavior = function (context) {
    $('.views-nivo-slider:not(.nivo-slider-processed)').each(function () {
        var id = $(this).attr('id'), vns = $(this), cfg = Drupal.settings.views_nivo_slider[id];
        vns.data('hmax', 0).data('wmax', 0);
        $('img', vns).each(function () {
            hmax = (vns.data('hmax') > $(this).height()) ? vns.data('hmax') : $(this).height();
            wmax = (vns.data('wmax') > $(this).width()) ? vns.data('hmax') : $(this).width();
            vns.width(wmax).height(hmax).data('hmax', hmax).data('wmax', wmax)
        });
        vns.nivoSlider(cfg)
    }).addClass('nivo-slider-processed')
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/modules/views_nivo_slider/js/views_nivo_slider.js. */
