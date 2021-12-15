import { createStore } from 'vuex'

const getDefaultState = (state) => {
    return {

        players: state != undefined ? state.players : 1,
        difficulty: state != undefined ? state.difficulty : 'normal',
        playerTurn: 'x',
        computerPlayer: state != undefined ? state.computerPlayer : 'o',
        turnCounter: 0,
        gameFinished: false,
        winner: null,
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        boardMap: [
            [2, 3, 5],
            [7, 11, 13],
            [17, 19, 23]
        ],
        winMap: [
            {
                hash: 30,
                cells: [
                    { row: 0, col: 0 },
                    { row: 0, col: 1 },
                    { row: 0, col: 2 }
                ]
            },
            {
                hash: 1001,
                cells: [
                    { row: 1, col: 0 },
                    { row: 1, col: 1 },
                    { row: 1, col: 2 }
                ]
            },
            {
                hash: 7429,
                cells: [
                    { row: 2, col: 0 },
                    { row: 2, col: 1 },
                    { row: 2, col: 2 }
                ]
            },
            {
                hash: 238,
                cells: [
                    { row: 0, col: 0 },
                    { row: 1, col: 0 },
                    { row: 2, col: 0 }
                ]
            },
            {
                hash: 627,
                cells: [
                    { row: 0, col: 1 },
                    { row: 1, col: 1 },
                    { row: 2, col: 1 }
                ]
            },
            {
                hash: 1495,
                cells: [
                    { row: 0, col: 2 },
                    { row: 1, col: 2 },
                    { row: 2, col: 2 }
                ]
            },
            {
                hash: 506,
                cells: [
                    { row: 0, col: 0 },
                    { row: 1, col: 1 },
                    { row: 2, col: 2 }
                ]
            },
            {
                hash: 935,
                cells: [
                    { row: 0, col: 2 },
                    { row: 1, col: 1 },
                    { row: 2, col: 0 }
                ]
            }
        ],
        winLine: [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ],
        playerPath: { 'x': 1, 'o': 1 }

    }

}

const state = getDefaultState()

const getters = {

    players: (state) => state.players,
    difficulty: (state) => state.difficulty,
    playerTurn: (state) => state.playerTurn,
    computerPlayer: (state) => state.computerPlayer,
    humanPlayer: (state) => state.computerPlayer == 'x' ? 'o' : 'x',
    turnCounter: (state) => state.turnCounter,
    gameFinished: (state) => state.gameFinished,
    winner: (state) => state.winner,
    board: (state) => state.board,
    boardMap: (state) => state.boardMap,
    winMap: (state) => state.winMap,
    getWinLine: (state) => state.winLine,
    playerPath: (state) => state.playerPath

}

const mutations = {

    reset: (state) => Object.assign(state, getDefaultState(state)),
    setPlayers: (state, newPlayers) => state.players = newPlayers,
    setDifficulty: (state, newDifficulty) => state.difficulty = newDifficulty,
    setPlayerTurn: (state, newPlayer) => state.playerTurn = newPlayer,
    setComputerPlayer: (state, newPlayer) => state.computerPlayer = newPlayer,
    increaseTurnCounter: (state) => state.turnCounter++,
    finishGame: (state) => state.gameFinished = true,
    setWinner: (state) => state.winner = state.playerTurn,
    markBoardCell: (state, coord) => state.board[coord.row][coord.col] = state.playerTurn,
    markWinLine: (state, coord) => state.winLine[coord.row][coord.col] = true,
    increasePlayerPath: (state, coord) => state.playerPath[state.playerTurn] *= state.boardMap[coord.row][coord.col]
    
}

const actions = {
    
    changeTurn: ({ getters, commit }) => commit('setPlayerTurn', getters.playerTurn == 'x' ? 'o' : 'x'),

    markBoardCell: ({ commit }, coord) => {

        commit('increasePlayerPath', coord)
        commit('markBoardCell', coord)
        commit('increaseTurnCounter')

    },

    finishGame: ({ getters, commit }) => {

        commit('setComputerPlayer', getters.computerPlayer == 'x' ? 'o' : 'x')
        commit('finishGame')

    },

    setWinner: ({ commit }, winLine) => {

        commit('markWinLine', winLine[0])
        commit('markWinLine', winLine[1])
        commit('markWinLine', winLine[2])
        commit('setWinner')

    },

    setPlayers: ({ commit }, newPlayers) => {
        
        commit('setPlayers', newPlayers)
        commit('reset')
        
    },
    
    setDifficulty: ({ commit }, newDifficulty) => {
        
        commit('setDifficulty', newDifficulty)
        commit('reset')

    }
    
}

export default createStore({
    state,
    getters,
    mutations,
    actions
})
