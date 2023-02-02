<template>
  <div class="h-screen outer bg-gray-400" style="padding-top: 12%">
    <div class="container mx-auto bg-gray-200 w-96 rounded-xl">
      <el-tabs
        :tab-position="tabPosition"
        style="padding-left: 20px"
        class="demo-tabs"
      >
        <el-tab-pane label="用户登录">
          <div class="login-container rounded-b-xl">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">Login Form</h3>
              </div>

              <el-form-item prop="username">
                <!-- icon-user -->
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <user></user>
                  </el-icon>
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <!-- icon-password -->
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <key></key>
                  </el-icon>
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <!-- icon-eye -->
                  <el-icon style="vertical-align: middle">
                    <reading></reading>
                  </el-icon>
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >Sign In</el-button
              >
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售员登录">
          <div class="login-container rounded-b-xl">
            <el-form
              ref="salesmanloginForm"
              :model="salesmanloginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">Login Form</h3>
              </div>

              <el-form-item prop="username">
                <!-- icon-user -->
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <user></user>
                  </el-icon>
                </span>
                <el-input
                  ref="username"
                  v-model="salesmanloginForm.username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <!-- icon-password -->
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <key></key>
                  </el-icon>
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="salesmanloginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="salesmanLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <!-- icon-eye -->
                  <el-icon style="vertical-align: middle">
                    <reading></reading>
                  </el-icon>
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="salesmanLogin"
                >Sign In</el-button
              >
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <div class="register-container rounded-b-xl">
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="registerRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="register-title">register Form</h3>
              </div>

              <el-form-item prop="username">
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <user></user>
                  </el-icon>
                </span>
                <el-input
                  ref="username"
                  placeholder="Username"
                  v-model="registerForm.username"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <el-icon style="vertical-align: middle">
                    <key></key>
                  </el-icon>
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="registerForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleRegister"
                />
                <span class="show-pwd" @click="showPwd">
                  <el-icon style="vertical-align: middle">
                    <reading></reading>
                  </el-icon>
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleRegister"
                >Sign Up</el-button
              >
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue';
import { register } from '../../api/user';

export default defineComponent({
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      loginForm: {
        username: '西奥',
        password: '123456',
      },
      salesmanloginForm: {
        username: '苏萌',
        password: '123456',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      registerForm: {
        username: '22岁的男人',
        password: '123456',
        tel: '123456789',
        role: 'customer',
      },
      registerRules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名在1~10个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 6, max: 13, message: '密码在6~13个字符', trigger: 'blur' },
          // { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    salesmanLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('salesmanLogin', this.salesmanloginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleRegister() {
      // register(this.registerForm).then(res => {
      //   ElMessage.success("注册成功");
      //   this.$router.go(0);
      // })
      this.$refs.registerForm.validate(async (valid) => {
        if (!valid) return;
        await register(this.registerForm);
        ElMessage.success('注册成功');
        this.$router.go(0);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
});
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #3d4b64;
$light_gray: #3a3f47;
$cursor: #33363b;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input .register-container {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container,
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    ::placeholder {
      color: #a39391;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #eaeaea;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container,
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form,
  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px 50px;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: rgb(115, 124, 124);
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #368cbf;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .register-title {
    font-size: 26px;
    color: #7ebc59;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
