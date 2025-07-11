import { ref } from 'vue';

export function useWrapperRef<T>(defaultValue: T) {
  const state = ref<T>(defaultValue);
  const setState = (newValue: T) => {
    state.value = newValue;
  };
  return [state, setState] as const;
}
