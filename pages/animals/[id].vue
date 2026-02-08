<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const { animals } = useAnimals()

const animalIdx = computed(() => Number(route.params.id) - 1)
const animal = computed(() => animals.value[animalIdx.value])

const animalDetails = computed(()=>{
    if(!animal.value) return []

    const birthDateObj = new Date(animal.value.birthdate)

    return [
        { label: 'Species', value: animal.value.species },
        { label: 'Gender', value: animal.value.gender },
        { label: 'Birthdate', value: birthDateObj.toLocaleDateString() },
        { label: 'Age', value: `${useCalculateAgeInYears(birthDateObj)} years` },
        { label: 'Weight', value: `${animal.value.weight} kg` },
        { label: 'Height', value: `${animal.value.height} m` },
        { label: 'Favorite Fruit', value: animal.value.favouriteFruit },
    ]
})

const goBack = () => router.push('/')
</script>

<template>
    <div v-if="animal" class="p-4">
      <button @click="goBack" class="mb-4 text-blue-500 hover:underline">&larr; Back to Dashboard</button>

      <div class="border rounded-lg p-6 shadow-lg bg-white max-w-2xl">
        <h1 class="text-3xl font-bold mb-4">{{ animal.name }}</h1>

        <div class="grid grid-cols-2 gap-4">
          <div v-for="(detail, index) in animalDetails" :key="index">
            <span class="font-bold">{{ detail.label }}:</span> {{ detail.value }}
          </div>
        </div>

      </div>
    </div>

    <div v-else class="p-4 text-red-500">
      Animal not found.
    </div>
  </template>
