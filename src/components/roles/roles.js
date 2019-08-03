export default {
  data () {
    return {
      // roles数据
      rolesData: [
        {
          roleName: '主管',
          roleDesc: '技术负责人'
        }
      ],
      // 权限数据
      rightsData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        // 以数据结构的children作为结构展示
        children: 'children',
        // 以label作为标题
        label: 'authName'
      },
      rolesDialogVisible: false
    }
  },
  created () {
    // 进入页面就渲染显示数据
    this.renderRoles()
    this.renderRights()
  },
  methods: {
    // 加载roles列表
    async renderRoles () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 配置表格索引的
    indexMethod (index) {
      return index
    },
    // 加载所有的权限信息
    async renderRights () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.rightsData = res.data.data
    },
    // 点击分配权限 显示对话框 得到当前行对象
    showRightsDialog (row) {
      this.roleId = row.id
      console.log(row)
      this.rolesDialogVisible = true
      let keys = []
      row.children.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            keys.push(item2.id)
          })
        })
      })
      // dom更新是异步的 所以不能立马得到数据
      // nextTick 当dom更新完毕 自动走回调
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 点击showRightsDialog的确认按钮 发送请求
    async editRights () {
      // 用户的id在当前行的对象数据里面 在显示对话框的时候就存起来
      // 权限 ID 列表  半选中  全选中
      let rid1 = this.$refs.tree.getHalfCheckedKeys()
      let rid2 = this.$refs.tree.getCheckedKeys()
      let rid = [...rid1, ...rid2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: rid.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.rolesDialogVisible = false
        // 提示更新完成
        this.$message({
          message: '更新完成',
          type: 'success'
        })
        // 重新渲染
        this.renderRoles()
      }
    }
  }
}
