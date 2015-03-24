define([
  'jquery',
  'underscore',
  'backbone',
  'assets/script/collections/stops.js',
  'assets/script/collections/etas.js',
  'assets/script/views/component/header.js',
  'assets/script/views/component/nav.js',
  'assets/script/views/component/footer.js',
  'assets/script/views/home.js',
  'assets/script/views/stops.js',
  'assets/script/views/etas.js',
], function($, _, Backbone, StopsCollection, EtasCollection, HeaderView, NavView, FooterView, HomeView, StopsView, EtasView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      '':'showHome',
      ':LINE': 'showRoutes',
      ':LINE/:PARENT_STOP_ID': 'showEtas',
      'default': 'renderAll'
    }
  });
  
  var initialize = function(){

    app_router = new AppRouter;

    app_router.on('route:renderAll', function () {  
      $("body").removeClass (function (index, css) {
          return (css.match (/\bline-\S+/g) || []).join(' ');
        });
      $('body').removeClass('show-stops show-etas');
    });

    app_router.on('route:showRoutes', function (LINE) {    
        $('body').removeClass('show-etas');
        $("body").removeClass (function (index, css) {
          return (css.match (/\bline-\S+/g) || []).join(' ');
        }).addClass('show-stops line-'+LINE);

        var lineUrl = './lines/line_'+LINE+'.json';
        var stopsCollection = new StopsCollection([],{apiUrl: lineUrl});
        stopsCollection.fetch();
        var stopsView = new StopsView({collection: stopsCollection});
        stopsView.render();

    });

    app_router.on('route:showHome', function () {    
      $("body").removeClass (function (index, css) {
        return (css.match (/\bline-\S+/g) || []).join(' ');
      });
      $('body').removeClass('show-stops show-etas');
      $('body').addClass('menu-open');

      var homeView = new HomeView();
    });

    

    app_router.on('route:showEtas', function (LINE,PARENT_STOP_ID) {   
      $('body').removeClass('show-stops'); 
      $("body").removeClass (function (index, css) {
          return (css.match (/\bline-\S+/g) || []).join(' ');
        }).addClass('show-etas line-'+LINE);

      var lineUrl = './lines/line_'+LINE+'.json';
      var stopsCollection = new StopsCollection([],{apiUrl: lineUrl});
      var currentStop;
      stopsCollection.fetch({
        success: function(){
          currentStop = stopsCollection.where({STATION:parseInt(PARENT_STOP_ID)})[0].get('STATION_NAME');
          var ctaUrl = 'http://cta.billhinderman.com/assets/script/rebar/proxy.php?stop='+PARENT_STOP_ID+'&rt='+LINE;
          var closeUrl = '#/'+LINE;
          var etasCollection = new EtasCollection([],{apiUrl: ctaUrl});
          etasCollection.fetch();
          var view = new EtasView({collection: etasCollection, stopNm:currentStop, close:closeUrl});
          view.render();
        }
      });

      var stopsView = new StopsView({collection: stopsCollection});
      stopsView.render();

    });

    var headerView = new HeaderView();
    var navView = new NavView();
    navView.render();
    var footerView = new FooterView();
    $(window).on('resize', function() {
      $('[data-fill]').css({'min-height':($(window).height())});
    });
    $(window).resize();

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
