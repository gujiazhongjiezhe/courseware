<style lang="less">
.container {
  // width: 600px;
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
        <el-tag :type="type === 0 ? 'success' : 'info'" @click="type = 0"
          >全部</el-tag
        >
        <el-tag :type="type === 1 ? 'success' : 'info'" @click="type = 1"
          >未完成</el-tag
        >
        <el-tag :type="type === 2 ? 'success' : 'info'" @click="type = 2"
          >已完成</el-tag
        >
      </section>

      <!-- 表格部分 -->
      <el-table :data="taskList" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="task"
          label="任务描述"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100"
          :formatter="handleState"
          align="center"
        >
          <!--  formatter此字段是自定义表格里显示的数据的-->
        </el-table-column>
        <el-table-column
          prop="time"
          label="完成时间"
          width="200"
          :formatter="handleTime"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDel(scope)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.state === 1 ? true : false"
              @click="handleFinish(scope)"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹框部分 -->
      <el-dialog
        title="创建新任务"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal='false'
        width="90%"
      >
        <span>
          <!-- 这是分隔线 -->

          <el-form
            :model="info"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="任务描述" prop="desc">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="info.desc"
              >
              </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="完成时间" prop="time">
              <el-date-picker
                v-model="info.time"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="addTask">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addTaskList, delTask, finishTask } from "./api/task";
import moment from "moment"; // 自己下载的第三方处理时间的模块
export default {
  name: "App",
  components: {},
  data() {
    return {
      type: 0, // type控制的是当前用户选择的状态 0 1 2
      info: {
        time: new Date(new Date().getTime() + 24*60*60*1000),
        desc: "",
      },
      rules: {
        desc: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
      },
      dialogVisible: false, // 控制模态框的显示隐藏
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
    handleDel(scope) {
      // 在执行删除的逻辑之前，最好给用户一个提示，问问用户是否要真的进行删除
      let id = scope.row.id;
      this.$confirm(`您确定要删除${id}号任务吗?`, "温馨提示", {
        confirmButtonText: "是的",
        cancelButtonText: "我不删除了",
        type: "warning",
      }).then(() => {
        delTask({
          id,
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.$store.dispatch("task/updateTaskListAction");
          }
        });
      });
    },
    handleFinish(scope) {
      let id = scope.row.id;
      this.$confirm(`您确定要把${id}号任务改为完成吗?`, "温馨提示", {
        confirmButtonText: "是的",
        cancelButtonText: "我不改了",
        type: "warning",
      }).then(() => {
        finishTask({
          id,
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$store.dispatch("task/updateTaskListAction");
          }
        });
      });
    },
    handleState(item) {
      // console.log(item);
      // 自定义状态列显示的内容
      return item.state === 1 ? "未完成" : "已完成";
    },
    handleTime(item) {
      let time = item.state === 1 ? item.time : item.complete;
      return time;
      // 如果当前任务是未完成的，那页面就显示time(新增任务的时候预估完成的时间)，如果当前任务是已经完成的，那就显示complete(你实际点击完成的时间)
    },
    handleClose() {
      // 在用户点击叉号的时候执行该函数
      console.log("用户想关闭页面");
      if (!this.info.desc) {
        this.$refs.ruleForm.resetFields();
        this.dialogVisible = false;
        return;
      }
      this.$confirm("当前新增任务还没有完成, 是否关闭?", "提示", {
        confirmButtonText: "ok",
        cancelButtonText: "no",
        type: "warning",
      })
        .then(() => {
          // 当你点击ok的时候就会执行成功的回调函数
          this.$refs.ruleForm.resetFields();
          this.dialogVisible = false;
        })
        .catch(() => {
          // 当你点击no就会执行失败的回调
        });
    },
    addTask() {
      // this.$refs.ruleForm.validate() 进行表单校验的
      //  this.$refs.ruleForm.resetFields(); // 清空表单内容的
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return; // 如果表单校验不通过，这里的valid是false，就不要让逻辑往下走了(表单全部校验通过，逻辑再往下走)

        // 这里编写进行发送请求的逻辑
        let time = moment(this.info.time).format("YYYY-MM-DD hh:mm:ss");
        // 因為服務器存儲的時間是YYYY-MM-DD hh:mm:ss這樣的，所以咱們的自己把格式處理的，而momemt就是專門處理時間格式的插件
        // console.log(time);
        addTaskList({
          task: this.info.desc,
          time,
        }).then((res) => {
          // console.log(res);
          let text = "恭喜你，新增成功";
          let type = "success";
          if (res.code !== 0) {
            // 如果新增失败，就把message的类型改为warning，文案改为新增失败
            (text = "很遺憾，新增失败"), (type = "warning");
          }
          this.$message({
            message: text,
            type: type,
          });
          this.dialogVisible = false;
          this.$store.dispatch("task/updateTaskListAction");
        });
      });
      console.log("用户想往后台发送新增任务的请求");
    },
  },
  created() {
    // 当页面初次渲染的时候，去dispatch 更新state中的taskList
    this.$store.dispatch("task/updateTaskListAction");
  },
  computed: {
    taskList() {
      // 每一次计算的时候，根据用户点击的type值，来对tastList数据进行过滤处理
      let taskList = this.$store.state.task.taskList || [];
      // console.log(taskList);
      if (this.type === 0) {
        return taskList;
      }
      return taskList.filter((item) => {
        return item.state === this.type;
      });
    },
  },
};
</script>

