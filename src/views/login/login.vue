<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="welcome-left">欢迎光临</div>
        <div class="site-name">OA系统-开发</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="welcome-right">欢迎回来</h2>
      <div class="login-form">
        <span class="right-left-span"></span>
        <span>账号密码登录</span>
        <span class="right-left-span"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup name="login">
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import authHttp from "@/api/authHttp";
import { ElMessage } from "element-plus";

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const onSubmit = async () => {
  try {
    let data = await authHttp.login(form.username, form.password);
    console.log("data:", data);
    let token = data.token;
    let user = data.user;
    authStore.setUserToken(user, token);
    // 跳转到OA系统的首页
    router.push("/");
  } catch (detail) {
    // alert(detail)
    ElMessage.error(detail);
  }
};
</script>

<style scoped>
.login-container {
  @apply min-h-screen;
}

.left {
  @apply bg-indigo-500 flex items-center justify-center;
}

.right {
  @apply bg-light-50 flex items-center justify-center flex-col;
}

.right-left-span {
  @apply h-[1px] w-16 bg-gray-200;
}

.welcome-right {
  @apply font-bold text-3xl text-gray-800;
}

.welcome-left {
  @apply font-bold text-3xl text-light-50 mb-4;
}

.login-form {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.site-name {
  @apply font-bold text-gray-200 text-6xl;
}
</style>