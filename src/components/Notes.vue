<template>
    <div class="content" v-motion-slide-visible-bottom>
        <div
            class="note" 
            v-for="(note, index) in notes"
            :key="index"
            v-motion-slide-visible-left 
        >
            <h1>{{ note.title }}</h1>
            <p>{{ note.description }}</p>
            <div 
                class="control-hidden"
                @click=""
            >
                <button>Editar</button>
                <button>Borrar</button>
                <button>Mover</button>
            </div>
        </div>
    </div>
    
    <div class="add-button">
        <h1>+</h1>
    </div>
</template>

<!--
    This is the structure of the json:
    {"title": "Note 1", "description": "Note 1 description sample", "id": 1}, 
-->

<script>
    
    export default({

        data() {
            return {
                notes: [],
            }
        },
        mounted(){
            fetch("http://localhost:3000/notes")
            .then(res => res.json())
            .then((data => this.notes = data))
            .catch(error => console.log(error));
        },
        methods: {
            noteClick() {

            }
        },
    })
</script>

<style scoped>

    .add-button {
        background-color: rgb(20, 190, 120);
        width: fit-content;
        border-radius: 1em;
        text-align: center;
        margin: auto;
        position: sticky;
        bottom: 1em;
        color: white;
        cursor: pointer;
    }

    .content {
        box-shadow: 0 4px 10px 0 black;
        margin: 1em;
        border-radius: 1em;
        height: 80vh;
        overflow-y: scroll;
    }

    .control-show {
        display: flex;
        justify-content: center;
    }

    .control-hidden {
        display: none;
    }

    button {
        font-family: 'Courier New', Courier, monospace;
        border-radius: 1em;
        color: white;
        background-color: rgb(20, 190, 120);
        border: 0;
        padding: 0.4em;
        margin: 0.2em;
        cursor: pointer;
    }

    .note {
        background-color: rgb(40, 40, 50);
        color: white;
        border-radius: 4em;
        padding-top: 1em;
        padding-bottom: 1em;
        margin: 1em;
        cursor: pointer;
        transition: 0.2s;
        box-shadow: 0 4px 10px 0 black;
    }



    .note:hover {
        background-color: rgb(100, 100, 200);
        transition: 0.2s;
    }

    h1 {
        margin-left: 2em;
        margin-right: 2em;
    }

    p {
        margin-left: 4em;
        margin-right: 4em;
    }
</style>