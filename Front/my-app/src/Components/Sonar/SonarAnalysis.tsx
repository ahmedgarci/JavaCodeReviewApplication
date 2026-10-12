import type { SonarReviewResponse } from "../../Models/SubmissionDetails";
import { SeverityBadge, SummaryItem } from "./fns/SonarUtils";

interface Props {
  sonarAnaylysis: SonarReviewResponse;
}

export default function SonarAnalysisPage({
  sonarAnaylysis,
}: Props) {
  const issues = sonarAnaylysis.sonarIssues;

  const critical = issues.filter(
    issue => issue.severity === "CRITICAL"
  ).length;

  const major = issues.filter(
    issue => issue.severity === "MAJOR"
  ).length;

  const minor = issues.filter(
    issue => issue.severity === "MINOR"
  ).length;

  const info = issues.filter(
    issue => issue.severity === "INFO"
  ).length;

  const quality = sonarAnaylysis.qualityTestResult;

  return (
    <section
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
      "
    >

      {/* ================= HEADER ================= */}

      <div
        className="
          px-6
          py-5
          border-b
          border-gray-100
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-[#12395B]
                flex
                items-center
                justify-center
                text-white
                text-sm
                font-bold
              "
            >
              S
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2
                  className="
                    text-lg
                    font-bold
                    text-[#12395B]
                  "
                >
                  Sonar Analysis
                </h2>

                <span
                  className="
                    px-2
                    py-0.5
                    rounded-full
                    bg-gray-100
                    text-gray-500
                    text-[11px]
                    font-semibold
                  "
                >
                  {issues.length}
                </span>

              </div>

              <p className="text-xs text-gray-400 mt-0.5">
                Static analysis results
              </p>

            </div>

          </div>

        </div>

        {/* Status */}

        <div
          className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            bg-green-50
            border
            border-green-100
            self-start
            sm:self-auto
          "
        >

          <span className="relative flex h-2 w-2">

            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-green-400
                opacity-60
              "
            />

            <span
              className="
                relative
                inline-flex
                rounded-full
                h-2
                w-2
                bg-green-500
              "
            />

          </span>

          <span
            className="
              text-[11px]
              font-bold
              tracking-wide
              text-green-600
            "
          >
            ANALYZED
          </span>

        </div>

      </div>


      {/* ================= SEVERITY SUMMARY ================= */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          border-b
          border-gray-100
        "
      >

        <SummaryItem
          label="CRITICAL"
          value={critical}
          color="bg-red-500"
        />

        <SummaryItem
          label="MAJOR"
          value={major}
          color="bg-orange-500"
        />

        <SummaryItem
          label="MINOR"
          value={minor}
          color="bg-yellow-500"
        />

        <SummaryItem
          label="INFO"
          value={info}
          color="bg-blue-500"
        />

      </div>


      {/* ================= CODE QUALITY ================= */}

      <div className="px-6 py-6 border-b border-gray-100">

        <div className="mb-5">

          <h3
            className="
              text-sm
              font-bold
              text-gray-800
            "
          >
            Code Quality
          </h3>

          <p
            className="
              text-xs
              text-gray-400
              mt-1
            "
          >
            Overall quality metrics detected by Sonar
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
          "
        >

          {/* Bugs */}

          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                Bugs
              </span>

              <span className="text-lg">
                🐞
              </span>

            </div>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {quality.bugs}
            </p>

          </div>


          {/* Vulnerabilities */}

          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                Vulnerabilities
              </span>

              <span className="text-lg">
                🛡️
              </span>

            </div>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {quality.vulnerabilities}
            </p>

          </div>


          {/* Code Smells */}

          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                Code Smells
              </span>

              <span className="text-lg">
                🧹
              </span>

            </div>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {quality.codeSmells}
            </p>

          </div>


          {/* Coverage */}

          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                Coverage
              </span>

              <span className="text-lg">
                📊
              </span>

            </div>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {quality.coverage}%
            </p>

          </div>

        </div>

      </div>


      {/* ================= ISSUES HEADER ================= */}

      <div
        className="
          px-6
          py-5
          flex
          items-center
          justify-between
          border-b
          border-gray-100
        "
      >

        <div>

          <div className="flex items-center gap-2">

            <h3
              className="
                text-sm
                font-bold
                text-gray-800
              "
            >
              Detected Issues
            </h3>

            <span
              className="
                text-[10px]
                font-semibold
                text-gray-400
                bg-gray-100
                px-2
                py-0.5
                rounded-full
              "
            >
              {issues.length}
            </span>

          </div>

          <p
            className="
              text-xs
              text-gray-400
              mt-1
            "
          >
            Review problems detected in your code
          </p>

        </div>

      </div>


      {/* ================= ISSUE LIST ================= */}

      <div className="px-6 py-5">

        {issues.length === 0 ? (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              py-12
              rounded-xl
              bg-green-50
              border
              border-green-100
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
                text-green-600
                text-xl
              "
            >
              ✓
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-bold
                text-gray-800
              "
            >
              No issues found
            </h3>

            <p
              className="
                text-xs
                text-gray-400
                mt-1
              "
            >
              Sonar did not detect any problems in your code.
            </p>

          </div>

        ) : (

          <div
            className="
              max-h-[480px]
              overflow-y-auto
              pr-2
              space-y-3
              scrollbar-thin
              scrollbar-thumb-gray-200
              scrollbar-track-transparent
            "
          >

            {issues.map(issue => (

              <div
                key={issue.id}
                className="
                  group
                  relative
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-4
                  transition-all
                  duration-200
                  hover:border-blue-200
                  hover:bg-blue-50/30
                  hover:shadow-sm
                "
              >

                {/* Left accent */}

                <div
                  className={`
                    absolute
                    left-0
                    top-3
                    bottom-3
                    w-0.5
                    rounded-r
                    ${
                      issue.severity === "CRITICAL"
                        ? "bg-red-500"
                        : issue.severity === "MAJOR"
                        ? "bg-orange-500"
                        : issue.severity === "MINOR"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }
                  `}
                />


                {/* Top row */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      min-w-0
                    "
                  >

                    <SeverityBadge
                      severity={issue.severity}
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-gray-800
                        truncate
                      "
                      title={issue.fileName}
                    >
                      {issue.fileName}
                    </span>

                  </div>


                  {/* Line */}

                  <span
                    className="
                      shrink-0
                      text-[11px]
                      font-medium
                      text-gray-400
                      bg-gray-50
                      border
                      border-gray-100
                      px-2
                      py-1
                      rounded-md
                    "
                  >
                    Line {issue.lineNumber}
                  </span>

                </div>


                {/* Message */}

                <p
                  className="
                    text-sm
                    text-gray-600
                    leading-relaxed
                    mt-3
                    pl-1
                  "
                >
                  {issue.message}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}