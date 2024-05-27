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
    </nav>
</template>

<script>
    export default{
        data() {
            return {
                links: [
                    { url: "/", text: "Home"},
                    { url: "/about", text: "About"},
                    { url: "/contact", text: "Contact"},
                ],
            }
        },
    };
</script>

<style scoped>
    
    /* rgb(20, 190, 120) --> verde futurista */

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
</style>