<template>
    <div>
        <base-dialog fixed :show="isLoading" title="Authenticating..." @close="handleDialog">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-dialog :show="!!error" title="An error occured" @close="handleDialog">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                <label for="email">Email</label>
                <input type="email" id="email" v-model.trim="email"/>
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password"/>
            </div>
            <p v-if="!formIsValid">Please insert a valid email or a password with length larger than 6 characters!</p>
            <base-button>{{submitButtonCaption}}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }} instead</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default{
    data(){
        return{
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login'
            }else{
                return 'Sign up'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'Sign up'
            }else{
                return 'Login'
            }
        }
    },
    methods: {
        async submitForm(){
            this.formIsValid = true
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false
                return;
            }

            if(this.mode === 'signup'){
                this.isLoading = true
                try {
                    await this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password
                })} catch(error){
                    this.error = error.message
                }
                this.isLoading = false
                this.$router.replace('/auth')
            }else{
                this.isLoading = true
                try{
                    await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })}catch(error){
                    this.error = error.message
                }
                this.isLoading = false
                this.$router.replace('/coaches')
            }
            
        },
        switchAuthMode(){
            if(this.mode === 'login'){
                this.mode = 'signup'
            }else{
                this.mode = 'login'
            }
        },

        handleDialog(){
            this.error = null
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>