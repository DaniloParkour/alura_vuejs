<template>
    <button class="button" :class="buttonStyle" :type="type" @click="throwCickAction()"> {{ text }} </button>
</template>

<script>

export default {
    props: {
        type: {
            required: true,
            type: String
        },
        text: {
            required: true,
            type: String
        },
        confirmation: {
            required: false,
            default: false,
            type: Boolean
        },
        buStyle: {
            required: false,
            default: 'padrao',
            type: String
        }
    },
    methods: {
        throwCickAction() {
            
            if(this.confirmation) {
                if(confirm("Confirma Operação?")) {
                    this.$emit("botaoAtivado");
                }

                console.log("VEIO NO IF!");
                return;
            }

            console.log("VEIO PRO ELSE!");
            this.$emit("botaoAtivado");
        }
    },
    computed: {
        buttonStyle() {
            if(!this.buStyle || this.buStyle == "padrao") return "button-default";
            if(this.buStyle == "red") return "button-red";
        }
    }
}

</script>

<style scoped>

    .button {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .button-red {
        background: firebrick;
        color: white;
    }

    .button-default {
        background: darkcyan;
        color: white;
    }

</style>