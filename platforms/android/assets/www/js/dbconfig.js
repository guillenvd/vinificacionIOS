function dbInicializar() {
  var db = window.sqlitePlugin.openDatabase({
    name: "vineaTest.db"
  });
  return db;
}

function dropTable(table) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS " + table + "");
  });
}
function editFenologia(id){
  var db = dbInicializar();
  var html="";
  var predioId=loteId=subloteId=varietalId=fenologiaId=fecha=observaciones="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fenologia where id = ?", [id], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
            predioId=row.predioId;
            loteId=row.loteId;
            subloteId=row.subloteId;
            varietalId=row.varietalId;
            fenologiaId=row.fenologiaId;
            fecha=row.fecha;
            observaciones=row.observaciones;
  rowPredio();
  rowEfenologia();
  $( "#idInput" ).val(id);
  $( "#Fecha" ).val(fecha);
  $( "#Observaciones" ).val(observaciones);
  setTimeout(function(){  $( "#PredioSelect" ).val(predioId);  rowLote(); }, 520);
  setTimeout(function(){  $( "#LoteSelect" ).val(loteId);  }, 600);
  setTimeout(function(){   rowSublote(); }, 700);
  setTimeout(function(){  $( "#SubloteSelect" ).val(subloteId); }, 860);
  setTimeout(function(){  rowVarietal(); }, 960);
  setTimeout(function(){  $( "#VarietalSelect" ).val(varietalId);  $( "#FenologiaSelect" ).val(fenologiaId);}, 980);
      

      }
    });
  });

}

function fenologiaUpdate() {
      var inputId      = $( "#idInput" ).val();
      var predioId      = $( "#PredioSelect" ).val();
      var loteId        = $( "#LoteSelect" ).val();
      var subloteId     = $( "#SubloteSelect" ).val();
      var varietalId    = $( "#VarietalSelect" ).val();
      var fenologiaId   = $( "#FenologiaSelect" ).val();
      var predioText      = $( "#PredioSelect  option:selected" ).text();
      var loteText        = $( "#LoteSelect  option:selected" ).text();
      var subloteText     = $( "#SubloteSelect  option:selected" ).text();
      var varietalText    = $( "#VarietalSelect  option:selected" ).text();
      var fenologiaText   = $( "#FenologiaSelect  option:selected" ).text();
      var fecha         = $( "#Fecha" ).val();
      var observaciones = $( "#Observaciones" ).val();
    if(predioId!=""&&loteId!=""&&subloteId!=""&&varietalId!=""&&fenologiaId!=""&&fecha!=""&&observaciones!=""){
        var db = dbInicializar();
        db.transaction(function(tx) {
            tx.executeSql("UPDATE fenologia SET  predioId = ?, predioNom = ?, loteId = ?, loteNom = ?, subloteId = ?, subloteNom = ?, varietalId = ?, varietalNom = ?,fenologiaId = ?, fenologiaNom = ?, observaciones = ?,  fecha = ? WHERE id = ?",[predioId,predioText,loteId,loteText,subloteId,subloteText,varietalId,varietalText,fenologiaId,fenologiaText,observaciones,fecha,inputId]);
        });
        Materialize.toast('Fenología Actualizada.', 4000)
         fenologiaShow(inputId);
      }
    else {
       Materialize.toast('Ha dejado campos vacios', 4000);
    }

}
function  showFenologia(id){
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fenologia where id = ?", [id], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.predioNom+'</td>'
                     +'<td>'+row.loteNom+'</td>'
                     +'<td>'+row.subloteNom+'</td>'
                     +'<td>'+row.varietalNom+'</td>'
                     +'<td>'+row.fenologiaNom+'</td>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.observaciones+'</td>'
                    +' </tr>';

      }
       var  tb = document.getElementById('bodyTableShow');
              tb.innerHTML = html;
    });
  });
}

function  showFenologia(id){
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fenologia where id = ?", [id], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.predioNom+'</td>'
                     +'<td>'+row.loteNom+'</td>'
                     +'<td>'+row.subloteNom+'</td>'
                     +'<td>'+row.varietalNom+'</td>'
                     +'<td>'+row.fenologiaNom+'</td>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.observaciones+'</td>'
                    +' </tr>';

      }
       var  tb = document.getElementById('bodyTableShow');
              tb.innerHTML = html;
    });
  });
}

function rowfenologia(){
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fenologia ORDER BY fecha DESC", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.predioNom+'</td>'
                     +'<td>'+row.loteNom+'</td>'
                     +'<td>'+row.subloteNom+'</td>'
                     +'<td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="fenologiaShow('+row.id+');"><i class="fa fa-th-list"></i></a>'
                          +'</ul>'
                     +' </td>'
                     +' <td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="fenologiaEdit('+row.id+');"><i class="fa fa-edit"></i></a>'
                          +'</ul>'
                     +' </td>'
                  +' </tr>';

      }
       var  tb = document.getElementById('bodyTable');
              tb.innerHTML = html;
    });
  });
}


function rowEfenologia() {
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM efenologia", [], function(transaction, results) {
     var predio = document.getElementById("FenologiaSelect");
          predio.innerHTML='<option value="">Seleccione una Fenologia</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                predio.innerHTML+='<option value="'+row.ide+'">'+row.evento+'</option>';  
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay Fenologias</option>';
        }
    });
  });
}

function rowPredio(){
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM predio", [], function(transaction, results) {
      var predio = document.getElementById("PredioSelect");
      var Lote = document.getElementById("LoteSelect");
      var Sublote = document.getElementById("SubloteSelect");
      var Varietal = document.getElementById("VarietalSelect");
          predio.innerHTML='<option value="">Seleccione un Predio</option>';
          Lote.innerHTML='<option value="">Seleccione un Predio primero</option>';
          Sublote.innerHTML='<option value="">Seleccione un Lote primero</option>';
          Varietal.innerHTML='<option value="">Seleccione un Sublote primero</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                predio.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';  
      }
    });
  });
}

function rowLote() {
  var predio = document.getElementById("PredioSelect").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM lote where predio  = ? ", [predio], function(transaction, results) {
        var Lote = document.getElementById("LoteSelect");
          Lote.innerHTML='<option value="">Seleccione un Lote</option>';
      var Sublote = document.getElementById("SubloteSelect");
      var Varietal = document.getElementById("VarietalSelect");
          Sublote.innerHTML='<option value="">Seleccione un Lote primero</option>';
          Varietal.innerHTML='<option value="">Seleccione un Sublote primero</option>';
      for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
                Lote.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay Lotes</option>';
        }
      else if(predio==""){
          Lote.innerHTML='<option value="">Seleccione primero un Predio</option>';
      }


    });
  });
}


function rowSublote() {
  var Lote = document.getElementById("LoteSelect").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM sublote where lote  = ? ", [Lote], function(transaction, results) {
        var Sublote = document.getElementById("SubloteSelect");
          Sublote.innerHTML='<option value="">Seleccione un Sublote</option>';
        var Varietal = document.getElementById("VarietalSelect");
            Varietal.innerHTML='<option value="">Seleccione un Sublote primero</option>';
      for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              Sublote.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay Sublote</option>';
        }
      else if(Lote==""){
          Lote.innerHTML='<option value="">Seleccione primero un Lote</option>';
      }
    });
  });
}

function rowVarietal() {
  var Sublote = document.getElementById("SubloteSelect").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM varietal where sublote  = ? ", [Sublote], function(transaction, results) {
        var Varietal = document.getElementById("VarietalSelect");
          Varietal.innerHTML='<option value="">Seleccione un Varietal</option>';
      for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              Varietal.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay Varietales</option>';
        }
      else if(Sublote==""){
          Lote.innerHTML='<option value="">Seleccione primero un Sublote</option>';
      }
    });
  });
}


function efenologiaRegister(evento, id) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS efenologia (id integer primary key, evento text, ide text)');
    tx.executeSql("INSERT INTO efenologia (evento, ide) VALUES (?,?)", [evento, id], null, null);
  });
}

function predioRegister(nombre, id) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS predio (id integer primary key, nombre text, ide text)');
    tx.executeSql("INSERT INTO predio (nombre, ide) VALUES (?,?)", [nombre, id], null, null);
  });
}

function loteRegister(nombre, id, predio) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS lote (id integer primary key, nombre text, predio text, ide text)');
    tx.executeSql("INSERT INTO lote (nombre, ide, predio) VALUES (?,?,?)", [nombre, id, predio], null, null);
  });
}

function subloteRegister(nombre, id, lote) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS sublote (id integer primary key, nombre text, lote text, ide text)');
    tx.executeSql("INSERT INTO sublote (nombre, ide, lote) VALUES (?,?,?)", [nombre, id, lote], null, null);
  });
}

function varietalRegister(nombre, id, sublote) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS varietal (id integer primary key, nombre text, sublote text, ide text)');
    tx.executeSql("INSERT INTO varietal (nombre, ide, sublote) VALUES (?,?,?)", [nombre, id, sublote], null, null);
  });
}

function fenologiaRegister(id, status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS fenologia (id integer primary key,status text, predioId text, predioNom text, loteId text, loteNom text, subloteId text, subloteNom text, varietalId text, varietalNom text, fecha text, fenologiaId text, fenologiaNom text, observaciones text, ide text )');
    tx.executeSql("INSERT INTO fenologia (status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones,ide) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones,id], null, null);
  });
}

function fenologiaUp(){
      var predioId      = $( "#PredioSelect" ).val();
      var loteId        = $( "#LoteSelect" ).val();
      var subloteId     = $( "#SubloteSelect" ).val();
      var varietalId    = $( "#VarietalSelect" ).val();
      var fenologiaId   = $( "#FenologiaSelect" ).val();
      var predioText      = $( "#PredioSelect  option:selected" ).text();
      var loteText        = $( "#LoteSelect  option:selected" ).text();
      var subloteText     = $( "#SubloteSelect  option:selected" ).text();
      var varietalText    = $( "#VarietalSelect  option:selected" ).text();
      var fenologiaText   = $( "#FenologiaSelect  option:selected" ).text();
      var fecha         = $( "#Fecha" ).val();
      var observaciones = $( "#Observaciones" ).val();
    if(predioId!=""&&loteId!=""&&subloteId!=""&&varietalId!=""&&fenologiaId!=""&&fecha!=""&&observaciones!=""){
        fenologiaRegister('0', '1', predioId, predioText, loteId, loteText, subloteId, subloteText, varietalId, varietalText, fecha, fenologiaId, fenologiaText, observaciones);
        fenologiaIndex();
        Materialize.toast('Fenología registrada.', 4000)
      }
    else {
       Materialize.toast('Ha dejado campos vacios', 4000)
    }
}