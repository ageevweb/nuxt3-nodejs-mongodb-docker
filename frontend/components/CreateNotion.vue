<template>
  <div>
    <div style="width: fit-content;" @click="isShowCreateNotionModal = true">
      <slot />
    </div>

    <el-dialog
      v-model="isShowCreateNotionModal"
      title="Создание заметки"
      width="300"
    >
      <el-input
        v-model="form.title"
        placeholder="Введите название заметки"
        maxlength="40"
        show-word-limit
      />

      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="danger"
            plain
            @click="isShowCreateNotionModal = false"
          >
            Отмена
          </el-button>
          <el-button
            type="success"
            plain
            @click="saveNotion"
            :disabled="!form.title.length"
          >
            Сохранить
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive , ref } from 'vue'
import { ElNotification } from 'element-plus'
import { api } from '../api'

const emit = defineEmits(['callback-after-creation'])

const isShowCreateNotionModal = ref(false)

const form = reactive({
  title: '',
})

const saveNotion = async () => {
  const res = await api.createNotion({
    title: form.title,
    todo: [],
  })

  if(res.status === 'success'){
    ElNotification({
      title: 'Успешно!',
      message: res.message,
      type: res.status,
    })
  }
  emit('callback-after-creation')
  form.title = ''
  isShowCreateNotionModal.value = false
}
</script>
