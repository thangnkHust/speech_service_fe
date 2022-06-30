<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- <client-only>
          <notifications group="login" :duration="10000" position="top right" :max="5"/>
        </client-only> -->
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import '~/assets/table.scss'
import Cookies from 'js-cookie'
export default {
  middleware: 'auth',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'Users',
          to: '/users'
        },
        {
          icon: 'mdi-speaker',
          title: 'Speakers',
          to: '/speakers'
        },
        {
          icon: 'mdi-album',
          title: 'Records',
          to: '/records'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'User management',
      email: null
    }
  },
  mounted() {
      this.email = Cookies.get('email')
  },
  methods: {
    logout() {
      Object.keys(Cookies.get()).forEach(function(cookieName) {
        var neededAttributes = {
        }
        Cookies.remove(cookieName, neededAttributes)
      })
      this.$router.push('/login')
    },    
  }
}
</script>
