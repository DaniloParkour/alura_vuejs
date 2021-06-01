<!-- alurapic/src/components/home/Home.vue -->

<template>
    <div>    

        <h1 class="centralizado">Alurapic</h1>

        <p v-show="message" class="centralizado"> {{ message }} </p>

        <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">

        <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
            <meu-painel :title="foto.titulo">
              
              <image-responsive 
                        :url="foto.url" 
                        :title="foto.titulo"
                        v-rotate-transform="{ increment: 20, animation: true, animationTime: 0.5 }"
                        />

              <router-link :to="{name: 'altera', params: { id: foto._id }}">
                <my-button 
                  type="button"
                  text="Alterar"
                />
              </router-link>

              <my-button 
                          type="button" 
                          text="Remover" 
                          @botaoAtivado="remove(foto)" 
                          :confirmation="true"
                          buStyle="red"
                          />

            </meu-painel>
        </li>
        </ul>
    </div>
</template>

<script>

import Panel from '../shared/panel/Panel.vue';
import ImageResponsive from '../shared/image-responsive/ImageResponsive.vue';
import Button from "../shared/button/Button.vue";
import ImageService from '../../domain/ImageService';

export default {
  components: {
    'meu-painel': Panel,
    'image-responsive': ImageResponsive,
    'my-button': Button,
  },

  methods: {
    remove(foto) {

      //From the ".then", the code is the same that used on "this.$http.delete()"
      //this.resource.delete({ id: foto._id })

      this.service.delete(foto._id)
        .then( () => {
                      let index = this.fotos.indexOf(foto);
                      this.fotos.splice(index, 1);
                      this.message = "Imagem removida com sucesso";
                      }, err => {
                       this.message = "Não foi possível remover a imagem";
                       console.log(err); 
                      }
                    );
      
      //this.$http.delete(`v1/fotos/${foto._id}`)
                    /*.then( () => {
                      let index = this.fotos.indexOf(foto);
                      this.fotos.splice(index, 1);
                      this.message = "Imagem removida com sucesso";
                      }, err => {
                       this.message = "Não foi possível remover a imagem";
                       console.log(err); 
                      }
                    )*/
      
    }
  },

  data () {
    return {

      fotos: [],

      filtro: '',

      message: ''
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {

    //$resource to be used, its necessary be configured
    //The "{/id}" define in URL a parameter id that can be used in other locals of code
    
    //this.resource = this.$resource('v1/fotos{/id}');
    //this.resource.query() //By default the query method send a GET to configured URL
            //.then(res => res.json())
            //.then(fotos => this.fotos = fotos, err => console.log(err));
            //OBS: The 2 then are the same then used on this.$http
            
    this.service = new ImageService(this.$resource);
    this.service.list().then(image => this.fotos = image, err => console.log(err.message));

  }
}
</script>
<style>

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>