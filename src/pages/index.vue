<template>
  <div class="container max-w-screen-lg mx-auto">
    <div>
      <TheHeader />
      <main class="py-4 px-6 flex">
        <div style="width: 240px;">
          <ThePokemonList
            :pokemonList="state.pokemonList"
            :activePokemonId="state.activePokemonId"
            @switch="state.activePokemonId = $event"
            @new="createNewPokemon"
          />
        </div>
        <div class="w-4 h-1"></div>
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-4 flex justify-between items-center">
            <div class="inline-flex items-center">
              <input
                type="text"
                class="w-32 h-10 border-b border-gray-400 text-sm font-bold outline-none"
                @input="
                  updatePokemonData({
                    ...activePokemon,
                    name: $event.target.value || '',
                  })
                "
                :value="activePokemon.name"
              />
              <div
                class="h-10 border-b border-gray-400 inline-flex items-center justify-center"
              >
                <img src="~/assets/images/edit.svg" width="12" alt="" />
              </div>
            </div>
          </h2>
          <div class="w-full rounded overflow-hidden">
            <AppHeading class="pt-4">
              <span>わざの使用回数</span>
            </AppHeading>
            <dl class="w-full">
              <AbilityCounter
                v-for="abilityCount in abilityCounts"
                :abilityCount="abilityCount"
                :key="abilityCount.order"
                class="mb-4"
                @update="updateAbilityCount"
              />
            </dl>
            <AppHeading class="pt-4">
              <span>メモ</span>
            </AppHeading>
            <textarea
              cols="30"
              rows="10"
              class="w-full h-64 border leading-relaxed p-4"
              :value="activePokemon.note"
              @input="
                updatePokemonData({
                  ...activePokemon,
                  note: $event.target.value || '',
                })
              "
            ></textarea>
          </div>
          <div class="flex justify-end mt-2">
            <button
              type="button"
              class="px-2 appearance-none text-red-500"
              @click="deletePokemon"
            >
              <img src="~/assets/images/trash.svg" width="16" alt="削除" />
            </button>
          </div>
        </div>
      </main>
    </div>
    <footer class="text-center pt-16 text-sm">
      &copy; 2020 pokedri.com by @potato4d
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Pokemon, AbilityCount } from '~/types/struct'
import { abilityList } from '../assets/json/abilityList'
import { v4 as uuid } from 'uuid'

type LocalData = {
  isLaunched: boolean
  state: {
    activePokemonId: string
    pokemonList: Pokemon[]
  }
}

export default Vue.extend({
  data(): LocalData {
    return {
      isLaunched: false,
      state: {
        activePokemonId: '1',
        pokemonList: [
          {
            id: '1',
            name: 'エアームド',
            note: '',
            abilityCounts: [
              {
                ability: abilityList.find((ab) => ab.name === 'ちょうはつ')!,
                order: 1,
                count: 0,
              },
              {
                ability: abilityList.find((ab) => ab.name === 'はねやすめ')!,
                order: 2,
                count: 0,
              },
              {
                ability: abilityList.find(
                  (ab) => ab.name === 'ドリルくちばし'
                )!,
                order: 3,
                count: 0,
              },
              {
                ability: abilityList.find((ab) => ab.name === 'ふきとばし')!,
                order: 4,
                count: 0,
              },
            ],
          },
          {
            id: '2',
            name: 'ラッキー',
            note: '',
            abilityCounts: [
              {
                ability: abilityList.find((ab) => ab.name === 'タマゴうみ')!,
                order: 1,
                count: 0,
              },
              {
                ability: abilityList.find((ab) => ab.name === 'ちきゅうなげ')!,
                order: 2,
                count: 0,
              },
              {
                ability: abilityList.find((ab) => ab.name === 'でんじは')!,
                order: 3,
                count: 0,
              },
              {
                ability: abilityList.find((ab) => ab.name === 'めいそう')!,
                order: 4,
                count: 0,
              },
            ],
          },
        ],
      },
    }
  },
  mounted() {
    if (localStorage.getItem('auto_save')) {
      this.state = JSON.parse(localStorage.getItem('auto_save')!)
      this.isLaunched = true
    }
  },
  watch: {
    state: {
      deep: true,
      handler() {
        this.save()
      },
    },
  },
  computed: {
    abilityCounts(): AbilityCount[] {
      return this.activePokemon.abilityCounts.sort((a, b) =>
        a.order > b.order ? 1 : -1
      )
    },
    activePokemon(): Pokemon {
      return this.state.pokemonList.find(
        (v) => v.id === this.state.activePokemonId
      )!
    },
  },
  methods: {
    createNewPokemon() {
      const id = uuid()
      this.state.pokemonList.push({
        id,
        name: '？？？',
        note: '',
        abilityCounts: [
          {
            ability: abilityList.find((ab) => ab.name === 'たいあたり')!,
            order: 1,
            count: 0,
          },
          {
            ability: abilityList.find((ab) => ab.name === 'たいあたり')!,
            order: 2,
            count: 0,
          },
          {
            ability: abilityList.find((ab) => ab.name === 'たいあたり')!,
            order: 3,
            count: 0,
          },
          {
            ability: abilityList.find((ab) => ab.name === 'たいあたり')!,
            order: 4,
            count: 0,
          },
        ],
      })
      this.state.activePokemonId = id
    },
    updateAbilityCount(mergeValue: Partial<AbilityCount>) {
      const abilityCounts = this.activePokemon.abilityCounts.map(
        (abilityCount) => {
          if (abilityCount.order !== mergeValue.order) {
            return abilityCount
          }
          return {
            ...abilityCount,
            ...mergeValue,
          }
        }
      )
      this.updatePokemonData({
        id: this.state.activePokemonId,
        abilityCounts,
      })
    },
    updatePokemonData(mergeValue: Partial<Pokemon>) {
      this.state.pokemonList = this.state.pokemonList.map((pokemon) => {
        if (pokemon.id !== mergeValue.id) {
          return pokemon
        }
        return {
          ...pokemon,
          ...mergeValue,
        }
      })
    },
    save() {
      localStorage.setItem('auto_save', JSON.stringify(this.state))
    },
    deletePokemon() {
      const id = this.activePokemon.id
      if (
        window.confirm(`${this.activePokemon.name} のデータを削除しますか？`)
      ) {
        this.state.activePokemonId = this.state.pokemonList[0].id
        this.state.pokemonList = this.state.pokemonList.filter(
          (p) => p.id !== id
        )
      }
    },
  },
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 3px;
  border: 1px solid #4a5568;
  color: #4a5568;
  text-decoration: none;
  padding: 5px 10px;
}

.button--grey:hover {
  color: #fff;
  background-color: #4a5568;
}
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

html,
body,
#__nuxt,
#__layout,
#__content {
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
