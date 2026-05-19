import { useWrapperRef } from '@vmono/vhooks';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useNavTitle() {
  const Route = useRoute();

  const titleInRoute = computed(() => (Route?.meta?.title as string) ?? '');

  const [navTitle, setNavTitle] = useWrapperRef<string>('');

  watch(titleInRoute, (newTitle) => {
    setNavTitle(newTitle);
  });

  watch(navTitle, (newTitle) => {
    document.title = newTitle;
  });

  return { navTitle, setNavTitle };
}
