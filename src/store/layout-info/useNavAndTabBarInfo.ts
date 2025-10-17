import { useWrapperRef } from '@vmono/vhooks';
import { computed } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export function useNavAndTabBarInfo() {
  /**
   * Nav
   */
  const [isShowNav, setIsShowNav] = useWrapperRef<boolean>(true);
  const [navHeight, setNavHeight] = useWrapperRef<number>(0);
  const [isShowNavArrow, setIsShowNavArrow] = useWrapperRef<boolean>(true);

  const navHeightCssValue = computed(() => navHeight.value + 'px');

  const setShowNavByRoute = (route: RouteLocationNormalizedLoaded) => {
    setIsShowNav((route?.meta?.global_nav_show ?? true) as boolean);
  };
  const setShowNavArrowByRoute = (route: RouteLocationNormalizedLoaded) => {
    setIsShowNavArrow((route?.meta?.global_nav_show_arrow ?? true) as boolean);
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
  const normalPageHeightCssValue = computed(
    () => `calc(var(--fullHeight) - ${navHeight.value + tabBarHeight.value}px)`
  );

  return {
    // Nav
    isShowNav,
    navHeight,
    navHeightCssValue,
    isShowNavArrow,
    setNavHeight,
    setShowNavByRoute,
    setShowNavArrowByRoute,
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
