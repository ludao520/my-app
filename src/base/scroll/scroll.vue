<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>


<script>
  import BScroll from 'better-scroll'
    export default{
      props:{
        probeType:{
            type:Number,
            default:1
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        },
        refreshDelay:{
            type:Number,
            default:20
        },
        listenScroll:{
            type:Boolean,
            default:false
        }
  
      },
      mounted(){
          setTimeout(()=>{
              this._initScroll()
          },20)
      },
      methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
              probeType:this.probeType,
              click:this.click
            })
          if(this.listenScroll){
                let me = this
                this.scroll.on('scroll',(pos)=>{
                    me.$emit('scroll',pos)
                })
          }
        },
        enable(){
            this.scroll&&this.scroll.enable()
        },
        disable(){
            this.scroll&&this.scroll.disable()
        },
        refresh(){
            this.scroll&&this.scroll.refresh()
        },
        scrollTo(){
            this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement(){
            this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)   //apply指定实例对象 都是this.scroll
        }
      },
      watch:{
          data(){
              setTimeout(()=>{
                  this.refresh()
              },this.refreshDelay)
          }
      }
    
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
