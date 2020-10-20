<template>
  <div class="form">
    <div style="margin-bottom: 10px">欢迎来到此页面</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="form.QQ"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="weixin">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择客户类型">
          <el-option label="重点客户" value="重点客户"></el-option>
          <el-option label="一般客户" value="一般客户"></el-option>
          <el-option label="放弃客户" value="放弃客户"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即{{ msg }}</el-button>

        <el-button @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCustomer, updateCustomer, getCustomerInfo } from "@/api/customer";
export default {
  data() {
    return {
      form: {
        name: "",
        sex: 0,
        email: "",
        phone: "",
        QQ: "",
        weixin: "",
        address: "",
        type: "重点客户",
      },
      msg: "新增",
      type: addCustomer,
    };
  },
  methods: {
    reset(formName) {
      // this.$refs[formName].resetFields();
      this.$refs.form.resetFields();
    },
    submit() {
      let { name, sex, email, phone, QQ, weixin, address, type } = this.form;
      let obj = { name, sex, email, phone, QQ, weixin, address, type };
      if (this.$route.query.id) {
        obj.customerId = this.$route.query.id;
      }
      let fn = this.type;
      fn(obj)
        .then((res) => {
          this.$alert(`当前${this.msg}客户成功,点击确定跳转到我的客户页面`, "提示", {
            callback: () => {
              this.$router.push("/custom/list?type=my");
            },
          });
        })
        .catch((res) => {
          this.$message.error(`不好意思，${this.msg}客户失败,请重试`);
        });

      // if (!this.$route.query.id) {
      //   addCustomer({
      //     name,
      //     sex,
      //     email,
      //     phone,
      //     QQ,
      //     weixin,
      //     address,
      //     type,
      //   })
      //     .then((res) => {
      //       this.$alert("当前新增客户成功,点击确定跳转到我的客户页面", "提示", {
      //         callback: () => {
      //           this.$router.push("/custom/list?type=my");
      //         },
      //       });
      //     })
      //     .catch((res) => {
      //       this.$message.error("不好意思，新增客户失败，请重试");
      //     });
      // } else {
      //   updateCustomer({
      //     customerId:this.$route.query.id,
      //     name,
      //     sex,
      //     email,
      //     phone,
      //     QQ,
      //     weixin,
      //     address,
      //     type,
      //   })
      //     .then((res) => {
      //       this.$alert("当前修改客户成功,点击确定跳转到我的客户页面", "提示", {
      //         callback: () => {
      //           this.$router.push("/custom/list?type=my");
      //         },
      //       });
      //     })
      //     .catch((res) => {
      //       this.$message.error("不好意思，修改客户失败，请重试");
      //     });
      // }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.type = updateCustomer;
      this.msg = "修改";
      getCustomerInfo({
        customerId: this.$route.query.id,
      }).then((res) => {
        console.log();
        let { name, sex, email, phone, QQ, weixin, address, type } = res.data;
        this.form = { name, sex, email, phone, QQ, weixin, address, type };
      });
    }
  },
};
</script>

<style lang="less" scoped>
.formBox {
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
  font-size: 14px;
  overflow-y: auto;
}

.formBox .form {
  /* margin-bottom: 15px; */
}

.formBox .form > .inpBox {
  display: flex;
}

.formBox .form > .inpBox > span {
  margin-right: 15px;
  width: 100px;
  line-height: 30px;
  text-align: right;
}

.formBox .form > .inpBox > input[type="text"] {
  box-sizing: border-box;
  width: 300px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}

.formBox .form > .inpBox > input[type="radio"],
.formBox .form > .inpBox > input[type="checkbox"],
.formBox .form > .inpBox > label {
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}

.formBox .form > .inpBox > label {
  margin-right: 20px;
}

.formBox .form > .inpBox > select {
  box-sizing: border-box;
  width: 150px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}

.formBox .form > .inpBox > textarea {
  box-sizing: border-box;
  width: 300px;
  padding: 0 10px;
  height: 90px;
  line-height: 30px;
}

.formBox .form > span {
  display: block;
  padding-left: 115px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  color: lightcoral;
}

.formBox .submit {
  margin-left: 110px;
  border: none;
  background: #29e;
  color: #fff;
  width: 150px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
</style>