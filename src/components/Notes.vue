<template>
    <div class="content" v-motion-slide-visible-bottom >
        <!-- Generation of notes based on the 'notes' value -->
        <div
            class="note" 
            v-for="(note, index) in notes"
            :key="index"
            ref="notes"
            v-motion-slide-visible-left
        >
            <h1>{{ note.title }}</h1>
            <p>{{ 
                note.title.length > 200 && activeNote != index ? note.title.substring(0,200) + "[...]" : note.title
            }}</p>
            <!-- Coments component that we show when the index is the same as the active note -->
            <Coments v-if="index == activeNote" :id="note._id"/>
            <!-- Behavior for open and close buttons -->
            <div v-if="index != activeNote" class="open-btn" @click="openNote(index)">
                <font-awesome-icon :icon="['fas', 'circle-chevron-down']" />
            </div>
            <div v-else class="close-btn" @click="closeNote">
                <font-awesome-icon :icon="['fas', 'circle-xmark']" />
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
import Coments from './Coments.vue'

    export default({
        components: {
            Coments
        },
        data() {
            return {
                server : process.env.VUE_APP_SERVER_URL,
                component: "",
                activeNote: -1,
                notes: [],
                className: "control-hidden"
            }
        },
        //When we load the app we fetch the necesary data from a json server (pending for change to api)
        mounted(){
            fetch(this.server + "/api/notes")
            .then(res => res.json())
            .then((data => this.notes = data))
            .catch(error => console.log(error));
        },
        methods: {
            openNote(index) {
                if(this.activeNote != index){
                    this.activeNote = index
                }
                setTimeout(() => {
                    let element = this.$refs.notes[index]
                    element.scrollIntoView({ behavior: "smooth" })
                },500) 
            },
            closeNote(){
                this.activeNote = -1
            }
        },
    })
</script>

<style scoped>
    .open-btn {
        scale: 1.5;
        color: rgb(20, 190, 120);
        position: absolute;
        top: 1.5em;
        right: 2em;
        cursor: pointer;
        transition: 0.2s;
    }

    .open-btn:hover {
        color: rgb(20, 125, 190);
        scale: 2;
    }

    .close-btn {
        scale: 1.5;
        color: rgb(20, 190, 120);
        position: absolute;
        top: 1.5em;
        right: 2em;
        cursor: pointer;
        transition: 0.2s;
    }

    .close-btn:hover {
        color: rgb(200, 20, 50);
        scale: 2;
    }

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
        padding-left: 0;
        margin: 1em;
        cursor: default;
        transition: 0.2s;
        box-shadow: 0 4px 10px 0 black;
    }

    .note:hover {
        background-color: rgb(69, 69, 69);
        transition: 0.2s;
    }

    
    h1 {
        margin-left: 1em;
        margin-right: 1em;
    }

    p {
        margin-left: 2em;
        margin-right: 2em;
    }
</style>