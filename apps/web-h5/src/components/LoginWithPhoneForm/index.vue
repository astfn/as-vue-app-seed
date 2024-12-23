<template>
  <van-form ref="FormRef" @submit="onFinish">
    <van-cell-group inset>
      <van-field
        name="mobileNo"
        v-model="formInfo.mobileNo"
        placeholder="请输入您的手机号"
        :rules="[{ required: true, ...PhoneRule }]"
      >
        <template #button>
          <div
            @click="getVerificationCode"
            :class="['get-code-btn', { 'get-code-btn-disabled': getVerificationCodeBtnDisabled }]"
          >
            <van-loading size="14" v-show="callSendCustomerSmsLoading" />
            <span class="send-txt">
              {{
                showCountDown ? (currentCountDownInfo.total >= time - 1000 ? 60 : currentCountDownInfo?.seconds) : ''
              }}
              发送验证码
            </span>
          </div>
        </template>
      </van-field>
    </van-cell-group>
    <div class="mt-16"></div>
    <van-cell-group inset>
      <van-field
        name="verificationCode"
        v-model="formInfo.verificationCode"
        placeholder="请输入六位短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
        maxlength="6"
      />
    </van-cell-group>
  </van-form>
</template>

<script lang="ts">
export type TLoginWithPhoneFormInfo = {
  mobileNo: string;
  verificationCode: string;
};
</script>
<script lang="ts" setup>
import { useCountDown } from '@vant/use';
import { ref, computed } from 'vue';
import { AES_Encrypt, PhoneRule } from '@/utils';
import { useWrapperRef, useFetch } from '@/hooks';
import { showFailToast } from 'vant';

const Props = defineProps<{
  formInfo: TLoginWithPhoneFormInfo;
}>();

const getFormatValues = (): TLoginWithPhoneFormInfo => {
  return {
    ...(Props?.formInfo ?? {}),
    mobileNo: AES_Encrypt(Props.formInfo.mobileNo),
  };
};

const FormRef = ref();

/**
 * 获取验证码
 */
const time = 61 * 1000;
const countDownController = useCountDown({ time });
const { current: currentCountDownInfo } = countDownController;
const showCountDown = computed(() => currentCountDownInfo.value.total != 0 && currentCountDownInfo.value.total != time);
const getVerificationCodeBtnDisabled = computed(() => {
  return showCountDown.value || !PhoneRule.pattern.test(Props.formInfo.mobileNo);
});

const sendCustomerSms = async () => {};
const { fetchResource: callSendCustomerSms, loading: callSendCustomerSmsLoading } = useFetch<any, any>(sendCustomerSms);
const getVerificationCode = async () => {
  // console.log('getVerificationCode', getVerificationCodeBtnDisabled.value);
  if (getVerificationCodeBtnDisabled.value) return;
  await callSendCustomerSms({ mobileNo: getFormatValues().mobileNo });
  countDownController.reset();
  countDownController.start();
};

type TTriggerSubmitCallBack = (payload: TLoginWithPhoneFormInfo) => any;
const [triggerSubmitCallBack, setTriggerSubmitCallBack] = useWrapperRef<TTriggerSubmitCallBack>(() => {});
const onFinish = () => {
  triggerSubmitCallBack.value?.(getFormatValues());
};

defineExpose({
  FormRef,
  triggerSubmit(triggerSubmitCallBack: TTriggerSubmitCallBack) {
    if (!getVerificationCodeBtnDisabled.value) {
      showFailToast('请获取验证码');
    } else {
      setTriggerSubmitCallBack(triggerSubmitCallBack);
      FormRef.value?.submit?.();
    }
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

.get-code-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--van-primary-color);

  &-disabled {
    .send-txt {
      opacity: 0.5;
    }
  }
}
</style>
