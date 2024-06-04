<template>
    <Header/>
    <RouterView v-motion-slide-right />
</template>

<script>
    import Header from './components/Header.vue';


    export default {
        components: {
            Header,
        },
    };
</script>