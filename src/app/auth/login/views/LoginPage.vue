<template>
  <LoginForm></LoginForm>
</template>

<script>
import LayoutPage from "src/app/layouts/LayoutPage.vue";
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>
