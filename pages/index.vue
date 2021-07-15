<template>
  <div>
    <div class="container text-center">
        <el-row :gutter="21">
          <el-col :span="7" v-for="currency in currencies" :key="currency.id">
            <el-card shadow="always">
              <p>{{currency.name.substr(0, 3)}} | {{currency.name.substr(3, 3)}}</p>
            <p>Дата: {{currency.created_at.toString().substr(0, 10)}}</p>
            <p>Покупка {{currency.name.substr(0, 3)}}: {{currency.value}} {{currency.name.substr(3, 3)}}</p>
            <p>Продажа {{currency.name.substr(0, 3)}}: {{Math.round((1 / currency.value) * 10000)/10000}} {{currency.name.substr(3, 3)}}</p>
              <el-button size="small" @click="showHistory(currency.name)">История</el-button>
            </el-card>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      middleware: ['auth'],
      layout: 'index', 
      async asyncData({ $axios }) {
        const currencies = await $axios.$get('http://localhost:8000/api/currencies')
        return { currencies }
      },
      methods:{
        showHistory(id){
          this.$router.push(`/currency/${id}`)
        }
      }
  }
</script>


<style>
.container{
  padding-left: 1%;
  padding-top: 1%;
}

.text-center{
  text-align: center;
}

</style>