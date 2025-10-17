<template>
  <div class="filter-info-list-wrapper">
    <van-tabs v-model:active="activeTab" @change="changeTabLogic">
      <van-tab
        v-for="tabInfo in fetchTabOptionsData?.data"
        :key="tabInfo?.id"
        :title="tabInfo?.typeName"
        :name="tabInfo?.id"
      />
    </van-tabs>
    <van-list
      v-if="!isNullOrUndefined(activeTab)"
      v-model:loading="loading"
      :finished="finished"
      @load="loadMore"
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
import { useWrapperRef, useRequest } from '@vmono/vhooks';
import InfoListItemCard from './InfoListItemCard.vue';
import { useLoadMore } from 'vue-request';
import { getListMockFunc } from '@/apis/test';
import { isNullOrUndefined } from '@vmono/utils';

/**
 * Tab 数据源
 */
const [activeTab, setActiveTab] = useWrapperRef<string | undefined>(undefined);
const { res: fetchTabOptionsData, loading: _fetchTabOptionsLoading } = useRequest(async () => {
  return {
    data: [
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
  };
});
/**
 * 请求处理
 */

const {
  data: _data,
  loadingMore: _loadingMore,
  dataList,
  loading,
  noMore,
  loadMore,
  refresh,
} = useLoadMore(
  async (d) => {
    const pageNum = d?.page ? d.page + 1 : 1;
    // console.log('type: activeTabKey', _page, activeTab.value);
    const data = await getListMockFunc({ pageNum, pageSize: 10 });
    return {
      list: data.data,
      page: pageNum,
      total: data.total,
    };
  },
  {
    manual: true,
    isNoMore: (d) => {
      return (d?.list?.length ?? 0) >= (d?.total ?? 0);
    },
  }
);
const [finished, setFinished] = useWrapperRef<boolean>(false);
watch(noMore, (finish) => {
  setFinished(finish);
});
const [showList, setShowList] = useWrapperRef<any[]>([]);
watch(dataList, () => {
  setShowList(dataList.value);
});

const changeTabLogic = async (activeTabKey: string) => {
  setActiveTab(activeTabKey);
  setShowList([]);
  setFinished(false);
  refresh();
};

watch(fetchTabOptionsData, (data) => {
  const options = data?.data ?? [];
  changeTabLogic(options?.[0]?.id);
});

/**
 * 详情页跳转
 */
const jumpDetailPage = (_info) => {
  // Router.push({
  //   path: '/infoDetail',
  //   query: { id: info?.id },
  // });
};
</script>

<style scoped lang="less">
.filter-info-list-wrapper {
  height: 100%;
  overflow: hidden visible;
  display: flex;
  flex-direction: column;
  gap: var(--page-normal-padding);

  .van-list {
    // // ios soafari 还是要设置 padding，不然列表内容展示不全，
    // // 但是其它浏览器环境不设置 padding 也是能够完美显示的（微信浏览器）
    // padding-bottom: v-bind(tabBarHeightCssValue);
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
