import api from "./Api/api"



export async function CreateComment(submissionId:number,codeId:number,line_number:number,content:string){
    try {
        const response = await api.privateApi.post(`/comments/${submissionId}/${codeId}`,{line_number,content})
        console.log(response);
    } catch (error) {
        console.error(error);
        throw error        
    }

}