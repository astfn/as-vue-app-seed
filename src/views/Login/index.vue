<template>
  <div class="consumer-login-page">
    <header>
      <div class="logo flexrcc">
        <img src="@/assets/vite.svg" alt="" />
      </div>
      <div class="welcome flexrcc">欢迎登录 xxx系统</div>
    </header>

    <main class="login-form-wrapper">
      <div class="login-method-desc">手机号登录</div>
      <LoginWithPhoneForm ref="LoginWithPhoneFormRef" :form-info="formInfo" />
      <div class="submitBtn">
        <van-button block round type="primary" @click="submitLoginForm" :disabled="loginBtnDisabled"> 登录 </van-button>
      </div>

      <div class="consent-protocol">
        <van-checkbox icon-size="14px" v-model="consentAgreement" />
        <span class="protocol-agree">我已阅读并同意 </span>
        <span class="protocol-info" @click="jumpToProtocol"> 《使用协议》 </span>
        <span class="protocol-info" @click="jumpToPrivacy"> 、《隐私政策》 </span>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutInfoStore } from '@/store/layout-info';
import LoginWithPhoneForm, { TLoginWithPhoneFormInfo } from '@/components/LoginWithPhoneForm/index.vue';
import { useWrapperRef } from '@/hooks';
import { computed, ref } from 'vue';
import { showFailToast } from 'vant';
import { useUserStore } from '@/store/user';
import { authController } from '@/local-cache-data';
import { storeToRefs } from 'pinia';
import { RoutesEnumOptions } from '@/router/routesConfig';

const LayoutInfoStore = useLayoutInfoStore();
const { normalPageHeightCssValue } = storeToRefs(LayoutInfoStore);
const [consentAgreement, _setConsentAgreement] = useWrapperRef(false);

const LoginWithPhoneFormRef = ref<InstanceType<typeof LoginWithPhoneForm>>();

/**
 * 表单
 */
const UserStore = useUserStore();

const formInfo = ref({
  mobileNo: undefined,
  verificationCode: undefined,
} as unknown as TLoginWithPhoneFormInfo);

const loginBtnDisabled = computed(() => {
  return !(formInfo.value.mobileNo && formInfo.value.verificationCode);
});

const userLogin = (_params: any): any => {
  return { data: { token: 'testToken' } };
};

const submitLoginForm = () => {
  if (!consentAgreement.value) {
    return showFailToast('请先阅读并同意协议');
  }
  LoginWithPhoneFormRef.value?.triggerSubmit?.(async (formatedValues) => {
    const { data } = (await userLogin(formatedValues)) ?? {};
    const { token } = data;
    authController.setAutn(token);
    await UserStore.fetchUserBaseInfo();
    const toLoginSuccessUrl = UserStore.loginedJump2Url;
    UserStore.removeLoginedJump2Url();
    if (toLoginSuccessUrl) {
      location.href = toLoginSuccessUrl;
    } else {
      location.pathname = RoutesEnumOptions.Homepage.value.path;
    }
  });
};

/**
 * 协议跳转
 */
const jumpToProtocol = () => {};
const jumpToPrivacy = () => {};
</script>

<style scoped lang="less">
.consumer-login-page {
  padding: 0 25px;
  box-sizing: border-box;
  height: v-bind(normalPageHeightCssValue);
  overflow: hidden;

  background-image: url('@/assets/vue.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;

  header {
    padding-top: 131px;
    .logo {
      width: 100%;
      margin-bottom: 16px;

      img {
        width: 83px;
        height: 82px;
      }
    }
    .welcome {
      font-family: PingFang SC;
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;
      letter-spacing: 0px;
      text-align: center;
      margin-bottom: 39px;
    }
  }

  main.login-form-wrapper {
    .login-method-desc {
      margin-bottom: 10px;
      padding-left: 22px;
      font-family: PingFang SC;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }
    .submitBtn {
      margin-top: 38px;
      color: #e3e3e3;
    }
    .consent-protocol {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFang SC;
      font-size: 12px;
      margin-top: 16px;
      gap: 4px;
      .protocol-info {
        color: #ee5611;
      }
    }
  }
}
</style>
