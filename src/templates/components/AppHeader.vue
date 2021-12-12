<template>
    <header class="app-header">

        <router-link class="app-header__logo" to="/">TicTacToe</router-link>

        <menu class="menu">

            <router-link class="menu__item" to="/">Home</router-link>
            <router-link class="menu__item" to="/play">Play</router-link>
            <router-link class="menu__item" to="/about">About</router-link>

        </menu>

    </header>
</template>

<script setup>



</script>

<style lang="scss" scoped>

$headerHeight: 6rem;

.app-header {

    align-items: center;
    border-bottom: 1px solid $borderColor;
    display: flex;
    justify-content: space-between;

    &__logo {

        color: #000;
        font-size: 1.8rem;
        font-weight: 900;
        line-height: $headerHeight;
        text-decoration: none;

    }

}

.menu {

    display: flex;
    margin: 0;
    padding: 0;

    &__item {
    
        color: #000;
        line-height: $headerHeight;
        overflow: hidden;
        padding: 0 1rem;
        position: relative;
        text-decoration: none;

        &::after {

            border-width: .3rem;
            border-style: solid;
            border-color: transparent transparent var(--theme-color) transparent;
            bottom: 0;
            content: '';
            display: block;
            left: 50%;
            height: .6rem;
            position: absolute;
            transform: translate(-50%) translateY(100%);
            transition: all .2s ease;
            width: 70%;

        }

        &:hover {
            
            background-color: #f5f5f5;
            color: var(--link-color);

            &::after {
                
                transform: translate(-50%) translateY(0%);

            }

        }

    }

}

</style>