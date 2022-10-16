<template>
  <div class="dashboard-container">
    <UploadImg @on-success="onSuccess1" />
    <UploadImg @on-success="onSuccess2" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/UploadImg/index.vue'

export default {
  name: 'Dashboard',
  components: { UploadImg },
  computed: {
    ...mapGetters([
      'name'
    ])
  }, // created() {
  //   const res = this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // }
  methods: {
    onSuccess1(val) {
      console.log(val)
    },
    onSuccess2(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
