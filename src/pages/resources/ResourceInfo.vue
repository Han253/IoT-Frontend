<template>
  <q-markup-table flat bordered separator="cell">
    <thead>
      <tr>
        <th colspan="4">Resource details</th>
      </tr>
    </thead>
    <tbody v-if="resource.id">
      <tr>
        <td>Name</td>
        <td colspan="3">{{ resource.name }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td colspan="3">{{ resource.description }}</td>
      </tr>
      <tr>
        <td>Resource type</td>
        <td colspan="3">{{ resource.type }}</td>
      </tr>
      <tr>
        <td>Device parent</td>
        <td colspan="3">
          <q-banner v-if="!resource.device_parent" class="bg-grey-3 q-mt-md">
            <template v-slot:avatar>
              <q-icon name="info" color="grey" />
            </template>
            This resource doesn't have a device parent.
          </q-banner>
          <p class="q-mt-md" v-else>
            <router-link
              :to="{
                name: 'devices.details',
                params: { id: resource.device_parent },
              }"
              >Show device parent</router-link
            >
          </p>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts" setup>
import { Resource } from 'src/models/resources'

defineProps<{ resource: Resource }>()
</script>
