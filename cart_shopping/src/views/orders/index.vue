<script>
import { defineComponent, ref } from 'vue';
import menuTop from '../../components/menuTop.vue';
import { getOrders, getOrdersById } from '../../api/orders';
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
      itemList: [],
    };
  },
  created() {
    this.username = this.$store.state.name;
    this.id = this.$store.state.id;
    this.getOrders(this.id);
  },
  methods: {
    async getOrders(userId) {
      await getOrders(userId).then((res) => {
        this.list = res;
      });
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    async showDrawer(id) {
      await getOrdersById(id).then((res) => {
        let obj = JSON.parse(res.items);
        this.itemList = obj.list;
      });
      this.visible = true;
    },
    onClose() {
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
        <el-table-column prop="id" label="订单号" />
        <el-table-column prop="time" label="订单日期" />
        <el-table-column label="操作">
          <template #default="scope">
            <a-button type="primary" @click="showDrawer(scope.row.id)">
              Open
            </a-button>
            <a-drawer
              title="Basic Drawer"
              placement="right"
              width="600"
              :closable="false"
              :visible="visible"
              :after-visible-change="afterVisibleChange"
              @close="onClose"
            >
              <el-table
                :data="this.itemList"
                max-height="30000"
                style="
                  width: 100%;
                  padding-left: 4%;
                  padding-right: 4%;
                  font-size: samller;
                "
                table-layout="fixed"
              >
                <el-table-column prop="title" label="商品名称" />
                <el-table-column prop="price" label="商品价格￥" />
                <el-table-column label="商品数量（件）" property="count">
                  <template #default="scope">{{ scope.row.count }}</template>
                </el-table-column>
                <el-table-column prop="totalPrice" label="小计￥" />
              </el-table>
            </a-drawer>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
