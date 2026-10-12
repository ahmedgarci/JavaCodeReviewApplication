import api from "./Api/api";

export interface SubmissionData {
  title: string;
  description: string;
  reviewers: number[];
  labels:number[]
}


export async function createSubmission(projectId: number,data: SubmissionData,files: File[]) {

  const formData = new FormData();


  formData.append("data",new Blob(
      [JSON.stringify(data)],
      {
        type: "application/json",
      }
    )
  );


  files.forEach((file) => {
    formData.append(
      "files",
      file
    );
  });

  const IdempotencyKey = crypto.randomUUID();


  try {
    console.log(data)
    const response = await api.privateApi.post(
      `/submission/${projectId}`,
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data",
          "Idempotency-Key": IdempotencyKey,
          
        },
      }
    );
    return response.data    
  } catch (error) {
    throw error;    
  }

}


export async function handleSonarAnalysis(projectId:number) {
  try {
   api.privateApi.post(`/submission/repo/${projectId}`);
  } catch (error) {
    console.error("Sonar analysis error:", error);
    throw error;
  }
}