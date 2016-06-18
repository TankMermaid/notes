$('a[href*=":"]').attr( "target", "_blank" );
$('a').on('click', function(event){ event.stopPropagation(); });

$('img').each(function(index){
    var src = $(this).attr('src');
    $(this).attr({
        src: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        'data-src': src,
        onload: "lzld(this)"
    });
    $a = $(this).parent('a');
    if ($a.length) {
        $a.addClass('dumb');
        $(this).addClass('dumb');
    }
});

$('a.hide').each(function(){
    $p = $(this).parent();
    if ( $p.is('li') ) {
        $p.addClass('hide');
    }
});

$('dt > code.fold').each(function(){
    $(this)
        .parent().addClass('drawerClose').addClass('drawer')
        .next('dd').addClass('drawerHide');
});
$('dt > code.foldable').each(function(){
    $(this)
        .parent().addClass('drawerOpen').addClass('drawer');
});
$('li > code.fold').each(function(){
    $(this)
        .parent().addClass('drawerClose').addClass('drawer').end()
        .next('ul,ol').addClass('drawerHide');
});
$('li > code.foldable').each(function(){
    $(this)
        .parent().addClass('drawerOpen').addClass('drawer')
});
$('p > code.fold').each(function(){
    $(this)
        .parent().addClass('simpledrawerClose').addClass('simpledrawer')
        .next('ul,ol').addClass('simpledrawerHide');
});
$('p > code.foldable').each(function(){
    $(this)
        .parent().addClass('simpledrawerOpen').addClass('simpledrawer');
});

$('dt.drawer').on('click', function(event){
    if(getSelection().toString()){ return; }
    $('.focus').removeClass('focus');
    $(this).addClass('focus').next('dd').addClass('focus');
    $(this)
        .toggleClass('drawerOpen')
        .toggleClass('drawerClose');
    $(this).next('dd').toggleClass('drawerHide');
    event.stopPropagation();
});
$('dd').on('click', function(event){
    if(getSelection().toString()){ return; }
    var $dt = $(this).prev('dt');
    if ($dt.hasClass('drawer')) {
        $('.focus').removeClass('focus');
        $(this).addClass('focus').prev('dt').addClass('focus');
        $dt
            .toggleClass('drawerOpen')
            .toggleClass('drawerClose');
        if ($(this).toggleClass('drawerHide').hasClass('drawerHide')) {
            if ( $(this).offset().top < pageYOffset ) {
                $('body,html').animate({scrollTop:$dt.offset().top},300);
            }
        }
        event.stopPropagation();
    }
});
$('li.drawer').on('click', function(event){
    if(getSelection().toString()){ return; }
    $('.focus').removeClass('focus');
    $(this).addClass('focus').children('ul,ol').addClass('focus');
    $(this)
        .toggleClass('drawerOpen')
        .toggleClass('drawerClose');
    $(this).children('ul,ol').toggleClass('drawerHide');
    event.stopPropagation();
});
$('ul').on('click', function(event){
    if(getSelection().toString()){ return; }
    var $li = $(this).prev('li');
    if ($li.hasClass('drawer')) {
        $('.focus').removeClass('focus');
        $(this).addClass('focus').prev('li').addClass('focus');
        $li
            .toggleClass('drawerOpen')
            .toggleClass('drawerClose');
        if ($(this).toggleClass('drawerHide').hasClass('drawerHide')) {
            if ( $(this).offset().top < pageYOffset ) {
                $('body,html').animate({scrollTop:$dt.offset().top},300);
            }
        }
        event.stopPropagation();
    }
});
$('p.simpledrawer').on('click', function(event){
    if(getSelection().toString()){ return; }
    $list = $(this).next();
    if ($list.is('ul') || $list.is('ol') ) {
        $('.focus').removeClass('focus');
        $list.toggleClass('simpledrawerHide').addClass('focus');
        $(this).toggleClass('simpledrawerOpen').toggleClass('simpledrawerClose').addClass('focus');
        event.stopPropagation();
    }
});
$('ul,ol').on('click', function(event){
    if(getSelection().toString()){ return; }
    $p = $(this).prev();
    if ($p.is('p.simpledrawer')) {
        if( !$p.hasClass('focus') ) {
            $p.addClass('focus');
            return event.stopPropagation();
        }
        $('.focus').removeClass('focus');
        $(this).addClass('simpledrawerHide');
        $p.addClass('simpledrawerClose').removeClass('simpledrawerOpen').addClass('focus');
        if ( $p.offset().top < pageYOffset ) {
            $('body,html').animate({scrollTop:$p.offset().top},300);
        }
        event.stopPropagation();
    }
});
$('body').on('click', function(event){
    if(getSelection().toString()){ return; }
    $('.focus').removeClass('focus');
});

function expandAll() {
    $('dt.drawerClose').removeClass('drawerClose').addClass('drawerOpen').next('dd').removeClass('drawerHide');
    $('li.drawerClose').removeClass('drawerClose').addClass('drawerOpen').children('ul,ol').removeClass('drawerHide');
    $('p.simpledrawerClose').removeClass('simpledrawerClose').addClass('simpledrawerOpen').next('ul,ol').removeClass('simpledrawerHide');
}
function foldAll() {
    $('dt.drawerOpen').removeClass('drawerOpen').addClass('drawerClose').next('dd').addClass('drawerHide');
    $('li.drawerOpen').removeClass('drawerOpen').addClass('drawerClose').children('ul,ol').addClass('drawerHide');
    $('p.simpledrawerOpen').removeClass('simpledrawerOpen').addClass('simpledrawerClose').next('ul,ol').addClass('simpledrawerHide');
}
function goUpDir() {
    $('#navigator a')[0].click();
}
function show(){ $('.hide').removeClass('hide').addClass('show'); }
function hide(){ $('.show').removeClass('show').addClass('hide'); }
function debug() {
    $('.show').css({'border': '1px solid blue'});
    $('.hide').css({'border': '1px solid red', 'display': 'block'});
}

$('body').keydown(function(e){
    var code = e.which;
    if(code==13) { // key: enter/return
        $f = $('dt.drawer.focus, li.drawer.focus, p.simpledrawer.focus');
        if ($f.length) {
            $f[0].click();
        }
    }
});

var egg = new Egg();
egg
    // left,left
    .addCode(   "left,left,left",       function() {    goUpDir();      }).addCode(     "u,p",          function() {    goUpDir();      })
    .addCode(   "left,left,down",       function() {    debug();        }).addCode(     "d,e,b,u,g",    function() {    debug();        })
    // right,right
    .addCode(   "right,right,down",     function() {    expandAll();    }).addCode(     "e,x,p,a,n,d",  function() {    expandAll();    })
    .addCode(   "right,right,up",       function() {    foldAll();      }).addCode(     "f,o,l,d",      function() {    foldAll();      })
    // left,right
    .addCode(   "left,right,down",      function() {    show();         }).addCode(     "s,h,o,w",      function() {    show();         })
    .addCode(   "left,right,up",        function() {    hide();         }).addCode(     "h,i,d,e",      function() {    hide();         })
    // right,left, reserved for what?
    .listen();
