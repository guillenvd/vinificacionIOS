	$(document).ready(function(){ 
		$('#alta').hide(); 
		$('#view').hide(); 
		$('#alertInt').hide(); 
		$('#editar').hide(); 
     	$('.datepicker').pickadate({
        	selectMonths: true, 
        	selectYears: 15
        });
     	/***** listener para el teclado del input de solidos ****/
     	$( "#solidos" ).keyup(function() {
		    if( !isNaN($(this).val()) ){
		      brph('');
		      brat('');
		    }
     	});  
     	/***** listener para el teclado del input de ph ****/
    	$( "#ph" ).keyup(function() {
	        if( !isNaN($(this).val()) ){
	          brph('');
	        }
    	}); 
     	/***** listener para el teclado del input de at ****/
    	$( "#at" ).keyup(function() {
	        if( !isNaN($(this).val()) ){
	          brat('');
	        }
    	}); 
    	   /***** listener para el teclado del input de solidos en la opcion de editar ****/
    	$( "#editsolidos" ).keyup(function() {
		    if( !isNaN($(this).val()) ){
		      brph('edit');
		      brat('edit');
		    }
     	});  
     	/***** listener para el teclado del input de ph en la opcion de editar ****/
    	$( "#editph" ).keyup(function() {
	        if( !isNaN($(this).val()) ){
	          brph('edit');
	        }
    	}); 
     	/***** listener para el teclado del input de at en la opcion de editar ****/
    	$( "#editat" ).keyup(function() {
	        if( !isNaN($(this).val()) ){
	          brat('edit');
	        }
    	}); 
    	$("#solidos,#ph,#at,#editsolidos,#editph,#editat").keydown(function (event) {
            if (event.shiftKey == true) {
               event.preventDeufault();
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
        rowMaduracion();
	});

/********** Controlador de maduración  ************************/
	function altaMaduracion() {
	        $('#editar').hide();
	        $('#index').hide();
	        $('#alta').show();
	        $('ul.tabs').tabs();
	        rowPredio();
	        rowAnada();
	        initBack('madura');
	        setTimeout(function(){ rowConfig(); }, 500);
	        $('#noNumEditSolidos').hide();
			$('#noNumEditAt').hide();
 			$('#noNumEditPh').hide();
	}
	function viewMaduracion(id) {
	    initBack('madura');
	    $('#editar').hide();
	    $('#index').hide();
	    $('#view').show();
	    var db = dbInicializar();
		db.transaction(function(t) {
		    t.executeSql("SELECT * FROM maduracion where id = ?", [id], function(transaction, results) {
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
		        	$('#viewsolidos').empty();
				    $('#viewph').empty();
				    $('#viewat').empty();
				    $('#viewbrph').empty();
				    $('#viewbrat').empty();
				    $('#viewrancho').empty(); 
				    $('#viewvinedo').empty();
				    $('#viewvariedad').empty();
				    $('#viewbloque').empty();
				    $('#viewanada').empty();
  					$('#viewfecha').empty();
				    $('#viewfecha').append(row.fecha);
				    $('#viewsolidos').append(row.solidos);
				    $('#viewph').append(row.ph);
				    $('#viewat').append(row.at);
				    $('#viewbrph').append(row.brph);
				    $('#viewbrat').append(row.brat);
				    $('#viewrancho').append(row.ranchoName); 
				    $('#viewvinedo').append(row.vinedoName);
				    $('#viewvariedad').append(row.variedadName);
				    $('#viewbloque').append(row.bloqueName);
				    $('#viewanada').append(row.anadaName);
		      }
		    });
		});

	}
	function editarMaduracion() {
		initBack('madura');
	    $('#editar').show();
	    $('#index').hide();
	    $('#alta').hide();
	    $('#view').hide();
	    var db = dbInicializar();
		db.transaction(function(t) {
		    t.executeSql("SELECT * FROM maduracion where id = ?", [$('#viewId').val()], function(transaction, results) {
			    for (var i = 0; i < results.rows.length; i++) {
			        var row = results.rows.item(i);
		        	$('#editsolidos').val('');
				    $('#editph').val('');
				    $('#editat').val('');
				    $('#editbrph').val('');
				    $('#editbrat').val('');
  					$('#editfecha').val('');
				    $('#editfecha').val(row.fecha);
				    $('#editsolidos').val(row.solidos);
				    $('#editph').val(row.ph);
				    $('#editat').val(row.at);
				    $('#editbrph').val(row.brph);
				    $('#editbrat').val(row.brat);
				   
		      }
		    });
		});
	}
/**** funcion para calcular el Br por pH *****/
    function brph(form) {
    	if( (!isNaN($('#'+form+'solidos').val()) && !isNaN($('#'+form+'ph').val()) ) && ($('#'+form+'solidos').val() != '' &&  $('#'+form+'ph').val() !='')){
	        var brph = parseFloat($('#'+form+'solidos').val()) * Math.pow($('#'+form+'ph').val(), 2);
	        $('#'+form+'brph').val(Math.round(brph));
    	}
    }
/**** funcion para calcular el Br sobre el resultado de at por 10 *****/
    function brat(form) {
    	if( (!isNaN($('#'+form+'solidos').val()) && !isNaN($('#'+form+'at').val()) ) && ($('#'+form+'solidos').val() != '' &&  $('#'+form+'at').val() !='')){
	        var brat = (parseFloat($('#'+form+'solidos').val()) / $('#'+form+'at').val())*10;
	        $('#'+form+'brat').val(Math.round(brat));
    	}
    }

/************* funcion para validar los campos antes de guardar *************/
	function saveMaduracion(){
		 var parameters = { fecha:$('#fecha').val(), 
		 					solidos:$('#solidos').val(),
		 					ph:$('#ph').val(), 
		 					at:$('#at').val(), 
		 					brph:$('#brph').val(), 
		 					brat:$('#brat').val()
		 				};
	    if( parameters.fecha!='' && parameters.solidos!='' && parameters.ph!='' && parameters.at!='' && parameters.brph!='' && parameters.brat){
		    if( (parseFloat(parameters.solidos)>= 0 && parseFloat(parameters.solidos) <=28) && (parseFloat(parameters.at)>= 0 && parseFloat(parameters.at) <=20) && (parseFloat(parameters.ph)>= 2 && parseFloat(parameters.ph) <=4) ){
		     		validateMaduracion(parameters);
		 	}
		 	else{
		 		if( !(parseFloat(parameters.solidos)>= 0 && parseFloat(parameters.solidos) <=28) ){
		 			$('#noNumEditSolidos').show();
		 		}
		 		else{
		 			$('#noNumEditSolidos').hide();
		 		}
		 		if( !(parseFloat(parameters.at)>= 0 && parseFloat(parameters.at) <=20) ){
		 			$('#noNumEditAt').show();
		 		}
		 		else{
		 			$('#noNumEditAt').hide();
		 		}
		 		if( !(parseFloat(parameters.ph)>= 2 && parseFloat(parameters.ph) <=4) ){
		 			$('#noNumEditPh').show();
		 		}
		 		else{
		 			$('#noNumEditPh').hide();
		 		}	    
		 	}
		 }
	    else{
	        Materialize.toast('No puede dejar campos vacios', 1500);
	    }
	}

function rowMaduracion(){
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM maduracion ORDER BY fecha DESC", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.variedadName+'</td>'
                     +'<td>'+row.bloqueName+'</td>'
                     +'<td>'+row.anadaName+'</td>'
                     +'<td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="viewMaduracion('+row.id+');"><i class="fa fa-th-list"></i></a>'
                          +'</ul>'
                     +' </td>'
                  +' </tr>';

      }
       var  tb = document.getElementById('bodyMaduracion');
            tb.innerHTML = html;
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
	            t.executeSql("DELETE FROM maduracion where id = ?", [$('#viewId').val()], 
	            			function(tx, result) {   
	                        	Materialize.toast('Maduración eliminada correctamente.', 1500);
	                        	maduraIndex();
	                        	$('#viewId').val('');
	                    	},
	                    	function(error){                                
	                        	Materialize.toast('Algo salio mal.', 1500);
	                        	$('#viewId').val('');
	            			}
	            );
	        });
	}
function updateMaduracion() {
	if($('#editfecha').val() != '' && $('#editsolidos').val() != '' && $('#editph').val() != '' && $('#editat').val() != ''){
		var id = parseInt($('#viewId').val());
		var db = dbInicializar();
        db.transaction(function(tx) {
            tx.executeSql("UPDATE maduracion SET fecha = ?, solidos = ?, ph = ?, at = ?, brph = ?, brat = ? WHERE id = ?",[$('#editfecha').val(),$('#editsolidos').val(),$('#editph').val(),$('#editat').val(),$('#editbrph').val(),$('#editbrat').val(),id]);
        });
        Materialize.toast('Registro Actualizada.', 4000);
        viewMaduracion( $('#viewId').val());
        $('#viewId').val('');
    }
    else{
    	Materialize.toast('No puede dejar campos vacios', 1500);
    }
}


function validateMaduracion(parameters){
  var db = dbInicializar();
  var response = 0;
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM maduracion", [], function(transaction, results) {
     	for(var i = 0; i < results.rows.length; i++) {
        	var row = results.rows.item(i);
        	console.log(row.fecha+'-'+parameters.fecha+'/\\'+$('#bloque option:selected').val()+'-'+row.bloque);
        	if(row.fecha == parameters.fecha && $('#bloque option:selected').val() == row.bloque){	
        		response = 1;
        	}
       	}
       	if(parseInt(response)==0){
		   getConfig(parameters,1);/// se envian los campos para ser guardados
       	}else{
		    Materialize.toast('Ya existe una fecha registrada para este bloque.', 1500);
       	}
    });
  });
}