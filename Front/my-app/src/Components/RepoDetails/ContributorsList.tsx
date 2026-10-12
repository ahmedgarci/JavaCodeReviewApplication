import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../Services/Fetch";
import { useEffect, useState } from "react";
import Loader from "../Global/Loader";
import type { User } from "../../Models/SubmissionDetails";
import AddCollaboratorDialog from "../Invitation/InvitationForm";

export default function ContributorsList() {
  const { id } = useParams();

  const [contributors, setContributors] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, loading, error } = useFetch<User[]>(`/project/${id}`);

  useEffect(() => {
    if (data) {
      setContributors(data);
    }
  }, [data]);



  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-4 text-center text-sm text-red-600">
        Failed to load contributors
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#171717]">
              Contributors
            </h3>

            <p className="mt-1 text-[13px] text-[#737373]">
              People working on this project
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Add collaborator */}
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-lg
                bg-black
                px-3.5
                text-[13px]
                font-medium
                text-white
                transition
                hover:bg-[#262626]
                active:scale-[0.98]
              "
            >
              <span className="text-[17px] leading-none">+</span>
            </button>
          </div>
        </div>

        {/* Contributors */}
        {contributors.length > 0 ? (
          <div className="space-y-2.5">
            {contributors.map((user) => (
              <div
                key={user.id}
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  rounded-xl
                  border
                  border-[#E5E5E5]
                  bg-white
                  px-4
                  py-3.5
                  transition
                  hover:border-[#D4D4D4]
                  hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                "
              >
                {/* Avatar */}
                <Avatar
                  sx={{
                    backgroundColor: "#F5F5F5",
                    color: "#171717",
                    width: 40,
                    height: 40,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>

                {/* User */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-[#171717]">
                    {user.username}
                  </p>

                  <p className="mt-0.5 text-[12px] text-[#A3A3A3]">
                    Project contributor
                  </p>
                </div>

                {/* Role */}
                <span className="rounded-md bg-[#F5F5F5] px-2.5 py-1 text-[11px] font-medium text-[#737373]">
                  Member
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-[#D4D4D4]
              bg-[#FAFAFA]
              py-12
              text-center
            "
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F0F0]">
              <span className="text-base">👥</span>
            </div>

            <p className="text-[14px] font-medium text-[#171717]">
              No contributors yet
            </p>

            <p className="mt-1 text-[13px] text-[#A3A3A3]">
              Add members to start collaborating
            </p>

            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="
                mt-4
                text-[13px]
                font-medium
                text-[#171717]
                underline
                underline-offset-4
                decoration-[#D4D4D4]
                transition
                hover:decoration-[#171717]
              "
            >
              Add your first collaborator
            </button>
          </div>
        )}
      </div>

      {/* Add Collaborator Dialog */}
      {isDialogOpen && <AddCollaboratorDialog open={isDialogOpen} setOpen={setIsDialogOpen} projectId={id!}/>}
    </>
  );
}
