<template>
    <div>
        <section>
            <base-card>
                <header>
                    <h2>Requests Received</h2>
                </header>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasRequests && !isLoading">
                    <request-item 
                    v-for="item in receivedRequests"
                    :key="item.id"
                    :email="item.userEmail"
                    :message="item.message"></request-item>
                </ul>
                <h3 v-else>You haven't received any requests yet!</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'

export default{
    components: {
        RequestItem
    },
    data(){
        return{
            isLoading: false
        }
    },
    computed: {
        receivedRequests(){
            return this.$store.getters['requests/requests']
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests']
        }
    },
    mounted(){
        this.loadRequests()
    },
    methods: {
        async loadRequests(){
            this.isLoading = true
            await this.$store.dispatch('requests/fetchRequests')
            this.isLoading = false
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>