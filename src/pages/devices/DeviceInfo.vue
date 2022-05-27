<template>
  <q-markup-table flat bordered separator="cell">
    <thead v-if="title">
      <tr>
        <th colspan="4">{{ title }}</th>
      </tr>
    </thead>
    <tbody v-if="device.id">
      <tr>
        <td>Name</td>
        <td colspan="3">{{ device.name }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td colspan="3">{{ device.description }}</td>
      </tr>
      <tr>
        <td>Is gateway?</td>
        <td colspan="3">
          {{ device.gateway ? 'Yes' : 'No' }}
          <q-btn
            color="primary"
            class="q-ml-md"
            icon="send"
            label="Send representation"
            size="sm"
          />
          <q-btn
            @click="getRepresentation"
            icon="download"
            color="primary"
            class="q-ml-md"
            label="Get representation"
            size="sm"
          />
        </td>
      </tr>
      <tr>
        <td>Categories</td>
        <td colspan="3">
          <ul>
            <li v-for="c in device.categories" :key="c.id">
              {{ c.name + (c.description ? ` | ${c.description}` : '') }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Created at</td>
        <td>{{ device.created_at }}</td>
        <td>Updated at</td>
        <td>{{ device.update_at }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts" setup>
import { Device } from 'src/models/devices'

interface Props {
  device: Device
  title?: string
}

const props = defineProps<Props>()

const getRepresentation = () => {
  const jsonString = JSON.stringify(props.device)
  const url = window.URL.createObjectURL(new Blob([jsonString]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'representation.json')
  document.body.appendChild(link)
  link.click()
  link.remove()
}
</script>
