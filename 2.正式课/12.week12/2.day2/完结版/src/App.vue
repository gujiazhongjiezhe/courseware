<template>
  <div id="app">
    <!-- 头部主导航 -->
    <header class="headerBox" ref="headerBox">
      <h1 class="logo">CRM客户管理系统</h1>
      <el-menu
        mode="horizontal"
        class="el-menu-demo"
        background-color="#3A3D42"
        text-color="#FFF"
        active-text-color="#FFD04B"
        :default-active="activeIndex()"
      >
        <el-menu-item index="1">
          <router-link to="/custom">客户管理</router-link>
        </el-menu-item>
        <el-menu-item index="2" v-power="power">
          <router-link to="/system">系统设置</router-link>
        </el-menu-item>
      </el-menu>

      <div class="baseBox">
        <span>{{ name }}</span>
        <a href="javascript:;" @click="dialogVisible = true">修改密码</a>
        <a href="javascript:;" @click="exit">安全退出</a>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="mainBox" ref="mainBox">
      <router-view></router-view>
    </main>

    <!-- DIALOG -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="secondPassword">
            <el-input type="password" v-model="form.secondPassword"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import { queryUserInfo, signOut,resetPassword } from "./api/login";
export default {
  components: {},
  data() {
    return {
      power: "userhandle",
      name: "请登录",
      dialogVisible: false,
      form:{
        password:'',
        secondPassword:''
      }
    };
  },
  created() {
    console.log(111);
    queryUserInfo().then((res) => {
      this.name = res.data.name;
    });
  },
  methods: {
    submit(){
      let {password,secondPassword} = this.form;
      // 用户点击提交执行
      let reg = /^\w{6,16}$/;
      if(!reg.test(password) || !reg.test(secondPassword)){
        this.$message.error('当前密码格式不符合规范')
        return;
      }
      if(password !== secondPassword) {
        this.$message.error('当前两次密码不一致，请修改');
        return;
      }
      resetPassword({
        password:md5(password)
      }).then(res=>{
        this.$message.success('当前密码修改成功');
         this.$refs.form.resetFields(); // 清空表单
        this.dialogVisible = false; // 关闭对话框
      }).catch(res=>{
        this.$message.error('当前密码修改失败');
      })

    },
    handleClose() {
      // 次函数会在关闭对话框之前执行
      this.$refs.form.resetFields();
      console.log( this.$refs.form);
      this.dialogVisible = false;
    },
    activeIndex() {
      let hash = location.hash;
      if (hash.includes("custom")) {
        return "1";
      }
      if (hash.includes("system")) {
        return "2";
      }
    },
    exit() {
      signOut()
        .then((res) => {
          this.$alert("您当前退出成功，请点击确定", "温馨提示", {
            callback: (text) => {
              location.href = "/login.html";
            },
          });
        })
        .catch((res) => {
          this.$message.error("当前退出失败，请稍后重试");
        });
    },
  },
  mounted() {
    let winH = document.documentElement.clientHeight,
      headerBox = this.$refs.headerBox,
      mainBox = this.$refs.mainBox;
    mainBox.style.height = winH - headerBox.offsetHeight + "px";
    this.$forceUpdate(); // 让视图强制刷新
  },
};
</script>

<style lang='less'>
html,
body,
#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

/* ==HEADER== */
@H: 62px;
.headerBox {
  display: flex;
  justify-content: space-between;
  height: @H;
  background: #3a3d42;
  overflow: hidden;

  .logo {
    width: 20%;
    line-height: @H;
    text-align: center;
    font-size: 20px;
    color: #fff;
    letter-spacing: 3px;
  }

  .baseBox {
    box-sizing: border-box;
    padding-right: 10px;
    width: 30%;
    line-height: @H;
    text-align: right;
    font-size: 16px;

    span,
    a {
      margin: 0 5px;
      color: #fff;
    }

    a {
      text-decoration: underline;
    }
  }

  .el-menu-demo {
    box-sizing: border-box;
    width: 46%;

    li {
      font-size: 16px !important;

      a {
        display: block;
        height: 100%;
      }
    }
  }
}

.mainBox {
  display: flex;
  overflow: hidden;
}
</style>