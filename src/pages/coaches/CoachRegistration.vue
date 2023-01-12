<template>
    <div>
        <base-dialog :show="!!error" title="An error occured!" @close="handleError"></base-dialog>
        <section>
            <base-spinner v-if="isLoading">
                <div></div>
            </base-spinner>
            <base-card>
                <h2>Register as a coach now!</h2>
                <coach-form @save-data="saveData"></coach-form>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
export default{
    components: {
        CoachForm
    },
    data(){
        return{
            isLoading: false,
            error: null
        }
    },
    methods: {
        async saveData(data){
            this.isLoading = true
            try{
                await this.$store.dispatch('coaches/registerCoach', data)
            }catch(error){
                this.error = error.message || "Failed to register!"
            }
            
            this.isLoading = false

            this.$router.push('/coaches')
        },
        handleError(){
            this.error = null
        }
    }
}
</script>