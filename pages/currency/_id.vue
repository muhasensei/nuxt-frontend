<template>
    <div class="container">
        <h4>Актуальные цены:</h4> 
        <el-card shadow="always">
            <p>{{currency.name.substr(0, 3)}} | {{currency.name.substr(3, 3)}}</p>
            <p>Дата: {{currency.created_at.toString().substr(0, 10)}}</p>
            <p>Покупка {{currency.name.substr(0, 3)}}: {{currency.value}} {{currency.name.substr(3, 3)}}</p>
            <p>Продажа {{currency.name.substr(0, 3)}}: {{Math.round((1 / currency.value) * 10000)/10000}} {{currency.name.substr(3, 3)}}</p>
        </el-card>
        <h4>История цен:</h4> 
        <el-card shadow="always" v-for="currency in history" :key="currency.id">
            <p>{{currency.name.substr(0, 3)}} | {{currency.name.substr(3, 3)}}</p>
            <p>Дата: {{currency.created_at.toString().substr(0, 10)}}</p>
            <p>Покупка {{currency.name.substr(0, 3)}}: {{currency.value}} {{currency.name.substr(3, 3)}}</p>
            <p>Продажа {{currency.name.substr(0, 3)}}: {{Math.round((1 / currency.value) * 10000)/10000}} {{currency.name.substr(3, 3)}}</p>
        </el-card>
    </div>
</template>

<script>
    export default {
        head(){
            return {
                title: `История валюты`
            }
        },
        middleware: ['auth'],
        
        layout: 'index',
        async asyncData({$axios, params}){
            const currency = await $axios.$get(`http://localhost:8000/api/currencies/${params.id}`)
            const history = await $axios.$get(`http://localhost:8000/api/currencies/history/${params.id}`)
            return {currency, history}
        },
        data() {
            return {
                
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>

</style>