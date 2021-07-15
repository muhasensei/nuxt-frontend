<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1"><nuxt-link to="/">Главная</nuxt-link></el-menu-item>
        <el-menu-item index="2" v-if="!this.$auth.loggedIn"><a href="/auth">Войти</a></el-menu-item>
        <el-menu-item index="3" v-else><a @click="logout" >Выйти {{this.$auth.user.email}}</a></el-menu-item>
    </el-menu>
</template>

<script>
    export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      logout(){
        this.$auth.logout()
        this.$router.push('/auth?message=logout')
      }
    }
    }
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>