<template>   
    <nav >
        <ul class="nav">
            <li :class="{'nav-item':true,'nav-active':navIndex == item.id}" v-for="(item,index) in navlist" :key="index" @click="change(item.id)">{{item.name}}</li>
        </ul>
    </nav>

</template>
<script>
import {Util} from '@/assets/commonjs/utils.js'
export default {
    name: 'order-item',
    props:{
        navlist:{
            type:Array,
            default(){
                return [
                    {
                        id:0,
                        name:'全部'
                    },
                    {
                        id:1,
                        name:'已创建'
                    },
                    {
                        id:2,
                        name:'待处理'
                    },
                    {
                        id:3,
                        name:'已完成'
                    },
                ]
            }
        },
        start:{
            type:Number|String,
            default(){
                return 0;
            }
        }
    },
    mounted(){
        this.navIndex = this.start||0;
    },
    data () {
        return {
            navIndex:0
        }
    },
    methods:{
        change(id){
            this.navIndex = id;
            this.$emit('change',id)
        }
    }
}
</script>

<style scoped lang="less">
@import '~link-less';
    .nav {
        .display-flex();
        height: 88px;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        color: #666;
        font-size: 32px;
        // border-radius: 8px;
        .nav-item {
            flex: 1;
            text-align: center;
            height: 100%;
            line-height:88px;
        }
        .nav-active {
            color: @base-blue;
            position: relative;
            &::after {
                position: absolute;
                content:'';
                width: 50px;
                height: 4px;
                background-color: @base-blue;
                bottom: 10px;
                left: 50%;
                .transform(translateX(-50%));
            }
        }
    }

</style >

