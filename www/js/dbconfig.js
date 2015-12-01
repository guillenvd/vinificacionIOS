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

/************* Guardar configuración del usuario ************************/
  function saveConfig() {
      var rancho = $('#rancho option:selected').val();
      var vinedo = $('#vinedo option:selected').val();
      var variedad = $('#variedad option:selected').val();
      var bloque = $('#bloque option:selected').val();
      var anada = $('#anada option:selected').val();
      var ranchoName = $('#rancho option:selected').text();
      var vinedoName = $('#vinedo option:selected').text();
      var variedadName = $('#variedad option:selected').text();
      var bloqueName = $('#bloque option:selected').text();
      var anadaName = $('#anada option:selected').text();
      if(rancho != '' && vinedo != '' && variedad != '' && bloque != '' && anada){
        configRegister(rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName);
      }
      else{
         Materialize.toast('No puede dejar campos vacios de la configuracion.', 1500);
      }
    }

/************* función para guardar un registro de maduración tomando la configuración del usuario  *************/
  /**
   * [getConfig Ir por la configuracion guardada por el usuario y despues guardarla segun lo requerido]
   * @param  {[array]} parameters [array con los campos del formulario]
   * @param  {[int]} module     [modulo del formulario, el que se guardará]
   * @return {[]}            [none]
   */
   function getConfig(parameters, module){
      var db = dbInicializar();
      var list="";
      var row = null;
      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS config (id integer primary key, rancho text, vinedo text, variedad text, bloque text, anada text, ranchoName text, vinedoName text, variedadName text, bloqueName text, anadaName text)');
      });
    db.transaction(function(t) {
      t.executeSql("SELECT * FROM config", [], function(transaction, results) {
          if(results.rows.length){
              for(var i = 0; i < results.rows.length; i++) {
                  row = results.rows.item(i);
                  if(module == 1){
                    maduracionRegister(row.rancho, row.vinedo, row.variedad, row.bloque, row.anada,parameters.fecha,parameters.solidos,parameters.ph,parameters.at,parameters.brph,parameters.brat,0, row.ranchoName, row.vinedoName, row.variedadName, row.bloqueName, row.anadaName);                    
                    Materialize.toast('Maduración registrada.', 1500);
                    maduraIndex();
                  }
                  else if(module == 2){
                    pesoRegister(row.rancho, row.vinedo, row.variedad, row.bloque, row.anada, row.ranchoName, row.vinedoName, row.variedadName, row.bloqueName, row.anadaName, parameters.fecha, parameters.costoUva, parameters.pesoTotalNeto, parameters.totalCajas, parameters.cajasMuestra, parameters.taraCaja, parameters.pesoPromCaja, parameters.pesoPromNeto, parameters.pesoMuestra, 0);
                  }
              }
          }
          else{
              Materialize.toast('Primero asigne una configuración ', 1500);
          }
      });
      });
  }

function rowConfig(){
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM config", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            rowPredio();
            setTimeout(function(){  $( "#rancho" ).val(row.rancho); $( "#anada" ).val(row.anada);  rowLote(); }, 520);
            setTimeout(function(){  $( "#vinedo" ).val(row.vinedo);  }, 600);
            setTimeout(function(){   rowSublote(); }, 700);
            setTimeout(function(){  $( "#variedad" ).val(row.variedad); rowBloque(); }, 860);
            setTimeout(function(){  $( "#bloque" ).val(row.bloque); }, 960);

      }
    });
  });
}

function rowAnada(){
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM anada", [], function(transaction, results) {
      var anada = document.getElementById("anada");
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                anada.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';  
      }
    });
  });
}


function rowPredio(){
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM predio", [], function(transaction, results) {
      var predio = document.getElementById("rancho");
      var Lote = document.getElementById("vinedo");
      var Sublote = document.getElementById("variedad");
      var Bloque = document.getElementById("bloque");
          predio.innerHTML='<option value="">Seleccione un Rancho</option>';
          Lote.innerHTML='<option value="">Seleccione un Rancho primero</option>';
          Sublote.innerHTML='<option value="">Seleccione un Vinedo primero</option>';
          Bloque.innerHTML='<option value="">Seleccione una Variedad primero</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                predio.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';  
      }
    });
  });
}

function rowLote() {
  var predio = document.getElementById("rancho").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM lote where predio  = ? ", [predio], function(transaction, results) {
      var Lote = document.getElementById("vinedo");
      var Sublote = document.getElementById("variedad");
      var Bloque = document.getElementById("bloque");
          Lote.innerHTML='<option value="">Seleccione un vinedo</option>';
          Sublote.innerHTML='<option value="">Seleccione un vinedo primero</option>';
          Bloque.innerHTML='<option value="">Seleccione una Variedad primero</option>';

      for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
                Lote.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay vinedos</option>';
        }
      else if(predio==""){
          Lote.innerHTML='<option value="">Seleccione primero un Rancho</option>';
      }


    });
  });
}


function rowSublote(){
  var Lote = document.getElementById("vinedo").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM sublote where lote  = ? ", [Lote], function(transaction, results) {
        var Sublote = document.getElementById("variedad");
        var Bloque = document.getElementById("bloque");
          Sublote.innerHTML='<option value="">Seleccione una Variedad</option>';
          Bloque.innerHTML='<option value="">Seleccione primero un viñedo</option>';

      for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              Sublote.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay variedad</option>';
        }
      else if(Lote==""){
          Lote.innerHTML='<option value="">Seleccione primero un vinedo</option>';
      }
    });
  });
}

function rowBloque() {
  var Sublote = document.getElementById("variedad").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM bloque where sublote  = ? ", [Sublote], function(transaction, results) {
        var Varietal = document.getElementById("bloque");
          Varietal.innerHTML='<option value="">Seleccione un bloque</option>';
      for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              Varietal.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
      if( results.rows.length == 0 ){
          Lote.innerHTML='<option value="">No hay Bloques</option>';
        }
      else if(Sublote==""){
          Lote.innerHTML='<option value="">Seleccione primero un vinedo</option>';
      }
    });
  });
}

function rowMonitoreo(){
  $('select').material_select('destroy');
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
        t.executeSql("SELECT * FROM monitoreo", [], function(transaction, results) {
          var monitoreo = document.getElementById("monitoreo");
          for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                monitoreo.innerHTML+='<option value="'+row.ide+'">'+row.nombre+' (tanque '+row.id_tanque+')</option>';  
          }
          $('select').material_select();

    });
  });
}


function anadaRegister(nombre, id) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS anada (id integer primary key, nombre text, ide text)');
    tx.executeSql("INSERT INTO anada (nombre, ide) VALUES (?,?)", [nombre, id], null, null);
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

function bloqueRegister(nombre, id, sublote) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS bloque (id integer primary key, nombre text, sublote text, ide text)');
    tx.executeSql("INSERT INTO bloque (nombre, ide, sublote) VALUES (?,?,?)", [nombre, id, sublote], null, null);
  });
}

function monitoreoRegister(ide, nombre, id_tanque) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS monitoreo (id integer primary key, ide text, nombre text, id_tanque text)');
    tx.executeSql("INSERT INTO monitoreo (nombre, ide, id_tanque) VALUES (?,?,?)", [nombre, ide, id_tanque],function(){/*success*/},function () {/*error*/});
  });
}


function configRegister(rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName) {
  var db = dbInicializar();
  dropTable("config");
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS config (id integer primary key, rancho text, vinedo text, variedad text, bloque text, anada text, ranchoName text, vinedoName text, variedadName text, bloqueName text, anadaName text)');
    tx.executeSql("INSERT INTO config (rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName) VALUES (?,?,?,?,?,?,?,?,?,?)", [rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName], null, null);
  });
  Materialize.toast('Configuración guardada', 1500);

}


function maduracionRegister(rancho, vinedo, variedad, bloque, anada,fecha,solidos,ph,at,brph,brat,ide,ranchoName, vinedoName, variedadName, bloqueName, anadaName) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS maduracion (id integer primary key, ide text, rancho text, vinedo text, variedad text, bloque text, anada text,ranchoName text, vinedoName text, variedadName text, bloqueName text, anadaName text, fecha text, solidos text, ph text, at text, brph text, brat text)');
    tx.executeSql("INSERT INTO maduracion (rancho, vinedo, variedad, bloque, anada, fecha, solidos, ph, at, brph, brat, ide,ranchoName, vinedoName, variedadName, bloqueName, anadaName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[rancho, vinedo, variedad, bloque, anada,fecha,solidos,ph,at,brph,brat,ide,ranchoName, vinedoName, variedadName, bloqueName, anadaName], null, null);
  });
  
}

function pesoRegister(rancho, vinedo, variedad, bloque, anada, ranchoName, vinedoName, variedadName, bloqueName, anadaName, fecha, costoUva, pesoTotalNeto, totalCajas, cajasMuestra, taraCaja, pesoPromCaja, pesoPromNeto, pesoMuestra, ide) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS peso (id integer primary key, ide text, rancho text, vinedo text, variedad text, bloque text, anada text,ranchoName text, vinedoName text, variedadName text, bloqueName text, anadaName text, fecha text, costoUva text, pesoTotalNeto text, totalCajas text, cajasMuestra text, taraCaja text, pesoPromCaja text, pesoPromNeto text, pesoMuestra text)');
    tx.executeSql("INSERT INTO peso (rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName, fecha, costoUva, pesoTotalNeto, totalCajas, cajasMuestra, taraCaja, pesoPromCaja, pesoPromNeto, pesoMuestra, ide) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[rancho, vinedo, variedad, bloque, anada,ranchoName, vinedoName, variedadName, bloqueName, anadaName, fecha, costoUva, pesoTotalNeto, totalCajas, cajasMuestra, taraCaja, pesoPromCaja, pesoPromNeto, pesoMuestra, ide], 
    function(tx, results){
        if(taraCaja != '' ){
          var lastInsertId = results.insertId;
          $('input[name^="caja"]').each(function(i) {
             cajasRegister(lastInsertId,$(this).val(),i+1,0);
          });
        }
      Materialize.toast('Calculo de peso registrado.', 1500);
      pesoIndex();
    }, 
    function(tx, results){
        alert('error');
    });
  });
  
}

  function cajasRegister(calculoId, peso, index, ide) {
    var db = dbInicializar();
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS cajas (id integer primary key, ide text, calculoId text, peso text, numCaja text)');
      tx.executeSql("INSERT INTO cajas (calculoId, peso, numCaja, ide) VALUES (?,?,?,?)", [parseInt(calculoId), peso, index, ide],
       function(tx, results){
       },
       function(tx, results){
        alert('error');
       });
    });
  }

function fermentacionRegister(monitoreoId, fecha, grados, temperatura,vinoBase, ide) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS fermentacion (id integer primary key, ide text, monitoreoId text, fecha text, grados text, temperatura text, vinoBase text)');
    tx.executeSql("INSERT INTO fermentacion (monitoreoId, fecha, grados, temperatura, vinoBase, ide) VALUES (?,?,?,?,?,?)", [monitoreoId, fecha, grados, temperatura,vinoBase,ide],
    function(){
      fermentacionIndex() 
      Materialize.toast('Registro creado con exito', 1500);
    },
    function () {
      Materialize.toast('Algo salio mal.', 1500);
    });
  });
}


