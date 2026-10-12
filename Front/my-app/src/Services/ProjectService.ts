import type RepositoryDetails from "../Models/RepoDetails";
import api from "./Api/api";


export interface CreateProjectRequest {
  name: string;
  url: string;
}

export interface ProjectSettings{
  maxBugs:number;
  maxVulnerabilities :number;
  maxCodeSmells:number;
  minCoverage:number;
}

class ProjectService {


  async createProject(project: CreateProjectRequest): Promise<RepositoryDetails> {
    const response = await api.privateApi.post("/project",project);
    return response.data;
  }


  async setProjectQualitySettings(projectId:number,settings:ProjectSettings): Promise<void> {
    try {
      const response = await api.privateApi.post(`/settings/${projectId}`,settings);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }




//   async deleteProject(
//     id:number
//   ):Promise<void>{

//     await privateApi.delete(
//       `/project/${id}`
//     );

//   }


}


export default new ProjectService();