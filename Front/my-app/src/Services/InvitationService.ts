import api from "./Api/api"


const InvitationService ={

    sendInvitation:async (userEmail:string,projectId:string)=>{
        try {
            const response = await api.privateApi.post(`/invitation/${projectId}`,{email:userEmail})
            console.log(response)
        } catch (error:any) {
            throw error.response.data
        }

    },
    
    acceptInvitation:async(code:string)=>{
        try {
           await api.privateApi.post("/invitation",{},{params:{"token":code}});
        } catch (error) {
            // to handle error
            console.log(error)
        }

    }


}
export default InvitationService;