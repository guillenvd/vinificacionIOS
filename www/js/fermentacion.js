	$(document).ready(function(){ 
		$('#alta').hide(); 
		$('#view').hide(); 
    $('#noNum').hide(); 
		$('#editar').hide(); 
        $("#grados,#temperatura,#edittemperatura,#editgrados").keyup(function (event) {
          var id = $(this).attr('id'); 
          var val = $(id).val();
          if(isNaN(val))
            $('#noNum').show()
          else 
            $('#noNum').hide()
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
            $('#viewvinoBase').empty();
            $('#viewgrados').empty();
            $('#viewtemperatura').empty();

            $('#viewfecha').append(row.fecha); 
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
          for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                $('#editfecha').val(row.fecha); 
                $('#editvinobase').val(row.vinoBase);
                $('#editgrados').val(row.grados);
                $('#edittemperatura').val(row.temperatura);
            }
         });
        });
    }

    function updateFermentacion() {
    if($('#editfecha').val() !="" && $('#editgrados').val() !="" && $('#edittemperatura').val() !="" ){
        if( (!isNaN($('#editgrados').val()) &&  !isNaN($('#edittemperatura').val()) ) && ( (parseFloat($('#editgrados').val())>=-2 && parseFloat($('#editgrados').val()) <=28) && (parseFloat($('#edittemperatura').val())>=-2 && parseFloat($('#edittemperatura').val()) <=28) ) ){
                var id = parseInt($('#viewId').val());
                var db = dbInicializar();
                db.transaction(function(tx) {
                    tx.executeSql("UPDATE fermentacion SET fecha = ?, grados = ?, temperatura = ? WHERE id = ?",[$('#editfecha').val(),$('#editgrados').val(), $('#edittemperatura').val(),id], 
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
			monitoreoId:$('#monitoreo option:selected').val(),
			fecha:$('#fecha').val(),
			temperatura:$('#temperatura').val(),
			grados:$('#grados').val(),
            vinoBase: $('#monitoreo option:selected').text()

		};
		if(parameters.monitoreoId !="" && parameters.fecha !="" && parameters.temperatura !="" && parameters.grados !="" ){
        if( (!isNaN(parameters.temperatura) &&  !isNaN(parameters.grados) ) && ( (parseFloat(parameters.temperatura)>=-2 && parseFloat(parameters.temperatura) <=28) && (parseFloat(parameters.grados)>=-2 && parseFloat(parameters.grados) <=28) ) ){
          fermentacionRegister(parameters.monitoreoId, parameters.fecha, parameters.grados, parameters.temperatura, parameters.vinoBase,0);
        }
        else{
            $('#noNum').show();
        }
		}
		else{
	        Materialize.toast('No puede dejar campos vacios', 1500);
		}
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
