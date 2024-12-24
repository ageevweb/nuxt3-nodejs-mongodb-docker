<template>
  <div class="todo-item">
    <el-checkbox
      v-model="todo.done"
      :disabled="!handle"
    />

    <div
      v-if="editMode.switched"
      class="todo-item__edit-block"
    >
      <el-input
        v-model="editMode.newTitle"
        style="width: 100%; margin-right: 10px;"
        placeholder="Введите новое название"
      />
      <el-button
        type="success"
        :icon="Check"
        circle
        :disabled="!editMode.newTitle.length"
        @click="isShowConfirmationModalEditTodo = true"
      />
      <el-button
        type="warning"
        :icon="Close"
        circle
        @click="cancelEditMode"
      />
    </div>

    <el-text
      v-else
      class="todo-item__title"
      :tag="todo.done ? 'del' : 'p'"
    >{{ todo.title }}</el-text>

    <div
      v-if="handle"
      class="todo-item__handle-block"
    >
      <el-button
        v-if="!editMode.switched"
        type="primary"
        :icon="Edit"
        circle
        @click="startEditMode"
      />

      <el-button
        type="danger"
        :icon="Delete"
        circle
        @click="isShowConfirmationModalDeleteTodo = true"
      />

      <el-dialog v-model="isShowConfirmationModalDeleteTodo" width="300px">
        <ConfirmationModalContent
          text="Действительно хотите удалить этот пункт списка?"
          :data="todo"
          @success="deleteTodo($event)"
          @cancel="isShowConfirmationModalDeleteTodo = false"
        />
      </el-dialog>

      <el-dialog v-model="isShowConfirmationModalEditTodo" width="300px">
        <ConfirmationModalContent
          text="Действительно хотите изменить этот пункт списка?"
          :data="todo"
          @success="saveNewTodoTitle"
          @cancel="isShowConfirmationModalEditTodo = false"
        />
      </el-dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { Delete, Edit, Check, Close } from '@element-plus/icons-vue';
import type { ITodo } from '../types/Notion'
import ConfirmationModalContent from './ConfirmationModalContent'

const props = defineProps<{
  todo: ITodo,
  handle: Boolean,
}>()

const emit = defineEmits([
  'delete-todo',
  'change-staus-todo',
  'change-title-todo',
])

const isShowConfirmationModalDeleteTodo = ref(false)
const isShowConfirmationModalEditTodo = ref(false)

const todo = ref({ ...props.todo }); // Создаем локальную копию объекта

watch(
  () => todo.value.done,
  (newValue) => {
    emit('change-staus-todo', { ...todo.value, done: newValue });
  }
);

const editMode = reactive({
  switched: false,
  newTitle: ''
})

const startEditMode = () => {
  editMode.newTitle = props.todo.title
  editMode.switched = true
}

const cancelEditMode = () => {
  editMode.newTitle = ''
  editMode.switched = false
}

const saveNewTodoTitle = () => {
  emit('change-title-todo', { ...props.todo, title: editMode.newTitle })
  editMode.switched = false
  editMode.newTitle = ''
  isShowConfirmationModalEditTodo.value = false
}

const deleteTodo = (todo) => {
  emit('delete-todo', todo._id)
  isShowConfirmationModalDeleteTodo.value = false
}

</script>

<style scoped lang="scss">
.todo-item{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  &__title{
    width: -webkit-fill-available;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__handle-block{ display: flex; }
  &__edit-block{
    display: flex;
    width: -webkit-fill-available;
  }
}
</style>
