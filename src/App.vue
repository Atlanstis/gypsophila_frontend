<script setup lang="ts">
// Removed HelloWorld import as we're now using router
</script>

<template>
  <div class="min-h-100vh bg-gray-100 dark:bg-gray-800">
    <!-- 导航栏 -->
    <nav class="bg-white dark:bg-gray-900 shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold text-gray-800 dark:text-white">Vue 应用</div>
        <div class="flex space-x-4">
          <router-link
            to="/"
            class="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >首页</router-link
          >
          <router-link
            to="/about"
            class="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >关于</router-link
          >
        </div>
      </div>
    </nav>

    <!-- 路由出口 -->
    <main class="container mx-auto py-6">
      <router-view></router-view>
    </main>
  </div>
</template>
