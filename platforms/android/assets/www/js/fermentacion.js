	$(document).ready(function(){ 
		$('#alta').hide(); 
		$('#view').hide(); 
    $('#noNum').hide(); 
		$('#editar').hide(); 
        $("#grados,#temperatura").keyup(function (event) {
          var id = $(this).attr('id'); 
          var val = $('#'+id).val();
          if(isNaN(val))
            $('#noNum').show()
          else 
            $('#noNum').hide()
        });
        $("#edittemperatura,#editgrados").keyup(function (event) {
          var id = $(this).attr('id'); 
          var val = $('#'+id).val();
          if(isNaN(val))
            $('#noNumEdit').show()
          else 
            $('#noNumEdit').hide()
        });
        rowFermentacion();
   });

/**	fermentacion controller ***/
    function altaFermentacion(argument) {
        $('#index').hide(); 
        $('#view').hide(); 
        $('#noNum').hide(); 
        $('#editar').hide(); 
        $('#alta').show(); 
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15
        });
        initBack('fermentacion');
        rowMonitoreo();
    }

    function viewFermentacion(argument) {
        initBack('fermentacion');
        $('#index').hide(); 
        $('#noNum').hide(); 
        $('#editar').hide(); 
        $('#alta').hide(); 
        $('#view').show(); 

        var db = dbInicializar();
        db.transaction(function(t) {
        t.executeSql("SELECT * FROM fermentacion where id = ?", [argument], function(transaction, results) {
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
              $('#viewfecha').empty(); 
              $('#viewhora').empty(); 
              $('#viewvinoBase').empty();
              $('#viewgrados').empty();
              $('#viewtemperatura').empty();

              $('#viewfecha').append(row.fecha); 
              $('#viewhora').append(row.hora); 
              $('#viewvinoBase').append(row.vinoBase);
              $('#viewgrados').append(row.grados);
              $('#viewtemperatura').append(row.temperatura);
              
          }
         });
        });
    }

    function editarFermentacion() {
        $('#noNumEdit').hide();
        $('#index').hide(); 
        $('#noNum').hide(); 
        $('#editar').show(); 
        $('#alta').hide(); 
        $('#view').hide(); 
         $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15
        });
         var db = dbInicializar();
        db.transaction(function(t) {
        t.executeSql("SELECT * FROM fermentacion where id = ?", [parseInt($('#viewId').val())], function(transaction, results) {
          $('select').material_select('destroy');
          for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                $('#editfecha').val(row.fecha); 
                $('#edithora').val(row.hora); 
                $('#editvinobase').val(row.vinoBase);
                $('#editgrados').val(row.grados);
                $('#edittemperatura').val(row.temperatura);
            }
            $('select').material_select();

         });
        });
    }

    function updateFermentacion() {
        var parameters = {
                          fecha: $('#editfecha').val(),
                          hora: $('#edithora').val(),
                          grados: $('#editgrados').val(),
                          temperatura: $('#edittemperatura').val()
                        };
        if(parameters.fecha !="" && parameters.hora !="" && parameters.grados !="" && parameters.temperatura !="" ){
            if( (!isNaN(parameters.grados) &&  !isNaN(parameters.temperatura) ) && ( (parseFloat(parameters.grados)>=-2 && parseFloat(parameters.grados) <=28) && (parseFloat(parameters.temperatura)>=-2 && parseFloat(parameters.temperatura) <=28) ) ){
              validateFermentacion(parameters,2);
            }
            else{
                $('#noNumEdit').show();
            }
        }
        else{
              Materialize.toast('No puede dejar campos vacios', 1500);
        }       
    }
    function rowFermentacion(){
      var db = dbInicializar();
      var html="";
      db.transaction(function(t) {
        t.executeSql("SELECT * FROM fermentacion ORDER BY fecha DESC", [], function(transaction, results) {
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            html += '<tr>'
                         +'<td>'+row.fecha+'</td>'
                         +'<td>'+row.vinoBase+'</td>'
                         +'<td>'
                              +'<ul class="collection">'
                                  +'<a href="#!" class="collection-item center-align" onclick="viewFermentacion('+row.id+');"><i class="fa fa-th-list"></i></a>'
                              +'</ul>'
                         +' </td>'
                      +' </tr>';

           }
           var  tb = document.getElementById('bodyFermentacion');
                tb.innerHTML = html;
        });
      }, function(error) { }, function() { });
    }


	function saveRegister() {
		var parameters = {
                        fecha:$('#fecha').val(),
                        hora:$('#hora').val(),
                  			monitoreoId:$('#monitoreo option:selected').val(),
                        temperatura:$('#temperatura').val(),
                  			grados:$('#grados').val(),
                        vinoBase: $('#monitoreo option:selected').text()
                		};
		if(parameters.monitoreoId !="" && parameters.fecha !="" && parameters.hora !=""  && parameters.temperatura !="" && parameters.grados !="" ){
        if( (!isNaN(parameters.temperatura) &&  !isNaN(parameters.grados) ) && ( (parseFloat(parameters.temperatura)>=-2 && parseFloat(parameters.temperatura) <=28) && (parseFloat(parameters.grados)>=-2 && parseFloat(parameters.grados) <=28) ) ){
          validateFermentacion(parameters,1);
        }
        else{
            $('#noNum').show();
        }
		}
		else{
	        Materialize.toast('No puede dejar campos vacios', 1500);
		}
	}


function validateFermentacion(parameters,caseFementacion){
  var db = dbInicializar();
  var response = 0;
  console.log(parameters);
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fermentacion", [], function(transaction, results) {
      for(var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
            if(row.fecha == parameters.fecha && parameters.hora == row.hora){  
              response = 1;
            }
        }
        if(parseInt(response)==0){
          console.log(1);
          fermentacionRegister(parameters.monitoreoId, parameters.fecha, parameters.hora, parameters.grados, parameters.temperatura, parameters.vinoBase,0);
        }else{
          Materialize.toast('Ya existe una fecha registrada para este vino.', 1500);
        }
    },function(txt,results) {
      console.log("1");
    }, function (error) {
      console.log("2"+error);
    });
  });
}

function updateRegister(parameters) {
      var id = parseInt($('#viewId').val());
      var db = dbInicializar();
      db.transaction(function(tx) {
          tx.executeSql("UPDATE fermentacion SET fecha = ?, hora = ?, grados = ?, temperatura = ? WHERE id = ?",[parameters.fecha,parameters.hora,parameters.grados, parameters.temperatura,id], 
          function(tx, result) {
              Materialize.toast('Actualización correcta.', 4000);
              viewFermentacion($('#viewId').val());
              $('#viewId').val('');             
          }, 
          function(error) {
              console.log('transaction error: ' + error.message);
          });
      });

}

    function deleteRow(){
        var toastContent = '<span>¿Desea borrar este registro?<a class="waves-effect waves-teal btn-flat" style=\'color:#ffdd21;\' onclick="confirmDelte();">Si</a></span>';
        Materialize.toast(toastContent, 1300);
        
    }
    function confirmDelte() {
        var db = dbInicializar();
            db.transaction(function(t) {
                t.executeSql("DELETE FROM fermentacion where id = ?", [parseInt($('#viewId').val())], 
                            function(tx, result) {   
                                Materialize.toast('Fermentacion eliminada correctamente.', 1500);
                                fermentacionIndex();
                                $('#viewId').val('');
                            },
                            function(error){                                
                                Materialize.toast('Algo salio mal.', 1500);
                                $('#viewId').val('');
                            }
                );
            });
    }
