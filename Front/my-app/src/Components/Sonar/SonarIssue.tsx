import type { SonarIssue } from "../../Models/SubmissionDetails";

const SonarIssue = ({ issue }:{issue:SonarIssue}) => (
    <div className="border border-gray-300 hover:border-black transition-colors">
  
      <div className="px-5 py-4">
  
        <div className="flex items-start justify-between">
  
          <div className="flex items-center gap-3">
  
            <span className="text-xs font-semibold border border-black px-2 py-1">
              {issue.severity}
            </span>
  
            <span className="text-sm font-medium">
              {issue.fileName}
            </span>
  
          </div>
  
          <span className="text-xs text-gray-500">
            LINE {issue.lineNumber}
          </span>
  
        </div>
  
        <p className="text-sm text-gray-600 mt-3">
          {issue.message}
        </p>
  
      </div>
  
    </div>
  );

  export default SonarIssue