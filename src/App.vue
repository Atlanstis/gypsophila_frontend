<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-100vh p-4 bg-gray-100 dark:bg-gray-800"
  >
    <div class="flex gap-4 mb-4">
      <a href="https://vite.dev" target="_blank">
        <img
          src="/vite.svg"
          alt="Vite logo"
          class="w-16 h-16 transition duration-300 hover:scale-110"
          hover="drop-shadow-lg"
        />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img
          src="./assets/vue.svg"
          alt="Vue logo"
          class="w-16 h-16 transition duration-300 hover:scale-110"
          hover="drop-shadow-lg"
        />
      </a>
    </div>

    <!-- 测试按钮 Wind3 预设 -->
    <div class="mb-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Wind3 按钮
      </button>
    </div>

    <!-- 测试按钮 Attributify 预设 -->
    <div class="mb-4">
      <button bg="blue-500 hover:blue-700" text="white" font="bold" p="y-2 x-4" rounded>
        Attributify 按钮
      </button>
    </div>

    <HelloWorld msg="Vite + Vue + UnoCSS" />
  </div>
</template>
