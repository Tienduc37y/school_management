<script setup>
import { ref } from 'vue'
import LoadingComponent from '@/components/icons/IconLoading.vue'

const isCurrentLoading = ref(false)

const handleIsLoading = (isLoading) => {
  isCurrentLoading.value = isLoading
}
</script>
<template>
    <div class="h-screen">
        <div v-if="isCurrentLoading" :isLoading="isCurrentLoading" class="fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] !w-max">
            <LoadingComponent/>
        </div>
      <RouterView @setLoading="handleIsLoading" />
    </div>
  </template>
  
  <style lang="scss" scoped></style>
  