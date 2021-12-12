import { createStore } from 'vuex'

const state = {

    playerTurn: 'x',
    turnCounter: 0,
    gameFinished: false,
    winner: null,
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    winLine: [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]

}

const getters = {

    playerTurn: (state) => state.playerTurn,
    turnCounter: (state) => state.turnCounter,
    gameFinished: (state) => state.gameFinished,
    winner: (state) => state.winner,
    getBoard: (state) => state.board,
    getWinLine: (state) => state.winLine

}

const mutations = {

    reset: (state) => {

        state.playerTurn = 'x'
        state.turnCounter = 0
        state.gameFinished = false
        state.winner = null
        state.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        state.winLine = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ]

    },
    setPlayerTurn: (state, newTurn) => state.playerTurn = newTurn,
    increaseTurnCounter: (state) => state.turnCounter++,
    finishGame: (state) => state.gameFinished = true,
    setWinner: (state) => state.winner = state.playerTurn,
    markBoardCell: (state, coord) => state.board[coord.row][coord.col] = state.playerTurn,
    markWinLine: (state, coord) => state.winLine[coord.row][coord.col] = true
    
}

const actions = {
    
    changeTurn: ({ getters, commit }) => commit('setPlayerTurn', getters.playerTurn == 'x' ? 'o' : 'x'),

    markBoardCell: ({ commit }, coord) => {

        commit('markBoardCell', coord)
        commit('increaseTurnCounter')

    }
    
}

export default createStore({
    state,
    getters,
    mutations,
    actions
})
