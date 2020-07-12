<!--
 * @Author: Xu Bai
 * @Date: 2020-07-05 21:56:44
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-12 21:06:04
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- gutter列列之间的间隙 -->
            <el-row :gutter="30">
                <!-- span占24栅格的多少 -->
                <el-col :span="10">
                <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格区域 prop是数据源还不加冒号-->
            <el-table
            :data="userlist"
            border stripe
            style="width: 100%">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <!-- 作用域插槽会覆盖prop，删掉prop -->
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作" width="180px">
                    <template slot-scope="scope">
                      <!--  -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                        <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClosed"
        >

        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

  <!-- 修改用户的对话框 -->
  <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="50%"
    @close="editDialogClosed"
    >
    <!-- 内部表单 prop卸载el-form-item上，不要写道input里-->
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
    <el-form-item label="用户名" >
      <el-input v-model="editForm.username" disabled></el-input>
    </el-form-item>
      <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email"  ></el-input>
    </el-form-item>
      <el-form-item label="手机" prop="mobile">
      <el-input v-model="editForm.mobile"  ></el-input>
    </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="editUserInfo"  >确 定</el-button>
    </span>
  </el-dialog>

  <!-- 分配角色的对话框 -->
  <el-dialog
  title="分配角色"
  :visible.sync="setRoleDialogVisible"
  width="50%"
  @close="setRoleDialogClosed"
  >
  <div>
    <p>当前的用户：{{userInfo.username}}</p>
    <p>当前的角色：{{userInfo.role_name}}</p>
    <p>分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
    </p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regEmail.test(value)) {
        // 验证通过 回调
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    var checkMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        // 验证通过
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [

      ],
      // 所有角色的数据列表
      rolesList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: '',
      // 被选中的git 角色id
      selectedRoleId: '',
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户的对话框 -- 查询到的用户信息对象
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单的规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在3~10字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6~15字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 修改用户表单的校验规则
      editFormRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/users', { params: this.queryInfo })
      console.log(res.data)
      if (res.meta.status !== 200) return this.$message.error('获取管理员信息失败')
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    //   console.log(newPage)
    },
    // 监听switch开关状态的改变
    async userStateChanged (userInfo) {
      const { data: res } = await this.$http.put(`/users/${userInfo.id}/state/${userInfo.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) {
        // 页面状态改回去
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户信息失败')
      }
      this.$message.success('更新用户信息成功')
    },
    // 监听添加用户对话框关闭、重置表单内容
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改用户对话框关闭、重置表单内容
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        // 校验
        if (!valid) return this.$message.error('用户信息未通过本地校验')
        const { data: res } = await this.$http.post('/users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },
    editUserInfo () {
      // 预验证
      this.$refs.editFormRef.validate(async valid => {
        console.log('editForm预验证结果：' + valid)
        if (!valid) return this.$message.error('请检查输入格式')
        const { data: res } = await this.$http.put('users/' + this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
        if (res.meta.status !== 200) return this.$message.error('更新用户信息失败')
        // 成功：关闭对话框、刷新用户列表、提示用户
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功')
      })
    },
    // 根据id删除对应用户
    async removeUserById (id) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('users/' + id)
        if (res.meta.status !== 200) return this.$message.info('删除失败、检查账号权限')
        this.$message.success('删除成功')
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async showEditDialog (id) {
      console.log('要修改的用户id：' + id)
      const { data: res } = await this.$http.get('users/' + id)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('请求指定的用户信息失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 分配角色按钮的点击事件
    async setRole (userInfo) {
      // 获取所有的角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.rolesList = res.data
      this.userInfo = userInfo
      this.setRoleDialogVisible = true
    },
    // 点击按钮，分配角色
    async saveRoleInfo () {
      if (!this.selectedRoleId) { return this.$message.error('没有选择新角色') }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) return this.$message.error('更新角色失败')
      this.$message.success('更新角色成功')
      this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 分配角色对话框关闭事件
    setRoleDialogClosed () {
      this.selectedRoleId = ''
      this.userInfo = {}
    }

  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>

</style>
