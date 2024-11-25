<template>
  <van-form ref="formRef">
    <van-cell-group inset>
      <van-field
        name="mobileNo"
        v-model="formInfo.mobileNo"
        placeholder="请输入您的手机号"
        :rules="[{ required: true, message: '请输入您的手机号' }]"
      />
    </van-cell-group>
    <div class="mt-16"></div>
    <van-cell-group inset>
      <van-field
        v-model="formInfo.password"
        placeholder="请您输入密码"
        :type="showPassword ? 'text' : 'password'"
        :rules="[{ required: true, message: '请填写密码' }]"
        @click-right-icon="showPassword = !showPassword"
      >
        <template #right-icon>
          <ShowPwdToggle v-model="showPassword" />
        </template>
      </van-field>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts">
export type TLoginWithPwdFormInfo = {
  mobileNo: string;
  password: string;
};
</script>
<script lang="ts" setup>
import { Form } from 'vant';
import { ref } from 'vue';
import ShowPwdToggle from '@/components/ShowPwdToggle/index.vue';
import { AES_Encrypt } from '@/utils';

const Props = defineProps<{
  formInfo: TLoginWithPwdFormInfo;
}>();

const showPassword = ref(false);

const formRef = ref<InstanceType<typeof Form>>();

defineExpose({
  formRef,
  getFormatValues(): TLoginWithPwdFormInfo {
    return {
      mobileNo: AES_Encrypt(Props.formInfo.mobileNo),
      password: AES_Encrypt(Props.formInfo.password),
    };
  },
});
</script>

<style scoped lang="less">
:deep(.van-cell-group--inset) {
  margin: 0 0;
  border-radius: 56px;
  box-shadow: 0px 2px 4px 0px rgba(36, 13, 3, 0.05);
}

:deep(.van-cell) {
  padding-left: 22px;
}
</style>
