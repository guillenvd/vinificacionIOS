	$(document).ready(function(){ 
		$('#alta').hide(); 
		$('#view').hide(); 
		$('#alertInt').hide(); 
		$('#editar').hide(); 
        $("input[id='grados']").keydown(function (event) {
            if (event.shiftKey == true) {
                event.preventDefault();
            }
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

            } 
            else {
                event.preventDefault();
            }
            if($(this).val().indexOf('.') !== -1 && event.keyCode == 190){
                event.preventDefault();
            }

        });
        $("input[id='temperatura']").keydown(function (event) {
            if (event.shiftKey == true) {
                event.preventDefault();
            }
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {
            } 
            else {
                event.preventDefault();
            }
            if($(this).val().indexOf('.') !== -1 && event.keyCode == 190){
                event.preventDefault();
            }

        });    
        rowFermentacion();
   });

/**	fermentacion controller ***/
    function altaFermentacion(argument) {
        $('#index').hide(); 
        $('#view').hide(); 
        $('#alertInt').hide(); 
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
        $('#alertInt').hide(); 
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
            clearTable();
            $('#viewfecha').append(row.fecha); 
            $('#viewvinoBase').append(row.vinoBase);
            $('#viewgrados').append(row.grados);
            $('#viewtemperatura').append(row.temperatura);
            
          }
         });
        });
    }

    function rowFermentacion(){
      var db = dbInicializar();
      var html="";
      db.transaction(function(t) {
        t.executeSql("SELECT * FROM fermentacion ORDER BY id DESC", [], function(transaction, results) {
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

			fermentacionRegister(parameters.monitoreoId, parameters.fecha, parameters.grados, parameters.temperatura, parameters.vinoBase,0);
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
