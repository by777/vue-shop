<!--
 * @Author: Xu Bai
 * @Date: 2020-07-04 22:08:49
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-05 12:17:55
-->
<template>

        <el-container class="home-container">
          <el-header>
            <div>
              <img src="../assets/banner1.png" alt="">
              <span>电商管理后台</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button></el-header>

        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>
        </el-container>
        </el-container>

</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$message.success('退出登陆')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  padding-left: 0;
  background-color:#373D41;
  display: flex;
  // 左右贴边对齐
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img{
      opacity: 50;
    }
    span{
      margin-left:15px ;
    }
  }
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #eaedfe;
}
</style>
