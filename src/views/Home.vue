<template>
  <div>
    <HelloWorld />
    <img src="@/asset/img/avatar.png" alt="">
    <img :src="avatarMini" alt="">
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

<style scoped>

</style>
