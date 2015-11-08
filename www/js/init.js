    $( document ).ready(function(){  
      $(".button-collapse").sideNav({
          menuWidth: 240, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );
      $('#conexionInfo').hide();
    });
    
    function pesoIndex(){
         $( "#body" ).load( "views/pesoIndex.html" );
         $('.button-collapse').sideNav('hide');
    } 

    function altaPeso(){
          $('#index').hide();
          $('#alta').show();
          $('ul.tabs').tabs();

    } 
    
    function newBox() {
      var num = document.getElementsByName("caja[]");
      var box =  "<div class='input-field col s12' id='divBox"+(num.length+1)+"'><div class='input-field col s2'>"+
                     "<p><i class='fa fa-circle'></i></p>"+
                  "</div>"+
                  "<div class='input-field col s8'>"+
                    "<input id='input_text' type='text' length='10' id='caja[]' name='caja[]' >"+
                    "<label for='input_text'>PESO (KG)</label>"+
                  "</div>"+
                  "<div class='input-field col s2'>"+
                    "<a class='waves-effect waves-teal btn-flat' onclick='deleteBox("+(num.length+1)+");'><i class='fa fa-times'></i></a>"+
                  "</div></div>";
      $('#newCajas').append(box);  
      $('#cajasMuestra').val(num.length+1);  
      $('#cajasMuestra').val(num.length);  
    }

    function deleteBox(divEmpty) {
      var string = "#divBox"+divEmpty;
      $(string).remove();
    }

    function maduraIndex() {
      $( "#body" ).load( "views/maduracionIndex.html" );
         $('.button-collapse').sideNav('hide');
         rowMaduracion();
    } 

    function altaMaduracion() {
      $('#index').hide();
      $('#alta').show();
      $('ul.tabs').tabs();
      rowPredio();
      rowAnada();
      rowConfig();
    }

    function hostView() {
        $( "#body" ).load( "views/host.html" );
        $('.button-collapse').sideNav('hide');
    } 

    function sincronizar() {
        $( "#body" ).load( "views/json.html" );
        $('.button-collapse').sideNav('hide');
    } 

/**/
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
/********* conf ************************/
function saveConfig() {
    var rancho = $('#rancho option:selected').val();
    var vinedo = $('#vinedo option:selected').val();
    var variedad = $('#variedad option:selected').val();
    var bloque = $('#bloque option:selected').val();
    var anada = $('#anada option:selected').val();
    var ranchoName = $('#rancho option:selected').text();
    var vinedoName = $('#vinedo option:selected').text();
    var variedadName = $('#variedad option:selected').text();
    var bloqueName = $('#bloque option:selected').text();
    var anadaName = $('#anada option:selected').text();
    if(rancho != '' && vinedo != '' && variedad != '' && bloque != '' && anada){
      configRegister(rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName);
    }
    else{
       Materialize.toast('No puede dejar campos vacios de la configuracion.', 1500);
    }
  }

  /***************** save new maduracion  *************/
  function getConfig(fecha,solidos,ph,at,brph,brat){
  var db = dbInicializar();
  var list="";
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS config (id integer primary key, rancho text, vinedo text, variedad text, bloque text, anada text, ranchoName text, vinedoName text, variedadName text, bloqueName text, anadaName text)');
  });
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM config", [], function(transaction, results) {
        if(results.rows.length){
              for (var i = 0; i < results.rows.length; i++) {
                  var row = results.rows.item(i);
                  maduracionRegister(row.rancho, row.vinedo, row.variedad, row.bloque, row.anada,fecha,solidos,ph,at,brph,brat,2, row.ranchoName, row.vinedoName, row.variedadName, row.bloqueName, row.anadaName);
              }
            maduraIndex();
            Materialize.toast('Maduración registrada.', 1500);
          }
        else{
            Materialize.toast('Primero asigne una configuración ', 1500);
        }
    });
  });
}

function saveMaduracion() {
      var fecha = $('#fecha').val();
      var solidos = $('#solidos').val();
      var ph = $('#ph').val();
      var at = $('#at').val();
      var brph = $('#brph').val();
      var brat = $('#brat').val();
    if(fecha!='' && solidos!='' && ph!='' && at!='' && brph!='' && brat){
      getConfig(fecha,solidos,ph,at,brph,brat);
    }
    else{
        Materialize.toast('No puede dejar campos vacios', 1500);
    }
}