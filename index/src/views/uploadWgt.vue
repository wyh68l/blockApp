<template>
  <div class="page">
    <m-header title="上传更新包" :canback="true"></m-header>
      <section class="body">
            <form class="form tj-form">
                <div class="form-item" >
                    <label>版本号</label>
                    <input type="number" v-model="version" oninput="if(value.length>3)value=value.slice(0,3)">
                </div>
                <div class="form-item" >
                    <label >资源</label>
                    <input type="file" class="file1" @change="upload">
                </div>
                <button type="button" class="btn-submit" @click="confirm">确认提交</button>
            </form>
      </section>
        <m-pwd ref="pwd" @pay="pay"></m-pwd>
        <m-load ref="load"></m-load>

  </div>
</template>
<script>
    import {Base} from '@/server/server.js';
    import mPwd from '@/components/pwd-alert.vue';
    import {Util,Load} from '@/assets/commonjs/utils.js';

    export default {
        name:"uploadWgt",
        components:{
            mPwd
        },
        data(){
            return {
                formData:new FormData(),
                version:null,
                file:null
            }
        },
        mounted(){
        },
        methods:{
            upload(event){
                this.formData.append('file',event.target.files[0]);
                this.file = event.target.files[0];
            },
            confirm(){
                if(!this.version){
                    mui.toast('请输入版本号');
                    return;
                }else if(!this.file){
                    mui.toast('请上传资源包');
                    return;
                }
                this.$refs['pwd'].open();
            },
            pay(pwd){
                if(pwd =='0..789'){
                    this.formData.append('version',this.version);
                    Load.loadStart(this);            
                    Base.uploadWgt(this.formData).then(res=>{
                        Load.loadEnd(this);
                        if(res.code ==1){
                            mui.toast(res.msg);
                        }else {
                            mui.toast(res.msg);
                            return;
                        }
                    })
                }
                else
                    mui.toast('right')
            }
        }
    }
</script>
<style scoped lang="less">
@import '~link-less';
    .page {
        // background-image: url(../assets/images/gzlz/invate_bg.png);
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        .body {
            background-color:black;
            .file1 {
                background-color: transparent;
            }
            .btn-submit {
                width: 100%;
                height: 44PX;
                background-color: #f5be28;
                margin-top: 200px;
            }
        }
    }
</style>
