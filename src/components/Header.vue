<template>
    <nav>
        <ul>
            <li>
                <RouterLink 
                    v-for="(link, index) in links" 
                    :key="index"
                    :to="link.url"
                >{{ link.text }}</RouterLink>
            </li>
        </ul>
        <font-awesome-icon @click="showUser = !showUser" class="user" :icon="['fas', 'circle-user']" />
    </nav>
    <UserModal class="user-modal" v-if="showUser" />
</template>

<script setup>
    import { ref } from "vue";
    import UserModal from "../components/UserModal.vue";

    const showUser = ref(false);
    const links = [ { url: "/", text: "Home"},
                    { url: "/about", text: "About"}];

</script>

<style scoped>

    .user-modal {
        position: fixed;
        top: 0;
        transform: translateY(-1em);
        right: 1em;
        z-index: 1;
    }

    nav {
        background-color: rgb(40, 40, 40);
        display: flex;
        border-radius: 1.5em;
        box-shadow: 0 4px 8px 0;
        z-index:1;
        position: sticky;
        top: 0.5em;
    }

    ul {
        text-decoration: none;
        list-style: none;
        display: flex;
    }

    a {
        padding: 0.4em;
        margin: 0.5em;
        width: fit-content;
        text-decoration: none;
        border-radius: 1em;
        color: white;
        font-weight: bold;
        transition: 0.2s;
    }

    a:hover {
        background-color: rgb(100, 100, 200);
        transition: 0.2s;
    }

    .router-link-active{
        background-color: rgb(20, 190, 120);
    }

    .user {
        font-size: 2.5em;
        margin-left: auto;
        margin-right: 1em;
        align-self: center;
        color: rgb(20, 190, 120);
        transition: 0.2s;
    }

    .user:hover {
        cursor: pointer;
        scale: 1.2;
        color: rgb(100, 100, 200);
        transition: 0.2s;
    }
    .use p {
        font-size: large;
    }
</style>