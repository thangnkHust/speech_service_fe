<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>Có lỗi xảy ra: {{ error.statusCode }}</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Không tìm thấy trang này',
      otherError: 'Có lỗi xảy ra: '
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
