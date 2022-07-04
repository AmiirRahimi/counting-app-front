import Vue from 'vue'
import vue_resource from 'vue-resource'

Vue.use(vue_resource)

Vue.http.options.root = "http://127.0.0.1:8000/"
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', `Bearer ${Vue.$cookies.get('access')}`)
    request.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next()
})