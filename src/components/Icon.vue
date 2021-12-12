<template>
    <svg class="icon">
        <use :xlink:href="`${require('@/assets/icons.svg')}#${$props.symbol}`" />
    </svg>
</template>

<script setup>

import { defineProps } from 'vue'

defineProps({

    symbol: String

})

</script>

<style lang="scss" scoped>

.icon {

    display: inline-block;
    fill: var(--color-2);
    height: 1em;
    transition: all .1s linear;
    vertical-align: top;
    width: 1em;

}

</style>