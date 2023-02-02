<script>
import { defineComponent } from 'vue';
import menuTop from '../../components/menuTop.vue';
import { getCustomerInfo, customerEdit } from '../../api/user';
import { getSalespersonInfo, salepersonEdit } from '../../api/salesperson';
import { ElMessage } from 'element-plus';

export default defineComponent({
  components: {
    menuTop,
  },
  data() {
    return {
      username: '',
      userInfo: {},
      role: '',
      visible: false,
      confirmLoading: false,
    };
  },
  created() {
    this.username = this.$store.state.name;
    this.role = this.$store.state.role;
    if (this.role == 'customer') {
      getCustomerInfo({ username: this.username }).then((res) => {
        this.userInfo = res;
      });
    } else if (this.role == 'salesperson') {
      getSalespersonInfo({ username: this.username }).then((res) => {
        this.userInfo = res;
      });
    } else {
      ElMessage.error('人员错误！！！');
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      if (this.role == 'customer') {
        customerEdit(this.userInfo).then((res) => {
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        });
      } else if (this.role == 'salesperson') {
        salepersonEdit(this.userInfo).then((res) => {
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        });
      } else {
        ElMessage('用户错误！');
      }
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

    <div class="flex mt-20">
      <div class="flex-none w-16 h-16">
        <!-- This item will not grow -->
      </div>
      <div class="flex-grow h-16">
        <a-card hoverable>
          <a-descriptions
            title="用户信息卡"
            bordered
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
          >
            <a-descriptions-item label="用户名">
              {{ username }}
            </a-descriptions-item>
            <a-descriptions-item label="会员ID">
              {{ userInfo.id }}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              {{ userInfo.tel }}
            </a-descriptions-item>
            <a-descriptions-item label="会员等级">
              {{ role }}
            </a-descriptions-item>
            <!-- TODO: 完成修改用户信息功能 -->
            <a-descriptions-item label="操作"
              ><a-button type="primary" @click="showModal">
                修改用户信息
              </a-button></a-descriptions-item
            >
            <a-descriptions-item label="Config Info">
              This is why we play！
            </a-descriptions-item>
          </a-descriptions>
          <a-modal
            title="Title"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <el-form
              ref="editFormRef"
              :model="userInfo"
              status-icon
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" disabled />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userInfo.password" />
              </el-form-item>
              <el-form-item label="联系方式" prop="tel">
                <el-input v-model="userInfo.tel" />
              </el-form-item>
            </el-form>
          </a-modal>
        </a-card>
      </div>
      <div class="flex-none w-16 h-16 ...">
        <!-- This item will not grow -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>
