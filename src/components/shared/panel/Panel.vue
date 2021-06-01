<template>
  <div class="panel">
    <h2 class="panel-title" @dblclick="visible = !visible"> {{ title }} </h2>

    <transition name="fade-panel">
      <!-- SLOT is a part to place elements in others scripts. If no have slot when need put element
      on other script the elements will discarded. Just slot tag add elements.  -->
      <div class="panel-content" v-show="visible">
        <slot> </slot>
      </div>      
    </transition>

  </div>
</template>

<script>

export default {
    props: ["title"],
    
    data() {
      return {
        visible: true
      }
    }

}

</script>

<!-- With "scoped" the styles defined just for this component and not to all project  -->
<style scoped>

  .panel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .panel .panel-title {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * {
    box-shadow: 5px 5px 5px;
  }

  .fade-panel-enter, .fade-panel-leave-active {
    opacity: 0
  }

  .fade-panel-enter-active, .fade-panel-leave-active {
    transition: opacity .4s
  }

  /*
  fade-panel-enter => antes do elemento ser incluído ou removido, o estado atual
  fade-panel-enter-active => quando o elemento esta sendo incluído
  fade-panel-leave-active => quando o elemento esta sendo removido
  */

</style>
