<script>
import { defineComponent } from 'vue';
import {
  productsApi,
  productsByNameGet,
  getAdviceProducts,
} from '../../api/products';
import menuTop from '../../components/menuTop.vue';
import { getId, addToCart } from '../../api/cart';
import { ElMessage } from 'element-plus';

export default defineComponent({
  components: {
    menuTop,
  },
  data() {
    return {
      username: '',
      id: '',
      list: [],
      visible: false,
      adviceList: [],
    };
  },
  created() {
    this.getUserList();
    this.username = this.$store.state.name;
    this.id = this.$store.state.id;
  },
  methods: {
    async getUserList() {
      await productsApi().then((res) => {
        this.list = res;
      });
    },
    async onSearch(value) {
      try {
        if (value != []) {
          const res = await productsByNameGet({ title: value });
          // 返回的 res 是一个对象，不是数组
          this.list = res;
        } else {
          this.getUserList();
        }
      } catch (error) {
        this.list = [];
        console.error(error);
      }
    },
    async cilckButton(item) {
      if (item.surplus === 0) {
        ElMessage.error('商品没有库存');
      } else {
        await addToCart(this.id, item.id, 1).then((res) => {
          ElMessage.success('添加成功');
        });
        await getAdviceProducts(item.title).then((res) => {
          this.adviceList = res;
        });
        this.visible = true;
      }
    },
    handleOk(e) {
      this.visible = false;
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
});
</script>
<template>
  <div style="background-color: #f4f0e6" class="min-h-screen">
    <menuTop :username="username"></menuTop>
    <div class="grid grid-cols-3 gap-4 justify-items-center">
      <div class="pt-5 font-extrabold antialiased text-3xl">优选配件</div>
      <div class="col-span-2 pt-5">
        <a-input-search
          placeholder="input search text"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </div>
      <div class="border-2 my-5" v-for="item in list">
        <!-- 动态渲染商品列表 -->
        <!-- TODO：1、修改数据库中商品信息，使之能存储商品图片 √
            2、完成按钮点击功能 √
            3、完成购物车功能 √
            4、图片懒加载
            5、Fix Bug： menuTop组件中的active不能正常改变 √
            -->
        <a-card hoverable style="width: 400px; height: auto">
          <img slot="cover" alt="example" :src="item.imgurl" v0 />
          <a-card-meta :title="item.title" :description="'￥' + item.price">
          </a-card-meta>
          <a-space>
            <a-button
              id="add"
              type="danger"
              class="mt-4"
              @click="cilckButton(item)"
              >加入购物车</a-button
            >
          </a-space>
        </a-card>
      </div>
      <!-- 推荐商品 -->
      <a-modal
        title="猜你喜欢"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div class="border-2 my-5" v-for="item in adviceList">
          <a-card hoverable style="width: 400px; height: auto">
            <img slot="cover" alt="example" :src="item.imgurl" v0 />
            <a-card-meta :title="item.title" :description="'￥' + item.price">
            </a-card-meta>
            <a-space>
              <a-button
                id="add"
                type="danger"
                class="mt-4"
                @click="cilckButton(item)"
                >加入购物车</a-button
              >
            </a-space>
          </a-card>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<style scoped></style>
