<template>
  <el-header class="topNav" height="64px">
    <img src="@/layout/assets/images/logo.png" class="logo" alt="" />
    <div class="rightbox">
      <el-badge class="messagebox" :max="99" :value="0" hidden>
        <el-button type="text" icon="el-icon-message">消息中心</el-button>
      </el-badge>
      <el-button size="mini" round>访问社区</el-button>
      <div class="userbox">
        <el-avatar :size="32" :src="circleUrl"></el-avatar>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span>阿强518</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="signout1">个人资料</el-dropdown-item>
            <el-dropdown-item command="signout2">安全设置</el-dropdown-item>
            <el-dropdown-item command="signout3">社区切换</el-dropdown-item>
            <el-dropdown-item command="signout4">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="userType">管理员</span>
      </div>
    </div>
  </el-header>
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    name: "topNav",
    components: {},
    computed: {},
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      };
    },
    methods: {
      handleCommand(command: string | number | object) {
        console.log(command);
      },
    },
  });
</script>
<style lang="less" scope>
  @import "../../css/variable.less";
  .topNav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding-left: 45px;
    padding-right: 40px;
    border-bottom: 1px solid #ececec;
    box-sizing: border-box;
    .logo {
      display: inline-block;
      width: 111px;
      height: 26px;
      vertical-align: text-bottom;
      flex: 0 0 auto;
    }
    .rightbox {
      color: #666;
      height: @topNavHeight;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-badge {
        margin-right: 27px;
        .el-button {
          padding: 3px 3px 3px 1px;
        }
      }
      .messagebox {
        padding-left: 20px;
        .el-icon-message {
          position: absolute;
          top: 1.5px;
          left: 0;
          display: inline-block;
          width: 20px;
          height: 20px;
          background-image: url(../../assets/images/home_top_news_icon.png);
          background-repeat: no-repeat;
          background-size: 20px 20px;
          &::before {
            display: none;
          }
        }
        &:hover {
          .el-icon-message {
            background-image: url(../../assets/images/home_top_news_icon_hover.png);
          }
        }
      }
      .userbox {
        margin-left: 20px;
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 8px;
        }
        .userType {
          width: 56px;
          height: 20px;
          line-height: 20px;
          background: #e1f9f1;
          border-radius: 10px;
          margin-left: 8px;
          font-size: 12px;
          color: #32d79f;
          text-align: center;
        }
      }
    }
  }
</style>
