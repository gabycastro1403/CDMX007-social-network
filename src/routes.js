(function(window, document){
    library.getID('view').enroute()
    .route('/', './views/login.html', 'controlador', window.controlador.iniciarSesion)
    .route('/registro', './views/registro.html', 'controlador', window.controlador.registro)
    .route('/muro', 'views/muro.html', 'controlador', window.controlador.cerrarSesion)
 
 })(window, document);