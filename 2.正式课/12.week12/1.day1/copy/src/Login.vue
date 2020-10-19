<template>
  <div class="container">
    <!-- MAINBOX -->
    <main class="mainBox">
      <h1 class="title">CRM客户管理系统</h1>
      <p class="tip">为保护企业的数据安全，请妥善保管密码</p>
      <section class="loginBox">
        <div class="form">
          <i class="iconfont icon-yonghuming"></i>
          <input
            v-model="account"
            type="text"
            class="userName"
            placeholder="请输入用户名/手机号/邮箱"
          />
        </div>
        <div class="form">
          <i class="iconfont icon-mima"></i>
          <input
            v-model="password"
            type="password"
            class="userPass"
            placeholder="请输入登录密码"
          />
        </div>
        <button class="submit" @click="handleLogin">登录</button>
      </section>
    </main>
    <!-- FOOTER -->
    <footer class="footerBox">
      <span>北京珠峰世纪技术培训有限公司</span>
      <span>京ICP备09041920号</span>
      <span>京公网安备110108400531号</span>
    </footer>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import {handleLogin} from './api/login'
// import * as API from "./api/login"; // 把login中的所有函数都倒进来，用API接收 API.handleLogin

export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    checkAccount(){
      // 用户名、邮箱、手机号
      let argArr = [
        /^((\w{2,20})|([\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}))$/,
        /^1\d{10}$/,
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
      ];
      return argArr.some(item=>{
        return item.test(this.account)
      })
    },
    checkPassword(){
      return /^\w{6,16}$/.test(this.password);
    },
    handleLogin(){
        // 所有登录逻辑都在这里完成
        if(!this.checkAccount() || !this.checkPassword()){
          this.$message.error('提示，当前的用户名或者密码不正确，请重新输入')
          return;
        }
        let password = md5(this.password)
        handleLogin({
          account:this.account,
          password
        }).then(res=>{
            this.$alert('恭喜您，登录成功','温馨提示',{
              callback:()=>{
                location.href = location.origin + '/index.html'
                // /index.html可以不写，因为如果请求的时候不携带的路径话，后台会默认返回index页
              }
            })
        }).catch((res)=>{
             this.$message.error('您当前输入的用户名和密码不匹配，请重新输入');
        })
    }
  }

};
</script>

<style lang='less'>
html,
body,
.container {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

.container {
  overflow: hidden;
  height: 100%;
  font-size: 14px;
  background: url("./assets/login_bg.jpg") repeat-x;
  background-size: 100% 50%;
}

.mainBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 400px;

  .title,
  .tip {
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-weight: normal;
  }

  .tip {
    font-size: 18px;
    color: #bebebf;
  }

  .loginBox {
    box-sizing: border-box;
    margin-top: 20px;
    padding: 25px;
    background: #fff;
    border: 1px solid #f4f4f4;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);

    .form {
      position: relative;
      margin: 10px 0;

      input {
        box-sizing: border-box;
        padding-left: 40px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border: 1px solid #aaa;
      }

      i {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        &.icon-mima {
          left: 7px;
          font-size: 26px;
        }
      }
    }

    .submit {
      box-sizing: border-box;
      margin: 10px 0;
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      background: #2299ee;
      border: none;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}

.footerBox {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #999;

  span {
    padding: 0 10px;
  }
}
</style>