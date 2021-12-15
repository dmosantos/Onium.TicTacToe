<template>
    <div class="game-control">

        <div class="radio">
            
            <label class="radio__label" for="players_1">Players:</label>
                
            <input class="radio__option" id="players_1" name="players" type="radio" v-model="players" value="1" />
            <label class="radio__option-label" for="players_1">1</label>
            
            <input class="radio__option" id="players_2" name="players" type="radio" v-model="players" value="2" />
            <label class="radio__option-label" for="players_2">2</label>

        </div>

        <div v-if="players == 1" class="drop-down">
            
            <label class="drop-down__label" for="difficulty">Difficulty:</label>
            
            <select
                class="drop-down__select"
                id="difficulty"
                v-model="difficulty"
            >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </select>

        </div>

    </div>
</template>

<script setup>

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const difficulty = computed({
    get: () => store.getters.difficulty,
    set: (value) => store.dispatch('setDifficulty', value)
})

const players = computed({
    get: () => store.getters.players,
    set: (value) => store.dispatch('setPlayers', value)
})

</script>

<style lang="scss" scoped>

.game-control {

    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.radio {
    
    align-items: center;
    display: flex;

    &__option { margin: 0 .2rem 0 .8rem; }

}

.drop-down {

    &__select { margin-left: .8rem; }

}

</style>