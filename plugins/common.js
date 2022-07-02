import Vue from 'vue'
import Notifications from 'vue-notification'
import VueApexCharts from 'vue-apexcharts'

const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.use(Notifications)
Vue.component('apexchart', VueApexCharts)
