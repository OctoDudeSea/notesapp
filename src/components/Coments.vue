<template>
    <div class="comments">
        <div v-motion-slide-right class="comment" v-if="comments && comments.length > 0" v-for="(comment, index) in comments" :key="index">
            <h3>{{ comment.author }}</h3>
            <p>{{ comment.content }}</p>
        </div>
        <div v-motion-slide-right class="comment" v-else>
            <h3>No comments yet. Be the first one to comment</h3>
        </div>
        <div class="comment-form" v-motion-slide-right>
            <input type="text" v-model="comment">
            <font-awesome-icon @click="sendComment" class="send-btn" :icon="['fas', 'paper-plane']"/>
        </div>
    </div>
</template>

<script setup>
    const comment = defineModel('comment');

    function sendComment(){
        fetch(this.server + '/api/note/' + this.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment.value
            })
        });

        comment.value = "";
    }
</script>

<script>
    export default {
        props: ['id'],
        data() {
            return{
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
    .comment-form {
        text-align: center;
        border-radius: 2em;
        padding: 0.5em;
        margin-top: 1em;
        white-space: nowrap;
        display: flex;
        justify-content: center;
    }

    .comment-form input {
        width: 95%;
        padding: 1em;
        border-radius: 2em;
        border: none;
        font-size: 1em;
    }

    .send-btn {
        font-family: 'Courier New', Courier, monospace;
        font-size: x-large;
        border-radius: 100%;
        background-color: rgb(20, 190, 120);
        color: rgb(40, 40, 50);
        padding: 0.5em;
        margin-left: 0.5em;
        cursor: pointer;
        transition: 0.2s;
    }

    .send-btn:hover {
        scale: 1.1;
        background-color: rgb(20, 125, 190);
        transition: 0.2s;
    }

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