<template>
  <el-container style="background-color: #dadada">
    <menuTop :username="username"></menuTop>
    <div class="header-banner">
      accessories shopping
      <img
        src="https://s2.loli.net/2022/05/11/IPmWSoGU3dgsKiw.png"
        class="logo-img"
      />
      <span class="slogan-banner"
        >The bright moon decorated your Windows, and I decorated your
        dreams</span
      >
    </div>
    <!--    主图-->
    <el-container>
      <el-main class="img-aside"
        >Don't Let The <br />Accessories Slow U <br />Down.<br />
        <span class="description"
          >The real mistake is in not tuning your car at all after significant
          upgrades.you can to make your car as efficient as possible.</span
        >
      </el-main>
      <el-main class="img-top">
        <div class="block">
          <el-image :src="src" fit="cover" style="display: block">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </el-main>
    </el-container>
    <!--    主图下文字-->
    <div class="text-under-img">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            FREE SHIPPING IN THE USA Free.Free shipping on all orders over $100.
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            Exchanges are on us, as many times you need to get the fit just
            right!
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            Choose Sezzle at checkout to pay in 4 interest-free instalments.
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            We are counting down to 31 December 2022, the deadline we have set
            to achieve.
          </div></el-col
        >
      </el-row>
    </div>
    <el-main>
      <el-carousel
        :interval="2000"
        type="card"
        height="400px"
        indicator-position="none"
        style="background-color: #f4f0e6"
      >
        <el-carousel-item v-for="item in swtich" :key="item">
          <div class="block">
            <el-image :src="item.url" fit="fill"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <div class="text-under-carousel">
      We believe that if we are all more connected to and respectful of nature,
      we would be happier and healthier. So, we are committed to making
      environmentally progressive footwear that helps you Be Outside.
    </div>
    <div id="two-pic" class="flex justify-center">
      <div>
        <a-card hoverable style="width: 600px">
          <img
            slot="cover"
            alt="手表"
            src="https://s2.loli.net/2022/04/19/U5TM3RGAOkBI2rl.jpg"
          />
        </a-card>
      </div>
      <div>
        <a-card hoverable style="width: 600px">
          <img
            slot="cover"
            alt="手镯"
            src="https://s2.loli.net/2022/04/19/TyjWSokRHhEzJfV.jpg"
          />
        </a-card>
      </div>
    </div>
    <el-footer>
      <div class="flex justify-center my-6">
        <div @click="showCurrentUser">Tesla © 2022</div>
        <el-divider direction="vertical"></el-divider>
        <div>沪ICP备2021004806号-1</div>
        <el-divider direction="vertical"></el-divider>
        <div>沪公网安备 31011502017892 号</div>
        <el-divider direction="vertical"></el-divider>
        <div>隐私和法律</div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import { defineComponent } from 'vue';
import menuTop from '../components/menuTop.vue';

export default defineComponent({
  components: {
    menuTop,
  },
  // 当前用户名
  props: ['username'],
  data() {
    return {
      src: 'https://s2.loli.net/2022/04/19/w1nJOrSp3cljXuU.jpg',
      swtich: [
        { url: 'https://s2.loli.net/2022/04/19/iGIrQ9pgZ7TkLB1.jpg' },
        { url: 'https://s2.loli.net/2022/04/19/JrmKSLhP8G79AM1.jpg' },
        { url: 'https://s2.loli.net/2022/04/19/dRWXkSKDzpl9aMg.jpg' },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 路由跳转到首页
    toIndex() {
      this.$router.push('/');
    },
    // 路由跳转到商城页面
    toShop() {
      this.$router.push('/shop');
    },
  },
});
</script>
<style scoped>
.header-banner {
  background-color: #f4f0e6;
  color: #204969;
  text-align: center;
  line-height: 60px;
  font-size: x-large;
  font-family: 'Ink Free';
  font-weight: bolder;
  text-align: left;
  padding-left: 7%;
  padding-top: 60px;
}
.el-footer {
  background-color: #f4f0e6;
  color: #204969;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding: 0;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/*logo-img*/
.logo-img {
  height: 100px;
  float: right;
  margin-right: 10%;
}
/*slogan-banner*/
.slogan-banner {
  float: right;
  margin-right: 7%;
  margin-top: 10px;
  font-size: medium;
  color: #8ac6d1;
}
/*img-aside*/
.img-aside {
  background-color: #ceefe4;
  width: 50%;
  font-size: 3em;
  font-weight: bolder;
  font-family: 'PingFang SC';
  text-align: left;
  padding-left: 10%;
  line-height: unset;
  float: left;
  padding-top: 7%;
  padding-right: 60px;
}
/*img-top*/
.img-top {
  width: 50%;
}
/*description*/
.description {
  font-size: medium;
  font-weight: normal;
}
/*text-under-img*/
.text-under-img {
  background-color: #f4f0e6;
  color: #204969;
  text-align: center;
  line-height: 30px;
  font-size: large;
  font-family: 'Ink Free';
  font-weight: bold;
  text-align: left;
  height: 200px;
  padding: 60px 70px;
}
/*center-text*/
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /*background: #d3dce6;*/
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 70px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/*two-pic*/
#two-pic {
  background-color: #f4f0e6;
  height: 600px;
}
.image {
  width: 100%;
  display: block;
}
/*text-under-carousel*/
.text-under-carousel {
  background-color: #f4f0e6;
  color: #204969;
  text-align: center;
  line-height: 30px;
  font-size: xx-large;
  font-family: 'Ink Free';
  font-weight: bolder;
  height: 200px;
  padding: 60px 70px;
}
/*text-bottom*/
.text-bottom {
  background-color: #f4f0e6;
  color: #204969;
  text-align: center;
  line-height: 30px;
  font-size: medium;
  font-family: 'PingFang SC';
  font-weight: normal;
  height: 200px;
  padding: 60px 70px;
}
</style>
