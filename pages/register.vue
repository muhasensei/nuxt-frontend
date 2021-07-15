<template>
    <div>

        <center>
            <div class="login-form">
            <el-card shadow="always">
                    <el-page-header @back="goBack" label-width="130px" content="Регистрация">
                    </el-page-header>
                    
                    <el-form :model="controlsForm" status-icon :rules="rules" @submit.native.prevent="onSubmit" ref="form"  class="demo-controlsForm">
                        <el-form-item label="Email" prop="email">
                            <el-input type="text" v-model="controlsForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Пароль" prop="password">
                            <el-input type="password" v-model="controlsForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Подтверждение пароля" prop="password_confirmation">
                            <el-input type="password" v-model="controlsForm.password_confirmation" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item>
                            
                            <el-button type="primary" native-type="submit" :loading="loading" size="small">Регистрация</el-button>
                        </el-form-item>
                        <el-form-item>
                            <span>Уже зарегистрированы? <nuxt-link to="/auth">Войти</nuxt-link></span>
                        </el-form-item>
                    </el-form>
            </el-card>
            </div>
        </center>
    </div>
</template>

<script>
  export default {
    head(){
      return {
          title: `Регистрация`
      }
    },
    data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль'));
        } else {
          if (this.controlsForm.password_confirmation !== '') {
            this.$refs.form.validateField('password_confirmation');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль еще раз'));
        } else if (value !== this.controlsForm.password) {
          callback(new Error('Пароли не совподают'));
        } else {
          callback();
        }
      };
      return {
        controlsForm: {
          password: '',
          password_confirmation: '',
          email: ''
        },
        loading: false,
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: 'Это поле не должно быть пустым', trigger: 'blur' },
            { min: 8, message: 'Пароль должен состоять из более 8 символов', trigger: 'blur' }
          ],
          password_confirmation: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: 'Это поле не должно быть пустым', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Это поле не должно быть пустым', trigger: 'blur' },
            { type: 'email', message: 'Это поле должно быть эл. почтой', trigger: 'blur' },
          ]
        }
      };
    },








    
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          this.loading =true
          try {
            if (valid) {
              let errors = null;
              await this.$axios.$get('sanctum/csrf-cookie')
              await this.$axios.$post('/register', this.controlsForm)
                .then((resp)=>{})
                .catch((err)=>{
                  if(err.response.status == 422){
                    errors = err.response.data.errors
                  }
                })
              if(!errors){
                await this.$auth.loginWith('laravelSanctum', {data: this.controlsForm})
                this.loading = false
                this.$message.success('Вы успешно зарегистрировались')
              }else{
                this.$message.error('Пользователь с такой почтой уже существует')
              }
            } 
          } catch (error) {
            console.log(error);
          }
        });
      },





      goBack() {
            this.$router.push('/')
        },
    }
  }
</script>

<style scoped>
.login-form{
    margin-top: 3rem;
    width: 30%;
}
</style>