<template>
  <q-btn
    :to="{ name: 'properties.form', query: { device: $route.params.id } }"
    label="Add property"
    color="primary"
    class="q-mb-md"
    unelevated
  />

  <q-table
    flat
    dense
    :columns="propertyColumns"
    :rows="properties"
    :hide-bottom="properties && properties.length > 0"
  >
    <template #body-cell-options="props">
      <q-td :props="props">
        <q-btn
          :to="{
            name: 'properties.edit',
            params: { id: props.row.id },
            query: { device: $route.params.id },
          }"
          color="grey"
          icon="edit"
          flat
          round
          size="sm"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { Property, propertyColumns } from 'src/models/properties'

defineProps<{ properties: Property[] }>()
</script>
