<template>
  <div class="login-container">
    <el-form
      ref="refLoginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">
          Login Form
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          @keyup.enter="handleLogin"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on" />
        <span @click="showPwd" class="show-pwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button @click.prevent="handleLogin" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;">
        Login
      </el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { login } from '@/api/api'
import tools from '@/plugins/tools'
import { defineComponent, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    function validateUsername (rule: any, value: {length: number}, callback: (error?: Error) => void) {
      if (!value.length) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }

    function validatePassword (rule: any, value: {length: number}, callback: (error?: Error) => void) {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const loginForm = reactive({
        username: 'admin',
        password: '123456'
      }),

      loginRules = reactive({
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }),

      loading = ref(false),
      passwordType = ref('password'),
      redirect = ref(''),

      route = useRoute()
    watch(() => route, route => {
      route.query && typeof route.query.redirect === 'string' && (redirect.value = route.query.redirect)
    }, {
      immediate: true
    })

    const password = ref<null | { focus:() => null }>(null)
    function showPwd () {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      password.value?.focus()
    }

    const router = useRouter(),
      refLoginForm = ref<null | {validate:(callback: (valid: boolean) => void | boolean) => null}>(null)
    function handleLogin () {
      refLoginForm.value?.validate(valid => {
        if (valid) {
          loading.value = true
          // window.setTimeout(() => {
          //   router.push({ path: redirect.value || '/' })
          //   loading.value = false
          // }, 3000)


          login(loginForm).then((res) => {
            tools.setStore('admin_token', res.data.access_token, new Date('2022-4-15').getTime())
            router.push({ path: redirect.value || '/' })
            loading.value = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    return {
      passwordType,
      password,
      showPwd,
      loading,
      loginForm,
      loginRules,
      handleLogin,
      refLoginForm
    }
  }
})
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-plus css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

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
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
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
}
</style>
