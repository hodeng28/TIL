<template>
  <div>
    <form v-on:submit="submitForm">
      <div>
        <label for="username">ID:</label>
        <input 
          id="username" 
          type="text" 
          v-model="username"
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
      <button>로그인</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      console.log('submitted');  
    },
  },
};
</script>

<style>

</style>