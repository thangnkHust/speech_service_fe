<template>
  <v-row>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.getRecords()
  }, 
  methods: {
    getRecords() {
       this.$store.dispatch("record/getRecords").then(res => {
        console.log(res);
      });
    }
  }
}
</script>
