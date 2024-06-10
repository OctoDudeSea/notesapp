<template>
        <div class="background" v-if="showModal" v-motion-slide-bottom>
            <div class="add-note" >
                <div class="close-btn" @click="closeModal">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                </div>
                <label for="">Title:</label><br/>
                <input type="text"><br/><br>
                <label for="">Content:</label><br/>
                <textarea name="" id=""></textarea><br/>
                <div class="center">
                    <button>Post</button>
                </div>
            </div>
        </div>
</template>

<script setup>
    import { ref } from 'vue';

    const showModal = ref(false);

    const openModal = () => {
        showModal.value = true;
    };
    //we expose the openModal function to the parent component so that it can be called from the parent component
    defineExpose({openModal});

    const closeModal = () => {
        showModal.value = false;
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
        display: flex;
        justify-content: center;
        align-items: center;
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