<template>
  <q-scroll-area
    style="height: 250px; width: 100%"
    :thumb-style="{
      right: '2px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      height: '5px',
      opacity: '0.75',
    }"
  >
    <div class="row no-wrap">
      <div v-for="i in 42" :key="i">
        <div class="t text-primary">{{ list[i - 1] ? list[i - 1] : 0 }}</div>
        <div>
          <q-slider v-model="list[i - 1]" :min="0" :max="100" vertical reverse />
        </div>
        <div class="t">{{ i }}</div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    return {
      list: ref([30, 30, 30, 30, 42, 43, 42, 43, 46, 46, 46, 47, 52, 53, 52, 53, 52, 53, 52, 53, 52, 53, 52, 53, 52, 53, 52, 53, 53, 54, 54, 54, 53, 54, 54, 54, 67, 68, 67, 68]),
    }
  },
})
</script>
<style lang="scss">
.t {
  text-align: center;
  font-size: 10px;
  transform: scale(0.8);
  font-weight: 700;
}
</style>
