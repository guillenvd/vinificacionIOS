	$(document).ready(function(){ 
		$('#alta').hide(); 
		$('#view').hide(); 
		$('#alertInt').hide(); 
		$('#editar').hide(); 
     	$('.datepicker').pickadate({
        	selectMonths: true, 
        	selectYears: 15
        });
	});


/**	fementacion controller ***/
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
		rowMonitoreo();
	}
	


