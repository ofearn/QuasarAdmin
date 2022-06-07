<template>
  <q-layout :view="layoutView" :style="`--menu-hover-color:${primaryHoverColor};`" class="main-layout">
    <q-header :class="layout.headerDarkModel ? 'header-dark' : 'header-light'" v-if="layout.showHeader" bordered>
      <q-toolbar>
        <div class="nav-logo top-logo" v-if="layout.mode !== 'left-menu' || !status.sidebarShow">
          <img :src="config.logo" alt="logo" />
          <h1 v-show="status.sidebarShow">{{ config.title }}</h1>
        </div>
        <q-icon
          v-if="!status.sidebarShow"
          @click=";(status.sidebarShow = !status.sidebarShow), (status.sidebarMin = false)"
          :name="`${status.sidebarShow ? unfold : fold}`"
          style="font-size: 22px; margin-left: 16px"
        />
        <q-space></q-space>
        <top-user-setting></top-user-setting>
      </q-toolbar>
    </q-header>
    <q-drawer
      :class="layout.sideDarkModel ? 'side-dark' : 'side-light'"
      :mini="status.sidebarMin"
      v-model="status.sidebarShow"
      v-if="layout.mode !== 'top-menu'"
      show-if-above
      :mini-width="layout.sidebarMinWidth"
      :width="layout.sidebarWidth"
      :breakpoint="750"
      :bordered="!layout.sideDarkModel"
    >
      <div class="nav-logo left-logo absolute-top" v-if="layout.mode === 'left-menu'" :style="status.sidebarMin ? 'padding: 16px 8px;' : ''">
        <img :src="config.logo" alt="logo" />
        <h1>{{ config.title }}</h1>
      </div>
      <sidebar-menu
        :style="`margin-top: ${layout.mode === 'left-menu' ? '68' : '0'}px; margin-bottom: 48px`"
        :dark="layout.sideDarkModel"
        :menus="menus"
        :mini="status.sidebarMin"
      ></sidebar-menu>
      <div class="sidebar-collapsed-button absolute-bottom" @click="status.sidebarMin = !status.sidebarMin">
        <q-icon class="sidebar-collapsed-button-icon" style="font-size: 16px" :name="status.sidebarMin ? unfold : fold" />
      </div>
    </q-drawer>
    <q-page-container>
      <div class="page-header" v-if="activeInfo.headerInfo">
        <q-breadcrumbs class="text-grey-10" active-color="grey-5">
          <q-breadcrumbs-el :label="activeInfo.parent.title" :to="activeInfo.parent.path" />
          <q-breadcrumbs-el :label="activeInfo.title" />
        </q-breadcrumbs>
        <div class="header-title">
          {{ activeInfo.title }}
        </div>
        <div class="header-content" v-if="activeInfo.content" v-html="activeInfo.content"></div>
      </div>
      <div class="page-content"><router-view /></div>
    </q-page-container>
    <q-resize-observer @resize="onResize" />
  </q-layout>
</template>
<script>
import { computed, defineComponent, ref, reactive } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { colors } from 'quasar'

import { fold, unfold } from '../icon/menu'
import config from '../config'
import menu from '../config/menu'
import theme from 'src/config/theme'
import layout from 'src/config/layout'
import { status, onResize } from './main/sidebar'

import SidebarMenu from './main/SidebarMenu.vue'
import TopUserSetting from './main/TopUserSetting.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SidebarMenu,
    TopUserSetting,
  },
  setup() {
    const menus = ref(menu)
    const primaryHoverColor = computed(() => colors.lighten(theme.color.primary, 90))
    const layoutView = computed(() => {
      const { mode, fixedHeader } = layout
      switch (mode) {
        case 'left-menu':
          return `l${fixedHeader ? 'H' : 'h'}h Lpr lff`
        case 'top-menu':
          return 'hHh lpR fFf'
        default:
          return 'hHh Lpr lff'
      }
    })
    const activeInfo = reactive({
      path: '',
      title: '',
      content: '',
      headerInfo: false,
      parent: {
        title: '',
        path: '',
      },
    })
    const changeInfo = (item, menu) => {
      activeInfo.path = item.path
      activeInfo.title = item.title
      activeInfo.icon = item.icon
      activeInfo.headerInfo = item.headerInfo === true
      if (activeInfo.headerInfo) {
        activeInfo.content = item.content
        if (menu === null) {
          activeInfo.parent = {
            title: '首页',
            path: '/',
          }
        } else {
          activeInfo.parent = {
            title: menu.title,
            icon: menu.icon,
            path: menu.items[0].path,
          }
        }
      }
    }
    /**
     * 根据路由变化菜单的开启状态
     */
    const menuIsOpen = (menu, path) => {
      menu.open = false
      menu.items.forEach((item) => {
        if (item.items) {
          menuIsOpen(item, path)
          if (item.open) {
            menu.open = true
            changeInfo(item, menu)
          }
        } else {
          if (item.path == path) {
            menu.open = true
            changeInfo(item, menu)
          }
        }
      })
    }

    const changeMenuOpen = (to) => {
      menus.value.forEach((menu) => {
        if (menu.items) {
          menuIsOpen(menu, to.path)
        } else {
          if (menu.path === to.path) {
            changeInfo(menu, null)
          }
        }
      })
    }
    changeMenuOpen(useRoute())
    onBeforeRouteUpdate(changeMenuOpen)
    return {
      layout,
      layoutView,
      config,
      menus,
      status,
      activeInfo,
      primaryHoverColor,
      onResize,
      fold,
      unfold,
    }
  },
})
</script>
<style lang="scss">
.header-light {
  color: rgba(0, 0, 0, 0.85) !important;
  background-color: #fff !important;
  .nav-logo {
    h1 {
      color: var(--q-primary);
    }
  }
}
.header-dark {
  background: var(--q-dark) !important;
}
.side-light {
  .nav-logo {
    h1 {
      color: var(--q-primary);
    }
  }
  .sidebar-collapsed-button {
    background: #fff;
    color: rgba(0, 0, 0, 0.85);
    &:hover {
      color: var(--q-primary);
    }
  }
}
.side-dark {
  background: var(--q-dark);
  .sidebar-collapsed-button {
    background: var();
  }
}

.nav-logo {
  display: flex;
  cursor: pointer;
  user-select: none;
  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol,
      noto color emoji;
    display: inline-block;
    height: 32px;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    overflow: hidden;
  }
}
.left-logo {
  padding: 16px;
}
.sidebar-collapsed-button {
  height: 40px;
  margin-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);
  &:hover {
    color: white;
  }
  .sidebar-collapsed-button-icon {
    margin: 10px 0 10px 14px;
  }
}
.page-header {
  padding: 16px 24px;
  .q-breadcrumbs .text-grey-5:hover {
    color: var(--q-primary) !important;
  }
  .header-title {
    margin-top: 8px;
    line-height: 40px;
    font-weight: 600;
    font-size: 20px;
  }
  .header-content {
    padding-top: 12px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }
}
.page-content {
  margin: 10px;
}
.body--dark {
  .main-layout {
    background: #000;
  }
  .page-header,
  .page-content {
    background: var(--q-dark);
  }
}
.body--light {
  .main-layout {
    background: #f0f2f5;
  }
  .page-header,
  .page-content {
    background: #fff;
  }
}
.page-content {
  padding: 10px;
  min-height: 750px;
}
</style>
