<template>
    <div class="coments">
        <div v-motion-slide-right class="coment" v-if="coments" v-for="(coment, index) in coments" :key="index">
            <h3>{{ coment.user }}</h3>
            <p>{{ coment.content }}</p>
        </div>
        <div v-motion-slide-right class="coment" v-else>
            <h3>No coments yet. Be the first one to comment</h3>
        </div>
    </div>
</template>

<script> 
    // Coment structure: { "user": "test", "content": "Test comment"}
    export default {
        props: ['id'],
        data() {
            return{
                coments: null,
                updateComponent: null
            }
        },
        mounted(){
            let  fetchData = () => {
                fetch("http://localhost:3000/notes/" + this.id)
                .then(res => res.json())
                .then((data => this.coments = data.coments))
                .catch(error => console.log(error));

                console.log("Fetching data")
            }

            fetchData()

            this.updateComponent = setInterval(fetchData, 10000)
        },
        unmounted() {
            clearInterval(this.updateComponent)
            console.log("Component unmounted")
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

    .coment h3, p{
        padding: 0.3em;
        margin: 0;
    }
</style>