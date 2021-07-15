<template>
    <div>

        <center>
            <div class="login-form">
            <el-card shadow="always">
                    <el-page-header  @back="goBack" label-width="130px" content="Вход в систему">
                    </el-page-header>
                    <span :v-if="errors">
                      {{errors}}
                    </span>
                    <el-form :model="controlsForm" status-icon :rules="rules" @submit.native.prevent="onSubmit" ref="form"  class="demo-controlsForm">
                        <el-form-item label="Email" prop="email">
                            <el-input type="text" v-model="controlsForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Пароль" prop="password">
                            <el-input type="password" v-model="controlsForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        
                        <el-form-item>
                            <el-button type="primary" :loading="loading" native-type="submit" size="small">Войти</el-button>
                        </el-form-item>
                        <el-form-item>
                            <span>Не зарегистрированы? <nuxt-link to="/register">Регистрация</nuxt-link></span>
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
          title: `Вход в систему`
      }
    },
    data() {
      
      return {
        controlsForm: {
          password: '',
          email: '',
        },
        loading: false,
        errors: null,
        rules: {
          password: [
            { required: true, message: 'Это поле не должно быть пустым', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Это поле не должно быть пустым', trigger: 'blur' },
            { type: 'email', message: 'Это поле должно быть эл. почтой', trigger: 'blur' },
          ]
        }
      };
    },
    created() {
      const {message} = this.$route.query
      if(message =='notLoggedIn'){
          this.$message.warning('Для начала войдите в систему')
      }
      if(message == 'logout'){
          this.$message.success('Вы успешно вышли из системы')
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          this.loading = true
          try {
            if (valid) {
              await this.$auth.loginWith('laravelSanctum', {data: this.controlsForm})
              this.loading = false
              this.$router.push('/')
              this.$message.success('Вы успешно вошли в систему')
            } 
          } catch (error) {
            this.$message.error('Логин или пароль не верны')
            this.loading = false
          }
        });
      },

      goBack() {
            this.$router.go(-1)
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