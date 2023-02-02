<script>
import IndexItem from '../../components/IndexItem.vue';
import { getAnnouncementApi } from '../../api/announcement';
import { defineComponent } from 'vue';
import store from '../../store';

export default defineComponent({
  components: {
    IndexItem,
  },
  data() {
    return {
      username: '',
      visible: false,
      infos: null,
      info: '',
    };
  },
  created() {
    this.username = store.state.name;
    this.getAnnouncement();
  },
  methods: {
    handleOk(e) {
      this.visible = false;
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    async getAnnouncement() {
      await getAnnouncementApi().then((res) => {
        this.infos = res;
        let length = this.infos.length;
        this.info = this.infos[length - 1].content;
        this.visible = true;
      });
    },
  },
});
</script>

<template>
  <IndexItem :username="username"></IndexItem>
  <!-- 公告显示 -->
  <a-modal
    title="最新公告"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div v-html="info"></div>
  </a-modal>
</template>
