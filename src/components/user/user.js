import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      // 当前页
      pagenum: 1,
      input3: '',
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      editUserForm: {
        username: '',
        mobile: '',
        email: '',
        id: 0
      },
      // 开关状态
      value: true,
      // 修改用户信息模态框显示
      dialogEditUserVisible: false
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
          params: { query, pagenum, pagesize: 2 }
          // headers: { Authorization: localStorage.getItem('token') }
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
    },
    // 显示添加用户模态框
    showAddUserDialog () {
      console.log('显示添加用户模态框')
      this.dialogAddUserVisible = true
    },
    // 点击模态框确认按钮发送请求添加数据
    addUser () {
      console.log('确认按钮点击了')
      // 发送axios
      this.$axios.post('users', this.addUserForm).then(res => {
        console.log(res)
        if (res.data.meta.status === 201) {
          // 关闭模态框
          this.dialogAddUserVisible = false
          // 重新渲染
          this.renderList()
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    // 改变状态
    stateChange (row) {
      // 通过解构拿到id跟state
      const { id, mg_state: mgState } = row
      // 打印scope.row（当前行的对象数据）的结果
      console.log(row)
      this.$axios(`users/${id}/state/${mgState}`, null, {}).then(res => {
        console.log(res)
        // 提示信息
        this.$message({
          message: '改变状态成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    // 显示修改模态框
    showEditDialog (row) {
      console.log('修改框弹出')
      const { username, email, mobile, id } = row
      this.dialogEditUserVisible = true
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    editUser () {
      // 发送axios
      const { email, mobile, id } = this.editUserForm
      this.$axios
        .put(`users/${id}`, {
          email,
          mobile
        })
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 关闭模态框
            this.dialogEditUserVisible = false
            this.$message({
              message: '修改信息成功',
              type: 'success',
              duration: 1000
            })
            this.renderList(this.pagenum)
          }
        })
    },
    // 删除用户
    delUser (id) {
      console.log('111')
      this.$axios.delete(`users/${id}`).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '修改信息成功',
            type: 'success',
            duration: 1000
          })
          this.renderList(this.pagenum)
        }
      })
    }
  }
}
