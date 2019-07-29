<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      // 当前页
      pagenum: 1,
      input3: ''
    }
  },
  // 钩子函数 在数据初始化后发送axios 获取数据
  created () {
    this.renderList()
  },
  methods: {
    renderList (pagenum = 1, query) {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: { query, pagenum, pagesize: 2 },
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    currentChange (currentPage) {
      console.log('页码改变了')
      this.renderList(currentPage, this.input3)
    },
    searchUser () {
      // 获取input的值
      console.log(this.input3)
      this.renderList(1, this.input3)
    }
  }
}
</script>

<style>
</style>
