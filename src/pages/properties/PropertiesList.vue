<template>
  <q-table
    flat
    dense
    :columns="propertyColumns"
    :rows="properties"
    :hide-bottom="properties && properties.length > 0"
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

  <q-btn
    :to="{ name: 'properties.form', query: { device: $route.params.id } }"
    label="Add property"
    color="primary"
    class="q-mt-md"
  />
</template>

<script lang="ts" setup>
import { Property, propertyColumns } from 'src/models/properties'

defineProps<{ properties: Property[] }>()
</script>
