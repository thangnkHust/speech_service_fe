<template>
  <v-dialog :value="value" max-width="520px" @input="$emit('input', $event)">
    <v-card>
      <v-card-title class="text-h5"
        >Are you sure you want to delete this account?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('input', false)">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    deleteItemConfirm() {
      this.$emit("deleteUser");
    }
  }
};
</script>

<style scoped></style>
