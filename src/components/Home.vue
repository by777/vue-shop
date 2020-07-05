<!--
 * @Author: Xu Bai
 * @Date: 2020-07-04 22:08:49
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-05 22:12:11
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
          <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollapse"> &lt;&lt;&lt; </div>
             <!-- 侧边栏菜单区域 :unique-opened加冒号是一个布尔值，不加就是一个字符串-->
             <!-- 关闭动画 -->
            <el-menu
            :unique-opened="true"
            :collapse="isCollapse"
            :router="true"
            :collapse-transition="false"
            :default-active="activePath"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF">
      <!-- 一级菜单 :index="item.id + ''“绑定唯一id，否则会一同打开。加空字符串转换为字符串-->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单对的模板区域 -->
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group>
          <!-- <template slot="title">菜单</template> -->

          <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
            <i class="el-icon-menu"></i>
            {{subItem.authName}}
          </el-menu-item>

        </el-menu-item-group>

      </el-submenu>

    </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
        </el-container>

</template>

<script>
export default {
  created () {
    // 请求菜单项
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'el-icon-user',
        103: 'el-icon-set-up',
        101: 'el-icon-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-data-analysis'
      },
      // 是否折叠
      isCollapse: false,
      // 激活的列表项目
      activePath: ''
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$message.success('退出登陆')
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      // 保存链接的激活状态
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedfe;
}
.iconfont{
  margin-left: 10px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.1em;
  cursor: pointer;
}

</style>
