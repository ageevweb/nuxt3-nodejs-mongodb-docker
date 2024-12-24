<template>
  <div class="container">
    <CreateNotion
      @callback-after-creation="getNotionList"
    >
      <template #default>
        <el-button type="success" plain>
          <el-icon class="el-icon--right"><Plus /></el-icon>
          Создать новую заметку
        </el-button>
      </template>
    </CreateNotion>

    <div v-if="!notionList.length" class="welcome">
      <img  src="/first.svg">
      <span>Создайте свою первую заметку!</span>
    </div>

    <div class="notion-list">
      <el-card
        v-for="notion in notionList"
        :key="notion._id"
        class="notion-item"
      >
        <template #header>
          <span class="notion-item__title">{{ notion.title }}</span>
        </template>

        <TodoList
          :todo="notion.todo.slice(0, 3)"
          :handle="false"
          empty="Список ToDo пока пуст, но вы можете перейти в заметку и и справить это"
        />

        <el-tooltip
          v-if="notion.todo.length > 3"
          effect="light"
          placement="bottom-start"
        >
          <template #content> Перейдите к заметке, <br/> чтобы увидеть больше пунктов</template>
          <el-icon
            :size="20"
            class="tooltip-more"
          >
            <MoreFilled />
          </el-icon>
        </el-tooltip>

        <template #footer>
          <DeleteNotion
            :notion="notion"
            @callback-after-delete="getNotionList"
          >
            <template #default>
              <el-button type="danger">
                Удалить
                <el-icon class="el-icon--right"><DeleteFilled /></el-icon>
              </el-button>
            </template>
          </DeleteNotion>

          <el-button @click="$router.push(`/notion/${notion._id}`)" type="primary">
            Перейти к заметке
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api'
import type { INotion } from '../types/Notion';
import CreateNotion from '../components/CreateNotion.vue';
import DeleteNotion from '../components/DeleteNotion.vue';
import TodoList from '../components/TodoList.vue';


useHead({ title: 'ToDo | Список заметок' });

const notionList = ref<INotion[]>([])

onMounted(() => getNotionList())

const getNotionList = async () => {
  const res = await api.getNotionList()
  notionList.value = res.notions
}
</script>

<style scoped lang="scss">
.welcome{
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 300px;
    margin: 30px 0;
  }
}
.notion-list{
  margin-top: 50px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  @media (max-width: $tablet){
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: $mobile){
    grid-template-columns: 1fr;
  }
}

.notion-item{
  display: flex;
  flex-direction: column;
  border-radius: var(--el-border-radius-base);
  &__title{ font-size: 20px;  color: #409EFF; }
  :deep(.el-card__body){ flex: 1 }
  :deep(.el-card__footer){
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
}

.tooltip-more{ margin-top: 15px }
</style>
