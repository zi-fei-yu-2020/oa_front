<template>
  <div class="f-header">
    <span class="logo" @click="gotohome">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      OA系统-开发
    </span>
    <el-icon class="icon-btn" @click="handleAsideWidth">
      <fold v-if="asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <!-- 头像 -->
          <el-avatar class="mr-2" :size="25" />
          [{{ authstore.user.department.name }}]{{ authstore.user.realname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destoryOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpwd" label="旧密码">
        <el-input v-model="form.oldpwd" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="pwd1" label="新密码">
        <el-input
          type="password"
          v-model="form.pwd1"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd2" label="确认密码">
        <el-input
          type="password"
          v-model="form.pwd2"
          placeholder="请输入确认密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>




<script setup>
import { reactive, ref } from "vue";
import { toast, showModal } from "@/utils/tips.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "@/components/FormDrawer.vue";
import { asideWidth } from "@/utils/asideWidth";
import { useAuthStore } from "@/stores/auth";
import authHttp from "@/api/authHttp";

const authstore = useAuthStore();
const router = useRouter();
const store = useStore();

const {
  //是否全屏状态
  isFullscreen,
  //切换全屏
  toggle,
} = useFullscreen();

// do not use same name with ref
const form = reactive({
  oldpwd: "",
  pwd1: "",
  pwd2: "",
});

const rules = {
  oldpwd: [
    {
      required: true,
      message: "旧密码不能为空",
      trigger: "blur",
    },
  ],
  pwd1: [
    {
      required: true,
      message: "新密码不能为空",
      trigger: "blur",
    },
  ],
  pwd2: [
    {
      required: true,
      message: "确认密码不能为空",
      trigger: "blur",
    },
  ],
};

const formDrawerRef = ref(null);
const formRef = ref(null);
const onSubmit = () => {
  formRef.value.validate(async (valid, fields) => {
    if (valid) {
      try {
        await authHttp.resetPwd(form.oldpwd, form.pwd1, form.pwd2);
        authstore.clearUserToken();
        router.push("/login");
        toast("密码修改成功,请重新登录");
      } catch (detail) {
        toast(detail);
      }
    } else {
      toast("请按要求填写字段！");
    }
  });
};

const zifeiyu = ref("zifeiyu");

//退出登录
function handleLogout() {
  authstore.clearUserToken();
  router.push({ name: "login" });
}

//刷新
const handleRefresh = () => location.reload();

const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      // drawer.value = true
      formDrawerRef.value.open();
      break;
  }
};

//跳转首页
const gotohome = () => {
  router.push("/");
};

function handleAsideWidth() {
  asideWidth.value = asideWidth.value === "250px" ? "64px" : "250px";
}
</script>

<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>