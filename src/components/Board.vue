<template>
    <section class="board">

        <header class="board__header">

            <h1 class="board__title">{{ title }}</h1>

        </header>

        <div class="board__content">

            <div class="row">
            
                <Cell :row="0" :col="0" @click="doMarkHandler" />
                <Cell :row="0" :col="1" @click="doMarkHandler" />
                <Cell :row="0" :col="2" @click="doMarkHandler" />
            
            </div>
            <div class="row">
                
                <Cell :row="1" :col="0" @click="doMarkHandler" />
                <Cell :row="1" :col="1" @click="doMarkHandler" />
                <Cell :row="1" :col="2" @click="doMarkHandler" />

            </div>
            <div class="row">
            
                <Cell :row="2" :col="0" @click="doMarkHandler" />
                <Cell :row="2" :col="1" @click="doMarkHandler" />
                <Cell :row="2" :col="2" @click="doMarkHandler" />
            
            </div>

        </div>

        <!-- <pre>{{ store.getters.getBoard }}</pre> -->

        <footer class="board__footer">
            
            <Button v-if="store.getters.gameFinished" @click="resetHandler" icon="arrow-clockwise">Play again</Button>
            <Button v-else @click="resetHandler" type="secundary" icon="arrow-clockwise">Reset</Button>

        </footer>

    </section>
</template>

<script setup>

import Cell from './Cell'
import Button from './Button'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const title = computed(() => store.getters.gameFinished
    ? store.getters.winner == null ? 'Draw Game!' : `Player "${store.getters.winner.toUpperCase()}" WIN!`
    : `Player "${store.getters.playerTurn.toUpperCase()}" turn`
)

const doMarkHandler = (row, col) => {

    if(store.getters.getBoard[row][col] != null || store.getters.gameFinished)
        return

    store.dispatch('markBoardCell', { row, col })

    if(store.getters.turnCounter > 2)
        checkEndGame()
    
    if(!store.getters.gameFinished)
        store.dispatch('changeTurn')

}

const checkEndGame = () => {

    let checkReturn = null

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {

            if(i == 2 && j == 1)
                continue

            checkReturn = i == 0
                ? checkLine('row', j)
                : i == 1
                    ? checkLine('col', j)
                    : checkLine('diag', j)
        
            if(checkReturn)
                store.commit('setWinner')
        
        }
    }

    if(store.getters.winner != null || store.getters.turnCounter == 9)
        store.commit('finishGame')

}

const checkLine = (direction, i) => {

    let
        row1 = direction == 'row' ? i : 0,
        row2 = direction == 'row' ? i : 1,
        row3 = direction == 'row' ? i : 2,
        col1 = direction == 'col' ? i : direction == 'diag' ? i : 0,
        col2 = direction == 'col' ? i : direction == 'diag' ? i + (i == 0 ? 1 : -1) : 1,
        col3 = direction == 'col' ? i : direction == 'diag' ? i + (i == 0 ? 2 : -2) : 2

    let isWinLine = (
        store.getters.playerTurn == store.getters.getBoard[row1][col1] &&
        store.getters.getBoard[row1][col1] == store.getters.getBoard[row2][col2] &&
        store.getters.getBoard[row2][col2] == store.getters.getBoard[row3][col3]
    )

    if(isWinLine) {
        
        store.commit('markWinLine', { row: row1, col: col1})
        store.commit('markWinLine', { row: row2, col: col2})
        store.commit('markWinLine', { row: row3, col: col3})

    }

    return isWinLine

}

const resetHandler = () => store.commit('reset')

</script>

<style lang="scss" scoped>

.board {

    margin-bottom: 2rem;

    &__title {
        
        font-size: 2rem;
        font-weight: 400;
        margin: 0 0 3rem 0;
        text-align: center;

    }

    &__content {
        
        border-radius: 15px;
        margin: 0 auto 2rem auto;
        overflow: hidden;
        width: $boardSize;

    }
    
    &__footer {
    
        display: flex;
        justify-content: center;
    
    }

}

.row { display: flex; }

</style>