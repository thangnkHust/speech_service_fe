<template>
  <v-dialog :value="value" max-width="500px" @input="$emit('input', $event)">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add User</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('input', false)">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
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
  data: () => ({
    email: null,
    name: null,
    password: null,
    confirmPassword: null
  }),
  methods: {
    save() {
      this.$emit("addUser", {
        email: this.email,
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
    }
  }
};
</script>

<style scoped></style>
