<template>
  <h1 v-if="error">{{ error }}</h1>
  <router-view v-else />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { setInterceptors } from './boot/axios'

const error = ref<number | null>(null)

onMounted(() =>
  setInterceptors((httpStatus: number) => (error.value = httpStatus))
)
</script>
