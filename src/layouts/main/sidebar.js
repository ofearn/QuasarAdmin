import { ref, reactive, watch } from 'vue'
export const model = ref('md')
export const status = reactive({
  sidebarMin: false,
  sidebarShow: true,
})
export const onResize = (size) => {
  if (size.width >= 1200) {
    model.value = 'md'
  } else if (size.width < 1200 && size.width >= 750) {
    model.value = 'sm'
  } else {
    model.value = 'xs'
  }
}
watch(model, (value) => {
  switch (value) {
    case 'md':
      status.sidebarMin = false
      status.sidebarShow = true
      break
    case 'sm':
      status.sidebarMin = true
      status.sidebarShow = true
      break
    case 'xs':
      status.sidebarShow = false
      break
  }
})
