<template>
  <v-data-table
    :headers="headers"
    :items="records"
    class="elevation-1"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List records</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <DeleteRecordDialog
          v-model="openDeleteDialog"
          @deleteRecord="deleteRecord"
        ></DeleteRecordDialog>
        <div class="d-flex">
          <div class="mr-2" style="width: 180px">
            <v-file-input
              v-model="recordFile"
              label="Record file input"
              outlined
              dense
            ></v-file-input>
          </div>
          <v-btn color="primary" dark class="mb-2" @click="addRecord">
            Add Record
          </v-btn>
        </div>
      </v-toolbar>
    </template>
    <template v-slot:[`item.email`]="{ item }">
      <span>{{ item.user.email }}</span>
    </template>
    <template v-slot:[`item.record_path`]="{ item }">
      <audio controls>
        <source :src="item.record_path" type="audio/ogg" />
      </audio>
    </template>
    <template v-slot:[`item.result_path`]="{ item }">
      <a :href="item.result_path">{{ getResultPath(item.result_path) }}</a>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getStatusInfo(item).color">
        {{ getStatusInfo(item).title }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-if="item.status === 1" class="mr-2" small v-bind="attrs" v-on="on">
            mdi-restart
          </v-icon>
        </template>
        <span>process record</span>
      </v-tooltip>
      <v-icon class="ml-2" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DeleteRecordDialog from "~/components/record/DeleteRecordDialog";
export default {
  components: {
    DeleteRecordDialog
  },
  data: () => ({
    records: [],
    recordInfo: {},
    headers: [
      { text: "Id", value: "id" },
      { text: "Email", value: "email" },
      {
        text: "Record",
        value: "record_path"
      },
      { text: "Result", value: "result_path" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" }
    ],
    listStatus: [
      { status: 1, title: "pending", color: "orange" },
      { status: 2, title: "processing", color: "primary" },
      { status: 3, title: "success", color: "green" },
      { status: 4, title: "error", color: "red" }
    ],
    openDeleteDialog: false,
    recordFile: null
  }),
  mounted() {
    this.getRecords();
  },
  methods: {
    getRecords() {
      this.$store.dispatch("record/getRecords").then(res => {
        this.records = res.data;
      });
    },
    getStatusInfo(info) {
      return this.listStatus.filter(item => info.status === item.status)[0];
    },
    deleteItem(item) {
      this.recordInfo = item;
      console.log(item);
      this.openDeleteDialog = true;
    },
    async deleteRecord() {
      const res = await this.$store.dispatch(
        "record/deleteRecord",
        this.recordInfo.id
      );
      if (res) {
        this.getRecords();
        this.openDeleteDialog = false;
      }
    },
    getResultPath(resultPath) {
      return resultPath?.replace(/^.*[\\\/]/, "");
    },
    addRecord() {
      if (!this.recordFile) return;
      this.$store
        .dispatch("record/addRecord", { file: this.recordFile })
        .then(res => {
          this.recordFile = null;
          this.getAudios();
        });
    }
  }
};
</script>
