<template>
  <q-list class="rounded-borders" v-if="mini" @mouseleave="moveList">
    <template v-for="(menu, index) in menus" :key="menu.title">
      <q-item dense v-if="menu.items" @mouseenter="enterTab(index)" class="mg" :active="menu.open" @mouseleave="moveTab">
        <q-icon class="menu-icon" :name="menu.icon" style="font-size: 16px" />
        <q-menu
          :class="dark ? 'min-dark-menu' : 'min-light-menu'"
          :offset="[5, 0]"
          no-parent-event
          v-model="menuShow"
          v-if="index == showIndex"
          anchor="top right"
          self="top left"
          @mouseenter="enterMenu"
          @mouseleave="moveMenu"
        >
          <q-list style="min-width: 200px">
            <sidebar-menu :menus="menu.items" :zIndex="zIndex" :index="index"></sidebar-menu>
          </q-list>
        </q-menu>
      </q-item>
      <q-item dense class="mg" v-else @mouseenter="enterTab(index)" :to="menu.path">
        <q-icon class="menu-icon" :name="menu.icon" style="font-size: 16px" />
        <q-tooltip class="bg-dark" anchor="center right" self="center left" :offset="[5, 0]">
          {{ menu.title }}
        </q-tooltip>
      </q-item>
    </template>
  </q-list>
  <q-list v-else>
    <template v-for="menu in menus" :key="menu.title">
      <q-expansion-item class="mg menu-list" v-if="menu.items" :group="'menu' + zIndex" v-model="menu.open" dense dense-toggle>
        <template v-slot:header>
          <q-item-section>
            <div :class="['menu-title', menu.open ? 'menu-open' : '']" :style="{ 'padding-left': zIndex * 10 + 'px' }">
              <q-icon :name="menu.icon" style="font-size: 15px" />
              <div class="menu-title-name">{{ menu.title }}</div>
            </div>
          </q-item-section>
        </template>
        <q-card>
          <sidebar-menu :menus="menu.items" :zIndex="zIndex + 1"></sidebar-menu>
        </q-card>
      </q-expansion-item>
      <q-item v-else dense clickable v-ripple :class="[active == menu.path ? 'menu-item-selected' : '', 'mg']" :active="active == menu.path" @click="go(menu.path)">
        <div class="menu-title" :style="{ 'padding-left': zIndex * 10 + 'px' }">
          <q-icon :name="menu.icon" style="font-size: 15px" />
          <div class="menu-title-name">{{ menu.title }}</div>
        </div>
      </q-item>
    </template>
  </q-list>
</template>
<script>
import { toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import hover from './hoverMenu.js'
import { openUrlInNewTab } from '../../utils/index.js'
export default {
  name: 'SidebarMenu',
  props: {
    mini: Boolean,
    menus: Array,
    zIndex: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const router = useRouter()
    const active = toRaw(useRoute()).path
    const go = (path) => {
      if (path.indexOf('http://') == 0 || path.indexOf('https://') == 0) {
        openUrlInNewTab(path)
        return
      }
      router.push({ path })
    }
    return { go, active, ...hover() }
  },
}
</script>
<style lang="scss">
.menu-title {
  display: flex;
  align-items: center;
  margin: 7.5px 0;
  .menu-title-name {
    padding-left: 10px;
  }
}
.menu-icon {
  margin: 8px 0;
}

.side-light,
.min-light-menu {
  .menu-list:hover .bt-down,
  .menu-open,
  .menu-title:hover,
  .q-item--active,
  .q-expansion-item__toggle-icon--rotated,
  .q-item--active,
  .q-item--active .q-icon,
  .menu-item-selected .menu-title,
  .q-router-link--exact-active .q-icon,
  .min-menu-item-selected .q-icon {
    color: var(--q-primary) !important;
  }
  .menu-title {
    color: rgba(0, 0, 0, 0.85);
  }
  .menu-item-selected {
    border-right: 3px solid var(--q-primary);
    background: var(--menu-hover-color);
  }
  .menu-icon {
    color: rgba(0, 0, 0, 0.85);
  }
}

.side-dark,
.min-dark-menu {
  .menu-list:hover .bt-down,
  .menu-open,
  .menu-title:hover,
  .q-item--active,
  .q-expansion-item__toggle-icon--rotated,
  .q-item--active,
  .q-item--active .q-icon,
  .menu-item-selected .menu-title,
  .q-router-link--exact-active .q-icon {
    color: #fff !important;
  }
  .menu-title {
    color: rgba(255, 255, 255, 0.65);
  }
  .menu-item-selected {
    background: var(--q-primary);
  }
  .menu-icon {
    color: rgba(255, 255, 255, 0.65);
  }
  .q-card {
    background: #000c17;
  }
}
.q-list .mg {
  margin-top: 4px;
  margin-bottom: 4px;
}
.icon-set {
  .q-icon {
    font-size: 12px !important;
  }
}
.min-dark-menu {
  background: var(--q-dark) !important;
}
</style>
