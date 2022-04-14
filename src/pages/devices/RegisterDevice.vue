<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Register device</div>
            <div class="text-subtitle2">
              Please fill out the following form to register a device, fields
              with * are required.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input filled v-model="text" label="Name*" />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  filled
                  clearable
                  v-model="categoriesSelected"
                  multiple
                  :options="categoriesOptions"
                  label="Categories"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat color="primary">Save device</q-btn>
            <q-btn flat :to="{ name: 'devices.index' }">Cancel</q-btn>
          </q-card-actions>

          <q-inner-loading :showing="busy" color="primary" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { Category } from 'src/models/categories'
import { DeviceForm } from 'src/models/devices'
import { SelectOption } from 'src/models'
import { fetchCategories } from 'src/services/categories'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'

const schema = {
  name: 'required',
}

const { isSubmitting, resetForm, handleSubmit } = useForm<DeviceForm>({
  validationSchema: schema,
})

const busy = ref(true)
const text = ref('')
const categoriesOptions = ref<SelectOption[]>([])
const categoriesSelected = ref([])

const getCategories = () => {
  fetchCategories()
    .then((categories) => {
      categoriesOptions.value = convertCategoriesToOptions(categories)
    })
    .finally(() => (busy.value = false))
}

const convertCategoriesToOptions = (c: Category[]): SelectOption[] => {
  return c.map((category) => ({
    label: category.name,
    value: category.id,
  }))
}

onMounted(getCategories)
</script>
