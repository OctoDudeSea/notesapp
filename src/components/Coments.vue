<template>
    <div class="comments">
        <div v-motion-slide-right class="comment" v-if="comments && comments.length > 0" v-for="(comment, index) in comments" :key="index">
            <h3>{{ comment.author }}</h3>
            <p>{{ comment.content }}</p>
        </div>
        <div v-motion-slide-right class="comment" v-else>
            <h3>No comments yet. Be the first one to comment</h3>
        </div>
    </div>
</template>

<script> 
    export default {
        props: ['id'],
        data() {
            return{
                server : process.env.VUE_APP_SERVER_URL,
                comments: null,
                updateComponent: null
            }
        },
        mounted(){
            let  fetchData = () => {
                fetch(this.server + "/api/note/" + this.id)
                .then(res => res.json())
                .then((data => this.comments = data.comments))
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
    .comments {
        margin: 2em;
    }

    .comment {
        background-color: rgb(20, 190, 120);
        border-radius: 2em;
        margin-top: 1em;
        padding: 0.5em;
    }

    .comment h3, p{
        padding: 0.3em;
        margin: 0;
    }
</style>