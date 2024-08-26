new Vue({
  el: '#app',
  data: {
    frases: Vue.observable([
      { texto: 'No llores porque ya se terminó, sonríe porque sucedió.', autor: 'Gabriel García Márquez' },
      { texto: 'La vida no es la que uno vivió, sino la que uno recuerda, y cómo la recuerda para contarla.', autor: 'Gabriel García Márquez' },
      { texto: 'El problema del matrimonio es que se acaba todas las noches después de hacer el amor, y hay que volver a reconstruirlo todas las mañanas antes del desayuno.', autor: 'Gabriel García Márquez' },
      { texto: 'Ninguna persona merece tus lágrimas, y quien las merezca no te hará llorar.', autor: 'Gabriel García Márquez' },
      { texto: 'Lo único que me duele de morir, es que no sea de amor.', autor: 'Gabriel García Márquez' }
    ]),
    nuevaFrase: '',
    nuevoAutor: '',
    ubicacionSeleccionada: 'arriba',
    estaEditando: false,
    indiceEditar: null,
    mensaje: '', // Almacena el mensaje de la alerta
    tipoAlerta: '' // Tipo de alerta (success, danger, etc.)
  },
  computed: {
    contadorFrases() {
      return this.frases.length;
    }
  },
  methods: {
    agregarOEditarFrase() {
      if (this.nuevaFrase.trim() !== '' && this.nuevoAutor.trim() !== '') {
        const nuevaEntrada = { texto: this.nuevaFrase, autor: this.nuevoAutor };
        if (this.estaEditando) {
          Vue.set(this.frases, this.indiceEditar, nuevaEntrada);
          this.estaEditando = false;
          this.indiceEditar = null;
          this.mostrarAlerta('Frase editada correctamente', 'success');
        } else {
          if (this.ubicacionSeleccionada === 'arriba') {
            this.frases.unshift(nuevaEntrada);
          } else if (this.ubicacionSeleccionada === 'abajo') {
            this.frases.push(nuevaEntrada);
          }
          this.mostrarAlerta('Frase agregada correctamente', 'success');
        }
        this.nuevaFrase = '';
        this.nuevoAutor = '';
      }
    },
    editarFrase(index) {
      this.nuevaFrase = this.frases[index].texto;
      this.nuevoAutor = this.frases[index].autor;
      this.estaEditando = true;
      this.indiceEditar = index;
      this.mostrarAlerta('Editando frase', 'info');
    },
    eliminarFrase(index) {
      this.frases.splice(index, 1);
      this.mostrarAlerta('Frase eliminada correctamente', 'danger');
    },
    mostrarAlerta(mensaje, tipo) {
      this.mensaje = mensaje;
      this.tipoAlerta = tipo;
      setTimeout(() => {
        this.cerrarAlerta();
      }, 3000); // Cerrar la alerta después de 3 segundos
    },
    cerrarAlerta() {
      this.mensaje = '';
      this.tipoAlerta = '';
    }
  }
});
