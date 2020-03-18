<template>
    <div class="page">
      <div class="alert">
        <slot class="title" name="top"></slot>
        <slot class="content" name="content"></slot>
        <slot class="list" name="list"></slot>
        <slot class="input" name="input"></slot>
        <slot class="button" name="bottom"></slot>
      </div>
    </div>

</template>

<script>
    export default {
        name: "Alert"
    }
</script>

<style lang="less" scoped>
  @import "~link-less";
  .page{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    top: 0;
    left: 0;

    .alert{
      position: fixed;
      width: 80%;
      border: 1px solid #f6f6f6;
      background:rgba(255,255,255,1);
      border-radius:8px 8px 0px 0px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 999;
      padding-top: 30px;

      .title{
        text-align: center;
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(15,24,38,1);
        padding: 0 40px;
      }
      .content{
        margin: 0 auto;
        margin-top: 30px;
        padding: 20px 40px;

        img{
          width: 48px;
          height: 48px;
          margin-right: 10px;
          float: left;
          transform: translate(0,-5px);
        }
        p{
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(15,24,38,1);
          margin-bottom: 15px;
        }
      }
      .list{
        margin-bottom: 15px;
        margin-top: 30px;
        ul{
          li{
            padding:0 40px;
            margin-bottom: 10px;

            span{
              float: right;
              font-size:28px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:#8F95AA;
            }
          }
        }
      }
      .input{
        color:rgba(15,24,38,1);
        width: 90%;
        margin-left: 50%;
        transform: translate(-50%);
        padding-left: 20px;
        height: 80px;
        border-radius:4px;
        border:1px solid rgba(219,219,219,1);
        margin-top: 30px;
      }
      .button{
        height: 96px;
        .display-flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #EBEBEB;
        margin-top: 30px;

        button{
          height: 96px;
          flex: 1;
          font-size:32px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#A9AFB8;
          border-right: 1px solid #EBEBEB;

          &:last-of-type{
            border:none;
          }
        }
      }
    }
  }



</style>
