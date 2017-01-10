import $ from 'jquery'
import 'jquery.nicescroll'

export default {
  name: 'NiceScroll',
  bind () {},
  update (options) {
    $(this.el).niceScroll('destroy')
    setTimeout(() => {
      $(this.el).niceScroll(options)
    }, 0)
  },
  unbind () {
    $(this.el).niceScroll('destroy')
  }
}
