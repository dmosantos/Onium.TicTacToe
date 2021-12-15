<template>
    <div class="board">

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

        <!-- <pre>{{ store.getters.board }}</pre> -->
        <!-- <pre>{{ store.getters.boardMap }}</pre>
        <pre>{{ store.getters.winMap }}</pre>
        <pre>{{ store.getters.playerPath }}</pre> -->

    </div>
</template>

<script setup>

import Cell from './Cell'

import { useStore } from 'vuex'

const store = useStore()

store.watch((state, getters) => getters.turnCounter, (turnCounter) =>{
    
    if(
        turnCounter == 0
        && store.getters.players == 1
        && store.getters.playerTurn == store.getters.computerPlayer
    )
        computerTurn()

})

const doMarkHandler = (row, col) => {

    if(store.getters.board[row][col] != null || store.getters.gameFinished)
        return

    store.dispatch('markBoardCell', { row, col })

    if(store.getters.turnCounter > 2)
        checkEndGame()
    
    if(store.getters.gameFinished)
        return
        
    store.dispatch('changeTurn')

    if (store.getters.players == 1 && store.getters.playerTurn == store.getters.computerPlayer)
        computerTurn()

}

const checkEndGame = () => {

    let winLine = checkWinLine()

    if(winLine != null)
        store.dispatch('setWinner', winLine)

    if(store.getters.winner != null || store.getters.turnCounter == 9)
        store.dispatch('finishGame')

}

const checkWinLine = (playerPath = store.getters.playerPath[store.getters.playerTurn]) => {

    for (let i = 0; i <= 7; i++)
        if(playerPath % store.getters.winMap[i].hash == 0)
            return store.getters.winMap[i].cells

    return null
    
}

const checkIfHasWinnerPath = (playerPath) => {

    for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++)
            if(
                store.getters.board[row][col] == null
                && checkWinLine(playerPath * store.getters.boardMap[row][col]) != null
            )
                return {
                    row: row,
                    col: col
                }

    return null

}

const computerTurn = () => {

    let nextMark = store.getters.difficulty == 'easy'
        ? computerEasy()
        : store.getters.difficulty == 'normal'
            ? computerNormal()
            : computerHard()

    doMarkHandler(nextMark.row, nextMark.col)

}

const computerEasy = () => {

    const nextMark = {
        row: null,
        col: null
    }
    
    do {
        
        nextMark.row = Math.floor(Math.random() * 3)
        nextMark.col = Math.floor(Math.random() * 3)

    }
    while (
        store.getters.board[nextMark.row][nextMark.col] != null
        && store.getters.turnCounter < 9
    )
    
    return nextMark
    
}

const computerNormal = () => {
    
    let nextMark = null

    // Primeira jogada
    if (store.getters.turnCounter < 2)
        nextMark = computerEasy()

    // Verificar se pode ganhar
    if(nextMark == null)
        nextMark = checkIfHasWinnerPath(store.getters.playerPath[store.getters.computerPlayer])

    // Verificar se está em risco
    if(nextMark == null)
        nextMark = checkIfHasWinnerPath(store.getters.playerPath[store.getters.humanPlayer])

    // Marcar melhor jogada
    if(nextMark == null)
        for (let row = 0; row < 3; row++)
            for (let col = 0; col < 3; col++)
                if(
                    nextMark == null
                    && store.getters.board[row][col] == null
                    && checkIfHasWinnerPath(store.getters.playerPath[store.getters.computerPlayer] * store.getters.boardMap[row][col]) != null
                )
                    nextMark = {
                        row: row,
                        col: col
                    }

    // Marca aleatório
    if(nextMark == null)
        nextMark = computerEasy()

    return nextMark

}

const computerHard = () => {
    
    let nextMark = null

    // Primeira jogada
    if (store.getters.turnCounter <= 1)
        if(store.getters.board[1][1] == null)
            nextMark = {
                row: 1,
                col: 1,
            }
        else
            nextMark = {
                row: [0, 2][Math.floor(Math.random() * 2)],
                col: [0, 2][Math.floor(Math.random() * 2)],
            }

    // Verificar se pode ganhar
    if(nextMark == null)
        nextMark = checkIfHasWinnerPath(store.getters.playerPath[store.getters.computerPlayer])

    // Verificar se está em risco
    if(nextMark == null)
        nextMark = checkIfHasWinnerPath(store.getters.playerPath[store.getters.humanPlayer])

    // Marcar melhor jogada - 1
    if(nextMark == null)
        if(store.getters.turnCounter == 2)
            if(store.getters.board[0][1] == store.getters.humanPlayer)
                nextMark = {
                    row: 0,
                    col: [0, 2][Math.floor(Math.random() * 2)],
                }
            else if(store.getters.board[1][0] == store.getters.humanPlayer)
                nextMark = {
                    row: [0, 2][Math.floor(Math.random() * 2)],
                    col: 0,
                }
            else if(store.getters.board[2][1] == store.getters.humanPlayer)
                nextMark = {
                    row: 2,
                    col: [0, 2][Math.floor(Math.random() * 2)],
                }
            else if(store.getters.board[1][2] == store.getters.humanPlayer)
                nextMark = {
                    row: [0, 2][Math.floor(Math.random() * 2)],
                    col: 2,
                }
            else if(store.getters.board[0][0] == store.getters.humanPlayer)
                nextMark = {
                    row: 2,
                    col: 2,
                }
            else if(store.getters.board[0][2] == store.getters.humanPlayer)
                nextMark = {
                    row: 2,
                    col: 0,
                }
            else if(store.getters.board[2][0] == store.getters.humanPlayer)
                nextMark = {
                    row: 0,
                    col: 2,
                }
            else if(store.getters.board[2][2] == store.getters.humanPlayer)
                nextMark = {
                    row: 0,
                    col: 0,
                }
    
    // Marcar melhor jogada - 2
    if(nextMark == null)
        for (let row = 0; row < 3; row++)
            for (let col = 0; col < 3; col++)
                if(
                    nextMark == null
                    && store.getters.board[row][col] == null
                    && checkIfHasWinnerPath(store.getters.playerPath[store.getters.computerPlayer] * store.getters.boardMap[row][col]) != null
                )
                    nextMark = {
                        row: row,
                        col: col
                    }

    // Marca aleatório
    if(nextMark == null)
        nextMark = computerEasy()

    return nextMark

}

</script>

<style lang="scss" scoped>

.board {

    border-radius: 15px;
    margin: 0 auto 2rem auto;
    overflow: hidden;
    width: $boardSize;

}

.row { display: flex; }

</style>