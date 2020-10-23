<template>
  <div v-html="body"></div>
</template>
<script>
import { detail } from "../../api";
export default {
  name:'Detail',
  data() {
    return {
      body: "",
    };
  },
  async created() {
    console.log(this.$route, 9);
    let id = this.$route.params.id;
    let { body, css } = await detail(id);
    this.body = body;

    // let link = document.getElementById('link');
    // if (!link) {
    //   let link = document.createElement("link");
    //   link.id = "link";
    //   link.href = css[0];
    //   link.rel = "stylesheet";
    //   document.body.appendChild(link);
    // }
  },
};
</script>
<style lang="less" scoped>
</style>