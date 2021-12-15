<template>
    <button
        :class="[
            'cell',
            `cell--${position}`,
            {'cell--success': success}
        ]"
        @click="clickHandler"
    >

        <div v-if="enable || boardCell != null" :class="[
            'cell__mark',
            {'cell__mark--empty': !boardCell},
            `cell__mark--${boardCell}`
        ]">
            {{ boardCell || playerTurn }}
        </div>
    
    </button>

</template>

<script setup>

import { defineProps, defineEmits, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({

    row: Number,
    col: Number

})

const playerTurn = computed(() => store.getters.playerTurn)
const enable = computed(() => !store.getters.gameFinished)
const boardCell = computed(() => store.getters.board[props.row][props.col])
const success = computed(() => store.getters.getWinLine[props.row][props.col])
const position = computed(() => [
    ['top-left', 'top', 'top-right'],
    ['middle-left', 'middle', 'middle-right'],
    ['bottom-left', 'bottom', 'bottom-right']
][props.row][props.col])

const emit = defineEmits(['click'])

const clickHandler = () => emit('click', props.row, props.col)

</script>

<style lang="scss" scoped>

.cell {

    background-color: transparent;
    border: 5px solid #aaa;
    cursor: pointer;
    font-family: 'Cabin', sans-serif;
    height: $boardSize / 3;
    width: $boardSize / 3;

    &--success { background-color: rgba(0, 255, 0, .2); }

    &--top-left,
    &--top-right,
    &--bottom-left,
    &--bottom-right {

        border: 0 none;

    }

    &--top,
    &--bottom {

        border-bottom: 0 none;
        border-top: 0 none;

    }

    &--middle-left,
    &--middle-right {

        border-left: 0 none;
        border-right: 0 none;

    }

    &__mark {
        
        color: #ccc;
        font-size: $boardSize / 5;
        font-weight: 700;
        text-transform: uppercase;

        &--x { color: #4a6ab1; }
        &--o { color: #509d47; }

    }
    
    &__mark--empty { display: none; }

    &:not(.cell--success):hover {

        background-color: #f5f5f5;

        .cell__mark--empty {

            display: block;

        }

    }

}

</style>