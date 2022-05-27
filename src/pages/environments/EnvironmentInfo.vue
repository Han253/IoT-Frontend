<template>
  <q-markup-table flat bordered separator="cell">
    <tbody v-if="environment.id">
      <tr>
        <td>Name</td>
        <td colspan="3">{{ environment.name }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td colspan="3">{{ environment.description }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts" setup>
import { Environment } from 'src/models/environments'

defineProps<{ environment: Environment }>()
</script>
