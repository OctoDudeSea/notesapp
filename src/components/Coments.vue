<template>
    <div class="coments">
        <div v-motion-slide-right class="coment" v-if="coments" v-for="(coment, index) in coments">
            <h2>{{ coment.user }}</h2>
            <p>{{ coment.content }}</p>
        </div>
        <div v-motion-slide-right class="coment" v-else>
            <h2>No coments yet. Be the first one to comment</h2>
        </div>
    </div>
</template>

<script> 
    // Coment structure: { "user": "test", "content": "Test comment"}
    export default {
        props: ['coments'],
        setup(props) {
            // setup() receives props as the first argument.
            console.log(props.coments)
        }
    }
</script>

<style scoped>
    .coments {
        margin: 2em;
    }

    .coment {
        background-color: rgb(20, 190, 120);
        border-radius: 2em;
        margin-top: 1em;
        padding: 0.5em;
    }

    .coment h2, .coment p{
        padding: 0.3em;
        margin: 0;
    }
</style>