<script setup lang="ts"></script>

<template>
  <div>
    <p v-for="i in 100" :key="i">
      {{ i }}
    </p>
  </div>
</template>
