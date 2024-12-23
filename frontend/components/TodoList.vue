<template>
  <div class="todo-list">
    <div
      v-if="handle"
      class="todo-list__add-one"
    >
      <el-input
        v-model="formCreateNew.input"
        style="width: -webkit-fill-available;"
        placeholder="Добавьте название новой ToDo"
        maxlength="100"
        show-word-limit
      />
      <el-button
        type="primary"
        :disabled="!formCreateNew.input.length"
        @click="createNewTodo"
      >
        Создать ToDO
      </el-button>
    </div>

    <el-empty
      v-if="!todo.length"
      :description="empty"
      :image-size="100"
    />

    <TodoItem
      v-for="item in sortedTodoByDone"
      :key="item._id"
      :todo="item"
      :handle="handle"
      @delete-todo="deleteTodo($event)"
      @change-staus-todo="changeStausTodo($event)"
      @change-title-todo="changeTitleTodo($event)"
    />

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { ITodo } from '../types/Notion'
import TodoItem from './TodoItem.vue';

const props = defineProps<{
  todo: ITodo[],
  handle: Boolean,
  empty: String,
}>()

const sortedTodoByDone = computed(()=> {
  return props.todo.sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  })
})

const emit = defineEmits(['return-updated-todo-list'])

const formCreateNew = reactive({
  input: ''
})

const deleteTodo = (_id: string) => {
  emit('return-updated-todo-list', props.todo.filter(item => item._id !== _id))
}

const changeStausTodo = (todo: ITodo) => {
  emit('return-updated-todo-list', props.todo)
}

const createNewTodo = () => {
  emit('return-updated-todo-list', [...props.todo, { title: formCreateNew.input, done: false }])
  formCreateNew.input = ''
}

const changeTitleTodo = (todo: ITodo) => {
  emit('return-updated-todo-list', [...props.todo.filter(item => item._id !== todo._id), todo])
}
</script>

<style scoped lang="scss">
.todo-list{
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__add-one{
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
}
.todo-item{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  &__title{
    width: -webkit-fill-available;
  }
}

:deep(.el-empty){
  padding: 0;
}
</style>
