<template>
  <div>
    <form v-on:submit.prevent="submitForm">
      <div>
        <label for="username">ID:</label>
        <input 
          id="username" 
          type="text" 
          v-model="username"
          class="usernameInput"
          v-bind:class="{ 'error': isError }"
        >
      </div>
      <div>
        <label for="password">PW:</label>
        <input 
          id="password" 
          type="password" 
          v-model="password"
        >
      </div>
      <button 
        v-bind:disabled="!isUsernameValid" 
        type="submit"
      >
        로그인
      </button>
    </form>
    <p v-if="isSuccess">로그인 성공하였습니다.</p>
    <p v-if="isUsernameValid">이메일 형식에 맞습니다.</p>
    <ToastPopup 
      v-bind:open="isSuccess"
      v-on:close="isSuccess = false"
    >
    </ToastPopup>
  </div>
</template>

<script>
import ToastPopup from '@/components/ToastPopup.vue';

// email 형식 체크 함수
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default {
  components: {
    ToastPopup
  },
  data() {
    return {
      username: '',
      password: '',
      isError: false,
      isSuccess: false,
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    } 
  },
  methods: {
    submitForm() {
      // e.preventDefault();
      console.log('로그인완료');
      this.isError = true;
      // axios
      //   .post()
      //   .then()
      //   .catch(error => {
      //     this.isError = true;
      //   })
      this.isSuccess = true;
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
/* scoped - 현재 컴퍼넌트에만 적용 */
  .usernameInput {
    outline: none;
  }
  .usernameInput.error {
    border: 3px solid yellow;
  }
</style>