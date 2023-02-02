<script>
import { defineComponent, ref } from 'vue';
import menuTop from '../../components/menuTop.vue';
import {
  productsApi,
  productsByNameGet,
  productsReduce,
} from '../../api/products';
import { salesAdd } from '../../api/salesperson';
import { addToOrders } from '../../api/orders';
import { getId, clearCart, deleteItem } from '../../api/cart';
import { ElMessage } from 'element-plus';
import { objectToString } from '@vue/shared';
export default defineComponent({
  components: {
    menuTop,
  },

  data() {
    return {
      username: '',
      id: '',
      role: '',
      list: [],
      countNum: 0,
      totalAmount: 0,
      visible: false,
      confirmLoading: false,
      spinning: false,
      orders: {
        id: '',
        time: null,
        role: '',
        userId: '',
        items: { list: '' },
      },
    };
  },
  created() {
    // this.getUserList();
    this.username = this.$store.state.name;
    this.id = this.$store.state.id;
    this.role = this.$store.state.role;
    this.getUserId(this.id);
    const visible = ref(false);
  },
  methods: {
    async getUserList() {
      await productsApi().then((res) => {
        this.list = res;
      });
    },
    // 获取redis数据库中当前用户的购物车数据【根据用户id】
    async getUserId(id) {
      await getId(id).then((res) => {
        this.list = res.items;
        this.countNum = res.countNum;
        this.totalAmount = res.totalAmount;
      });
    },
    // 根据用户id添加绩效
    async addSales(id, count) {
      await salesAdd(id, count);
    },
    // 减少库存
    async reduceProduct(id, count) {
      await productsReduce(id, count);
    },
    // async toPay(id) {
    //   await clearCart(id);
    //   this.$router.go(0);
    // },
    // 从购物车中删除当前商品
    async deleteItem(id, item) {
      await deleteItem(id, item.id);
      this.$router.go(0);
    },
    async showModal() {
      this.visible = true;
      await setTimeout(() => {
        this.spinning = true;
      }, 2000);
      await setTimeout(() => {
        ElMessage.success('支付成功！');
        this.visible = false;
        // 将库存量减少
        this.list.forEach((element) => {
          this.reduceProduct(element.id, element.count);
          // 如果是salesperson就将绩效+1
          if (this.role === 'salesperson') {
            this.addSales(this.id, element.count);
          }
          let items = { list: this.list };
          this.orders.items = JSON.stringify(items);
          this.orders.userId = this.id;
          this.orders.role = this.role;
          // 清空购物车
          deleteItem(this.id, element.id);
        });
        // 添加订单
        addToOrders(this.orders);

        // 跳转到订单页
        this.$router.push('/orders');
      }, 4000);
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
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
    <el-card class="box-card">
      <el-table
        :data="this.list"
        max-height="30000"
        style="
          width: 100%;
          padding-left: 4%;
          padding-right: 4%;
          font-size: larger;
        "
        table-layout="fixed"
      >
        <el-table-column prop="title" label="商品名称" />
        <el-table-column prop="price" label="商品价格￥" />
        <el-table-column label="商品数量（件）" property="count">
          <template #default="scope">{{ scope.row.count }}</template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="小计￥" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteItem(this.id, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="grid grid-cols-6 gap2 border-2">
        <div></div>
        <div></div>
        <div></div>
        <div class="text-xl">商品总数量:{{ countNum }}</div>
        <div class="text-xl text-red-600 font-medium">
          总价:￥{{ totalAmount }}
        </div>
        <div>
          <a-button
            type="danger"
            block="true"
            style="font-size: larger"
            @click="showModal"
          >
            去结账
          </a-button>
        </div>
      </div>
      <a-modal
        title="支付"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-spin :spinning="spinning" size="large">
          <div class="spin-content">
            <img slot="cover" alt="example" src="/pay.jpg" />
          </div>
        </a-spin>
      </a-modal>
    </el-card>
  </div>
</template>
