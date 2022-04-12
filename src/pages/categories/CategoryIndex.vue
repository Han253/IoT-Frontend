<template>
  <q-page class="q-pa-lg">
    <q-table :rows-per-page-options="[0]" :rows="categories" :columns="categoryColumns" :loading="loading">
      <template v-slot:top-left>
        <div class="text-h6">Categories</div>
      </template>
      <template v-slot:top-right>
        <q-btn color="green-8" label="ADD" no-caps @click="showDialog(undefined)" />
      </template>

      <template #body-cell-options="props">
        <q-td :props="props">
          <q-btn color="grey" icon="info" flat round />
          <q-btn @click="showDialog(props.row)" color="grey" icon="edit" flat round />
          <q-btn color="red" icon="delete" flat round />
        </q-td>
      </template>
    </q-table>

    <CategoryFormDialog @saved="onCategorySaved" ref="categoryForm" />
  </q-page>
</template>

<script lang="ts" setup>
import { Category, categoryColumns } from 'src/models/categories'
import { fetchCategories, deleteCategory } from 'src/services/categories'
import { onMounted, ref } from 'vue'
import CategoryFormDialog from './CategoryFormDialog.vue'

const categoryForm = ref<InstanceType<typeof CategoryFormDialog> | null>(null)

const categories = ref<Category[]>([])
const loading = ref(false)

const showDialog = (c: Category | undefined = undefined) => {
  categoryForm.value?.showForm(c)
}

const listCategories = () => {
  console.log('CALL API');
  // adds a fake category
  categories.value.push({
    id: 1, name: 'A test category', description: 'A test description here'
  })
}

const onCategorySaved = () => console.log('SAVED')

onMounted(listCategories)
</script>
