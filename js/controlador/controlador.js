/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
      this.modelo.borrarPregunta(id);
  },

  borrarPreguntaTodas: function() {
      this.modelo.borrarPreguntaTodas();
  },

  editarPregunta: function(id,nuevoTexto) {
      this.modelo.editarPregunta(id,nuevoTexto);
  },

  agregarVoto: function(id,respuestaSeleccionada) {
      this.modelo.agregarVoto(id,respuestaSeleccionada);
  },

};
