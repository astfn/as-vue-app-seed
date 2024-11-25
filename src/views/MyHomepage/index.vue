<template>
  <div class="filter-info-list-wrapper">
    <van-tabs v-model:active="activeTab" @change="changeTabLogic">
      <van-tab
        v-for="tabInfo in fetchTabOptionsData?.list"
        :key="tabInfo?.id"
        :title="tabInfo?.typeName"
        :name="tabInfo?.id"
      />
    </van-tabs>
    <!-- <p>{{ searchInfo }}</p>
    <p>{{ showListTotalPages }}</p>
    <p>{{ showList }}</p> -->
    <van-list
      v-if="!isNullOrUndefined(activeTab)"
      v-model:loading="showListLoading"
      :finished="fetchListFinished"
      @load="fetchListOnLoad"
      finished-text="没有更多了"
    >
      <div class="show-list-wrapper">
        <InfoListItemCard v-for="info in showList" :key="info?.id" :info="info" @click="jumpDetailPage(info)" />
      </div>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useFetch, useWrapperRef } from '@/hooks';
import InfoListItemCard from './InfoListItemCard.vue';
import { isNullOrUndefined } from '@/utils/index';
import { useRouter } from 'vue-router';
import { useLayoutInfoStore } from '@/store';
import { storeToRefs } from 'pinia';
const Router = useRouter();

/**
 * Tab 数据源
 */
const [activeTab, setActiveTab] = useWrapperRef<string | undefined>(undefined);
const { resData: fetchTabOptionsData, loading: _fetchTabOptionsLoading } = useFetch<any, any>(
  () => {
    return {
      data: {
        list: [
          {
            id: '1851894279521132546',
            typeName: '保健',
          },
          {
            id: '1851864170685612034',
            typeName: '金融',
          },
          {
            id: '1851919382085046274',
            typeName: 'AshunTest',
          },
          {
            id: '1851917823422959618',
            typeName: '类别22',
          },
          {
            id: '18519193820850462741',
            typeName: 'AshunTest1',
          },
          {
            id: '18519178234229596181',
            typeName: '类别221',
          },
          {
            id: '18519193820850462742',
            typeName: 'AshunTest2',
          },
          {
            id: '18519178234229596182',
            typeName: '类别222',
          },
          {
            id: '18519193820850462743',
            typeName: 'AshunTest3',
          },
          {
            id: '18519178234229596183',
            typeName: '类别223',
          },
          {
            id: '18519193820850462744',
            typeName: 'AshunTest4',
          },
          {
            id: '18519178234229596184',
            typeName: '类别224',
          },
          {
            id: '18519193820850462745',
            typeName: 'AshunTest5',
          },
          {
            id: '18519178234229596185',
            typeName: '类别22',
          },
        ],
      },
    };
  },
  { immediate: true }
);

/**
 * 搜索逻辑
 */
type TQueryInfoListParams = any;
const getInitalSearchInfo = (preset?: Partial<TQueryInfoListParams>): TQueryInfoListParams => {
  return {
    state: preset?.state,
    page: preset?.page ?? 1,
    limit: 10,
  };
};
const [searchInfo, setSearchInfo] = useWrapperRef<TQueryInfoListParams>(getInitalSearchInfo({ page: 0 }));
const [showList, setShowList] = useWrapperRef<any[]>([]);
const [showListLoading, setShowListLoading] = useWrapperRef(false);

const [fetchListFinished, setFetchListFinished] = useWrapperRef(false);
const [showListTotalPages, setShowListTotalPages] = useWrapperRef(100);

const fetchList = async () => {
  // todo: 接口掉用 传入 searchInfo
  const { data = [], total = 0 } = ((await Promise.resolve({
    data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    total: 2,
  })) ?? {}) as any;
  setShowList([...showList.value, ...data]);
  setShowListLoading(false);
  setShowListTotalPages(Math.ceil(Number(total) / searchInfo.value.limit));
  setFetchListFinished(showList.value?.length >= total);
};

const fetchListOnLoad = async () => {
  searchInfo.value.page = searchInfo.value.page + 1;
  if (searchInfo.value.page >= showListTotalPages.value) {
    setShowListLoading(false);
    setFetchListFinished(true);
    return;
  }
  await fetchList();
};

const changeTabLogic = async (activeTabKey: string) => {
  setActiveTab(activeTabKey);
  setShowList([]);
  setSearchInfo({ ...getInitalSearchInfo(), type: activeTabKey });
  await fetchList();
};

watch(fetchTabOptionsData, (data) => {
  const options = data?.list ?? [];
  changeTabLogic(options?.[0]?.id);
});

/**
 * 详情页跳转
 */
const jumpDetailPage = (info) => {
  Router.push({
    path: '/infoDetail',
    query: { id: info?.id },
  });
};

const LayoutInfoStore = useLayoutInfoStore();
const { normalPageHeightCssValue } = storeToRefs(LayoutInfoStore);
</script>

<style scoped lang="less">
.filter-info-list-wrapper {
  height: v-bind(normalPageHeightCssValue);
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  gap: var(--page-normal-padding);
  padding: var(--page-normal-padding);

  .van-list {
    overflow: scroll;
  }

  .show-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  :deep(.van-tabs) {
    border-bottom: 1px solid rgba(153, 153, 153, 0.1);
    .van-tabs__nav {
      padding-left: 0;
      padding-right: 0;
      gap: 16px;
      .van-tabs__line {
        width: 16px;
      }
      .van-tab {
        padding-left: 0;
        padding-right: 0;
        flex: unset;
        flex-shrink: 0;
      }
    }
  }
}
</style>
