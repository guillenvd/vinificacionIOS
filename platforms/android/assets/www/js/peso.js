  $(document).ready(function(){ 
        $('#alta').hide();
        $('#calculoPeso').hide();
        $('#calculoCajas').hide();
        $('#fieldCajas').hide();
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
                      "<input type='text' length='10' id='caja[]' name='caja[]' onkeyup='calpeso($(this).val());'>"+
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
      $('#cajasMuestra').val(num.length-1);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 

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
      if($('#checkInput').is(':checked')){
        $('#result').append('seleccionado<br>');
      }
      else{
        $('#result').append('no seleccionado<br>');
      }
        $('#result').append(result);
        var fecha = $('#fecha').val();
        var costoUva = $('#costoUva').val();
        var pesoTotalNeto = $('#pesoTotalNeto').val();
        var totalCajas = $('#totalCajas').val();
        var cajasMuestra = $('#cajasMuestra').val();
        var taraCaja = $('#taraCaja').val();
        var pesoPromCaja = $('#pesoPromCaja').val();
        var pesoPromNeto = $('#pesoPromNeto').val();
        var pesoMuestra = $('#pesoMuestra').val();
        var result = 'fecha: '+fecha+'<br> costoUva: '+costoUva+'<br>pesoTotalNeto:'+pesoTotalNeto+'<br>totalCajas:'+totalCajas+'<br>cajasMuestra:'+cajasMuestra+'<br>taraCaja:'+taraCaja+'<br>pesoPromCaja:'+pesoPromCaja+'<br>pesoPromNeto:'+pesoPromNeto+'<br>pesoMuestra:'+pesoMuestra;
        $('#result').append(result);
        saveBoxs();
    }

    function saveBoxs() {
        $('input[name^="caja"]').each(function(i) {
             $('#result').append('<br>caja'+i+''+$(this).val()+'<br>');
          });
    }
/*
tx.executeSql("INSERT INTO profile('name','label','list_order','category') values(?,?,?,?)", [x,x,x,x], 
    function(tx, results){
        var lastInsertId = results.insertId;
    }, 
    function(tx, results){
        //error
    }
);
 */