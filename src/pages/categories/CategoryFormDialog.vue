<template>
  <q-dialog v-model="showDialog" persistent transition-show="slide-up" transition-hide="slide-down">
    <q-card style="width: 500px">
      <form @submit="onSubmit">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Save category</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="">
          <p>Please fill the following form.</p>

          <q-input v-model="name" label="Name*" filled :error="!!errors.name || undefined"
            :error-message="errors.name || undefined" />

          <q-input class="q-mt-md" v-model="description" filled autogrow label="Description" />
        </q-card-section>

        <q-card-section class="row justify-end">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn type="submit" unelevated class="q-ml-sm" color="primary" label="Save" />
        </q-card-section>
      </form>

      <q-inner-loading :showing="isSubmitting" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { Category, CategoryForm } from 'src/models/categories'
import { storeCategory, updateCategory } from 'src/services/categories'

const emit = defineEmits(['saved'])

let categoryId: number | undefined = undefined
const schema = {
  name: 'required',
}

const showDialog = ref(false)

const { isSubmitting, errors, resetForm, handleSubmit } = useForm<CategoryForm>(
  { validationSchema: schema }
)

const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')

const onSubmit = handleSubmit(async (values) => {
  // if (categoryId) {
  //   await updateCategory(categoryId, values)
  // } else {
  //   await storeCategory(values)
  // }
  console.log('CALL API', values);
  showDialog.value = false
  emit('saved')
})

const showForm = (c: Category | undefined = undefined) => {
  if (!c) {
    categoryId = undefined
    resetForm()
  } else {
    categoryId = c.id
    name.value = c.name
    description.value = c.description
  }

  showDialog.value = true
}

defineExpose({
  showForm,
})
</script>
