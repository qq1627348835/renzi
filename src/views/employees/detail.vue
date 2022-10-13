<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane lazy label="登录账户设置" name="first">
          <el-form ref="form" :model="accountInfo" :rules="rules" label-width="80px">
            <el-form-item label="姓名：" prop="username">
              <el-input v-model="accountInfo.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="accountInfo.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateEmployess">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane lazy label="个人详情" name="second">
          <UserInfo />
        </el-tab-pane>
        <el-tab-pane lazy label="岗位信息" name="third">
          <JobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from './cpns/user-info.vue'
import JobInfo from './cpns/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: { UserInfo, JobInfo },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployess() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style scoped  lang="scss">

</style>
