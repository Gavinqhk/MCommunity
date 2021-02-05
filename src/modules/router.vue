<template>
  <layout>
    <router-view />
  </layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import layout from "@/layout/index.vue";
  export default Vue.extend({
    name: "router",
    components: {
      layout,
    },
  });
</script>
