<template>
  <q-table
    flat
    dense
    :columns="resourceColumns"
    :rows="resources"
    :hide-bottom="resources && resources.length > 0"
  >
    <template #body-cell-device_parent="props">
      <q-td :props="props">
        <router-link
          v-if="props.row.device_parent"
          target="_blank"
          :to="{
            name: 'devices.details',
            params: { id: 3 },
          }"
        >
          Show device
        </router-link>
        <span v-else>{{ 'No device' }}</span>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { Resource, resourceColumns } from 'src/models/resources'

defineProps<{ resources: Resource[] }>()
</script>
