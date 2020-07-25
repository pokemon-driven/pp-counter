<template>
  <ul class="border-gray-400 border-b w-full rounded overflow-hidden">
    <PokemonListItem
      v-for="pokemon in pokemonList"
      :name="pokemon.name"
      :active="pokemon.id === activePokemonId"
      @click="$emit('switch', pokemon.id)"
      class="rounded-t overflow-hidden"
    />
    <PokemonListItem
      class="rounded-b overflow-hidden"
      name="+ 新規追加"
      :active="false"
      @click="$emit('new')"
    />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Pokemon } from '../types/struct'

export default Vue.extend({
  props: {
    activePokemonId: String,
    pokemonList: Array as () => Pokemon[],
  },
})
</script>
