
import { Chip, Button } from "@mui/material";
import ContributorsList from "../Components/RepoDetails/ContributorsList";
import SubmissionDisplay from "../Components/RepoDetails/DisplaySubmissions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../Services/Fetch";
import type { Submission } from "../Models/ProjectDetails";
import { useEffect, useState } from "react";
import SubmissionModal from "../Components/SubmissionModal/SubmissionModal";
import { Settings } from "lucide-react";
import QualitySettingsModal from "../Components/RepoDetails/QualitySettingsModal";
import Loader from "../Components/Global/Loader";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const repo = location.state;

  const [open, setOpen] = useState(false);
  const [showQualitySettings,setShowQualitySettings] = useState<boolean>(false);
  useEffect(() => {
    if (!id || !repo) {
      navigate("/repositories");
    }
  }, [id, repo, navigate]);

  const {loading,error} = useFetch<Submission[]>(`/submission/${id}`);

  if (!repo) return null;
  if(loading){
    return (<Loader/>)  
  }
  if(error){  
    return (
      <div
        className="
          bg-white
          border
          border-red-200
          rounded-xl
          p-5
          text-center
          text-red-600
        "
      >
        Failed to load submissions
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* HEADER */}
        <section
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-7
          "
        >

          <div className="flex flex-col md:flex-row justify-between gap-6">

            {/* Repository information */}
            <div className="min-w-0">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    bg-black
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-white
                  "
                >
                  <span className="text-lg font-bold">
                    &lt;/&gt;
                  </span>
                </div>

                <div className="min-w-0">

                  <h1
                    className="
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-black
                      truncate
                    "
                  >
                    {repo.name}
                  </h1>

                  <p className="text-sm text-gray-400 mt-1">
                    Repository
                  </p>

                  <button
              type="button"
              onClick={() => setShowQualitySettings(true)}
              className="
                group
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-neutral-200
                bg-white
                px-4
                py-2
                text-left
                transition-all
                hover:border-neutral-300
                hover:bg-neutral-50
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  bg-neutral-100
                  text-neutral-700
                  transition
                  group-hover:bg-black
                  group-hover:text-white
                "
              >
                <Settings size={16} />
              </div>

              {/* Text */}
              <div className="hidden sm:block">
                <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                  Quality Gate
                </p>

                
              </div>
            </button>

                </div>

              </div>


              <p className="text-sm text-gray-500 mt-5">
                Owned by{" "}
                <span className="font-medium text-black">
                  {repo.owner_name}
                </span>
              </p>


              {/* Technologies */}
              <div className="flex gap-2 mt-5 flex-wrap">

                <Chip
                  label="Java"
                  size="small"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#404040",
                    border: "1px solid #e5e5e5",
                    fontWeight: 500,
                  }}
                />

                <Chip
                  label="Spring Boot"
                  size="small"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#404040",
                    border: "1px solid #e5e5e5",
                    fontWeight: 500,
                  }}
                />

                <Chip
                  label="PostgreSQL"
                  size="small"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#404040",
                    border: "1px solid #e5e5e5",
                    fontWeight: 500,
                  }}
                />

              </div>


              {/* Repository link */}
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  mt-5
                  text-sm
                  font-medium
                  text-black
                  hover:underline
                "
              >
                View Repository
                <span className="ml-1">
                  →
                </span>
              </a>

            </div>


            {/* New submission */}
            <div>

              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  borderRadius: "9px",
                  padding: "10px 18px",
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: "none",
                  whiteSpace: "nowrap",

                  "&:hover": {
                    backgroundColor: "#262626",
                    boxShadow: "none",
                  },
                }}
              >
                + New Submission
              </Button>

            </div>

          </div>

        </section>


        {/* CONTENT */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-6
            mt-6
          "
        >

          {/* LEFT SIDEBAR */}
          <aside
            className="
              lg:col-span-3
              space-y-6
            "
          >

            {/* Navigation */}
            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
              "
            >

              <h2 className="font-semibold text-black">
                Project
              </h2>

              <div className="mt-4 space-y-1">

                <p
                  className="
                    px-3
                    py-2
                    rounded-lg
                    bg-black
                    text-white
                    text-sm
                    font-medium
                  "
                >
                  Overview
                </p>

                <p
                  className="
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    text-gray-500
                    cursor-pointer
                    hover:bg-gray-100
                    hover:text-black
                    transition
                  "
                >
                  Submissions
                </p>

                <p
                  className="
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    text-gray-500
                    cursor-pointer
                    hover:bg-gray-100
                    hover:text-black
                    transition
                  "
                >
                  Members
                </p>

                <p
                  className="
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    text-gray-500
                    cursor-pointer
                    hover:bg-gray-100
                    hover:text-black
                    transition
                  "
                >
                  Settings
                </p>

              </div>

            </div>


            {/* Contributors */}
            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
              "
            >
              <ContributorsList />
            </div>

          </aside>


          {/* RIGHT CONTENT */}
          <section className="lg:col-span-9">

            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
              "
            >

              <SubmissionDisplay />

            </div>

          </section>

        </div>

      </div>


      {/* Submission Modal */}
      <SubmissionModal
        open={open}
        onClose={() => setOpen(false)}
      />

      <QualitySettingsModal 
        open = {showQualitySettings}
        onClose={()=>setShowQualitySettings(false)}
      />

    </div>
  );
}



