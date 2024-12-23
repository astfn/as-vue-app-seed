<template>
  <div class="show-pwd-toggle" @click="Emitter('update:value', !modelValue)">
    <van-icon v-show="modelValue" name="eye-o" />
    <van-icon v-show="!modelValue" name="closed-eye" />
  </div>
</template>

<script lang="ts" setup>
const Emitter = defineEmits<{
  (_e: 'update:value', _v: boolean): void;
}>();
const modelValue = defineModel({ type: Boolean });
</script>

<style scoped lang="less">
.show-pwd-toggle {
  width: 22px;
  height: 22px;
  img {
    width: 22px;
    height: 22px;
  }
}
</style>
