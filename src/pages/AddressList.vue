<template>
  <div class="address-list">
    <loading :show="loading" :text="textLoading"></loading>
    <form @submit="saveAddressSearchKeyword()">
      <sticky class="sticky">
        <div class="address-search-wrapper" @click="focusInput($event)">
          <input type="search" placeholder="请输入员工姓名或工号" class="address-search-input" v-model="addressSearchKeyword">
        </div>
      </sticky>
    </form>
    <div v-if="result">
      <div v-if="address_list.other.length !== 0">
        <p class="letter" id="other">0 ~ 9</p>
        <template v-for="address_item in address_list.other">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.a.length !== 0">
        <p class="letter" id="A">A</p>
        <template v-for="address_item in address_list.a">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.b.length !== 0">
        <p class="letter" id="B">B</p>
        <template v-for="address_item in address_list.b">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.c.length !== 0">
        <p class="letter" id="C">C</p>
        <template v-for="address_item in address_list.c">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.d.length !== 0">
        <p class="letter" id="D">D</p>
        <template v-for="address_item in address_list.d">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.e.length !== 0">
        <p class="letter" id="E">E</p>
        <template v-for="address_item in address_list.e">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.f.length !== 0">
        <p class="letter" id="F">F</p>
        <template v-for="address_item in address_list.f">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.g.length !== 0">
        <p class="letter" id="G">G</p>
        <template v-for="address_item in address_list.g">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.h.length !== 0">
        <p class="letter" id="H">H</p>
        <template v-for="address_item in address_list.h">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.i.length !== 0">
        <p class="letter" id="I">I</p>
        <template v-for="address_item in address_list.i">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.j.length !== 0">
        <p class="letter" id="J">J</p>
        <template v-for="address_item in address_list.j">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.k.length !== 0">
        <p class="letter" id="K">K</p>
        <template v-for="address_item in address_list.k">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.l.length !== 0">
        <p class="letter" id="L">L</p>
        <template v-for="address_item in address_list.l">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.m.length !== 0">
        <p class="letter" id="M">M</p>
        <template v-for="address_item in address_list.m">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.n.length !== 0">
        <p class="letter" id="N">N</p>
        <template v-for="address_item in address_list.n">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.o.length !== 0">
        <p class="letter" id="O">O</p>
        <template v-for="address_item in address_list.o">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.p.length !== 0">
        <p class="letter" id="P">P</p>
        <template v-for="address_item in address_list.p">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.q.length !== 0">
        <p class="letter" id="Q">Q</p>
        <template v-for="address_item in address_list.q">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.r.length !== 0">
        <p class="letter" id="R">R</p>
        <template v-for="address_item in address_list.r">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.s.length !== 0">
        <p class="letter" id="S">S</p>
        <template v-for="address_item in address_list.s">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.t.length !== 0">
        <p class="letter" id="T">T</p>
        <template v-for="address_item in address_list.t">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.u.length !== 0">
        <p class="letter" id="U">U</p>
        <template v-for="address_item in address_list.u">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.v.length !== 0">
        <p class="letter" id="V">V</p>
        <template v-for="address_item in address_list.v">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.w.length !== 0">
        <p class="letter" id="W">W</p>
        <template v-for="address_item in address_list.w">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.x.length !== 0">
        <p class="letter" id="X">X</p>
        <template v-for="address_item in address_list.x">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.y.length !== 0">
        <p class="letter" id="Y">Y</p>
        <template v-for="address_item in address_list.y">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
      <div v-if="address_list.z.length !== 0">
        <p class="letter" id="Z">Z</p>
        <template v-for="address_item in address_list.z">
          <address-item :address_info="address_item"></address-item>
        </template>
      </div>
    </div>
    <div v-if="nobody" class="address-nobody">
      <img src="../assets/img/phone-no.png">
      <p>请到<a v-link="'/home/map'" style="color: #38acfd;">人力地图</a>添加新的人员</p>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Toast, Sticky } from 'vux-components'
import AddressItem from 'components/AddressItem'

export default {
  name: 'AddressList',
  components: {
    Loading,
    Toast,
    Sticky,
    AddressItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
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
      }).catch(err => {
        console.error(err.data)
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
    },
    focusInput (e) {
      $(e.target).find('input.address-search-input').focus()
    },
    saveAddressSearchKeyword () {
      let ask = $.trim(this.addressSearchKeyword)
      if (ask !== '') {
        window.localStorage.setItem('addressSearchKeyword', ask)
        this.$route.router.go('/home/address/addressSearchResult')
      } else {
        this.$set('textToast', '搜索关键词不能为空。')
        this.$set('showToast', true)
      }
    }
  }
}
</script>

<style lang="less">
.list-view {
  background-color: #eef3f6;
}
.nobody {
  font-weight: normal;
  text-align: center;
  padding-top: 24px;
}
.address-list {
  padding-top: 64px;
}
.sticky {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  text-align: center;
  border-bottom: 1px solid #dfe3e6;
  background-color: #fff;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;

  .address-search-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    text-align: center;
    border-radius: 2px;
    background-color: #eef3f6;
    padding: 0 12px;

    .address-search-input {
      color: #abb2b7;
      font-size: 14px;
      width: 170px;
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
      border: none;
      background-color: lightblue;
      background: url(~assets/img/ui-icon-search-sm@2x.png) no-repeat left center;
      background-size: 16px 16px;
      padding-left: 24px;
      transition: width .4s;

      &:focus {
        width: 100%;
      }
    
      &::-webkit-input-placeholder {
        color: #abb2b7;
        font-size: 14px;
        font-weight: normal;
      }
      &:-moz-placeholder {
        color: #abb2b7;
        font-size: 14px;
        font-weight: normal;
      }
      &::-moz-placeholder {
        color: #abb2b7;
        font-size: 14px;
        font-weight: normal;
      }
      &:-ms-input-placeholder {
        color: #abb2b7;
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
.letter {
  color: #323232;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
.address-nobody {
  padding-top: 154px;
  text-align: center;

  img {
    width: 160px;
    height: 94px;
  }
  p {
    padding-top: 30px;
    color: #bdbdbd;
    font-size: 16px;
    line-height: 22px;
  }
}
</style>