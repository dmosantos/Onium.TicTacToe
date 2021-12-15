<template>
    <Template>

        <Content>

            <Header :title="title" />

            <Board />

            <footer class="footer">
                
                <ButtonGroup>
                
                    <Button v-if="store.getters.gameFinished" @click="resetHandler" icon="arrow-clockwise">Play again</Button>
                    <Button v-else @click="resetHandler" type="secundary" icon="arrow-clockwise">Reset</Button>

                </ButtonGroup>

                <GameControl />

            </footer>

        </Content>

    </Template>
</template>

<script setup>

import Template from '@/templates/DefaultTemplate'
import Content from '@/components/Content'
import Header from '@/components/Header'
import Board from '@/components/Board'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'
import GameControl from '@/components/GameControl'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const title = computed(() => store.getters.gameFinished
    ? store.getters.winner == null ? 'Draw Game!' : `Player "${store.getters.winner.toUpperCase()}" WIN!`
    : `Player "${store.getters.playerTurn.toUpperCase()}" turn`
)

const resetHandler = () => store.commit('reset')

</script>

<style lang="scss" scoped>



.footer {



}

</style>