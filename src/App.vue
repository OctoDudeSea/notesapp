<template>
    <Header class="sticky"/>
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

<style scoped>

</style>