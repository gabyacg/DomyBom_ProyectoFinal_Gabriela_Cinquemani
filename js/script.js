


var JsonNotas = '{"notas":[ ]}';

var jsObj = JSON.parse(JsonNotas);


//Funcion para cargar el JSON en la tabla---------------------------
function cargarJsonTabla(){
	limpiarTabla();
  ordenarJson();


	var json = jsObj;
	var i;

	for (i=0; i<json.notas.length;i++) {

		var inicio = document.createElement("tr");
		document.getElementById("tabla").appendChild(inicio);

		var codigo = document.createElement("td");
    var str = parseInt(json.notas[i].codigo);
    switch (str.toString().length) {
      case 1: json.notas[i].codigo = "0000" + str;break;
      case 2: json.notas[i].codigo = "000" + str;break;
      case 3: json.notas[i].codigo = "00" + str;break;
      case 4: json.notas[i].codigo = "0" + str;break;
      case 5: json.notas[i].codigo = "" + str;break;
    }

		var codigoTxt = document.createTextNode(json.notas[i].codigo);
		codigo.appendChild(codigoTxt);
		inicio.appendChild(codigo);

		var nombre = document.createElement("td");

		var nombreTxt = document.createTextNode(json.notas[i].nombre);
		nombre.appendChild(nombreTxt);
		inicio.appendChild(nombre);


		var nota = document.createElement("td");
		var notaTxt = document.createTextNode(json.notas[i].nota);
		nota.appendChild(notaTxt);
		inicio.appendChild(nota);
	}
}
////////////////////////////////////////////////////////////////////

//Funcion para vaciar la tabla-------------------------------------
function limpiarTabla(){
	var tabla = document.getElementById("tabla");

	for (var i = 2; i<12; i++){
		var hijo = document.getElementById("tabla").lastChild;
		if (hijo.nodeName == "TR"){
			tabla.removeChild(hijo);
		}
	}
}
//---------------------------------------------------------------

//Funcion Promedio--------------------------------------------------
function promedio(){
  var json = jsObj;
  var varNota = "";
  var i;
  varNota = 0;

  for (i=0; i<json.notas.length;i++) {
    varNota += json.notas[i].nota;
  }
  varNota = varNota / json.notas.length;

  alert("El promedio de todas las notas es: " + varNota)
}
//-------------------------------------------------

//Funcion mayor----------------------------------------------------
function mayor(){
  var json = jsObj;
  var varNota = "";
  var varCode = "";
  var varNombre = "";

  var i;
  varNota = 0;

  for (i=0; i<json.notas.length;i++) {
    if (varNota<= json.notas[i].nota){
      varNota = json.notas[i].nota;
      varCode = json.notas[i].codigo;
      varNombre = json.notas[i].nombre;
    }
  }
  alert("La nota mas alta es de " + varNombre + "(" + varCode +")"+" y su nota es " + varNota)
}
//--------------------------------------------------------------

//Funcion Menor----------------------------------------------------
function menor(){
  var json = jsObj;
  var varNota = "";
  var varCode = "";
  var varNombre = "";

  var i;
  varCode = "";
  varNombre = "";
  varNota = 100;
  for (i=0; i<json.notas.length;i++) {
    if (varNota >= json.notas[i].nota){
      varNota = json.notas[i].nota;
      varCode = json.notas[i].codigo;
      varNombre = json.notas[i].nombre;
    }
  }
  alert("La nota mas baja es de " + varNombre + "(" + varCode +")"+" y su nota es " + varNota)
}
//----------------------------------------------------------------

//Funcion para cargarle datos al JSON------------------------------
function llenarJson(){
	var json = jsObj;
	var nombreInput = document.getElementById("inNombre");
	var codigoInput = document.getElementById("inCodigo");
	var notaInput = document.getElementById("inNota");

  relleno();

	json.notas.push({codigo: codigoInput.value, nombre: nombreInput.value, nota: parseFloat(notaInput.value)});
	document.getElementById("inNombre").value = "";
	document.getElementById("inCodigo").value = "";
	document.getElementById("inNota").value = "";}
//-------------------------------------------------------------------

//Funcion VALIDAR------------------------------------------------------
function validar(){
  var json = jsObj;
	var codigoInput = document.getElementById("inCodigo").value;
	var nombreInput = document.getElementById("inNombre").value;
	var notaInput = document.getElementById("inNota").value;

  relleno();

	var int_codigo = codigoInput;
	var str_nombre = parseInt(nombreInput);
	var int_nota = parseInt(notaInput);

	var cod_val = true;
	var not_val = true;
	var nom_val = true;


	if (int_codigo >= 0 && int_codigo <= 99999 && int_codigo != "") {

   for (var wi = 0; wi <= json.notas.length - 1; wi++){
      var a = json.notas[wi].codigo;
        if (int_codigo == a){
          alert("El codigo no se puede repetir.");
          cod_val = false;
        }else {
          cod_val = true;
        }
    }
	}else {
		alert("Codigo no puede ser menor a 0 o mayor a 99999, tampoco contener letras ni quedar vacio.");
		cod_val = false;
	}

	if([str_nombre >= 0 || str_nombre <= 0] && nombreInput == ""){
		alert("Nombre invalido, compruebe si contiene numero o si se encuentra vacio.");
		cod_val = false;
	}else {
		nom_val = true;
	}

	if(int_nota >= 1 && int_nota <= 10 && int_nota != ""){
		not_val = true;
	}else {
		alert("Nota no puede ser menor a 1 ni mayor a 10, tampoco contener letras ni quedar vacio.");
		not_val = false;
	}

	if(cod_val == true & nom_val == true && not_val == true){
		llenarJson();
		limpiarTabla();
		cargarJsonTabla();
	}
}

//-----------------------------------------------------------------

//Agregando EVENTO ONLOAD con EVENTLISTENER al BODY----------------
document.getElementsByTagName("body")[0].addEventListener("load", cargarJsonTabla());
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton de REGISTRAR---
document.getElementById("btnRegistrar").addEventListener("click", validar);
////////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Menor------
document.getElementById("btn_menor").addEventListener("click", menor);
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Mayor------
document.getElementById("btn_mayor").addEventListener("click", mayor);
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Promedio---
document.getElementById("btn_promedio").addEventListener("click", promedio);
///////////////////////////////////////////////////////////////////

//Funcion RELLENO para agregar los 0 que le faltan a codigo
function relleno(){

	var codigoInput = document.getElementById("inCodigo");

  var str = codigoInput.value;
  switch (str.length) {
    case 1: codigoInput.value = "0000" + codigoInput.value;break;
    case 2: codigoInput.value = "000" + codigoInput.value;break;
    case 3: codigoInput.value = "00" + codigoInput.value;break;
    case 4: codigoInput.value = "0" + codigoInput.value;break;
    case 5: codigoInput.value = "" + codigoInput.value;break;
  }
}
//---------------------------------------------------------------------

//Funcion ORDENARJSON que ordena el json en la tabla-------------------
function ordenarJson(){

  for(var i = 0; i < (jsObj.notas.length - 1); i++){
  	for(var j = i + 1; j < jsObj.notas.length; j++){
    	if(parseInt(jsObj.notas[i].codigo) > parseInt(jsObj.notas[j].codigo)){
				var variableauxiliar = parseInt(jsObj.notas[i].codigo);
        jsObj.notas[i].codigo = jsObj.notas[j].codigo;
        jsObj.notas[j].codigo = variableauxiliar;
      }
    }
	}
}
//-----------------------------------------------------------------------
