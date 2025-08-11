import { useElementSize } from '@vueuse/core';
import { useLayoutInfoStore } from '.';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

// export type TUseCollectLayOutInfoNormalLogicPayload = {}
export function useCollectLayOutInfoNormalLogic() {
  const LayoutInfoStore = useLayoutInfoStore();

  const Route = useRoute();

  watch(
    Route,
    () => {
      LayoutInfoStore.setShowNavByRoute(Route);
      LayoutInfoStore.setShowTabBarByRoute(Route);
      LayoutInfoStore.setShowNavArrowByRoute(Route);
    },
    { immediate: true }
  );

  const NavStickyRef = ref();
  const { height: navStickyHeight } = useElementSize(NavStickyRef);
  watch(navStickyHeight, LayoutInfoStore.setNavHeight);

  const TabBarRef = ref();
  const { height: tabBarHeight } = useElementSize(TabBarRef);
  watch(tabBarHeight, LayoutInfoStore.setTabBarHeight);

  return { NavStickyRef, TabBarRef };
}
