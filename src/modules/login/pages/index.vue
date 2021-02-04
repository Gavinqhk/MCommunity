<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="show-image"></div>
      <div class="login-form-container">
        <div class="form-title"><span class="text">登录</span></div>
        <el-form class="login-form" :model="ruleForm" :rules="rules" ref="login" show-message>
          <el-form-item label="手机号码/邮箱" prop="account">
            <el-input
              placeholder="请输入手机号/邮箱"
              v-model="ruleForm.account"
              clearable
              @keyup.enter.native="login"
            />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              placeholder="请输入账户登录密码"
              v-model="ruleForm.password"
              clearable
              show-password
              @keyup.enter.native="login"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" id="login-btn" @click="login" :loading="loading">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { service, loginUtil } from "../setup";
  import Vue from "vue";
  export default Vue.extend({
    name: "login",
    data() {
      let accountValidator = function (rule: any, value: string, callback: (err?: Error) => void) {
        let val = loginUtil.trim(value);
        if (loginUtil.isEmpty(val)) {
          callback(new Error("请输入手机号码或邮箱"));
        } else {
          callback();
        }
      };
      let passwordValidator = function (rule: any, value: string, callback: (err?: Error) => void) {
        let val = loginUtil.trim(value);
        if (loginUtil.isEmpty(val)) {
          callback(new Error("请输入账户登录密码"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: "",
          password: "",
        },
        rules: {
          account: [{ validator: accountValidator, trigger: "blur" }],
          password: [{ validator: passwordValidator, trigger: "blur" }],
        },
        loading: false,
      };
    },
    methods: {
      getInstance() {
        return this as any;
      },
      login() {
        let instance = this.getInstance();
        let account = instance.ruleForm.account;
        let password = instance.ruleForm.password;
        instance.ruleForm.account = loginUtil.trim(account);
        instance.ruleForm.password = loginUtil.trim(password);
        if (instance.loading) {
          return;
        }
        instance.$refs.login.validate((valid: boolean) => {
          if (valid) {
            instance.loading = true;
            service.login(account, password, function (status: boolean) {
              if (status) {
                instance.$router.push({ name: "index" });
              }
              // instance.$router.push({ name: "index" });
              instance.loading = false;
            });
          }
        });
      },
    },
  });
</script>
<style lang="less" scoped>
  .login-wrapper {
    background-image: url("../assets/images/banner_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    .container {
      background-color: #fff;
      border-radius: 5px;
      width: 800px;
      height: 405px;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
      .show-image {
        float: left;
        width: 423px;
        height: 100%;
        background-image: url("../assets/images/left_banner.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .login-form-container {
        overflow: hidden;
        height: 100%;
        padding: 0 38.5px;
        .form-title {
          margin-top: 46px;
          border-bottom: 1px solid #ececec;
          padding-bottom: 2px;
          .text {
            border-bottom: 4px solid #2688fc;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            line-height: 48px;
            padding-bottom: 10px;
          }
        }
        .login-form {
          margin-top: 22px;
          /deep/.el-form-item {
            margin-bottom: 2px;
            &:first-child {
              margin-bottom: 8px;
            }
          }
          /deep/.el-form-item__label {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
          }
          /deep/.el-input {
            input {
              padding-left: 0px;
              border-top: 0px;
              border-left: 0px;
              border-right: 0px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #cfcfcf;
              line-height: 48px;
            }
          }
        }
        #login-btn {
          margin-top: 30px;
          width: 100%;
          height: 48px;
          font-size: 18px;
          line-height: 48px;
          padding: 0px 0px;
        }
      }
    }
  }
</style>
