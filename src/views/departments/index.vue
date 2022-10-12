<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDepts="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <tree-tools slot-scope="{data}" :tree-node="data" @refreshList="getDepartments" @addDepts="handleAddDept" @editDepts="editDepts" />
    </el-tree>
    <add-dept ref="AddDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import treeTools from './cpns/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListTotreeData } from '@/utils/index'
import AddDept from './cpns/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeTools, AddDept },

  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人', id: '' },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, commpanyManage, companyName } = await getDepartments()
        this.departs = tranListTotreeData(depts, '')
        this.company = { name: companyName, manager: commpanyManage }
      } finally {
        this.loading = false
      }
    },
    handleAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDepts(node) {
      // console.log(node)
      this.dialogVisible = true
      this.currentNode = { ...node }
      this.$refs.AddDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        // padding-right: 20px;
      }
    }
  }
  </style>
