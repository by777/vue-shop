<!--
 * @Author: Xu Bai
 * @Date: 2020-07-04 12:21:28
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-04 22:23:10
-->
<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avator_box">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <!-- 登录表单 prop="username"验证规则生效-->
            <el-form :model="loginForm" label-width="0px" class="login_form" :rules="loginFormRules" ref="loginFormRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input  placeholder="username" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="loginForm.password" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //   表单的验证规则
      loginFormRules: {

        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名在3~10之间', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在6~15之间', trigger: 'blur' }]
      }
    }
  },
  methods: {

    resetLoginForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 预验证 valid是验证结果
      this.$refs.loginFormRef.validate(async valid => {
        console.log('本地规则验证' + valid)
        if (!valid) return
        // await只能用在被async修饰的方法中
        // const result = await this.$http.post('login', this.loginForm)
        // 把result结构只需要data
        const { data: res } = await this.$http.post('login', this.loginForm)
        // result是一个Promise对象 可以用await async来简化Promise操作
        // 修饰后就不是一个Promise对象了
        console.log('服务器返回结果' + JSON.stringify(res))
        if (res.meta.status !== 200) {
          console.log('登录失败')
          return this.$message.error('登陆失败')
        } else {
          console.log('登录成功')
          this.$message.success('登录上了')
          //   ---------------------------------------------------
          //   登陆上后需要做的：
          //   1.将登陆成功之后的token保存到客户端的sessionStorage中
          //     1.1 项目中出现的登录之外的其他api、必须登录之后才能访问
          //     1.2 token只在当前网站打开期间生效、所以存在sessionStorage而不是localStorage中
          //   2.通过编程式导航跳转到后台主页、地址是/home
          // ----------------------------------------------------
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: aqua;
    height: 100%;
}
.login_box{
    width:450px;
    height: 300px;
    background-color:lightcyan;
    border-radius: 10px;
    // 绝对定位
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);

}
.avator_box{
    height: 130px;
    width: 130px;
    border: 2px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    // background-color: #fff;

    // 外面边框线加阴影 向外扩散10px
    box-shadow: 0 0 10px #ddd;
    img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.btns{
    // 弹性盒模型
    display: flex;
    // 尾部对齐
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    // 上下左右边距
    padding: 0 20px ;
    // 防止出界
    box-sizing: border-box;
}
</style>
