<template>
  <div>
    <div @click="isShowConfirmationModalDeleteNotion = true">
      <slot />
    </div>


    <el-dialog v-model="isShowConfirmationModalDeleteNotion" width="300px">
      <ConfirmationModalContent
        text="Действительно хотите удалить заметку?"
        :data="notion"
        @success="deleteNotion($event)"
        @cancel="isShowConfirmationModalDeleteNotion = false"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { api } from '../api'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { INotion } from '../types/Notion'

const props = defineProps<{ notion: INotion }>()
const emit = defineEmits(['callback-after-delete'])

const isShowConfirmationModalDeleteNotion = ref(false)

const deleteNotion = async (notion:INotion) => {

  await api.deleteNotion(notion._id)

  ElNotification({
    title: 'Успешно!',
    message: 'Заметка успешно удалена!',
    type: 'success'
  })
  isShowConfirmationModalDeleteNotion.value = false
  emit('callback-after-delete')
}
</script>
