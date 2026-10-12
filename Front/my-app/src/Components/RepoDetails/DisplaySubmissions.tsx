import { Chip } from "@mui/material";
import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Submission } from "../../Models/ProjectDetails";
import useFetch from "../../Services/Fetch";
import Loader from "../Global/Loader";

export default function SubmissionDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const size = 10;
  const { data:submissions, loading, error } = useFetch<Submission[]>(`/submission/${id}?page=${page}&size=${size}`);


  if (loading) {
    return <Loader />;
  }

  if (error) {
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
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Submissions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Review submitted code changes
          </p>
        </div>

        <div
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            font-medium
          "
        >
          {submissions?.length}{" "}
          {submissions?.length === 1 ? "submission" : "submissions"}
        </div>

      </div>

      {submissions && submissions.length > 0 ? (

        <div className="space-y-6">

          {submissions.map((sub) => (

            <div
              key={sub.id}
              onClick={() => navigate(`/submission/${sub.id}`)}
              className="
                group
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                cursor-pointer
                transition-all
                duration-200
                hover:border-gray-400
                hover:shadow-lg
              "
            >

              {/* Top */}
              <div className="flex justify-between items-start gap-5">

                <div className="flex-1 min-w-0">

                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-black
                      transition
                      group-hover:text-gray-700
                    "
                  >
                    {sub.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Submitted by

                    <span className="font-medium text-gray-800 ml-1">
                      {sub.author}
                    </span>
                  </p>

                </div>

                <Chip
                  label={sub.status}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    fontSize: "11px",
                    borderRadius: "6px",
                    backgroundColor:
                      sub.status === "APPROVED"
                        ? "#f0fdf4"
                        : sub.status === "DECLINED"
                        ? "#fef2f2"
                        : "#f5f5f5",
                    color:
                      sub.status === "APPROVED"
                        ? "#166534"
                        : sub.status === "DECLINED"
                        ? "#b91c1c"
                        : "#525252",
                    border:
                      sub.status === "APPROVED"
                        ? "1px solid #bbf7d0"
                        : sub.status === "DECLINED"
                        ? "1px solid #fecaca"
                        : "1px solid #e5e5e5",
                  }}
                />

              </div>

              {/* Footer */}
              <div
                className="
                  mt-6
                  pt-4
                  border-t
                  border-gray-100
                  flex
                  justify-between
                  items-center
                  text-sm
                "
              >

                <span className="text-gray-400">
                  Submitted recently
                </span>

                <span
                  className="
                    text-black
                    font-medium
                    group-hover:underline
                  "
                >
                  View review →
                </span>

              </div>

            </div>

          ))}

          <div className="flex justify-center items-center gap-4 pt-4">
            <button
              disabled={page === 0 || loading}
              onClick={() => setPage((prev) => prev - 1)}
              className="
                px-4
                py-2
                rounded-lg
                border
                border-gray-200
                text-sm
                font-medium
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:bg-gray-50
              "
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {page + 1}
            </span>

            <button
              disabled={submissions.length < size || loading}
              onClick={() => setPage((prev) => prev + 1)}
              className="
                px-4
                py-2
                rounded-lg
                bg-black
                text-white
                text-sm
                font-medium
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              Next →
            </button>

          </div>

        </div>

      ) : (

        /* Empty state */
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-dashed
            border-gray-300
            py-14
            text-center
          "
        >

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-xl
              bg-gray-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <span className="text-xl">
              📂
            </span>
          </div>

          <h3 className="text-lg font-semibold text-black">
            No submissions yet
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Submitted code will appear here
          </p>

        </div>

      )}

    </div>
  );
}
