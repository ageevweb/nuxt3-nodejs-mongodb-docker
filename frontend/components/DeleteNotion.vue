<template>
  <div>
    <div @click="isShowConfirmationModal = true">
      <slot />
    </div>

    <el-dialog
      v-model="isShowConfirmationModal"
      title="Удаление заметки"
      width="300"
    >
      <span>
        Вы действительно хотите удалить заметку с именем:
        <el-text class="mx-1">{{ notion.title }}</el-text>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="danger"
            plain
            @click="isShowConfirmationModal = false"
          >
            Отмена
          </el-button>
          <el-button
            type="success"
            plain
            @click="deleteNotion"
          >
            Да, хочу
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { INotion } from '../types/Notion'
import { api } from '../api'

const props = defineProps<{ notion: INotion }>()
const emit = defineEmits(['callback-after-delete'])

const isShowConfirmationModal = ref(false)

const deleteNotion = async () => {
  await api.deleteNotion(props.notion._id as string)

  ElNotification({
    title: 'Успешно!',
    message: 'Заметка успешно удалена!',
  })
  isShowConfirmationModal.value = false
  emit('callback-after-delete')
}
</script>
