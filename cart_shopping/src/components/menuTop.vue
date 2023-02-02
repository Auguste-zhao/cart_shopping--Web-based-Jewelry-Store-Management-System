<template>
  <el-menu
    :default-active="this.$route.name"
    class="el-menu-top rounded-b-3xl font-extrabold menu-top"
    mode="horizontal"
    background-color="rgba(82,82,82,0.4)"
    text-color="#0f0f0f"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <a href="/">
      <img
        class="h-12 w-40 mx-8"
        src="https://s2.loli.net/2022/02/11/wi8EDozCIUMpmdX.png"
        alt=""
    /></a>
    <el-menu-item index="home" @click="toHome">首页</el-menu-item>
    <el-menu-item index="shop" @click="toShop">在线商城</el-menu-item>
    <!-- TODO:实现购物车功能 -->
    <el-menu-item index="cart" @click="toCart">我的购物车 </el-menu-item>
    <el-menu-item index="account" @click="toAccount">账户</el-menu-item>
    <!-- TODO:实现Club功能 -->
    <el-menu-item index="club" @click="toClub">Ac.Club</el-menu-item>
    <div class="absolute top-4 right-16">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent style="color: #336699">
          {{ 'hi~' + username }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/account">个人信息</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/cart">我的购物车</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/orders">我的订单</router-link>
            </a-menu-item>
            <a-menu-item @click="logout">
              <span class="text-red-400">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </el-menu>
</template>
<script>
import { DownOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    DownOutlined,
  },
  props: ['username', 'id'],
  data() {
    return {
      // activeIndex: 'home',
    };
  },
  computed: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
  },
  methods: {
    toHome() {
      this.$router.push('/');
    },
    toShop() {
      this.$router.push('/shop');
    },
    toCart() {
      this.$router.push('/cart');
    },
    toAccount() {
      this.$router.push('/account');
    },
    toClub() {
      this.$router.push('/club');
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>
<style scoped>
.el-menu-top {
  position: sticky;
  top: 0px;
  z-index: 3;
}
.menu-top {
  font-family: 'JetBrains Mono Nerd Font';
}
</style>
