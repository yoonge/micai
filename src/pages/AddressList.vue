<template>
  <div class="address-list">
    <loading :show="loading" :text="textLoading"></loading>
    <sticky class="sticky">
      <input type="search" placeholder="请输入员工姓名或工号" class="address-search-input" v-model="addressSearchKeyword">
    </sticky>
    <div v-show="result">
      <div v-show="show_other">
        <p class="letter">0 ~ 9</p>
        <template v-for="address_item in address_list.other">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_a">
        <p class="letter" id="A">A</p>
        <template v-for="address_item in address_list.a">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_b">
        <p class="letter" id="B">B</p>
        <template v-for="address_item in address_list.b">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_c">
        <p class="letter" id="C">C</p>
        <template v-for="address_item in address_list.c">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_d">
        <p class="letter" id="D">D</p>
        <template v-for="address_item in address_list.d">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_e">
        <p class="letter" id="E">E</p>
        <template v-for="address_item in address_list.e">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_f">
        <p class="letter" id="F">F</p>
        <template v-for="address_item in address_list.f">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_g">
        <p class="letter" id="G">G</p>
        <template v-for="address_item in address_list.g">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_h">
        <p class="letter" id="H">H</p>
        <template v-for="address_item in address_list.h">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_i">
        <p class="letter" id="I">I</p>
        <template v-for="address_item in address_list.i">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_j">
        <p class="letter" id="J">J</p>
        <template v-for="address_item in address_list.j">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_k">
        <p class="letter" id="K">K</p>
        <template v-for="address_item in address_list.k">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_l">
        <p class="letter" id="L">L</p>
        <template v-for="address_item in address_list.l">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_m">
        <p class="letter" id="M">M</p>
        <template v-for="address_item in address_list.m">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_n">
        <p class="letter" id="N">N</p>
        <template v-for="address_item in address_list.n">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_o">
        <p class="letter" id="O">O</p>
        <template v-for="address_item in address_list.o">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_p">
        <p class="letter" id="P">P</p>
        <template v-for="address_item in address_list.p">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_q">
        <p class="letter" id="Q">Q</p>
        <template v-for="address_item in address_list.q">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_r">
        <p class="letter" id="R">R</p>
        <template v-for="address_item in address_list.r">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_s">
        <p class="letter" id="S">S</p>
        <template v-for="address_item in address_list.s">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_t">
        <p class="letter" id="T">T</p>
        <template v-for="address_item in address_list.t">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_u">
        <p class="letter" id="U">U</p>
        <template v-for="address_item in address_list.u">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_v">
        <p class="letter" id="V">V</p>
        <template v-for="address_item in address_list.v">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_w">
        <p class="letter" id="W">W</p>
        <template v-for="address_item in address_list.w">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_x">
        <p class="letter" id="X">X</p>
        <template v-for="address_item in address_list.x">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_y">
        <p class="letter" id="Y">Y</p>
        <template v-for="address_item in address_list.y">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
      <div v-show="show_z">
        <p class="letter" id="Z">Z</p>
        <template v-for="address_item in address_list.z">
          <employee-item :employee_info="address_item" :has_detail="has_detail"></employee-item>
        </template>
      </div>
    </div>
    <h3 class="nobody" v-show="nobody">您的通讯录里还没有联系人，赶快去人力地图添加吧！</h3>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Sticky } from 'vux-components'
import EmployeeItem from 'components/EmployeeItem'

export default {
  name: 'AddressList',
  components: {
    Loading,
    Sticky,
    EmployeeItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      has_detail: false,
      cpUserId: '',
      result: false,
      nobody: false,
      address_list: {
        other: [],
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: []
      },
      addressSearchKeyword: ''
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('list-view')
    this.fetchUserInfo()
    this.fetchAddressList()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('cpUserId', u.cpUserId)
    },
    fetchAddressList () {
      const that = this
      this.$http({
        url: api.queryPhoneBook,
        params: {
          cpUserId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          that.$set('result', true)
          that.parseData(res.data.phoneBooks)
        } else {
          that.$set('nobody', true)
        }
        that.$set('loading', false)
      })
    },
    parseData (data) {
      for (let i = 0; i < data.length; i++) {
        switch (data[i]['firstSpell']) {
          case 'A':
            this.address_list.a.push(data[i])
            break
          case 'B':
            this.address_list.b.push(data[i])
            break
          case 'C':
            this.address_list.c.push(data[i])
            break
          case 'D':
            this.address_list.d.push(data[i])
            break
          case 'E':
            this.address_list.e.push(data[i])
            break
          case 'F':
            this.address_list.f.push(data[i])
            break
          case 'G':
            this.address_list.g.push(data[i])
            break
          case 'H':
            this.address_list.h.push(data[i])
            break
          case 'I':
            this.address_list.i.push(data[i])
            break
          case 'J':
            this.address_list.j.push(data[i])
            break
          case 'K':
            this.address_list.k.push(data[i])
            break
          case 'L':
            this.address_list.l.push(data[i])
            break
          case 'M':
            this.address_list.m.push(data[i])
            break
          case 'N':
            this.address_list.n.push(data[i])
            break
          case 'O':
            this.address_list.o.push(data[i])
            break
          case 'P':
            this.address_list.p.push(data[i])
            break
          case 'Q':
            this.address_list.q.push(data[i])
            break
          case 'R':
            this.address_list.r.push(data[i])
            break
          case 'S':
            this.address_list.s.push(data[i])
            break
          case 'T':
            this.address_list.t.push(data[i])
            break
          case 'U':
            this.address_list.u.push(data[i])
            break
          case 'V':
            this.address_list.v.push(data[i])
            break
          case 'W':
            this.address_list.w.push(data[i])
            break
          case 'X':
            this.address_list.x.push(data[i])
            break
          case 'Y':
            this.address_list.y.push(data[i])
            break
          case 'Z':
            this.address_list.z.push(data[i])
            break
          default:
            this.address_list.other.push(data[i])
            break
        }
      }
    }
  },
  computed: {
    show_other () {
      return this.address_list.other.length !== 0
    },
    show_a () {
      return this.address_list.a.length !== 0
    },
    show_b () {
      return this.address_list.b.length !== 0
    },
    show_c () {
      return this.address_list.c.length !== 0
    },
    show_d () {
      return this.address_list.d.length !== 0
    },
    show_e () {
      return this.address_list.e.length !== 0
    },
    show_f () {
      return this.address_list.f.length !== 0
    },
    show_g () {
      return this.address_list.g.length !== 0
    },
    show_h () {
      return this.address_list.h.length !== 0
    },
    show_i () {
      return this.address_list.i.length !== 0
    },
    show_j () {
      return this.address_list.j.length !== 0
    },
    show_k () {
      return this.address_list.k.length !== 0
    },
    show_l () {
      return this.address_list.l.length !== 0
    },
    show_m () {
      return this.address_list.m.length !== 0
    },
    show_n () {
      return this.address_list.n.length !== 0
    },
    show_o () {
      return this.address_list.o.length !== 0
    },
    show_p () {
      return this.address_list.p.length !== 0
    },
    show_q () {
      return this.address_list.q.length !== 0
    },
    show_r () {
      return this.address_list.r.length !== 0
    },
    show_s () {
      return this.address_list.s.length !== 0
    },
    show_t () {
      return this.address_list.t.length !== 0
    },
    show_u () {
      return this.address_list.u.length !== 0
    },
    show_v () {
      return this.address_list.v.length !== 0
    },
    show_w () {
      return this.address_list.w.length !== 0
    },
    show_x () {
      return this.address_list.x.length !== 0
    },
    show_y () {
      return this.address_list.y.length !== 0
    },
    show_z () {
      return this.address_list.z.length !== 0
    }
  }
}
</script>

<style lang="less">
.list-view {
  background-color: #eef3f6;
}
.nobody {
  text-align: center;
  padding-top: 24px;
}
.sticky {
  box-sizing: border-box;
  height: 64px;
  text-align: center;
  border-bottom: 1px solid #dfe3e6;
  background-color: #fff;
  padding: 16px;

  .address-search-input {
    color: #abb2b7;
    font-size: 14px;
    width: 100%;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    border: none;
    background-color: #eef3f6;
    padding: 0 12px;
  
    &::-webkit-input-placeholder {
      color: #abb2b7;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
    &:-moz-placeholder {
      color: #abb2b7;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
    &::-moz-placeholder {
      color: #abb2b7;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
    &:-ms-input-placeholder {
      color: #abb2b7;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
  }
}
.letter {
  color: #323232;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
</style>