<template>
    <button :class="[
        'button',
        `button--${type}`
    ]">
        <span class="button__label"><slot /></span>
        <span v-if="icon" class="button__icon">
            <Icon :symbol="icon" />
        </span>
    </button>
</template>

<script setup>

import Icon from '@/components/Icon'

import { defineProps } from 'vue'

defineProps({

    type: {
        type: String,
        default: 'primary'
    },
    icon: String

})

</script>

<style lang="scss" scoped>

.button {

    align-items: center;
    background-color: #509d47;
    border: 0 none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    font-weight: 700;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-transform: uppercase;

    &::after {

        background: #fff;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: all .2s ease;
        width: 100%;

    }

    &:hover::after { opacity: .2; }

    &--secundary { background-color: #999;}

    &__label {

        padding: .7rem 1rem;

    }

    &__icon {

        align-items: center;
        background-color: rgba(0, 0, 0, .2);
        display: flex;
        fill: #fff;
        margin: 0;
        padding: .7rem .5rem;

    }

}


</style>