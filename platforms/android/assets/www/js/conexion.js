function JsonPostFenologia(ide,status,p,l,s,v,f,e,o,servidor){
       var x = {"id":ide,"status":status,"predio":p,"lote":l,"sublote":s,"varietal":v,"fecha":f,"evento":e,"observaciones":o};
       var req = $.ajax({
                    type: "POST",
                    dataType: "json",
                    timeout : 10000,
                    url: "http://"+servidor+"/web/app-php/altapp.php", 
                    data: x,
                    success: function(data) {
                        var db = dbInicializar();
                       if (data['estado']==1) {
                            db.transaction(function(t) {
                                t.executeSql("DELETE FROM fenologia WHERE id=?", [id], null);
                           });
                        } 
                        else{
                              Materialize.toast('Ha ocurrido un error en alta de Fenologías', 4000);
                            }
                           }, 
                    error: function() {
                            //do something
                          }
    });
    req.success(function(){    });
    req.error(function(){   alert('A ocurrido un error al subir Fenologias.');    });
}

function fenologiaJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/fenologica.php", 
                          data: x,
                          success: function(data) {
                                   var db = dbInicializar();
                                    db.transaction(function(tx) {
                                          tx.executeSql("DROP TABLE IF EXISTS fenologia");
                                          tx.executeSql('CREATE TABLE IF NOT EXISTS fenologia (id integer primary key,status text, predioId text, predioNom text, loteId text, loteNom text, subloteId text, subloteNom text, varietalId text, varietalNom text, fecha text, fenologiaId text, fenologiaNom text, observaciones text, ide text )');
                                    });
                                   $.each(data, function(i,item){ 
                                        db.transaction(function(tx) {
                                            tx.executeSql("INSERT INTO fenologia (status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones,ide) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",['2', item.predioId, item.predioNom, item.loteId, item.loteNom, item.subloteId, item.subloteNom, item.varietalId, item.varietalNom, item.fecha, item.eventoFono, item.eventoNom, item.observaciones,item.id]);
                                          });
                                   });
                                  Materialize.toast('Fenologia Sincronizado.', 4000);
                                  $("#load").attr('class', 'determinate');
                                  $('#load').attr('width', '100%' )
                                  var host = document.getElementById("alert");
                                      host.innerHTML ='Sincronizado 100%';
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Fenologías', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}


function efenologiaJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/fenologia.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("efenologia");
                                   $.each(data, function(i,item){ 
                                       efenologiaRegister(item.evento,item.id);
                                   });
                                  Materialize.toast('Eventos fenología Sincronizado.', 4000);
                                  $("#load").attr('class', 'determinate');
                                  $('#load').attr('width', '100%' ) 
                                  var host = document.getElementById("alert");
                                      host.innerHTML ='Sincronizado 100%';
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Eventos Fenologías', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}




function predioJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/vinea.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("predio");
                                   $.each(data, function(i,item){ 
                                       predioRegister(item.nombre,item.id);
                                   });
                                  Materialize.toast('Predios Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                    Materialize.toast('Ha ocurrido un error en Predios', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();                                    
                                }
          });
}


function loteJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/lote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("lote");
                                   $.each(data, function(i,item){ 
                                       loteRegister(item.nombre,item.id,item.predio);
                                   });
                                  Materialize.toast('Lotes Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Lotes', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}

function subloteJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/sublote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("sublote");
                                   $.each(data, function(i,item){ 
                                      subloteRegister(item.nombre,item.id,item.lote);
                                   });
                                  Materialize.toast('Sublotes Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Sublote', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}
function varietalJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/varietal.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("varietal");
                                   $.each(data, function(i,item){ 
                                       varietalRegister(item.nombre,item.id,item.sublote);
                                   });
                                  Materialize.toast('Varietales Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Varietales', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}

function showHost(transaction, results) {
    var i=0; 
    var list='';
    var hostInput='';
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
            list='host actual : <ins>'+row.ip+' </ins>';
            hostInput = row.ip;
    }
    if(i==0){list='<b>no tiene host registrado</b>'}
    var host = document.getElementById("alert");
        host.innerHTML=list;
        $("#hostHidden").val(hostInput);
}

function outputHost() {
    var db = dbInicializar();
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM host", [], showHost);
        });
}


function addHost(){
  var db = dbInicializar();
        var addip = document.getElementById("host").value;
        var alert = document.getElementById("alert");
                  alert.innerHTML=addip;
        if(addip!=''){
                     db.transaction(function(t){
                                t.executeSql('DROP TABLE IF EXISTS host');
                                t.executeSql("CREATE TABLE IF NOT EXISTS host (id INTEGER PRIMARY KEY ASC, ip TEXT)");
                                t.executeSql('INSERT INTO host (ip) VALUES (?)', [addip]);
                              });
                     document.getElementById("host").value='';
                     outputHost();
              }
        else{
              var alert = document.getElementById("alert");
                  alert.innerHTML='Debe de introducir algo.';
            }
}

function countFenologias(servidor){
    var db = dbInicializar();
      db.transaction(function(t) {
                t.executeSql("SELECT * FROM fenologia", [], function(transaction, results){
                           var i;
                           //var numRegister = results.rows.length;
                            for (i = 0; i < results.rows.length; i++){
                                var row = results.rows.item(i);
                                JsonPostFenologia(row.ide, row.status, row.predioId, row.loteId, row.subloteId, row.varietalId, row.fecha, row.fenologiaId, row.observaciones,servidor);
                            }
                        });
        });
}
function send() {
  $('#SyncBtn').hide();
  $('#loadDiv').show();
  var servidor = $("#hostHidden").val();
  predioJson(servidor);
  loteJson(servidor);
  subloteJson(servidor);
  varietalJson(servidor);
  efenologiaJson(servidor);
  countFenologias(servidor);
  fenologiaJson(servidor);

}
/*
predioJson();
loteJson();
subloteJson();
varietalJson();
efenologiaJson();


*/