import { useWrapperRef } from '@/hooks';
import { computed } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export function useNavAndTabBarInfo() {
  /**
   * Nav
   */
  const [isShowNav, setIsShowNav] = useWrapperRef<boolean>(true);
  const [navHeight, setNavHeight] = useWrapperRef<number>(0);

  const navHeightCssValue = computed(() => navHeight.value + 'px');

  const setShowNavByRoute = (route: RouteLocationNormalizedLoaded) => {
    setIsShowNav((route?.meta?.global_nav_show ?? true) as boolean);
  };
  /**
   * TabBar
   */
  const [isShowTabBar, setIsShowTabBar] = useWrapperRef<boolean>(true);
  const [tabBarHeight, setTabBarHeight] = useWrapperRef<number>(0);

  const tabBarHeightCssValue = computed(() => tabBarHeight.value + 'px');

  const setShowTabBarByRoute = (route: RouteLocationNormalizedLoaded) => {
    setIsShowTabBar((route?.meta?.global_tabbar_show ?? true) as boolean);
  };

  /**
   * common
   */
  const navAndTabBarTotalHeight = computed(() => navHeight.value + tabBarHeight.value);
  const normalPageHeightCssValue = computed(() => `calc(100vh - ${navHeight.value + tabBarHeight.value}px)`);

  return {
    // Nav
    isShowNav,
    navHeight,
    setNavHeight,
    navHeightCssValue,
    setShowNavByRoute,
    // TabBar
    isShowTabBar,
    tabBarHeight,
    tabBarHeightCssValue,
    setTabBarHeight,
    setShowTabBarByRoute,
    // common
    navAndTabBarTotalHeight,
    normalPageHeightCssValue,
  };
}
