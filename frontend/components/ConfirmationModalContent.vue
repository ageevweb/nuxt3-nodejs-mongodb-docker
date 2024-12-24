<template>
  <div class="dialog-content">
    <div class="dialog-content__title">{{ text }}</div>
    <div class="dialog-content__handle">
      <el-button
        type="danger"
        plain
        @click="emit('cancel')"
      >
        Отмена
      </el-button>
      <el-button
        type="success"
        plain
        @click="emit('success', data)"
      >
        Да
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: String, data: Object }>()

const emit = defineEmits(['success', 'cancel'])
</script>


<style scoped lang="scss">
.dialog-content{
  &__title{
    font-size: 20px;
    margin-bottom: 20px;
  }
  &__handle{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>

