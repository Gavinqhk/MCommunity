<template>
  <el-aside width="230px" class="sideBar">
    <el-menu default-active="1-4-1" unique-opened="ture" class="el-menu-vertical-demo">
      <template v-for="(menu, index) in menuList">
        <el-menu-item :index="index" :key="menu.name" v-if="!menu.childrens">
          <i :class="`el-icon-${menu.icon}`"></i>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
        <el-submenu :index="index" :key="menu.name" v-else>
          <template slot="title">
            <i :class="`el-icon-${menu.icon}`"></i>
            <span slot="title">{{ menu.title }}</span>
          </template>
          <template v-for="(submenu, subIndex) in menu.childrens">
            <el-menu-item-group v-if="menu.childrens" :key="submenu.name">
              <el-menu-item :index="`${index}-${subIndex}`">{{ submenu.title }}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    name: "sideBar",
    components: {},
    computed: {},
    data() {
      return {
        menuList: [
          {
            title: "首页",
            name: "home",
            icon: "home",
          },
          {
            title: "运营管理",
            name: "operationManage",
            icon: "operationManage",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "活动管理",
            name: "activityManage",
            icon: "activityManage",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "内容管理",
            name: "contentManage",
            icon: "contentManage",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "财务管理",
            name: "financeManage",
            icon: "financeManage",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "基础数据",
            name: "baseData",
            icon: "baseData",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "数据分析",
            name: "DataAnalysis",
            icon: "DataAnalysis",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
          {
            title: "技术设置",
            name: "baseSetting",
            icon: "baseSetting",
            childrens: [
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
              {
                title: "社区装修",
                name: "decorateCommunity",
              },
            ],
          },
        ],
      };
    },
    methods: {},
  });
</script>
<style lang="less" scope>
  @import "../../css/variable.less";
  .sideBar {
    position: fixed;
    left: 0;
    top: @topNavHeight;
    z-index: 1000;
    padding-top: 30px;
    width: @sideBarwidth;
    height: 100%;
    background-color: @menuBg;
  }
</style>
