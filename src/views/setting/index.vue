<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button type="primary" style="margin-left: 10px;" @click="handleAdd">新增角色</el-button>
          </el-row>
          <el-table
            v-if="total>0"
            v-loading="loading"
            style="width: 100%"
            :data="roleList"
          >
            <el-table-column
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              label="角色名称"
              width="240"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column
              label="操作"
              width="240"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <el-pagination
              layout="prev, pager, next,sizes"

              background
              :page-sizes="[2,5,10,15]"
              :pager-count="11"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :total="total"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </el-card>
    <AddRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>
<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import AddRole from './cpns/addRole.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  components: { AddRole },
  data() {
    return {
      loading: false,
      activeName: 'first',
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      dialogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        // console.log(rows, total)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleAdd() {
      this.dialogVisible = true
    },
    editRole(row) {
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    async delRow(id) {
      try {
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
      console.log(this.companyInfo)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
