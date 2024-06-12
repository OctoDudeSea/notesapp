<template>
    <div class="content" v-motion-slide-visible-bottom >
        <!-- Generation of notes based on the 'notes' value -->
        <div
            class="note" 
            v-for="(note, index) in notes"
            :key="index"
            ref="mountedNotes"
            v-motion-slide-visible-left
        >
            <h1>{{ note.title }}</h1>
            <p>{{ 
                note.content > 200 && activeNote != index ? note.content.substring(0,200) + "[...]" : note.content
            }}</p>
            <div class="votes">
                <font-awesome-icon class="like-btn" :icon="['fas', 'thumbs-up']" />
                <p><strong>0</strong></p>
                <font-awesome-icon class="dislike-btn" :icon="['fas', 'thumbs-down']" />
                <p>by {{ note.author }}</p>
                <p>{{  note.date }}</p>
            </div>
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
    <NewNoteModal ref="newNote"/>
    <div class="add-button" @click="openNewNote">
        <h1>+</h1>
    </div>
</template>

<script setup>
    import Coments from './Coments.vue';
    import NewNoteModal from './NewNoteModal.vue';
    import { ref, onMounted } from 'vue';
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    const loggedIn = ref();
    const server = process.env.VUE_APP_SERVER_URL;
    const notes = ref();
    const newNote = ref();
    const mountedNotes = ref();
    const activeNote = ref(-1);
    let updateComponentData = null;

    //When we load the app we fetch the necesary data from the server
    onMounted(fetchData);
    updateComponentData = setInterval(fetchData, 20000);

    onAuthStateChanged(getAuth(), (user) => {
        user ? loggedIn.value = true : loggedIn.value = false;
    });
     
    //This function gets the data from the server and updates the 'notes' value
    function fetchData() {
        fetch(server + "/api/notes/")
            .then(res => res.json())
            .then((data => notes.value = data))
            .catch(error => console.log(error));

        console.log("Fetching data");
    };

    function openNote(index) {
        if(activeNote.value != index){
            activeNote.value = index
        }
        setTimeout(() => {
            mountedNotes.value[index].scrollIntoView({ behavior: "smooth" })
        },500); 
    };
    
    //This method is called when the user clicks on the '+' button
    //It opens the modal to create a new note by calling a method from the child component
    const openNewNote = () =>{
        newNote.value.openModal();
    };
     
    function closeNote() {
        activeNote.value = -1
    };
</script>

<style scoped>
    .votes {
        display: flex;
        border-radius: 2em;
        width: fit-content;
        height: fit-content;
        align-items: center;
        margin-left: 2em;
    }

    .votes p {
        margin: 0.5em;
        background-color: rgb(20, 190, 120);
        border-radius: 2em;
        padding: 0.5em;
    }

    .like-btn, .dislike-btn {
        background-color: rgb(20, 190, 120);
        border-radius: 2em;
        padding: 0.5em;
        cursor: pointer;
        margin: 0;
    }

    .dislike-btn:hover {
        transition: 0.2s;
        scale: 1.2;
        background-color: red;
    }

    .like-btn:hover {
        transition: 0.2s;
        scale: 1.2;
        background-color: rgb(20, 125, 190);
    }

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
        transition: 0.2s;
    }

    .add-button:hover {
        scale: 1.2;
        background-color: rgb(20, 125, 190);
        transition: 0.2s;
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
        margin: 1em;
        transition: 0.2s;
        box-shadow: 0 4px 10px 0 black;
    }

    .note:hover {
        background-color: rgb(69, 69, 69);
        transition: 0.2s;
    }

    @media only screen and (max-width: 550px) {
        /* For mobile phones: */
        .content {
            width: fit-content;
            margin-left: 0;
            margin-right: 0;
        }
        
        .note {
            margin-left: 0.3em;
            margin-right: 0.3em;
            font-size: smaller;
        }
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