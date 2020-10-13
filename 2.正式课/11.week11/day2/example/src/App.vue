<style lang="less">
.container {
  width: 600px;
  margin: 20px auto;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 10px;
  .headerBox {
    position: relative;
    border-bottom: 2px solid gainsboro;
    .button {
      position: absolute;
      right: 0;
      top: 0%;
    }
  }
  .card {
    span {
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div id="app">
    <div class="container">
      <!-- 头部 -->
      <header class="headerBox">
        <h2>板牙拖车</h2>
        <el-button type="success" class="button" @click="dialogVisible = true"
          >创建任务</el-button
        >
      </header>
      <!-- 中间切换页卡部分 -->
      <section class="card">
        <el-tag type="success">全部</el-tag>
        <el-tag type="info">未完成</el-tag>
        <el-tag type="info">已完成</el-tag>
      </section>

      <!-- 表格部分 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50"> </el-table-column>
        <el-table-column prop="desc" label="任务描述" width="200">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="time" label="完成时间" width="150">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template>
            <el-button type="text" size="small" @click="open2">删除</el-button>
            <el-button type="text" size="small">完成</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹框部分 -->
      <el-dialog title="创建新任务" :visible.sync="dialogVisible" width="90%">
        <span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
          <el-divider></el-divider>
          <!-- 这是分隔线 -->
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      value1: "",
      textarea: "",
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          time: "2020-01-01",
          desc: "我要去旅游",
          status: 0,
        },
        {
          id: 2,
          time: "2020-03-01",
          desc: "我要去厕所",
          status: 1,
        },
      ],
    };
  },
  methods: {
    open2() {
      console.log(2222);
      this.$message({
        message: "恭喜你，删除成功",
        type: "success",
      });
    },
  },
};
</script>

