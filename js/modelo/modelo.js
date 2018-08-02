/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];

  //inicializacion de eventos
  this.UpdateModelo = new Evento(this);

  this.recuperarPreguntas();

};

Modelo.prototype = {

  //obtiene el indice a partir del id
  obtenerIndice: function(id) {

    for (i=0; i < this.preguntas.length ;i++){
      if (this.preguntas[i].id === id) {
        return i;
        break;
  }}},

  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {

    if (this.preguntas.length === 0){
      //arreglo vacio
      return 0;
      }
    else {
      //recupero el id de la ultima posicion, como se agregan ordenados siempre es el mayor
      return this.preguntas[this.preguntas.length-1].id;
  }},

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardarPreguntas();
    this.UpdateModelo.notificar();
  },

  //se borra una pregunta a partir de su id
  borrarPregunta: function(id) {
    var indice = this.obtenerIndice(id);
    if (indice != -1){
        //fue encontrado
        this.preguntas.splice(indice,1);        //elimino el elemento del arreglo (índice , cant elem)
        this.guardarPreguntas();
        this.UpdateModelo.notificar();
  }},

  //borro todas las preguntas
  borrarPreguntaTodas: function() {
    this.preguntas = []     //elimino todos los elementos del arreglo
    this.guardarPreguntas();
    this.UpdateModelo.notificar();
  },

  //se edita una pregunta a partir de su id
  editarPregunta: function(id, nuevoTexto) {
    var indice = this.obtenerIndice(id);
    if (indice != -1){
        //fue encontrado
        this.preguntas[indice].textoPregunta = nuevoTexto;
        this.guardarPreguntas();
        this.UpdateModelo.notificar();
  }},

  //se agrega un voto a la opcion elegida
  agregarVoto: function(id, respuestaSeleccionada) {

    var indice = this.obtenerIndice(id);
    //busco la respuesta
    for (var i=0; i< this.preguntas[indice].cantidadPorRespuesta.length; i++){
      if (this.preguntas[indice].cantidadPorRespuesta[i].textoRespuesta === respuestaSeleccionada) {
        this.preguntas[indice].cantidadPorRespuesta[i].cantidad++
    }}
    this.guardarPreguntas();
  },

  //se guardan las preguntas
  guardarPreguntas: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  //se recuperan las preguntas
  recuperarPreguntas: function(){
    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
  },

};
