<template>
  <div style="background-color: #f4f0e6" class="min-h-screen">
    <menu-top :username="username"></menu-top>

    <div class="-mt-16">
      <div>
        <div class="absolute top-60 left-1/4 opacity-100">
          <span class="tracking-widest font-black text-3xl"
            >加入我们，体验不一样的驾驶乐趣！汽车装饰，我们同样在行！</span
          >
        </div>
        <img src="../../assets/img/中国红.jpg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import menuTop from '../../components/menuTop.vue';
import MenuTop from '../../components/menuTop.vue';

export default defineComponent({
  components: {
    menuTop,
    MenuTop,
  },
  data() {
    return {};
  },
  created() {
    this.username = this.$store.state.name;
  },
  mounted() {},
  methods: {},
});
</script>
<style scoped>
#second {
  position: absolute;
  top: 1200px;
}

#third {
  position: absolute;
  top: 2250px;
}
</style>
