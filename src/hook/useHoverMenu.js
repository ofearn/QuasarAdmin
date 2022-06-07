import { ref } from 'vue'

export default function () {
  //菜单显示状态
  const menuShow = ref(false)
  //显示的菜单index
  const showIndex = ref(0)
  // 是否悬浮在菜单上
  const hoverInMenu = ref(false)
  // 是否悬浮在tab上
  const hoverInTab = ref(false)
  /**
   * 离开列表
   */
  const moveList = () => {
    setTimeout(() => {
      if (!hoverInMenu.value) {
        menuShow.value = false
      }
    }, 100)
  }
  /**
   * 移入tab
   */
  const enterTab = (index) => {
    menuShow.value = true
    showIndex.value = index
    hoverInTab.value = true
  }
  const moveTab = () => {
    hoverInTab.value = false
  }
  /**
   * 进入菜单
   */
  const enterMenu = () => {
    hoverInMenu.value = true
  }
  /**
   * 移出菜单
   */
  const moveMenu = () => {
    hoverInMenu.value = false
    setTimeout(() => {
      if (!hoverInTab.value) {
        menuShow.value = false
      }
    }, 100)
  }
  return {
    showIndex,
    menuShow,
    hoverInMenu,
    hoverInTab,
    moveList,
    enterTab,
    moveTab,
    enterMenu,
    moveMenu,
  }
}
