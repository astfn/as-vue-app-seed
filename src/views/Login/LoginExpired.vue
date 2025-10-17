<template>
  <div class="login-expired-page">
    <main>
      <img :src="AuthWxpiresImg" />
      <span>登录过期，请<span class="relogin-btn" @click="relogin">重新登录</span></span>
    </main>
  </div>
</template>

<script lang="ts" setup>
import AuthWxpiresImg from '@/assets/login-module/auth_expires.png';
import { toLoginPageCommonLogic } from '@/router';

const relogin = () => {
  toLoginPageCommonLogic();
};
</script>

<style scoped lang="less">
.need-auth-page-wrapper {
  padding: var(--page-normal-padding);
  height: 100%;
}

main {
  padding-top: 170px;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #333333;

  img {
    width: 161px;
    height: 140px;
  }
  .relogin-btn {
    cursor: pointer;
    margin-left: 1px;
    color: var(--van-primary-color);
    text-decoration: underline;
  }
}
</style>
