<template>
  <div class="layout">
    <topNav></topNav>
    <sideBar></sideBar>
    <el-container class="container">
      <slot></slot>
    </el-container>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import sideBar from "./components/sideBar/index.vue";
  import topNav from "./components/topNav/index.vue";

  export default Vue.extend({
    name: "layout",
    components: {
      sideBar,
      topNav,
    },
    computed: {},
    data() {
      return {};
    },
    methods: {},
  });
</script>
<style lang="less" scope>
  @import "./css/variable.less";
  .layout {
    overflow-x: hidden;
    text-align: left;
    .container {
      overflow-x: hidden;
      padding-top: @topNavHeight;
      margin-left: @sideBarwidth;
    }
  }
</style>
