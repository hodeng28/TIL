<template>
  <div class="progress">
    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* scoped - 현재 컴퍼넌트에만 적용 */
  .progress {
    width: 0%;
    height: 5px;
    background-color: chocolate;
    /* transition: width 700ms linear; */
    animation: loading 1.5s linear;
  }
  /* .loadingBar {
    width: 100%;
  } */
  @keyframes loading {
    0% {
      width: 0%;
    }
    50% {
      width: 10%;
    }
    100% {
      width: 20%;
    }
  }
</style>