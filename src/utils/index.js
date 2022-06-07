import { copyToClipboard, Notify } from 'quasar'

export const copy = (text) => {
  copyToClipboard(text)
    .then(() => {
      Notify.create({
        message: '复制成功',
        color: 'dark',
        position: 'center',
        timeout: 1000,
      })
    })
    .catch(() => {
      Notify.create({
        message: '复制失败，请重试！',
        color: 'error',
        position: 'center',
        timeout: 1000,
      })
    })
}

export const openUrlInNewTab = (url, name = 'defalue') => {
  window.open(url, name)
}
