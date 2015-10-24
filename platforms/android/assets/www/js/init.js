$( document ).ready(function(){  
         $(".button-collapse").sideNav();
         $('#conexionInfo').hide();
})
    
   function fenologiaIndex(){
         $( "#body" ).load( "views/fenologia.html" )
         $('.button-collapse').sideNav('hide');
      } 

   function fenologiaEdit(id){
         $( "#viewsFenologiaEdit" ).show();
         $( "#viewsFenologia" ).hide();
         $('.button-collapse').sideNav('hide');
          editFenologia(id);
    } 
   function fenologiaShow(id){
         $( "#viewsFenologiaEdit" ).hide();
         $( "#viewsFenologiaShow" ).show();
         $( "#viewsFenologia" ).hide();
         $('.button-collapse').sideNav('hide');
         showFenologia(id);
    } 

   function altaFenologia(){
         $( "#body" ).load( "views/altaFenologia.html" );
         $('.button-collapse').sideNav('hide');
   }    

   function sincronizar(){
         $( "#body" ).load( "views/json.html" );
         $('.button-collapse').sideNav('hide');
      }  
   function hostView(){
         $( "#body" ).load( "views/host.html" );
         $('.button-collapse').sideNav('hide');
   }    

   function inicio(){
         $( "#body" ).load( "views/inicio.html" );
         $('.button-collapse').sideNav('hide');
      }    
   function salir(){
         navigator.app.exitApp()
      }    

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
    if(states[networkState]=='1'){$('#conexionInfo').show();}
    else {$('#conexionInfo').hide();}

}