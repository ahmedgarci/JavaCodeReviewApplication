import api from "./Api/api";


export async function updateSubmissionStatus(submissionId: number,status: string){
    await api.privateApi.post(`/submission/status/${submissionId}`,{ status:status }
    );
}