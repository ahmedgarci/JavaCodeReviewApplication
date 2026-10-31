import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../Services/Fetch";
import type { SubmissionDetails } from "../Models/SubmissionDetails";
import CodeVisualizer from "../Components/Code/CodeVisualizer";
import DisplaySubmissionHeaderDetails from "../Components/SubmissionDetails/Header";
import DisplaySubmissionReviewers from "../Components/SubmissionDetails/DisplayReviewers";
import Loader from "../Components/Global/Loader";
import SonarAnalysisPage from "../Components/Sonar/SonarAnalysis";


export default function SubmissionDetailsPage() {

  const { id } = useParams();

  const [submission, setSubmission] = useState<SubmissionDetails | null>(null);

  const [selectedFile,setSelectedFile] = useState<{id:number,name:string}>();

  const {data,loading,error} = useFetch<SubmissionDetails>(`/submission/${id}/details`);
  console.log(data);
  useEffect(()=>{
    if(data){
      setSubmission(data);
    }
  },[data]);



  if(loading){

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        <Loader/>
      </div>
    );
  }

  const hasSonarAnalysis = data?.reviewType === "SONARQUBE" && data?.sonarReviewResponse?.sonarIssues?.length > 0;
  
  if (hasSonarAnalysis) {
    return (
    <main className="min-h-screen bg-[#F7FBFF] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <SonarAnalysisPage sonarAnaylysis={data.sonarReviewResponse} />
      </div>
    </main>
  );
}
  const humanReview =  data?.humanReviewResponse;

  if(error || !submission){

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-red-500
        font-medium
      ">
        Submission not found
      </div>
    );

  }



  return (

    <main
      className="
        min-h-screen
        bg-[#F7FBFF]
        px-6
        py-10
      "
    >


      <div
        className="
          max-w-6xl
          mx-auto
          space-y-6
        "
      >



        {/* Header */}

        <DisplaySubmissionHeaderDetails
          description={humanReview?.description as string}
          submitted_at={data?.submitted_at as string}
          title={humanReview?.title as string}
          status={humanReview?.status as string}
          labels={humanReview?.labels as string[] }
        />



        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">


          {/* Author */}

          <section
            className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
              border
              border-gray-100
            "
          >

            <h2
              className="
                text-lg
                font-bold
                text-[#12395B]
                mb-5
              "
            >
              Author
            </h2>


            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Avatar
                sx={{
                  backgroundColor:"#5FA8FF",
                  width:50,
                  height:50
                }}
              >

                {
                  humanReview?.author?.username
                    .charAt(0)
                    .toUpperCase()
                }

              </Avatar>


              <div>

                <p className="
                  font-semibold
                  text-gray-800
                ">
                  {humanReview?.author?.username}
                </p>


                <p className="
                  text-sm
                  text-gray-400
                ">
                  Submission author
                </p>


              </div>


            </div>


          </section>





          {/* Reviewers */}

          <section
            className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
              border
              border-gray-100
            "
          >

            <h2
              className="
                text-lg
                font-bold
                text-[#12395B]
                mb-5
              "
            >
              Reviewers
            </h2>



            {
              (humanReview?.reviewers?.length ?? 0) > 0 ?

              (
                <DisplaySubmissionReviewers
                  reviewers={humanReview?.reviewers!}
                />
              )

              :

              (

                <div className="
                  text-gray-400
                  text-sm
                ">
                  No reviewers assigned
                </div>

              )

            }


          </section>


        </div>






        {/* Files */}

        <section
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
            border
            border-gray-100
          "
        >


          <div className="
            flex
            justify-between
            items-center
            mb-5
          ">

            <h2
              className="
                text-lg
                font-bold
                text-[#12395B]
              "
            >
              Submitted Files
            </h2>


            <span
              className="
                bg-blue-50
                text-blue-600
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
              "
            >
              {humanReview?.files?.length ?? 0} files
            </span>


          </div>





          {
            (humanReview?.files?.length ?? 0) > 0 ?

            (

              <div className="space-y-3">


              {
                humanReview?.files?.map(file=>(

                  <div
                    key={file.id}
                    className="
                      group
                      flex
                      justify-between
                      items-center
                      border
                      border-gray-200
                      rounded-xl
                      p-4
                      hover:border-blue-300
                      hover:shadow-sm
                      transition
                    "
                  >


                    <div>

                      <p className="
                        font-semibold
                        text-gray-800
                      ">
                        📄 {file.filename}
                      </p>


                      <p className="
                        text-sm
                        text-gray-400
                        mt-1
                      ">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>


                    </div>



                    <button
                      onClick={()=>setSelectedFile({id:file.id,name:file.filename})}
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-[#12395B]
                        text-white
                        text-sm
                        font-medium
                        hover:bg-[#0e2c46]
                        transition
                      "
                    >
                      Review
                    </button>


                  </div>

                ))
              }


              </div>

            )

            :

            (

              <p className="
                text-gray-400
              ">
                No files submitted
              </p>

            )
          }


        </section>



      </div>



      {
        selectedFile &&

        <CodeVisualizer
          fileId={selectedFile.id}
          submissionId={Number(id)}
          fileName={selectedFile.name}
          isEditable={data?.reviewType == "PENDING"}
        />

      }


    
    </main>

  );
}