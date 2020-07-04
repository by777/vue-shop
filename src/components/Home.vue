<!--
 * @Author: Xu Bai
 * @Date: 2020-07-04 22:08:49
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-04 22:39:15
-->
<template>
    <div>
        <el-button type="info" @click="logout">退出登录</el-button>
    </div>

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

</style>
