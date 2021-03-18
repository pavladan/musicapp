import { Plugin } from '@nuxt/types'
import VueRouter, { Route } from 'vue-router'

let $router: VueRouter
let $route: Route
const accessor: Plugin = ({ app, route }) => {
  $route = route
  if (app.router) $router = app.router
}

export { $router, $route }
export default accessor
