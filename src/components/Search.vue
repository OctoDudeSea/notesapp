<template>
    <input class="search-bar" type="text" placeholder="Search.." @input="search">
</template>

<script setup>
    const emit = defineEmits(["search"]);

    const search = (event) => {
        emit('search', event.target.value);
    };
</script>

<style scoped>
    .search-bar {
        border-radius: 2em;
        height: 2em;
        align-self: center;
        text-align: center;
        font-size: 1em;
        border: solid grey;
    }
</style>