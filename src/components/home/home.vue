<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/logo.png" alt />
        </el-col>
        <el-col :span="8" class="middle">电商管理系统</el-col>
        <el-col :span="8" class="loginout">
          恭喜上海前端43期月薪20万
          <a href="#" @click.prevent="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// eslint-disable-next-line
export default {
  methods: {
    loginout () {
      this.$confirm('此操作将退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 退出成功 导航到login页
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  .middle {
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 26px;
  }
  .loginout {
    text-align: right;
    line-height: 60px;
    padding-right: 20px;
    a {
      color: orange;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
