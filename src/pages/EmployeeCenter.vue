<template>
  <div class="employee-main">
    <div class="employee-header">
      <span class="header-info">个人资料</span>
      <a class="header-package" v-link="'/home/employee'">
        <span class="header-enter">进入</span>
        <span class="header-go">
          <i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i>
        </span>
      </a>
    </div>
    <div class="employee-body">
      <div class="body-phone body-public">
        <span class="body-info">修改手机号</span>
        <a class="body-package" v-link="'/home/employee'">
          <span class="body-enter">{{telphone}}</span>
          <span class="body-go">
            <i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i>
          </span>
        </a>
      </div>
      <div class="body-company body-public">
        <div class="body-info">公司切换</div>
        <a class="body-package" v-link="'/home/employee/employeeCompany'">
          <span class="body-enter">修改</span>
          <span class="body-go">
            <i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i>
          </span>
        </a>
      </div>
      <div class="body-password body-public">
        <span class="body-info">密码设置</span>
        <a class="body-package" v-link="'/home/employee'">
          <span class="body-enter">修改</span>
          <span class="body-go">
            <i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
export default {
  name: 'EmployeeCenter',
  data () {
    return {
      telphone: ''
    }
  },
  ready () {
    this.fetchUserInfo()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('telphone', u.phone)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import '../styles/reset';
@import '../styles/icon';

.employee-main {
  width: 100%;
  height: 100%;
  padding-top: 14px;
  background-color: #eef3f6;

  .employee-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 46px;
    line-height: 46px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    .header-info {
      font-size: 15px;
      color: #363636;
      margin-left: 14px;
    }
    
    .header-package {
      height: 100%;
      line-height: 46px; 

      .header-enter {
        font-size: 14px;
        color: #51A5F7;
      }

      .header-go {
        display: inline-block;
        width: 32px;
        height: 100%;
        text-align: center;
      }
    }
  }
  
  .employee-body {
    width: 100%;
    height: 138px;
    margin-top: 18px;
    padding-left: 14px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    .body-public {
      display: flex;
      justify-content: space-between;
      width: 96.3%;
      height: 46px;
      line-height: 46px;

      .body-info {
        font-size: 15px;
        color: #363636;
      }

      .body-package {
        height: 100%;

        .body-enter {
          font-size: 14px;
          color: #6D6C6C;
          display: inline-block;
        }
        .body-go {
          display: inline-block;
          width: 32px;
          height: 100%;
          text-align: center;
        }
      }
    }
    .body-company {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>