import { useEffect, useState } from "react";
import useFetch from "../Services/Fetch";
import type RepositoryDetails from "../Models/RepoDetails";
import RepositoryCard from "../Components/Repo/Card";
import CreateRepoModal from "../Components/Repo/Modal";
import Loader from "../Components/Global/Loader";

export default function Repositories() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState<RepositoryDetails[]>([]);

  const { data, loading, error } =
    useFetch<RepositoryDetails[]>("/project/me");

  useEffect(() => {
    if (data) {
      setRepos(data);
    }
  }, [data]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#fafaf9] text-gray-900">
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          <div>

            <p className="
              text-sm
              font-medium
              text-gray-500
              mb-3
            ">
              Workspace
            </p>

            <h1 className="
              text-3xl
              sm:text-4xl
              font-semibold
              tracking-tight
              text-gray-950
            ">
              Your repositories
            </h1>

            <p className="
              mt-2
              text-sm
              sm:text-base
              text-gray-500
            ">
              Manage your projects and prepare for your next interview.
            </p>

          </div>


          {/* Create */}
          <button
            onClick={() => setOpen(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-10
              px-4
              rounded-lg
              bg-black
              text-white
              text-sm
              font-medium
              hover:bg-gray-800
              transition
              shrink-0
            "
          >
            <span className="text-base leading-none">
              +
            </span>

            New repository
          </button>

        </div>


        {/* Stats */}
        <div className="
          mt-10
          flex
          items-center
          gap-6
          text-sm
        ">

          <div className="flex items-center gap-2">

            <span className="font-semibold text-gray-900">
              {repos.length}
            </span>

            <span className="text-gray-500">
              {repos.length === 1
                ? "repository"
                : "repositories"}
            </span>

          </div>

        </div>


        {/* Search */}
        <div className="mt-6">

          <div className="relative max-w-md">

            <svg
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              type="text"
              placeholder="Search repositories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-10
                bg-white
                border
                border-gray-200
                rounded-lg
                pl-10
                pr-4
                text-sm
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-100
              "
            />

          </div>

        </div>


        {/* Divider */}
        <div className="border-t border-gray-200 mt-8" />


        {/* Content */}
        <div className="mt-8">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-24">
              <Loader />
            </div>
          )}


          {/* Error */}
          {error && (
            <div className="
              max-w-xl
              border
              border-red-200
              bg-red-50
              rounded-xl
              p-5
            ">

              <p className="text-sm font-medium text-red-700">
                Unable to load repositories.
              </p>

              <p className="text-sm text-red-600/70 mt-1">
                Please refresh the page and try again.
              </p>

            </div>
          )}


          {/* Empty */}
          {!loading &&
            !error &&
            filteredRepos.length === 0 && (

              <div className="
                max-w-xl
                py-16
              ">

                <div className="
                  w-10
                  h-10
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  flex
                  items-center
                  justify-center
                  mb-5
                ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-gray-500"
                  >
                    <path d="M4 5h16v14H4z" />
                    <path d="M4 9h16" />
                  </svg>
                </div>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                ">
                  {search
                    ? "No repositories found"
                    : "Create your first repository"}
                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-2
                  max-w-md
                  leading-relaxed
                ">
                  {search
                    ? "Try searching with a different repository name."
                    : "Create a repository to start reviewing code and preparing for technical interviews."}
                </p>

                {!search && (
                  <button
                    onClick={() => setOpen(true)}
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      h-10
                      px-4
                      rounded-lg
                      bg-black
                      text-white
                      text-sm
                      font-medium
                      hover:bg-gray-800
                      transition
                    "
                  >
                    <span>+</span>
                    Create repository
                  </button>
                )}

              </div>

            )}


          {/* Repository grid */}
          {!loading &&
            !error &&
            filteredRepos.length > 0 && (

              <div>

                {/* Result count */}
                <div className="
                  flex
                  items-center
                  justify-between
                  mb-4
                ">

                  <p className="text-xs text-gray-500">
                    {filteredRepos.length}{" "}
                    {filteredRepos.length === 1
                      ? "result"
                      : "results"}
                  </p>

                </div>


                <div className="
                  grid
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-4
                ">

                  {filteredRepos.map((repo) => (
                    <RepositoryCard
                      key={repo.id}
                      repo={repo}
                    />
                  ))}

                </div>

              </div>

            )}

        </div>

      </section>


      {/* Create Repository */}
      <CreateRepoModal
        modalState={open}
        setModalState={setOpen}
        addRepo={(repo: RepositoryDetails) =>
          setRepos((current) => [...current, repo])
        }
      />

    </main>
  );
}