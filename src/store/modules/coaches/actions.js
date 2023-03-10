export default {
    addCoach(context, payload){
        context.commit('addCoach', payload)
    },
    async registerCoach(context, payload){
        const userId = context.rootGetters.userId
        const token = context.rootGetters.token
        const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        }

        const response = await fetch(`https://findcoachproject-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        })

         const responseData = await response.json()

        if(!response.ok){
            const error = new Error(responseData.message || "Failed to register!")
            throw error
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context, payload){
       if(!payload.forceRefresh && !context.getters.shouldUpdate){
        return
       }
       const response = await fetch(`https://findcoachproject-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)
       const responseData = await response.json()

       if(!response.ok){
        const error = new Error(responseData.message || "Failed to fetch!")
        throw error
       }

       const coaches = []

       for(const key in responseData){
        const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas
        }
        coaches.push(coach)
       }

       context.commit('setCoaches', coaches)
       context.commit('setFetchTimeStamp')
    }

    
}