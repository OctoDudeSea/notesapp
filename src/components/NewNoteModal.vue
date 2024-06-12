<template>
        <div class="background" v-if="showModal"></div>
        <div class="add-note" v-if="showModal">
            <div class="close-btn" @click="closeModal">
                <font-awesome-icon :icon="['fas', 'circle-xmark']" />
            </div>
            <label>Title:</label><br/>
            <input type="text" v-model="title"><br/><br>
            <label>Content:</label><br/>
            <textarea v-model="content"></textarea><br/>
            <div class="center">
                <button @click="postNote">Post</button>
            </div>
        </div>
</template>

<script setup>
    import { ref } from 'vue';

    const server = process.env.VUE_APP_SERVER_URL;
    const title = defineModel('title');
    const content = defineModel('content');
    const showModal = ref(false);

    function openModal() {
        showModal.value = true;
    };
    //we expose the openModal function to the parent component so that it can be called from the parent component
    defineExpose({openModal});

    const closeModal = () => {
        showModal.value = false;
    };

    function postNote() {
        fetch(server + '/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                content: content.value,
            })
        })
        title.value = "";
        content.value = "";
        closeModal();
    };
</script>

<style scoped>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    .add-note {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(40, 40, 50);
        padding: 2em;
        border-radius: 2em;
        box-shadow: 0 4px 10px 0 black;
    }

    .add-note input {
        width: 95%;
        padding: 0.5em;
        border-radius: 2em;
        margin-top: 1em;
        border: none;
        font-size: 1em;
    }

    .add-note textarea {
        width: 20em;
        height: 10em;
        padding: 0.5em;
        border-radius: 2em;
        margin-top: 1em;
        border: none;
        font-size: 1em;
        resize: none;
    }

    .add-note button {
        margin-top: 1em;
        font-size: large;
    }

    .add-note label {
        font-weight: bold;
        color: white;
        margin-top: 0.5em;
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

    button {
        font-family: 'Courier New', Courier, monospace;
        border-radius: 1em;
        color: white;
        background-color: rgb(20, 190, 120);
        border: 0;
        padding: 0.4em;
        margin: 0.2em;
        cursor: pointer;
        transition: 0.2s;
    }

    button:hover {
        scale: 1.2;
        background-color: rgb(20, 125, 190);
        transition: 0.2s;
    }

    .center {
        text-align: center;
    }
</style>