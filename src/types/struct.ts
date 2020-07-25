import { Ability } from '../assets/json/abilityList'

export type AbilityCount = {
  ability: Ability
  order: number
  count: number
}

export type Pokemon = {
  id: string
  name: string
  abilityCounts: AbilityCount[]
  note: string
}
