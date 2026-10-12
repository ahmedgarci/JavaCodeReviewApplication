import {
  ArrowUpRight,
  FolderGit2,
  User,
} from "lucide-react";
import type RepositoryDetails from "../../Models/RepoDetails";
import { useNavigate } from "react-router-dom";

export default function RepositoryCard({
  repo,
}: {
  repo: RepositoryDetails;
}) {
  const navigate = useNavigate();

  function openRepository() {
    navigate(`/repositories/${repo.id}`, {
      state: repo,
    });
  }

  return (
    <button
      type="button"
      onClick={openRepository}
      className="
        group
        w-full
        text-left
        bg-white
        border
        border-[#e7e5e4]
        rounded-xl
        p-5
        transition-all
        duration-200
        hover:border-[#a8a29e]
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        focus:outline-none
        focus:ring-2
        focus:ring-[#171717]/10
      "
    >

      {/* Header */}
      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div className="flex items-center gap-3 min-w-0">

          {/* Repository icon */}
          <div className="
            shrink-0
            w-9
            h-9
            rounded-lg
            border
            border-[#e7e5e4]
            bg-[#fafaf9]
            flex
            items-center
            justify-center
            text-[#57534e]
          ">
            <FolderGit2 size={17} strokeWidth={1.7} />
          </div>


          {/* Name */}
          <div className="min-w-0">

            <h2 className="
              text-[15px]
              font-semibold
              text-[#171717]
              truncate
              group-hover:underline
              underline-offset-2
            ">
              {repo.name}
            </h2>

            <p className="
              text-xs
              text-[#a8a29e]
              mt-0.5
            ">
              Repository
            </p>

          </div>

        </div>


        {/* Arrow */}
        <div className="
          shrink-0
          w-8
          h-8
          rounded-lg
          flex
          items-center
          justify-center
          text-[#a8a29e]
          transition
          group-hover:text-[#292524]
          group-hover:bg-[#f5f5f4]
        ">
          <ArrowUpRight
            size={16}
            strokeWidth={1.7}
          />
        </div>

      </div>


      {/* Repository URL */}
      <div className="mt-5">

        <p className="
          text-xs
          text-[#a8a29e]
          mb-1.5
        ">
          Repository
        </p>

        <p className="
          text-sm
          text-[#57534e]
          truncate
        ">
          {repo.url}
        </p>

      </div>


      {/* Footer */}
      <div className="
        mt-5
        pt-4
        border-t
        border-[#f0efed]
        flex
        items-center
        justify-between
      ">

        {/* Owner */}
        <div className="flex items-center gap-2">

          <div className="
            w-7
            h-7
            rounded-full
            bg-[#f5f5f4]
            border
            border-[#e7e5e4]
            flex
            items-center
            justify-center
            text-[#78716c]
          ">
            <User
              size={13}
              strokeWidth={1.7}
            />
          </div>

          <div>

            <p className="
              text-[10px]
              uppercase
              tracking-wide
              text-[#a8a29e]
            ">
              Owner
            </p>

            <p className="
              text-xs
              font-medium
              text-[#44403c]
              max-w-[140px]
              truncate
            ">
              {repo.owner_name}
            </p>

          </div>

        </div>


        {/* Open label */}
        <span className="
          text-xs
          font-medium
          text-[#78716c]
          transition
          group-hover:text-[#171717]
        ">
          Open →
        </span>

      </div>

    </button>
  );
}
