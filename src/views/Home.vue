<template>
  <div>
    <HelloWorld />
    <div class="container">
      <img src="@/asset/img/avatar.png" class="img1" alt="">
      <img :src="avatarMini" class="img2" alt="">
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import avatarMini from '@/asset/img/avatar-mini.png'

export default {
  data() {
    return {
      avatarMini
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="less" scoped>
 .container {
   display: flex;
 }
</style>
