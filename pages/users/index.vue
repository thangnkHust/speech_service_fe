<template>
  <v-data-table :headers="headers" :items="users" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="openUpdateUserDialog = true"
        >
          Add User
        </v-btn>
        <UpdateInfoDialog
          v-model="openUpdateUserDialog"
          @addUser="addUser"
        ></UpdateInfoDialog>
        <DeleteUserDialog
          v-model="openDeleteUserDialog"
          @deleteUser="deleteUser"
        ></DeleteUserDialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2">
        mdi-information
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:[`item.is_active`]="{ item }">
      <v-switch
        v-model="item.is_active"
        @click="changeValue(item)"
      ></v-switch>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="getUsers">
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
</template>
<script>
import UpdateInfoDialog from "~/components/user/UpdateInfoDialog";
import DeleteUserDialog from "~/components/user/DeleteUserDialog";
export default {
  components: {
    UpdateInfoDialog,
    DeleteUserDialog
  },
  data: () => ({
    users: [],
    headers: [
      { text: "Id", value: "id" },
      {
        text: "Email",
        value: "email"
      },
      { text: "Name", value: "name"},
      { text: "Role", value: "role" },
      {text: "Active", value: "is_active"},
      { text: "Action", value: "actions" }
    ],
    userInfo: {},
    openUpdateUserDialog: false,
    openDeleteUserDialog: false
  }),

  computed: {
    // formTitle () {
    //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    // },
  },

  watch: {
    // dialog (val) {
    //   val || this.close()
    // },
    // dialogDelete (val) {
    //   val || this.closeDelete()
    // },
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      this.$store.dispatch("users/getListUsers").then(res => {
        this.users = res.data;
      });
    },
    async addUser(userInfo) {
      const res = await this.$store.dispatch("users/registerUser", userInfo);
      if (res) {
        this.getUsers(), (this.openUpdateUserDialog = false);
      }
    },
    deleteItem(item) {
      this.userInfo = item;
      this.openDeleteUserDialog = true;
    },
    async deleteUser() {
      const res = await this.$store.dispatch(
        "users/deleteUser",
        this.userInfo.id
      );
      if (res) {
        this.getUsers()
        this.openDeleteUserDialog = false
      }
    },
    async changeValue(item) {
      const res = await this.$store.dispatch("users/activeUser", item.id)
      if (res) {
        this.getUsers()
      } 
    }
  }
};
</script>
