<template>
  <q-page class="q-pa-lg">
    <q-table
      :rows-per-page-options="[0]"
      :columns="categoryColumns"
      :rows="categories"
      :loading="loading"
    >
      <template v-slot:top-left>
        <div class="text-h6">Categories</div>
      </template>
      <template v-slot:top-right>
        <q-btn
          color="green-8"
          label="ADD"
          no-caps
          @click="showDialog(undefined)"
        />
      </template>

      <template #body-cell-options="props">
        <q-td :props="props">
          <q-btn color="grey" icon="info" flat round />
          <q-btn
            @click="showDialog(props.row)"
            color="grey"
            icon="edit"
            flat
            round
          />
          <q-btn
            @click="showDeleteCategoryDialog(props.row)"
            color="red"
            icon="delete"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>

    <CategoryForm @saved="listCategories" ref="categoryForm" />
    <CategoryDelete @deleted="listCategories" ref="categoryDelete" />
  </q-page>
</template>

<script lang="ts" setup>
import { Category, categoryColumns } from 'src/models/categories'
import { fetchCategories } from 'src/services/categories'
import { onMounted, ref } from 'vue'
import CategoryForm from './CategoryFormDialog.vue'
import CategoryDelete from './DeleteCategoryDialog.vue'

const categoryForm = ref<InstanceType<typeof CategoryForm> | null>(null)
const categoryDelete = ref<InstanceType<typeof CategoryDelete> | null>(null)

const categories = ref<Category[]>([])
const loading = ref(false)

const showDialog = (c: Category | undefined = undefined) => {
  categoryForm.value?.showForm(c)
}

const showDeleteCategoryDialog = (c: Category) => {
  categoryDelete.value?.showDialog(c)
}

const listCategories = () => {
  loading.value = true
  fetchCategories()
    .then((results) => (categories.value = results))
    .finally(() => (loading.value = false))
}

onMounted(listCategories)
</script>
