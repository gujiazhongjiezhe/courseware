<template>
  <div class="box">
      我是客户列表
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  watch: {

  },
  methods: {
  },
  created() {
 
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ==filterBox== */
.filterBox {
  padding: 10px;
  text-align: right;
}

.selectBox,
.searchInp,
.deleteAll {
  box-sizing: border-box;
  margin-right: 10px;
  padding: 0 5px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  vertical-align: middle;
}

.searchInp {
  padding: 0 10px;
  width: 250px;
}

.deleteAll {
  background: #eee;
  padding: 0;
  cursor: pointer;
}
</style>