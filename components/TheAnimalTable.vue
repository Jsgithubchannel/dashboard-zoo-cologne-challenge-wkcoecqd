<script lang="ts" setup>
import { computed } from 'vue'
import type { Animal } from '~/types'

const props = defineProps<{
  animals: Animal[]
}>()

const animalsSortedByName = computed(() =>
  props.animals.slice().sort((animalA, animalB) =>
    animalA.name.localeCompare(animalB.name),
  ),
)

// to find the original index of an animal in the array.
const getOriginalIdx = (animal: Animal) => {
  return props.animals.indexOf(animal) + 1
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Index</th>
        <th>Species</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Age (yrs)</th>
        <th>Weight (kg)</th>
        <th>Food (kg/month)</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(animal, i) in animalsSortedByName" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ animal.species }}</td>
        <td>
          <NuxtLink :to="`/animals/${getOriginalIdx(animal)}`" class="text-blue-600 hover:underline">
            {{ animal.name }}
          </NuxtLink>
        </td>
        <td>{{ animal.gender }}</td>
        <td>{{ useCalculateAgeInYears(new Date(animal.birthdate)) }}</td>
        <td>{{ animal.weight }}</td>
        <td>{{ useCalculateFoodRequired(animal) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  @apply table-auto w-full text-left
}
td {
  @apply w-40
}
tr {
  @apply border-b-2
}
tbody tr {
  @apply hover:bg-gray-200
}
</style>
