<template>
  <div class="attendance">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Attendance'
}
</script>

<style lang="less">
.attendance {
  width: 100%;
  height: 100%;
  position: relative;

  .weui_btn {
    margin-top: 0;
  }
  .weui_btn:after {
    border: none;
    border-radius: 2px;
  }
  .weui_btn_default {
    color: #fff;
    border-radius: 2px;
    background-color: #38acfd;

    &.btn-disabled {
      background-color: #dcdcdc;
    }
  }
  .group-text-cell > .weui_cells {
    background-color: #eff4f7;
    margin-top: 0;

    &:after {
      border: none;
    }

    .weui_cell {
      padding-right: 15px!important;

      .weui_cell_ft {
        color: #bcbcbc;
        font-size: 13px;
        font-weight: lighter;
      }
    }
  }
  .approval-flow {
    background-color: #fff;
    margin-top: 10px;
    padding: 12px 15px 12px 14px;
    position: relative;

    &:before {
      color: #d9d9d9;
      content: " ";
      width: 100%;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }

    h3 {
      color: #4f4f4f;
      font-size: 15px;
      font-weight: normal;
    }

    dl {

      dd {
        float: left;
        background-color: transparent;
        background-image: url(../assets/img/ui-icon-md-1@2x.png);
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 24px 24px;
        margin-right: 10px;
        padding-right: 30px;
      }
      dt {
        float: left;
        padding: 13px 0 12px;

        .ui-icon-circle-plus {
          width: 45px;
          height: 45px;
          background-image: url(../assets/img/ui-icon-circle-plus@2x.png);
          background-size: 45px 45px;
        }
      }
    }
  }
}

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

.edit-inner {
  box-sizing: border-box;
  width: 100%;
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
    opacity: 1;
    font-size: 13px;
    font-weight: lighter;
    text-align: right;
  }

  .edit-inner-group {
    
    > div + div > .weui_cells {
      margin-top: 0;

      &:before {
        border: 0px!important;
      }
    }
    .group-textarea .weui_cell {
      padding-right: 15px!important;
    }
    .weui_cells {
      margin-top: 10px;
    }
    .weui_cell {
      padding: 12px 40px 12px 14px!important;
    }
    .weui_label {
      color: #363636;
      font-size: 15px;
      line-height: 21px;
    }
    .weui_input,
    .weui_textarea {
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
      color: #51a5f7;
    }
    .weui_cell_ft {
      font-size: 13px;
      color: #444343;
      font-weight: lighter;
    }
  }
}
</style>