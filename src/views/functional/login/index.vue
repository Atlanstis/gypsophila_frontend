<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Loader2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { computed } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useAuthStore } from '@/store';

defineOptions({
  name: 'Login',
});

const formSchema = z.object({
  username: z
    .string({
      required_error: '请输入用户名',
    })
    .min(1, '用户名不能为空')
    .nonempty('用户名字段不能为空'),
  password: z
    .string({
      required_error: '请输入密码',
    })
    .min(6, '密码长度至少为6个字符')
    .nonempty('密码字段不能为空'),
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    username: 'admin',
    password: '2wsxVFR_',
  },
});

const authStore = useAuthStore();

const onSubmit = handleSubmit(value => {
  authStore.loginByUsername(value.username, value.password);
});

/** 是否登录中 */
const inLogin = computed(() => authStore.loginLoading);
</script>

<template>
  <div class="flex h-full items-center">
    <Card class="animate-fade-in-up mx-auto w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> 登录 </CardTitle>
        <CardDescription> 请输入您的用户名和密码 </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    :disabled="inLogin"
                    placeholder="请输入用户名"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    :disabled="inLogin"
                    type="password"
                    placeholder="请输入密码"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full" :disabled="inLogin">
              <Loader2 v-if="inLogin" class="mr-2 h-4 w-4 animate-spin" />
              登录
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style lang="css" scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
