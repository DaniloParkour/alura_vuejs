<template>

  <div class="corpo">

    <nav-menu :routes="routes"/>

    <transition name="page">
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>

  import { routes } from "./routes";
  import Menu from "./components/shared/menu/Menu.vue";

  export default {

    components: {
      'nav-menu': Menu
    },

    data() {
      return {
        routes: routes.filter(route => route.menu)
      }
    }
  }

</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .3s;
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

</style>


<!--
<template>
  <div class="body">
    <h1 class="center">{{ title }}</h1>

    <input type="search" class="filtre" placeholder="Filtre pelo título da foto"
            v-on:input="filtre = $event.target.value">

    <!--
      <img v-bind:src="images.imgSorcerer.url">
      The "v-bind:" above can be replaced by ":" one alternative sintaxe to keep code clean
      <img :src="images.imgSorcerer.url">
    ->

    <ul class="pictures-list">
      <li class="picture-item" v-for="image in imagesWithFiltre">

        <panel :title="image.titulo">
          <!-- <img class="responsive-element" :src="image.url" :alt="image.title"> ->
          <imgResponsive :url="image.url" :title="image.titulo"/>
        </panel>

      </li>
    </ul>

  </div>
</template>

<script>

  import Panel from "./components/shared/panel/Panel.vue";
  import ImageResponsive from "./components/shared/image-responsive/ImageResponsive.vue";

  export default {
    props: ['url', 'title'],
    components: {
      panel: Panel,
      imgResponsive: ImageResponsive
    },

    data() {
      return {
        title: "Image List",
        
        filtre: "",

        images: [],

          /*[
          {
            url: "https://i.pinimg.com/564x/f0/b5/7b/f0b57b4325485d527af63cd53822001a.jpg",
            title: "Sorcerer"
          },
          {
            url: "https://i.pinimg.com/564x/7b/7f/1f/7b7f1fcdcaf7453614dfdf448ff284ce.jpg",
            title: "Rogue"
          },
          {
            url: "https://i.pinimg.com/564x/d6/44/39/d644394291df4f02a2a35356e8d78aca.jpg",
            title: "Slayer"
          },
          {
            url: "https://i.pinimg.com/564x/0b/bc/44/0bbc4448e7ecfc980827aa83a09c0256.jpg",
            title: "Hunter"
          },
          {
            url: "https://i.pinimg.com/564x/7a/eb/3f/7aeb3fee5ec9269f888d987434d0e860.jpg",
            title: "Druid"
          }

        ]*/

      }
    },
    
    created() {
      // Lifecyrcle Hook To Implement The Code To Execute When The Component Is Created
      this.$http.get("http://localhost:3000/v1/fotos")
        .then(resp => resp.json())
        .then(images => this.images = images, error => console.log(error));
      ;
    },

    computed: {

      imagesWithFiltre() {
        if(this.filtre) {

          let exp = new RegExp(this.filtre.trim(), 'i');
          
          return this.images.filter(image => exp.test(image.titulo));
          
        } else {
          return this.images;
        }

      }
    }

  }
</script>

<style>

  .body {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .center {
    text-align: center;
  }

  .pictures-list {
    list-style: none;
  }

  .pictures-list .picture-item {
    display: inline-block;
  }

  .responsive-element {
    width: 100%;
  }

  .filtre {
    display: block;
    width: 100%;
  }

</style>

-->