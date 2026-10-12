export interface User {
    id:number;
    username:string;
}
  
  
export interface FileDto {
    id:number;
    filename:string;
    size:number;
}
  
export interface UserDto{
  id:string;
  username:string
}

export interface SonarReviewResponse{
    sonarIssues:SonarIssue[];
    qualityTestResult:QualityTestResultDto;
}

export interface QualityTestResultDto{
    bugs: number;
    vulnerabilities: number;
    codeSmells: number;
    coverage: number;
}

export interface HumanReviewResponse{
  title:string;
    
  description:string;
    
  author:UserDto;
    
  files:FileDto[];
    
  reviewers:UserDto[];

  status:string;

  labels:string[];

}

export interface SubmissionDetails {

    id:number;
    
    submitted_at:string;
  
    sonarReviewResponse:SonarReviewResponse;
  
    humanReviewResponse:HumanReviewResponse;
  
    reviewType:string;
}
  
export interface SonarIssue {
    id: number;
    severity: string;
    fileName: string;
    lineNumber: number;
    message: string;
}

export interface CommentResponseDto {    
      id:number;
  
      author:string;
  
      content:string;
  
      line_number:number;
  
      created_at:Date;
}


export interface FileContentResponse {    
    content:string;
    comments:CommentResponseDto[]
}

