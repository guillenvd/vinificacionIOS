/************* inicializar barrra y ocultar notificación de red *************/
    $( document ).ready(function(){  
      $('#backMenu').hide();
      $(".button-collapse").sideNav({
          menuWidth: 240, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
      $('#conexionInfo').hide();
    });

/************* CONTROLADOR DE MENU DE LA APLICACION  *************/
    function maduraIndex() {
        $('#backMenu').hide();
        $( "#body" ).load( "views/maduracionIndex.html" );
        $('.button-collapse').sideNav('hide');
        setTimeout(function(){ rowMaduracion(); }, 500);
        
    } 

    function pesoIndex(){
        $('#backMenu').hide();
        $( "#body" ).load( "views/pesoIndex.html" );
        $('.button-collapse').sideNav('hide');
        setTimeout(function(){ rowPeso(); }, 500);

    } 
  
    function hostView() {
        $('#backMenu').show();
        $('#backMenu').removeAttr('onclick');
        $('#backMenu').attr('onclick','inicio();');
        $( "#body" ).load( "views/host.html" );
        $('.button-collapse').sideNav('hide');
    } 

    function sincronizar() {
        $('#backMenu').show();
        $('#backMenu').removeAttr('onclick');
        $('#backMenu').attr('onclick','inicio();');
        $( "#body" ).load( "views/json.html" );
        $('.button-collapse').sideNav('hide');
    } 

   function inicio(){
        $('#backMenu').hide();
        $( "#body" ).load( "views/inicio.html" );
        $('.button-collapse').sideNav('hide');
    }    

   function salir(){
         navigator.app.exitApp()
   }    

/************* Funcion para verificar si exite conexion a internet o no  *************/
  function checkConnection() {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = '1';
      states[Connection.ETHERNET] = '1';
      states[Connection.WIFI]     = '1';
      states[Connection.CELL_2G]  = '1';
      states[Connection.CELL_3G]  = '1';
      states[Connection.CELL_4G]  = '1';
      states[Connection.CELL]     = '1';
      states[Connection.NONE]     = '0';
      if(states[networkState]=='1'){
          $('#conexionInfo').show();
      }
      else {
          $('#conexionInfo').hide();
      }
  }
