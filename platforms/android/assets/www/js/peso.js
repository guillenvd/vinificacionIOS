  $(document).ready(function(){ 
        $('#alta').hide();
        $('#view').hide();
        $('#calculoPeso').hide();
        $('#calculoCajas').hide();
        $('#fieldCajas').hide();
        $('#alertInt').hide();
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15
        });
        $('#checkInput').change(function() {
          if($(this).is(":checked")) {
              $('#calculoPeso').show();
              $('#calculoCajas').show();
              $('#fieldCajas').show();
              $('#cajasMuestra').val(1);
              $('#pesoTotalNeto').val(0);
              $('#pesoTotalNeto').prop( "disabled", true );
          }
          else{
            $('#calculoPeso').hide();
            $('#calculoCajas').hide();
            $('#fieldCajas').hide();
            $('#cajasMuestra').val(0);
            $('#pesoTotalNeto').val(0);
            $('#pesoTotalNeto').removeProp( "disabled" )
          }       
        });

  });

/*   FUNCION PARA SOLO MOSTRAR LA SECCIÓN DE ALTA DE CALCULO DE PESO   */
    function altaPeso(){
          $('#index').hide();
          $('#alta').show();
          $('ul.tabs').tabs();
           rowPredio();
          rowAnada();
          rowConfig(); 
    } 

/* FUNCION PARA AGREGAR UNA NUEVA CAJA PARA EL CALCULO DESCONOCIDO TOTAL NETO  */
    function newBox() {
        var num = document.getElementsByName("caja[]"); // IR POR EL INPUT DE CAJAS EXISTENTES
        //AL NUMERO DE CAJAS LE SUMAMOS UNO PARA EL INCREMENTO
        var box =  "<div class='input-field col s12' id='divBox"+(num.length+1)+"'><div class='input-field col s2'>"+
                       "<p><i class='fa fa-circle'></i></p>"+
                    "</div>"+
                    "<div class='input-field col s8'>"+
                      "<input type='text' length='10' id='caja[]' value='' name='caja[]' onkeyup='calpeso($(this).val());'>"+
                      "<label >PESO (KG)</label>"+
                    "</div>"+
                    "<div class='input-field col s2'>"+
                      "<a class='waves-effect waves-teal btn-flat' onclick='deleteBox("+(num.length+1)+");'><i class='fa fa-times'></i></a>"+
                    "</div></div>";
        $('#newCajas').append(box); //AL DIV DE LA SECCION DE CAJAS LE CONCATENAMOS UN NUEVO INPUT 
        $('#cajasMuestra').val(num.length+1);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 
        $('#cajasMuestra').val(num.length);  
    }

/*
  ESTA FUNCION RECIVE COMO PARAMETRO EL INDICE DE EL INPUT QUE SE DECEA ELIMINAR 
  DESPUES SE RESTA 1 AL TOTAL DE CAJAS EXISTENTES PARA EL CALCULO DEL PESO
*/
    function deleteBox(divEmpty) {
      var string = "#divBox"+divEmpty;
      $(string).remove();
      var num = document.getElementsByName("caja[]"); // IR POR EL INPUT DE CAJAS EXISTENTES
      if(num.length >0 ){
        $('#cajasMuestra').val(-1);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 
      }
      else{
              $('#cajasMuestra').val(0);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 
      }

    }

    function calpeso(kg) {
      if(kg !='' && !isNaN(kg) && sumCajaKg() != 0){
        var numCajas = document.getElementsByName("caja[]").length; 
        var sumCajasKg = sumCajaKg();
        pesoPromCaja(numCajas,sumCajasKg);
      }
    }

    function sumCajaKg(argument) {
        var suma = 0;
        $('input[name^="caja"]').each(function() {
            if($(this).val()!=''&& !isNaN($(this).val())){
              suma += parseFloat($(this).val());
            }
        });
      return suma;
    }
    /**
     * [pesoPromCaja description]
     * @param  {[float]} numCajas   [Numero de Cajas de la muestra]
     * @param  {[float]} sumCajasKg [Suma del peso de las cajas de la muestra]
     * @return {[none]}            [n/a]
     */
    function pesoPromCaja(numCajas,sumCajasKg) {
        var pesoProm = parseFloat(sumCajasKg) / parseFloat(numCajas);
        $('#pesoPromCaja').val(pesoProm);
        pesoTotalNetoMuestra(numCajas,pesoProm);
    }
    /**
     * [pesoTotalNetoMuestra description]
     * @param  {[float]} arg1 [Numero de Cajas de la muestra]
     * @param  {[float]} arg2 [Peso promedio por caja(Kg)]
     * @return {[none]}      [n/a]
     */
    function pesoTotalNetoMuestra(arg1,arg2) {
        var calculo = (parseFloat(arg1)*parseFloat(arg2)) - (parseFloat(arg1) *$('#taraCaja').val());
        $('#pesoMuestra').val(calculo);
        pesoPromNeto(calculo,arg1);
    }
    function pesoPromNeto(arg1,arg2){
        var NuevoCalculo =  parseFloat(arg1) / parseFloat(arg2);
        $('#pesoPromNeto').val(NuevoCalculo);
        pesoTotalNeto(NuevoCalculo);
    }
    function pesoTotalNeto(arg1) {
      if( ($('#taraCaja').val() !='' && !isNaN( $('#taraCaja').val())) && $('#totalCajas').val() !='' && !isNaN( $('#totalCajas').val())){
        var NuevoCalculo = parseFloat($('#totalCajas').val()) * parseFloat(arg1);
        $('#pesoTotalNeto').val(NuevoCalculo);
      }
    }

    function savePeso() {
        var fecha = $('#fecha').val();
        var costoUva = $('#costoUva').val();
        var pesoTotalNeto = $('#pesoTotalNeto').val();
        var totalCajas = $('#totalCajas').val();
        var cajasMuestra = $('#cajasMuestra').val();
        var taraCaja = $('#taraCaja').val();
        var pesoPromCaja = $('#pesoPromCaja').val();
        var pesoPromNeto = $('#pesoPromNeto').val();
        var pesoMuestra = $('#pesoMuestra').val();
        var parameters= { fecha:fecha, costoUva:costoUva, pesoTotalNeto:pesoTotalNeto, totalCajas:totalCajas, cajasMuestra:cajasMuestra, taraCaja:taraCaja, pesoPromCaja:pesoPromCaja, pesoPromNeto:pesoPromNeto, pesoMuestra:pesoMuestra};    
    if($('#checkInput').is(':checked')){
          if(checkBoxs() && fecha !='' && costoUva !='' && pesoTotalNeto !='' && totalCajas !='' && cajasMuestra !='' && taraCaja !='' && pesoPromCaja !='' && pesoPromNeto !='' && pesoMuestra !=''){
            getConfig(parameters, 2);
          }
          else{
            Materialize.toast('No puede dejar campos vacios', 1500);
          }
      }
      else{
        if(fecha !='' && costoUva !='' && pesoTotalNeto){
            getConfig(parameters, 2);
          }
        else{
            Materialize.toast('No puede dejar campos vacios', 1500);
        }
      }
    }
    function checkBoxs() {
      var response = 1;
        $('input[name^="caja"]').each(function(i) {
             $('#result').append('<br>caja'+i+''+$(this).val()+'<br>');
             if( isNaN($(this).val()) || $(this).val() == '' ){
                response = 0;
             }
          });
      return response;
    }

function rowPeso(){
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM peso ORDER BY id DESC", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.variedadName+'</td>'
                     +'<td>'+row.bloqueName+'</td>'
                     +'<td>'+row.anadaName+'</td>'
                     +'<td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="viewPeso('+row.id+');"><i class="fa fa-th-list"></i></a>'
                          +'</ul>'
                     +' </td>'
                  +' </tr>';

       }
       var  tb = document.getElementById('bodyPeso');
            tb.innerHTML = html;
    });
  });
}

  function viewPeso(id) {
      $('#alta').hide();
      $('#index').hide();
      $('#view').show();
      var db = dbInicializar();
    db.transaction(function(t) {
        t.executeSql("SELECT * FROM peso where id = ?", [id], function(transaction, results) {
          for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              if(row.ide=='0'){
                $('#viewId').val(row.id);
                $('#btns').show();
              }
              else{
                  $('#viewId').val('');
                  $('#btns').hide();
              }
            $('#viewrancho').empty(); 
            $('#viewvinedo').empty();
            $('#viewvariedad').empty();
            $('#viewbloque').empty();
            $('#viewanada').empty();
            $('#viewfecha').empty();
            $('#viewcostoUva').empty();
            $('#viewpesoTotalNeto').empty();

            $('#viewrancho').append(row.ranchoName); 
            $('#viewvinedo').append(row.vinedoName);
            $('#viewvariedad').append(row.variedadName);
            $('#viewbloque').append(row.bloqueName);
            $('#viewanada').append(row.anadaName);
            $('#viewfecha').append(row.fecha);
            $('#viewcostoUva').append(row.costoUva);
            $('#viewpesoTotalNeto').append(row.pesoTotalNeto);
          
          }
        });
    });

  }

/*
tx.executeSql("INSERT INTO profile('','','','') values(?,?,?,?)", [x,x,x,x], 
    function(tx, results){
        var lastInsertId = results.insertId;
    }, 
    function(tx, results){
        //error
    }
);
 */