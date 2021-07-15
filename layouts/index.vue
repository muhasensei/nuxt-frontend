<template>
    <div>
        <navigation/>
        <Nuxt />
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
    export default {
  components: { Navigation },
        
    }
</script>

<style>
    body{
        margin: 0;
    }
</style>