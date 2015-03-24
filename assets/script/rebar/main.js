require.config({
  paths: {
    jquery: '../lib/jquery/jquery-min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-min',
    templates: '../../../templates',
    models: '../../models',
    collections: '../../collections'
  }

});

require([
  'app',

], function(App){
  App.initialize();
});
