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
        @click="saveNewTodoTitle"
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
        @click="emit('delete-todo', todo._id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Delete, Edit, Check, Close } from '@element-plus/icons-vue';
import type { ITodo } from '../types/Notion'

const props = defineProps<{
  todo: ITodo,
  handle: Boolean,
}>()

const emit = defineEmits([
  'delete-todo',
  'change-staus-todo',
  'change-title-todo',
])

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
