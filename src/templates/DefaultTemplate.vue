<template>
    <div class="default-template">

        <AppHeader />
        
        <AppContent>

            <slot />

        </AppContent>

        <AppFooter />

    </div>
</template>

<script setup>

import AppHeader from './components/AppHeader'
import AppContent from './components/AppContent'
import AppFooter from './components/AppFooter'

</script>

<style lang="scss" scoped>

.default-template {

    margin: 0 auto;
    max-width: 900px;
    padding: 0 1rem;

}

</style>