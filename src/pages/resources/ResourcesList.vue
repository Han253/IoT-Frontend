<template>
  <q-btn
    :to="{ name: 'resources.form', query: { device: $route.params.id } }"
    label="Add resource"
    color="primary"
    class="q-mb-md"
    unelevated
  />

  <q-table
    flat
    dense
    :columns="resourceColumns"
    :rows="resources"
    :hide-bottom="resources && resources.length > 0"
  >
    <template #body-cell-options="props">
      <q-td :props="props">
        <q-btn
          icon="info"
          size="sm"
          flat
          round
          color="grey"
          :to="{ name: 'resources.details', params: { id: props.row.id } }"
        />
        <q-btn
          icon="edit"
          size="sm"
          flat
          round
          color="grey"
          :to="{
            name: 'resources.edit',
            params: { id: props.row.id },
            query: { device: props.row.device_parent },
          }"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { Resource, resourceColumns } from 'src/models/resources'

defineProps<{ resources: Resource[] }>()
</script>
