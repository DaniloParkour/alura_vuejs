<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <h2 v-if="id" class="centralizado">Alteração</h2>
    <h2 v-else class="centralizado">Inclusão</h2>

    <!-- FORM with prevent default to not reload page on submited -->
    <form @submit.prevent="saveImage()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" name="titulo" data-vv-as="título" autocomplete="off" v-model="foto.title"
                v-validate data-vv-rules="required|min:3|max:30"/>
        <!-- Show span below when input titulo is empty -->
        <span class="txtValidateError" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input name="url" data-vv-as="URL" v-validate data-vv-rules="required" id="url" autocomplete="off" v-model="foto.url">
        <span class="txtValidateError" v-show="errors.has('url')">{{errors.first('url')}}</span>
        <imagem-responsiva v-show="foto.url" :title="foto.title" :url="foto.url"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.description"> </textarea>
      </div>

      <div class="centralizado">
        <meu-botao text="GRAVAR" type="submit"/>
        <router-link :to="{ name: 'home' }"><meu-botao text="VOLTAR" type="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImageResponsive from '../shared/image-responsive/ImageResponsive';
import Button from '../shared/button/Button.vue';
import Image from '../../domain/Image';
import ImageService from '../../domain/ImageService';

export default {

  components: {

    'imagem-responsiva': ImageResponsive, 
    'meu-botao': Button
  },

  data() {
    return {
      foto: new Image(),

      //Get the id param from URL
      id: this.$route.params.id,
    }
  },

  created() {
    this.service = new ImageService(this.$resource);

    if(this.id) {
      this.service
          .search(this.id)
          .then(foto => this.foto = {
                              title: foto.titulo,
                              url: foto.url,
                              description: foto.descricao
                            });
    }
  },

  methods: {
    saveImage() {

      //Verify by form validation before submit form
      this.$validator
           .validateAll()
           .then(success => {

             if(success) {

               let auxFoto = {
                _id: this.id,
                titulo: this.foto.title,
                url: this.foto.url,
                descricao: this.foto.description,
              }

              //this.$http.post('http://localhost:3000/v1/fotos', auxFoto)
                  //.then(() => this.foto = new Image(), err => console.log(err));

              this.service.saveImage(auxFoto)
                          .then( () => {
                            if(this.id) {
                              this.$router.push({name: 'home'});
                            }
                            this.foto = new Image()
                            }, err => console.log(err) );


             } else{
               alert("Há erros no formulário!");
             }

           });

    }
  }

}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .txtValidateError {
    color: red;
  }

</style>