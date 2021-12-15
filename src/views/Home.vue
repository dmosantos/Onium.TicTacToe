<template>
    <Template>

        <Content class="welcome">

            <Header title="Welcome" />

            <p>Welcome to <strong>TicTacToe</strong> by <strong>Onium Computers</strong>.</p>
            <p><router-link to="/play">CLICK HERE</router-link> to play!</p>

        </Content>

    </Template>
</template>

<script setup>

import Template from '@/templates/DefaultTemplate'
import Content from '@/components/Content'
import Header from '@/components/Header'

</script>

<style lang="scss" scoped>

.welcome {

    text-align: center;

}

</style>