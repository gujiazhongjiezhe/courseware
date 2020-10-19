<template>
  <div class="formBox">
    <div class="form">
      <div class="inpBox">
        <span>用户名</span>
        <input type="text" class="username" />
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>性别</span>
        <input type="radio" name="sex" checked />
        <label for>男</label>
        <input type="radio" name="sex" />
        <label for>女</label>
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>邮箱</span>
        <input type="text" class="useremail" />
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>电话</span>
        <input type="text" class="userphone" />
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>QQ</span>
        <input type="text" class="userqq" />
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>微信</span>
        <input type="text" class="userweixin" />
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>类型</span>
        <select>
          <option value="重点客户">重点客户</option>
          <option value="一般客户">一般客户</option>
          <option value="放弃客户">放弃客户</option>
        </select>
      </div>
      <span></span>
    </div>

    <div class="form">
      <div class="inpBox">
        <span>客户地址</span>
        <textarea></textarea>
      </div>
      <span></span>
    </div>

    <button class="submit">确认提交</button>
  </div>
</template>

<script>
export default {
  
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