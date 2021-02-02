<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <SvgIcon icon-class="dashboard" />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import SvgIcon from "@components/SvgIcon/index.vue";
  export default Vue.extend({
    name: "Home",
    components: {
      SvgIcon,
    },
    created() {
      console.log(this);
    },
  });
</script>
