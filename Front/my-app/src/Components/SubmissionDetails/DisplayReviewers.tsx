import { Avatar } from "@mui/material";
import type {  UserDto } from "../../Models/SubmissionDetails";

interface SubmisssionReviwersProps{
    reviewers:UserDto[]
}

export default function DisplaySubmissionReviewers({reviewers}:SubmisssionReviwersProps) {

  return(
        <>
        {
            reviewers.map(user=>(

              <div
                key={user.id}
                className="
                  flex
                  items-center
                  gap-3
                  border
                  rounded-xl
                  px-4
                  py-3
                "
              >

                <Avatar>

                  {
                    user.username
                    .charAt(0)
                    .toUpperCase()

                  }

                </Avatar>



                <span className="font-medium">
                  {user.username}
                </span>


              </div>

            ))
          }
         </> 
    )
}