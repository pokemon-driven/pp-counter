<template>
  <div class="flex h-9">
    <dt class="mr-4 h-9 flex-1">
      <v-suggestions
        ref="suggestions"
        :value="formattedValue"
        :onInputChange="onInputChange"
        :onItemSelected="onItemSelected"
        :options="{}"
        class="h-12 w-full"
      />
      <!-- <input
        type="text"
        :value="`${abilityCount.ability.name} (PP: ${abilityCount.ability.PP} ~ ${~~(abilityCount.ability.PP*1.6)})`"
        class="h-12 p-2 w-full border rounded-sm"
      /> -->
    </dt>
    <dd>
      <input
        type="number"
        readonly
        :value="abilityCount.count"
        style="transform: translateY(-2px);"
        class="w-24 h-12 p-2 border rounded-sm mr-2"
      />
      <button
        type="button"
        @click="updateState(merge({ count: abilityCount.count + 1 }))"
        class="transition-all w-16 h-12 p-2 rounded-sm overflow-hidden bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white font-bold text-xl"
      >
        +
      </button>
      <button
        type="button"
        class="transition-all w-16 h-12 p-2 rounded-sm overflow-hidden bg-red-500 border border-red-500 hover:bg-red-600 text-white font-bold text-xl"
        @click="
          updateState(merge({ count: Math.max(0, abilityCount.count - 1) }))
        "
      >
        -
      </button>
      <button
        type="button"
        style="transform: translateY(-2px);"
        class="w-24 h-12 p-2 rounded-sm overflow-hidden bg-white border border-gray-400 text-gray-700 text-sm hover:bg-gray-100"
        @click="updateState(merge({ count: 0 }))"
      >
        リセット
      </button>
    </dd>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AbilityCount } from '../types/struct'
import { Ability, abilityList } from '../assets/json/abilityList'
import 'v-suggestions/dist/v-suggestions.css'
const Suggestions = require('v-suggestions').default

export default Vue.extend({
  components: {
    'v-suggestions': Suggestions,
  },
  props: {
    abilityCount: Object as PropType<AbilityCount>,
  },
  computed: {
    formattedValue(): string {
      if (this.abilityCount.ability.name.includes('PP')) {
        return this.abilityCount.ability.name
      }
      return this.convertHumanReadableAbilityName(this.abilityCount.ability)
    },
  },
  methods: {
    convertHumanReadableAbilityName(ability: Ability) {
      return `${ability.name} (PP: ${ability.PP} ~ ${~~(ability.PP * 1.6)})`
    },
    onInputChange(value: string) {
      return abilityList
        .filter((ab) => ab.name.includes(value))
        .map((ab) => this.convertHumanReadableAbilityName(ab))
    },
    merge(next: Partial<AbilityCount>) {
      return {
        ...this.abilityCount,
        ...next,
      }
    },
    updateState(abilityCount: AbilityCount) {
      this.$emit('update', abilityCount)
      try {
        ;(this.$refs.suggestions as any).query = abilityCount.ability.name
        const input: HTMLInputElement = this.$el.querySelector('input')!
        input.value = this.convertHumanReadableAbilityName(abilityCount.ability)
      } catch (e) {
        console.log(e)
      }
    },
    onItemSelected(value: string) {
      this.updateState({
        ...this.abilityCount,
        ability: {
          ...this.abilityCount.ability,
          name: value,
        },
      })
    },
  },
})
</script>

<style>
.v-suggestions input {
  @apply p-2;
  @apply border;
  @apply rounded-sm;
  @apply w-full;
}
</style>
