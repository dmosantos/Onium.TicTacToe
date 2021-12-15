<template>
    <header class="header">

        <h1 class="header__title">{{ title }}</h1>

    </header>
</template>

<script setup>

import { defineProps } from 'vue'

defineProps({

    title: String

})

</script>

<style lang="scss" scoped>

.header {

    &__title {
        
        font-size: 2rem;
        font-weight: 400;
        margin: 0 0 3rem 0;
        text-align: center;

    }

}

</style>