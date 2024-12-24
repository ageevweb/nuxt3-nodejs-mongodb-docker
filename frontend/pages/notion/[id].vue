<template>
  <div class="container">

    <header>
      <el-button
        type="success"
        plain
        @click="$router.push('/')"
      >
        <el-icon class="el-icon--right"><Back /></el-icon>
        Вернуться к заметкам
      </el-button>

      <DeleteNotion
        v-if="notion"
        :notion="notion"
        @callback-after-delete="router.push('/')"
      >
        <template #default>
          <el-button type="danger">
            Удалить
            <el-icon class="el-icon--right"><DeleteFilled /></el-icon>
          </el-button>
        </template>
      </DeleteNotion>
    </header>

    <div v-if="notion" class="notion">
      <div class="notion__title">{{ notion.title }}</div>

      <TodoList
        :todo="notion.todo || []"
        :handle="true"
        empty="Список ToDo пока пуст"
        @return-updated-todo-list="updatedTodoList($event)"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import { api } from '../../api'
import type { INotion, ITodo } from '../../types/Notion';

useHead({ title: 'ToDo | Заметка' });

onMounted(() => getNotion())

const route = useRoute()
const router = useRouter()

const notion = ref<INotion | null>(null);

const getNotion = async () => {
  const res = await api.getNotionOne(route.params.id as string)

  if (res.status === "success"){ notion.value = res.notion }
  else { router.push('/') }
}


const updatedTodoList = (todo: ITodo[]) => {
  updateNotion({ title: notion.value?.title || 'Заголовок', todo })
}

const updateNotion = async(notion: INotion) => {
  const res = await api.updateNotion(route.params.id as string, notion)

  if(res.status === 'success'){
    ElNotification({ title: 'Успешно!', message: res.message, type: res.status })
    getNotion()
  }
}
</script>

<style scoped lang="scss">
header{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.notion{
  &__title{
    font-size: 40px;
    width: fit-content;
    margin: 50px auto;
    color: #409EFF;
  }
}
</style>
