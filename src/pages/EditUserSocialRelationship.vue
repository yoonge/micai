<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="required clearfix">
        <popup-picker title="与本人关系" :value.sync="socialRelationshipItem.relationType" :data="relationTypeList"></popup-picker>
      </group>
      <group class="required clearfix">
        <x-input title="关系人姓名" :value.sync="socialRelationshipItem.name" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
        <x-input title="电话" :value.sync="socialRelationshipItem.phoneNo" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
        <x-input title="通讯地址" :value.sync="socialRelationshipItem.address" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <datetime title="出生日期" :value.sync="socialRelationshipItem.birthday" format="YYYY.MM.DD" confirm-text="完成" cancel-text="取消" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="clearfix">
        <x-input title="工作单位" :value.sync="socialRelationshipItem.workUnit" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="职位" :value.sync="socialRelationshipItem.xgPosition" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="备注" :value.sync="socialRelationshipItem.note" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
    </div>
    <div class="btn-wrapper">
      <x-button @click="saveSocialRelationshipItem" :disabled="checkBlank" :class="{editBtnDisable: checkBlank}">保存</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast, Datetime, Group, XButton, XInput, PopupPicker, Cell } from 'vux-components'

export default {
  name: 'EditUserSocialRelationship',
  components: {
    Loading,
    Toast,
    Datetime,
    Group,
    XButton,
    XInput,
    PopupPicker,
    Cell
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      cpUserId: '',
      xgRelationInfoId: '',
      socialRelationshipItem: {
        relationType: [],
        name: '',
        phoneNo: '',
        address: '',
        birthday: '',
        workUnit: '',
        xgPosition: '',
        note: ''
      },
      socialRelationshipList: {},
      relationTypeList: [['父亲', '母亲', '配偶', '子女', '兄弟姐妹', '朋友', '同事', '其他']],
      minyear: 1900
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    this.$set('xgRelationInfoId', this.$route.params.socialRelationshipId)
    this.fetchSocialRelationshipItem()
  },
  methods: {
    fetchSocialRelationshipItem () {
      const that = this
      this.$http({
        url: api.showRelaInfo,
        params: {
          memberLoginId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        console.log('编辑社会关系返回的数据 === ' + JSON.stringify(res.data))
        if (res.data.result) that.$set('socialRelationshipList', res.data.personalList)
        let tempJSON = {}
        let s1 = that.socialRelationshipItem // 表单双向绑定数据
        let s2 = that.socialRelationshipList // 与后端交互的数据
        for (let key in s2) {
          console.log('看看 key 的值 === ' + s2[key]['id'])
          if (s2[key]['id'] === that.xgRelationInfoId) {
            tempJSON = s2[key]
          }
        }
        console.log('当前编辑的条目 === ' + JSON.stringify(tempJSON))
        for (let key in tempJSON) {
          if (key === 'relationType') {
            switch (tempJSON[key]) {
              case '01':
                s1[key] = ['父亲']
                break
              case '02':
                s1[key] = ['母亲']
                break
              case '03':
                s1[key] = ['配偶']
                break
              case '04':
                s1[key] = ['子女']
                break
              case '05':
                s1[key] = ['兄弟姐妹']
                break
              case '06':
                s1[key] = ['朋友']
                break
              case '07':
                s1[key] = ['同事']
                break
              default:
                s1[key] = ['其他']
                break
            }
          } else {
            s1[key] = tempJSON[key]
          }
        }
        console.log('转换后 === ' + JSON.stringify(s1))
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    saveSocialRelationshipItem () {
      const that = this
      let tempArray = [{}] // 提交给后端的 JSON
      let s1 = that.socialRelationshipItem // 表单双向绑定数据
      for (let key in s1) {
        console.log('key === ' + JSON.stringify(s1[key]))
        if (key === 'relationType') {
          switch (s1[key][0]) {
            case '父亲':
              tempArray[0][key] = '01'
              break
            case '母亲':
              tempArray[0][key] = '02'
              break
            case '配偶':
              tempArray[0][key] = '03'
              break
            case '子女':
              tempArray[0][key] = '04'
              break
            case '兄弟姐妹':
              tempArray[0][key] = '05'
              break
            case '朋友':
              tempArray[0][key] = '06'
              break
            case '同事':
              tempArray[0][key] = '07'
              break
            default:
              tempArray[0][key] = '09'
              break
          }
        } else {
          tempArray[0][key] = s1[key]
        }
      }
      console.log('tempArray === ' + JSON.stringify(tempArray))
      that.$http({
        url: api.editRelaInfo,
        params: {
          memberLoginId: that.cpUserId,
          xgRelationInfoId: that.xgRelationInfoId,
          json: JSON.stringify(tempArray)
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        console.log('saveSocialRelationshipItem res.data === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/edit/userSocialRelationshipList')
        } else {
          that.$set('loading', false)
          that.$set('textToast', '保存失败，请检查网络后重试！')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    }
  },
  computed: {
    checkBlank () {
      const aU = this.socialRelationshipItem.relationType !== ''
      const bU = this.socialRelationshipItem.name !== ''
      const cU = this.socialRelationshipItem.phoneNo !== ''
      const dU = this.socialRelationshipItem.address !== ''
      if (aU && bU && cU && dU) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.edit-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #eff4f7;
  padding-bottom: 16px;
  position: relative;

  .btn-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #eff4f7;
    padding: 16px;
  }
}

.editBtnDisable {
  background-color: #c8cfd4!important;
}

.edit-user-info {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding-left: 12px;
  position: relative;

  .ui-icon {
    margin-top: -8px;
    position: absolute;
    top: 50%;
    right: 4%;

    &.weui_icon_warn:before {
      font-size: 16px;
    }
  }

  input::-webkit-input-placeholder {
    color: #444343;
    opacity:1;
    font-size: 13px;
    font-weight: lighter;
    text-align: right;
  }

  .weui_cell {
    padding: 12px 40px 12px 2px!important;
  }

  .weui_cells {
    margin-top: 0;
  }

  .weui_label {
    color: #363636;
    font-size: 15px;
    line-height: 21px;
  }

  .weui_cells:before {
    border: 0px!important;
  }

  .weui_input {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }

  .weui_cell_bd > p {
    color: #363636;
    font-size: 15px;
    line-height: 21px;
  }

  .vux-popup-picker-value {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }

  .weui_cell_ft.with_arrow:after {
    width: 15px;
    height: 15px;
    background: url(../assets/img/user-arrow-right.png);
    background-size: 15px 15px;
    transform: rotate(0deg);
    border: none;
    position: absolute;
    top: 50%;
    right: 4%;
    margin-top: -8px;
  }

  .vux-popup-picker-header {
    color: #51A5F7;
  }

  .weui_cell_ft {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }
}

.dp-header .dp-item {
  color: #51A5F7;
  font-size: 15px;
}
</style>