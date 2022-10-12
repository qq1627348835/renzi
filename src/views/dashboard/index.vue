<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadExce :before-upload="beforeUpload" :on-success="handleSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExce from '@/components/UploadExce/index.vue'

export default {
  name: 'Dashboard',
  components: { UploadExce },
  computed: {
    ...mapGetters([
      'name'
    ])
  }, // created() {
  //   const res = this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // }
  methods: {
    handleSuccess(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log(file)
      return true
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
