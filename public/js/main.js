(function(){
    var global = window || (0, eval)('this');
    var rootPath = null;
    for(var i = 0,scripts = document.getElementsByTagName('script');i<scripts.length;++i){
        if(RegExp('^.*/js/main[^/]*.js$').test(scripts[i].src)){
            rootPath = scripts[i].src.replace(/js\/main[^\/]*.js$/g, '');
            eval('require.config({baseUrl: scripts[i].src.replace(/js\\/main[^\\/]*.js$/g, "")});');
            break;
        }
    };
})();

require.config({
    paths:{
        jquery:'js/frame/jquery-1.11.3.min',
        flowTree: 'js/frame/flowTree'
    },
    waitSeconds: 0
});
