import { ref, UnwrapRef } from 'vue';

export function useWrapperRef<T>(defaultValue: T) {
  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue();
  }
  const state = ref<T>(defaultValue);
  const setState = (newValue: UnwrapRef<T>) => {
    state.value = newValue;
  };
  return [state, setState] as const;
}
