<template>
  <div class="box">
    <div class="filterBox">
      <select class="selectBox" v-model="type" @change="handle">
        <option value>全部客户</option>
        <option value="重点客户">重点客户</option>
        <option value="一般客户">一般客户</option>
        <option value="放弃客户">放弃客户</option>
      </select>
      <input
        type="text"
        class="searchInp"
        placeholder="客户综合信息模糊查询"
        v-model="search"
        @keydown.enter="handle"
      />
    </div>
    <div class="table">
      <el-table
        :data="res && res.data"
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名" min-width="10%">
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="10%"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="phone" label="电话" min-width="10%">
        </el-table-column>
        <el-table-column prop="weixin" label="微信" min-width="10%">
        </el-table-column>
        <el-table-column prop="QQ" label="QQ" min-width="10%">
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="10%">
        </el-table-column>
        <el-table-column prop="userName" label="隶属人" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="10%"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" min-width="10%">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="update(scope)">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">回访</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="res"
        background
        layout="prev, pager, next"
        :total="res.total"
        :page-size="limit"
        @current-change="change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCustomerList } from "@/api/customer";
export default {
  data() {
    return {
      res: null,
      type: "",
      search: "",
      page: 1,
      limit: 10,
      loading: true,
    };
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(to, 87);
      this.page = 1;
      this.limit = 10;
      this.type = "";
      this.search = "";
      this.queryData();
    },
  },
  methods: {
    update(scope){
      this.$router.push({
        path:'/custom/handle',
        query:{id:scope.row.id}
      })
    },
    handle() {
      // 当用户进行模糊搜索的时候，要先把当前的page改为1
      this.page = 1;
      this.queryData();
    },
    change(current) {
      console.log(current);
      this.page = current;
      this.queryData();
    },
    queryData() {
      this.loading = true; // 一旦重新发送请求，就把正在加载的loading打开
      let { type, search, page, limit } = this;
      getCustomerList({
        lx: this.$route.query.type || "my",
        type,
        search,
        page,
        limit,
      })
        .then((res) => {
          this.loading = false; // 当请求成功以后就把正在加载的loading关闭
          this.res = res;
        })
        .catch((res) => {
          this.loading = false;
          this.res.data = [];
          this.res.total = 0;
        });
    },
  },
  created() {
    this.queryData();
  },
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