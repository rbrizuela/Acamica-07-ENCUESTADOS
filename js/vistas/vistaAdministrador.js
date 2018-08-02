/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.UpdateModelo.suscribir(function() {contexto.reconstruirLista();});
};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {

    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();

  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;

    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem = $('<li>', {class: "list-group-item",
                              id: pregunta.id,
                              text: pregunta.textoPregunta
                              });

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    //---------------------------------------------------------------
    //  Agregar Pregunta
    //---------------------------------------------------------------
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();    //la ultima posicion es vacia ¿?
        if (respuesta !=''){
          respuestas.push({'textoRespuesta': respuesta, cantidad: 0});
        }
      })

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //---------------------------------------------------------------
    //  Editar Pregunta
    //---------------------------------------------------------------
    e.botonEditarPregunta.click(function() {

      var id = parseInt($('.list-group-item.active').attr('id'));

      if (!isNaN(id)){
        var nuevoTexto = prompt('Ingrese el nuevo texto de la pregunta');
        if (nuevoTexto != null && nuevoTexto != ''){
          contexto.controlador.editarPregunta(id,nuevoTexto);
      }}
      else {
          alert('Debe seleccionar una pregunta para editar');
      }});

    //---------------------------------------------------------------
    //  Borrar Pregunta
    //---------------------------------------------------------------
    e.botonBorrarPregunta.click(function() {

      var id = parseInt($('.list-group-item.active').attr('id'));

      if (!isNaN(id)){
        contexto.controlador.borrarPregunta(id);
      }
      else {
          alert('Debe seleccionar una pregunta a borrar');
      }});

      //---------------------------------------------------------------
      //  Borrar TODAS las preguntas
      //---------------------------------------------------------------
      e.borrarTodo.click(function() {
          contexto.controlador.borrarPreguntaTodas();
        });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
