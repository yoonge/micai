import $ from 'jquery'
import 'orgchart'

export default {
  name: 'OrgChart',
  bind () {},
  update (options) {
    $(this.el).orgChart('destroy')
    setTimeout(() => {
      $(this.el).orgChart(options)
    }, 0)
  },
  unbind () {
    $(this.el).orgChart('destroy')
  }
}
