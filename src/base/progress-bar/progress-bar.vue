<template>
    <div class="progress-bar" ref="progressBar" @click="progressCli">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper"
             @touchstart.prevent="progressTouchStart"
             @touchmove.prevent="progressTouchMove"
             @touchend="progressTouchEnd"
        >
          <div class="progress-btn" ref="progressBtn"></div>
        </div>
      </div>
    </div>
</template>


<script>
  import {prefixStyle} from '../../common/js/dom'
  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
    export default{
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
      created(){
           this.touch = {}
      },
      methods:{
        progressTouchStart(e){
            this.touch.initmove =true
          this.touch.starX = e.touches[0].pageX
          this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e){
            if(!this.touch.initmove){
                return
            }
            this.touch.endX = e.touches[0].pageX
            const delta = this.touch.endX - this.touch.starX
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left+delta))
            this._offset(offsetWidth)
        },
        progressTouchEnd(){
            this.touch.initmove = false
          this._triggerPercent()
        },
        progressCli(e){
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = e.pageX - rect.left       //用e.offsetX获取不到
            this._offset(offsetWidth)
          this._triggerPercent()
        },
        _triggerPercent(){
            const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const percent = this.$refs.progress.clientWidth / progressBarWidth
          this.$emit('percentChange',percent)
        },
          _offset(offsetWidth){
              this.$refs.progress.style.width = `${offsetWidth}px`
              this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`
          }
      },
      watch:{
        percent(newPercent){
          if(newPercent>=0 && !this.touch.initmove){
              const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const offsetWidth = progressBarWidth * newPercent
            this._offset(offsetWidth)
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
