<template>
  <q-dialog v-model="show" :persistent="erasing">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">
          Are you sure you want to delete the category?
          <ul v-if="category">
            <li>{{ category.name }}</li>
          </ul>
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Delete" color="negative" @click="removeCategory" />
      </q-card-actions>

      <q-inner-loading :showing="erasing" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { Category } from 'src/models/categories'
import { deleteCategory } from 'src/services/categories'
import { ref } from 'vue'

const emit = defineEmits(['deleted'])
const show = ref(false)
const erasing = ref(false)
const category = ref<Category | null>(null)
const $q = useQuasar()

const showDialog = (c: Category) => {
  category.value = c
  show.value = true
}

const removeCategory = () => {
  if (category.value) {
    erasing.value = true
    deleteCategory(category.value.id)
      .then(() => {
        show.value = false
        $q.notify({
          message: `The category "${category.value?.name}" has been removed.`,
          type: 'negative',
        })
        emit('deleted')
      })
      .finally(() => (erasing.value = false))
  }
}

defineExpose({
  showDialog,
})
</script>
