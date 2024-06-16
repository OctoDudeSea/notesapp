<template>
    <div class="content" ref="content" v-motion-slide-visible-bottom >
        <!-- Generation of notes based on the 'notes' value -->
        <div
            class="note" 
            v-for="(note, index) in notes"
            :key="index"
            ref="mountedNotes"
            v-motion-slide-visible-left
        >
            <div class="tag-container">
                <p class="tag">{{ note.author.replace(/@[^@]+$/, '') }}</p>
                <p class="tag">{{  note.date }}</p>
            </div class="note-data">
            <div class="note-data">
                <h2>{{ note.title }}</h2>
                <p>{{ 
                    note.content.length > 200 && activeNote != index ? note.content.substring(0,200) + "[...]" : note.content
                }}</p>
            </div>
            <div v-motion-pop class="votes">
                <div v-if="loggedIn" style="display: flex; align-items: center;">
                    <font-awesome-icon class="like-btn" :icon="['fas', 'thumbs-up']" />
                    <p><strong>0</strong></p>
                    <font-awesome-icon class="dislike-btn" :icon="['fas', 'thumbs-down']" />
                </div>
            </div>
            <!-- Coments component that we show when the index is the same as the active note -->
            <Coments v-if="index == activeNote && loggedIn" :id="note._id" :email="auth.currentUser.email"/>
            <!-- Behavior for open and close buttons -->
             <div v-if="loggedIn">
                 <div v-if="index != activeNote" class="open-btn" @click="openNote(index)">
                     <font-awesome-icon :icon="['fas', 'circle-chevron-down']" />
                 </div>
                 <div v-else class="close-btn" @click="closeNote">
                     <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                 </div>
             </div>
        </div>
    </div>
    <NewNoteModal v-if="loggedIn == true" :email="auth.currentUser.email" ref="newNote"/>
    <div v-motion-slide-bottom>
        <div class="add-button" @click="openNewNote" v-if="loggedIn">
            <h1>+</h1>
        </div>
        <div class="message" v-else>
            <h2>You must be signed in to post and comment notes!</h2>
        </div>
    </div>
    
</template>

<script setup>
    import Coments from './Coments.vue';
    import NewNoteModal from './NewNoteModal.vue';
    import { ref, onMounted } from 'vue';
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const loggedIn = ref();
    const server = process.env.VUE_APP_SERVER_URL;
    const notes = ref([]); //This is the array that contains all the notes
    const newNote = ref();
    const content = ref();
    const mountedNotes = ref(); //This is the array that contains all the notes that are mounted in the DOM
    const activeNote = ref(-1);
    const auth = getAuth();
    let updateComponentData = null;

    //When we load the app we fetch the necesary data from the server and we check if the user is logged in
    onMounted(() => {
        fetchData();
        loggedIn.value = auth.currentUser;
        updateComponentData = setInterval(fetchData, 5000);
        console.log(route.path);
        setTimeout(() => {
            if(route.path == "/"){
                mountedNotes.value[mountedNotes.value.length - 1].scrollIntoView({ behavior: "smooth" });
            };
        }, 1000);
    });

    //We update the 'loggedIn' value when the user is logged in or out
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
        //We scroll the note to the top of the screen
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
    .message {
        margin: auto;
        background-color: rgb(40, 40, 50);
        width: fit-content;
        border-radius: 2em;
    }

    .message h2 {
        padding: 0.5em;
        color: white;
    }

    .votes {
        display: flex;
        border-radius: 2em;
        width: fit-content;
        height: fit-content;
        align-items: center;
        margin-left: 2em;
        margin-right: 2em;
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
        padding-left: 2em;
        padding-right: 2em;
    }

    .add-button:hover {
        scale: 1.2;
        background-color: rgb(20, 125, 190);
        transition: 0.2s;
    }

    .content {
        display: flex;
        flex-direction: column-reverse;
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

    .tag {
        background-color: rgb(20, 125, 190);
        border-radius: 2em;
        width: fit-content;
        padding: 0.2em;
        margin-left: 0.5em;
    }

    .tag-container {
        display: flex;
        margin-left: 2em;
        margin-right: 2em;
        align-items: center;
        text-align: center;
    }

    .note-data h2 {
        margin-left: 2em;
        margin-right: 2em;
    }

    .note-data p {
        margin-left: 3em;
        margin-right: 3em;
    }
</style>