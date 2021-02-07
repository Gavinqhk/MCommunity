<template>
  <div class="layout-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医生管理" name="doctorManage">doctorManage</el-tab-pane>
      <el-tab-pane label="医生标签" name="doctorTypes">doctorTypes</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    name: "home",
    components: {},
    data() {
      return {
        activeName: "doctorManage",
      };
    },
    methods: {
      handleClick(tab: any, event: any) {
        console.log(tab.name, event);
      },
    },
  });
</script>
