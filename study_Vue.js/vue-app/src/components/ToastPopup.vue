<template>
  <div 
    class="toast"
    v-bind:class="{ 'toastOpen': open }"
  >
    토스트 팝업
  </div>
</template>

<script>

let timer;

export default {
  props: ["open"],
  watch: {
    open(newValue) {
      if (newValue) {
        console.log('토스트 열기');
        clearTimeout(timer);
        timer = setTimeout(() => this.$emit('close'), 2000);
      }
    } 
  }
}
</script>

<style scoped>
  .toast {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 5%;
    bottom: -6%;
    width: 200px;
    height: 40px;
    background-color: black;
    color: #ffffff;
    transition: bottom 0.7s linear;
  }
  .toastOpen {
    bottom: 5%;
  }

</style>