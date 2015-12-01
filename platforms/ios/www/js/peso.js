  $(document).ready(function(){
        $('#alta').hide();
        $('#view').hide();
        $('#calculoPeso').hide();
        $('#calculoCajas').hide();
        $('#fieldCajas').hide();
        $('#alertInt').hide();
        $('#edit').hide();

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
          initBack();
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
                      "<input type='text' length='10' id='caja[]' value='' name='caja[]' onkeyup='calpeso(\"\",$(this).val());'>"+
                      "<label >PESO (KG)</label>"+
                    "</div>"+
                    "<div class='input-field col s2'>"+
                      "<a class='waves-effect waves-teal btn-flat' onclick='deleteBox(\"\","+(num.length+1)+");'><i class='fa fa-times'></i></a>"+
                    "</div></div>";
        $('#newCajas').append(box); //AL DIV DE LA SECCION DE CAJAS LE CONCATENAMOS UN NUEVO INPUT 
        $('#cajasMuestra').val(num.length);  
    }

/*
  ESTA FUNCION RECIVE COMO PARAMETRO EL INDICE DE EL INPUT QUE SE DECEA ELIMINAR 
  DESPUES SE RESTA 1 AL TOTAL DE CAJAS EXISTENTES PARA EL CALCULO DEL PESO
*/
    function deleteBox(ref,divEmpty) {
      var string = "#"+ref+"divBox"+divEmpty;
      var num = document.getElementsByName(""+ref+"caja[]"); // IR POR EL INPUT DE CAJAS EXISTENTES
      if(num.length >0 ){
        $('#'+ref+'cajasMuestra').val(num.length-1);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 
      }
      else{
              $('#'+ref+'cajasMuestra').val(0);   //AL INPUT DE NUMERO DE CAJAS LE AUMENTAMOS UNO. 
      }
      $(string).remove();
      calpeso(ref,1);

    }

    function calpeso(ref,kg) {
      if(kg !='' && !isNaN(kg) && sumCajaKg(ref) != 0){
        var numCajas = document.getElementsByName(ref+"caja[]").length; 
        var sumCajasKg = sumCajaKg(ref);
        pesoPromCaja(ref,numCajas,sumCajasKg);
      }
    }

    function sumCajaKg(ref) {
        var suma = 0;
        var stringPattern = ref+"caja";
        $('input[name^="'+stringPattern+'"]').each(function() {
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
    function pesoPromCaja(ref,numCajas,sumCajasKg) {
        var pesoProm = parseFloat(sumCajasKg) / parseFloat(numCajas);
        $('#'+ref+'pesoPromCaja').val(pesoProm.toFixed(2));
        pesoTotalNetoMuestra(ref,numCajas,pesoProm);
    }
    /**
     * [pesoTotalNetoMuestra description]
     * @param  {[float]} arg1 [Numero de Cajas de la muestra]
     * @param  {[float]} arg2 [Peso promedio por caja(Kg)]
     * @return {[none]}      [n/a]
     */
    function pesoTotalNetoMuestra(ref,arg1,arg2) {
        var calculo = (parseFloat(arg1)*parseFloat(arg2)) - (parseFloat(arg1) *$('#'+ref+'taraCaja').val());
        $('#'+ref+'pesoMuestra').val(calculo.toFixed(2));
        pesoPromNeto(ref,calculo,arg1);
    }
    function pesoPromNeto(ref,arg1,arg2){
        var NuevoCalculo =  parseFloat(arg1) / parseFloat(arg2);
        $('#'+ref+'pesoPromNeto').val(NuevoCalculo.toFixed(2));
        pesoTotalNeto(ref,NuevoCalculo);
    }
    function pesoTotalNeto(ref,arg1) {
      if( ($('#'+ref+'taraCaja').val() !='' && !isNaN( $('#'+ref+'taraCaja').val())) && $('#'+ref+'totalCajas').val() !='' && !isNaN( $('#'+ref+'totalCajas').val())){
        var NuevoCalculo = parseFloat($('#'+ref+'totalCajas').val()) * parseFloat(arg1);
        $('#'+ref+'pesoTotalNeto').val(NuevoCalculo.toFixed(2));
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
              if(checkBoxs('') && fecha !='' && costoUva !='' && pesoTotalNeto !='' && totalCajas !='' && cajasMuestra !='' && taraCaja !='' && pesoPromCaja !='' && pesoPromNeto !='' && pesoMuestra !=''){
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
    function checkBoxs(ref) {
      var response = 1;
        $('input[name^="'+ref+'caja"]').each(function(i) {
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
  },
    function(error) {
      console.log('transaction error: ' + error.message);
      db.close();
    }, 
    function() {
      console.log('transaction ok');
      db.close();
    });
}

  function viewPeso(id) {
      $('#alta').hide();
      $('#edit').hide();
      $('#index').hide();
      $('#viewCalCajas').hide();
      $('#view').show();
      $('#editTaraFlag').val('');
      initBack();
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
            clearTable();
            $('#viewrancho').append(row.ranchoName); 
            $('#viewvinedo').append(row.vinedoName);
            $('#viewvariedad').append(row.variedadName);
            $('#viewbloque').append(row.bloqueName);
            $('#viewanada').append(row.anadaName);
            $('#viewfecha').append(row.fecha);
            $('#viewcostoUva').append(row.costoUva);
            $('#viewpesoTotalNeto').append(row.pesoTotalNeto);
            if(row.taraCaja != ''){
              $('#editTaraFlag').val(row.taraCaja);
              $('#viewtotalCajas').append(row.totalCajas);
              $('#viewcajasMuestra').append(row.cajasMuestra);
              $('#viewtaraCaja').append(row.taraCaja);
              $('#viewpesoPromCaja').append(row.pesoPromCaja);
              $('#viewpesoPromNeto').append(row.pesoPromNeto);
              $('#viewpesoMuestra').append(row.pesoMuestra);
              showCajas(row.id);
              $('#viewCalCajas').show();
            }
          }
        });
    });

  }
  function clearTable(){
          $('#viewrancho').empty(); 
          $('#viewvinedo').empty();
          $('#viewvariedad').empty();
          $('#viewbloque').empty();
          $('#viewanada').empty();
          $('#viewfecha').empty();
          $('#viewcostoUva').empty();
          $('#viewpesoTotalNeto').empty();
          $('#viewtotalCajas').empty();
          $('#viewcajasMuestra').empty();
          $('#viewtaraCaja').empty();
          $('#viewpesoPromCaja').empty();
          $('#viewpesoPromNeto').empty();
          $('#viewpesoMuestra').empty();
          $('#bodyCaja').empty();
  }
  function showCajas(id){
    var db = dbInicializar();
    var html="";
      db.transaction(function(t) {
        t.executeSql("SELECT * FROM cajas where calculoId = ?", [id], function(transaction, results) {
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            html += '<tr>'
                         +'<td>'+row.numCaja+'</td>'
                         +'<td>'+row.peso+'</td>'
                    +' </tr>';

           }
           var  tb = document.getElementById('bodyCaja');
                tb.innerHTML = html;
        });
      });
  }


  function deleteRow(){
    var toastContent = '<span>¿Desea borrar este registro?<a class="waves-effect waves-teal btn-flat" style=\'color:#ffdd21;\' onclick="confirmDelete();">Si</a></span>';
      Materialize.toast(toastContent, 1300);
    
  }
  function confirmDelete() {
    var db = dbInicializar();
          db.transaction(function(t) {
              t.executeSql("DELETE FROM peso where id = ?", [$('#viewId').val()], 
                    function(tx, result) {   
                            deleteBoxs();
                    },
                    function(error){                                
                            Materialize.toast('Algo salio mal.', 1500);
                            $('#viewId').val('');
                    }
              );
          });
  }

  function deleteBoxs() {
    var db = dbInicializar();
          db.transaction(function(t) {
              t.executeSql("DELETE FROM cajas where calculoId = ?", [parseInt($('#viewId').val())], 
                    function(tx, result) {   
                            Materialize.toast('Cálculo eliminado correctamente.', 1500);
                            pesoIndex();
                            $('#viewId').val('');
                        },
                        function(error){                                
                            Materialize.toast('Algo salio mal.', 1500);
                            $('#viewId').val('');
                    }
              );
          });
  }

  function editarPeso() {
      $('#alta').hide();
      $('#index').hide();
      $('#viewCalCajas').hide();
      $('#editalertInt').hide();
      $('#view').hide();
      $('#edit').show();
      $('#editfieldCajas').hide();
      $('#editcalculoCajas').hide();
      $('#editalertInt').hide();
      initBack();

    var db = dbInicializar();
    db.transaction(function(t) {
        t.executeSql("SELECT * FROM peso where id = ?", [$('#viewId').val()], function(transaction, results) {
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            $('#editfecha').val('');
            $('#editcostoUva').val('');
            $('#editpesoTotalNeto').val('');
            $('#edittotalCajas').val('');
            $('#editcajasMuestra').val('');
            $('#edittaraCaja').val('');
            $('#editpesoPromCaja').val('');
            $('#editpesoPromNeto').val('');
            $('#editpesoMuestra').val('');
            $('#editfecha').val(row.fecha);
            $('#editcostoUva').val(row.costoUva);
            $('#editpesoTotalNeto').val(row.pesoTotalNeto);
            if( row.taraCaja != ''){
              $('#editpesoTotalNeto').prop( "disabled", true );
              $('#editfieldCajas').show();
              $('#editcalculoCajas').show();
              $('#edittotalCajas').val(row.totalCajas);
              $('#editcajasMuestra').val(row.cajasMuestra);
              $('#edittaraCaja').val(row.taraCaja);
              $('#editpesoPromCaja').val(row.pesoPromCaja);
              $('#editpesoPromNeto').val(row.pesoPromNeto);
              $('#editpesoMuestra').val(row.pesoMuestra);
              getBoxstoEdit();
            }
            
          }
        });
    });
  }

  function getBoxstoEdit() {
    var db = dbInicializar();
    var box="";
    $('#editExistCajas').empty();
    $('#editnewCajas').empty();
      db.transaction(function(t) {
        t.executeSql("SELECT * FROM cajas where calculoId = ?", [$('#viewId').val()], function(transaction, results) {
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            box += "<div class='input-field col s12' id='editdivBox"+(i)+"'><div class='input-field col s2'>"+
                       "<p><i class='fa fa-circle'></i></p>"+
                    "</div>"+
                    "<div class='input-field col s8'>"+
                      "<input type='text' length='10' id='editcaja[]' value='"+row.peso+"' name='editcaja[]' onkeyup='calpeso(\"edit\", $(this).val());'>"+
                      "<label class='active' >PESO (KG)</label>"+
                    "</div>"+
                    "<div class='input-field col s2'>"+
                      "<a class='waves-effect waves-teal btn-flat' onclick='deleteBox(\"edit\","+(i)+");'><i class='fa fa-times'></i></a>"+
                    "</div></div>";

           }
           $('#editExistCajas').append(box);
        });
      });
  }
            
    function newEditBox() {
        var num = document.getElementsByName("editcaja[]"); // IR POR EL INPUT DE CAJAS EXISTENTES
        //AL NUMERO DE CAJAS LE SUMAMOS UNO PARA EL INCREMENTO
        var box =  "<div class='input-field col s12' id='editdivBox"+(num.length+1)+"'><div class='input-field col s2'>"+
                       "<p><i class='fa fa-circle'></i></p>"+
                    "</div>"+
                    "<div class='input-field col s8'>"+
                      "<input type='text' length='10' id='editcaja[]' value='' name='editcaja[]' onkeyup='calpeso(\"edit\",$(this).val());'>"+
                      "<label >PESO (KG)</label>"+
                    "</div>"+
                    "<div class='input-field col s2'>"+
                      "<a class='waves-effect waves-teal btn-flat' onclick='deleteBox(\"edit\","+(num.length+1)+");'><i class='fa fa-times'></i></a>"+
                    "</div></div>";
        $('#editnewCajas').append(box); //AL DIV DE LA SECCION DE CAJAS LE CONCATENAMOS UN NUEVO INPUT 
        $('#editcajasMuestra').val(num.length);  
    }

    function update() {
      var parameters = { fecha:"", costoUva:"", pesoTotalNeto:"", totalCajas:"", cajasMuestra:"", taraCaja:"", pesoPromCaja:"", pesoPromNeto:"", pesoMuestra:"" };

      parameters.fecha = $('#editfecha').val();
      parameters.costoUva = $('#editcostoUva').val();
      parameters.pesoTotalNeto = $('#editpesoTotalNeto').val();
      parameters.totalCajas =  $('#edittotalCajas').val();
      parameters.cajasMuestra =  $('#editcajasMuestra').val();
      parameters.taraCaja =  $('#edittaraCaja').val();
      parameters.pesoPromCaja =  $('#editpesoPromCaja').val();
      parameters.pesoPromNeto =  $('#editpesoPromNeto').val();
      parameters.pesoMuestra =  $('#editpesoMuestra').val();
      if( $('#editTaraFlag').val() != ""){
          if(checkBoxs('edit') && ( parameters.fecha!="" && parameters.costoUva!="" && parameters.pesoTotalNeto !="" && parameters.totalCajas!="" && parameters.cajasMuestra!="" && parameters.taraCaja!="" && parameters.pesoPromCaja!="" && parameters.pesoPromNeto!="" && parameters.pesoMuestra!=""  ) ){
            console.log('guardar cajas');
            updatePeso(parameters);
          }
          else{
            Materialize.toast('No puede dejar campos vacios', 1500);
          }
       }
       else{
          if(parameters.fecha!="" &&  parameters.costoUva!="" && parameters.pesoTotalNeto!=""){
            updatePeso(parameters);
          }
          else{
            Materialize.toast('No puede dejar campos vacios', 1500);
          }
       }
      console.log(parameters);          
    }
function updatePeso(parameters) {
    var id = parseInt($('#viewId').val());
    var db = dbInicializar();
        db.transaction(function(tx) {
            tx.executeSql("UPDATE peso SET fecha = ?, costoUva = ?, pesoTotalNeto = ?, totalCajas = ?, cajasMuestra = ?, taraCaja = ?, pesoPromCaja = ?, pesoPromNeto = ?, pesoMuestra = ? WHERE id = ?",[parameters.fecha, parameters.costoUva, parameters.pesoTotalNeto, parameters.totalCajas, parameters.cajasMuestra, parameters.taraCaja, parameters.pesoPromCaja, parameters.pesoPromNeto, parameters.pesoMuestra,id], 
            function(tx, result) {
              if($('#editTaraFlag').val()==""){
                Materialize.toast('Actualización correcta.', 4000);
                  viewPeso($('#viewId').val());
                  $('#viewId').val('');
                  $('#editTaraFlag').val('');
              }
              else{
                updateBoxs();
              }
            }, 
            function(error) {
                console.log('transaction error: ' + error.message);
            });
        });
       
  }

  function updateBoxs() {
      var idCalculo = parseInt($('#viewId').val());
      var db = dbInicializar();
      db.transaction(function(t) {
          t.executeSql("DELETE FROM cajas where calculoId = ?", [idCalculo], 
                        function(tx, result) {  
                            $('input[name^="editcaja"]').each(function(i) {
                                 console.log(idCalculo+""+$(this).val());
                                 cajasRegister(idCalculo,$(this).val(),i+1,0);
                            }); 
                            Materialize.toast('Actualización correcta boxes.', 4000);
                        },
                        function(error){                                
                            $('#viewId').val('');
                        }
              );
          });

      viewPeso($('#viewId').val());
      $('#viewId').val('');
      $('#editTaraFlag').val('');
  }
/*
  <i class="fa fa-check"></i>
  primero borrar las cajas
  y despues insertar llendo
  por las nuevas
*/