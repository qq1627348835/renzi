// import PageTools from './PageTools/index'
// const components = [PageTools]
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       console.log(ele)
//       Vue.component(ele.name, ele)
//     })
//   }
// }
import * as filters from '@/filters'
const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys())
console.log(fn('./PageTools/index.vue'))

const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })

  Object.keys(filters).forEach(key => {
    // console.log(key)
    Vue.filter(key, filters[key])
  })
}
console.log(Object.keys(filters))

