import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ProjectService, {
  type CreateProjectRequest,
  type ProjectSettings,
} from "../../Services/ProjectService";
import type RepositoryDetails from "../../Models/RepoDetails";

interface ModalProps {
  modalState: boolean;
  setModalState: (value: boolean) => void;
  addRepo: (repo: RepositoryDetails) => void;
}

export default function CreateRepoModal({
  modalState,
  setModalState,
  addRepo,
}: ModalProps) {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState<RepositoryDetails | null>(null);

  const [form, setForm] = useState({
    name: "",
    url: "",
  });

  const [qualityGate, setQualityGate] = useState<ProjectSettings>({
    minCoverage: 80,
    maxBugs: 0,
    maxVulnerabilities: 0,
    maxCodeSmells: 10,
  });

  async function createRepository() {
    const newRepo: CreateProjectRequest = {
      name: form.name,
      url: form.url,
    };

    const createdProject =
      await ProjectService.createProject(newRepo);

    setProject(createdProject);
    addRepo(createdProject);
    setStep(2);
  }

  async function saveQualityGate() {
    if (!project) return;

    await ProjectService.setProjectQualitySettings(
      project.id,
      qualityGate
    );

    closeModal();
  }

  function skipQualityGate() {
    closeModal();
  }

  function closeModal() {
    setForm({
      name: "",
      url: "",
    });

    setQualityGate({
      minCoverage: 80,
      maxBugs: 0,
      maxVulnerabilities: 0,
      maxCodeSmells: 10,
    });

    setProject(null);
    setStep(1);
    setModalState(false);
  }

  return (
    <Dialog
      open={modalState}
      onClose={closeModal}
      fullWidth
      maxWidth="sm"
      slotProps={{
    paper: {
      sx: {
        borderRadius: "14px",
        backgroundColor: "#ffffff",
        boxShadow: "0 24px 70px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
      },
    },
    backdrop: {
      sx: {
        backgroundColor: "rgba(23, 23, 23, 0.35)",
      },
    },
  }}

    >
      {/* -------------------------------- */}
      {/* Header                           */}
      {/* -------------------------------- */}

      <DialogTitle
        sx={{
          padding: "26px 28px 20px",
        }}
      >
        <div className="flex items-start justify-between">

          <div>

            <div className="
              flex
              items-center
              gap-2.5
              mb-4
            ">

              <div className="
                w-8
                h-8
                rounded-lg
                bg-[#f5f5f4]
                border
                border-[#e7e5e4]
                flex
                items-center
                justify-center
                text-xs
                font-semibold
                text-gray-700
              ">
                {step}
              </div>

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-gray-400
              ">
                Step {step} of 2
              </span>

            </div>


            <h2 className="
              text-[22px]
              font-semibold
              tracking-tight
              text-[#171717]
            ">
              {step === 1
                ? "Create repository"
                : "Set quality standards"}
            </h2>

            <p className="
              mt-2
              text-sm
              font-normal
              leading-relaxed
              text-[#737373]
            ">
              {step === 1
                ? "Connect a project to start reviewing your code."
                : "Choose the standards your project should meet."}
            </p>

          </div>


          {/* Close */}
          <button
            type="button"
            onClick={closeModal}
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-gray-900
              hover:bg-gray-100
              transition
            "
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

        </div>
      </DialogTitle>


      {/* -------------------------------- */}
      {/* Step indicator                   */}
      {/* -------------------------------- */}

      <div className="px-7">

        <div className="flex items-center gap-2">

          {/* Step 1 */}
          <div className="flex items-center gap-2">

            <div
              className={`
                w-2
                h-2
                rounded-full
                ${
                  step >= 1
                    ? "bg-[#171717]"
                    : "bg-[#d4d4d4]"
                }
              `}
            />

            <span
              className={`
                text-xs
                ${
                  step === 1
                    ? "text-[#171717] font-medium"
                    : "text-[#a3a3a3]"
                }
              `}
            >
              Repository
            </span>

          </div>


          <div className="w-12 h-px bg-[#e5e5e5]" />


          {/* Step 2 */}
          <div className="flex items-center gap-2">

            <div
              className={`
                w-2
                h-2
                rounded-full
                ${
                  step === 2
                    ? "bg-[#171717]"
                    : "bg-[#d4d4d4]"
                }
              `}
            />

            <span
              className={`
                text-xs
                ${
                  step === 2
                    ? "text-[#171717] font-medium"
                    : "text-[#a3a3a3]"
                }
              `}
            >
              Quality gate
            </span>

          </div>

        </div>

      </div>


      {/* -------------------------------- */}
      {/* STEP 1                           */}
      {/* -------------------------------- */}

      {step === 1 && (
        <>
          <DialogContent
            sx={{
              padding: "28px 28px 18px",
            }}
          >

            <div className="space-y-5">

              <TextField
                fullWidth
                label="Repository name"
                placeholder="my-interview-project"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                sx={textFieldStyle}
              />


              <TextField
                fullWidth
                label="GitHub repository URL"
                placeholder="https://github.com/username/repository"
                value={form.url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    url: e.target.value,
                  })
                }
                sx={textFieldStyle}
              />


              {/* Small explanation */}
              <div className="
                rounded-lg
                border
                border-[#e7e5e4]
                bg-[#fafaf9]
                px-4
                py-3.5
              ">

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <div className="
                    mt-0.5
                    text-[#78716c]
                  ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 11v5" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>

                  <p className="
                    text-xs
                    leading-relaxed
                    text-[#78716c]
                  ">
                    Your repository will be connected to Code Ponder
                    so you can analyze and review the project.
                  </p>

                </div>

              </div>

            </div>

          </DialogContent>


          <DialogActions
            sx={{
              padding: "12px 28px 24px",
              gap: "8px",
            }}
          >

            <Button
              onClick={closeModal}
              sx={secondaryButtonStyle}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={createRepository}
              disabled={
                !form.name.trim() ||
                !form.url.trim()
              }
              sx={primaryButtonStyle}
            >
              Continue
              <span className="ml-2">→</span>
            </Button>

          </DialogActions>
        </>
      )}


      {/* -------------------------------- */}
      {/* STEP 2                           */}
      {/* -------------------------------- */}

      {step === 2 && (
        <>
          <DialogContent
            sx={{
              padding: "26px 28px 18px",
            }}
          >

            {/* Intro */}
            <div className="
              mb-5
            ">

              <h3 className="
                text-sm
                font-semibold
                text-[#171717]
              ">
                Quality gate
              </h3>

              <p className="
                text-xs
                text-[#737373]
                mt-1
                leading-relaxed
              ">
                Set the thresholds your repository should meet
                before it is considered healthy.
              </p>

            </div>


            {/* Settings */}
            <div className="
              border
              border-[#e7e5e4]
              rounded-xl
              overflow-hidden
              bg-white
            ">

              <QualityInput
                label="Minimum code coverage"
                description="Required percentage of test coverage."
                value={qualityGate.minCoverage}
                suffix="%"
                min={0}
                max={100}
                onChange={(value) =>
                  setQualityGate({
                    ...qualityGate,
                    minCoverage: value,
                  })
                }
              />

              <QualityInput
                label="Maximum bugs"
                description="Maximum number of bugs allowed."
                value={qualityGate.maxBugs}
                min={0}
                onChange={(value) =>
                  setQualityGate({
                    ...qualityGate,
                    maxBugs: value,
                  })
                }
              />

              <QualityInput
                label="Maximum vulnerabilities"
                description="Maximum security vulnerabilities allowed."
                value={qualityGate.maxVulnerabilities}
                min={0}
                onChange={(value) =>
                  setQualityGate({
                    ...qualityGate,
                    maxVulnerabilities: value,
                  })
                }
              />

              <QualityInput
                label="Maximum code smells"
                description="Maximum maintainability issues allowed."
                value={qualityGate.maxCodeSmells}
                min={0}
                onChange={(value) =>
                  setQualityGate({
                    ...qualityGate,
                    maxCodeSmells: value,
                  })
                }
                last
              />

            </div>


            {/* Preview */}
            <div className="mt-5">

              <div className="
                text-xs
                font-medium
                text-[#737373]
                mb-2
              ">
                Your quality gate
              </div>

              <div className="
                grid
                grid-cols-2
                gap-2
              ">

                <RulePreview
                  label="Coverage"
                  value={`≥ ${qualityGate.minCoverage}%`}
                />

                <RulePreview
                  label="Bugs"
                  value={`≤ ${qualityGate.maxBugs}`}
                />

                <RulePreview
                  label="Vulnerabilities"
                  value={`≤ ${qualityGate.maxVulnerabilities}`}
                />

                <RulePreview
                  label="Code smells"
                  value={`≤ ${qualityGate.maxCodeSmells}`}
                />

              </div>

            </div>

          </DialogContent>


          <DialogActions
            sx={{
              padding: "12px 28px 24px",
              gap: "8px",
            }}
          >

            <Button
              onClick={skipQualityGate}
              sx={secondaryButtonStyle}
            >
              Skip for now
            </Button>

            <Button
              variant="contained"
              onClick={saveQualityGate}
              sx={primaryButtonStyle}
            >
              Save quality gate
            </Button>

          </DialogActions>
        </>
      )}

    </Dialog>
  );
}


/* -------------------------------- */
/* Quality Input                    */
/* -------------------------------- */

interface QualityInputProps {
  label: string;
  description: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  last?: boolean;
}

function QualityInput({
  label,
  description,
  value,
  suffix,
  min = 0,
  max,
  onChange,
  last = false,
}: QualityInputProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-5
        px-4
        py-4
        ${!last ? "border-b border-[#f0efed]" : ""}
      `}
    >

      <div className="min-w-0">

        <div className="
          text-sm
          font-medium
          text-[#292524]
        ">
          {label}
        </div>

        <div className="
          text-xs
          text-[#a8a29e]
          mt-1
          leading-relaxed
          max-w-[280px]
        ">
          {description}
        </div>

      </div>


      <TextField
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);

          if (
            newValue >= min &&
            (max === undefined || newValue <= max)
          ) {
            onChange(newValue);
          }
        }}
        slotProps={{
          input: {
            endAdornment: suffix ? (
              <span
                style={{
                  color: "#a8a29e",
                  fontSize: "13px",
                  marginLeft: "4px",
                }}
              >
                {suffix}
              </span>
            ) : undefined,
          },
        }}
        sx={{
          width: "92px",

          "& .MuiOutlinedInput-root": {
            height: "38px",
            borderRadius: "8px",
            backgroundColor: "#fafaf9",

            "& fieldset": {
              borderColor: "#e7e5e4",
            },

            "&:hover fieldset": {
              borderColor: "#d6d3d1",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#292524",
              borderWidth: "1px",
            },
          },

          "& input": {
            fontSize: "13px",
            padding: "8px 10px",
          },
        }}
      />

    </div>
  );
}


/* -------------------------------- */
/* Rule Preview                     */
/* -------------------------------- */

function RulePreview({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="
      rounded-lg
      border
      border-[#e7e5e4]
      bg-[#fafaf9]
      px-3
      py-3
    ">

      <div className="
        text-[11px]
        text-[#a8a29e]
        mb-1
      ">
        {label}
      </div>

      <div className="
        text-sm
        font-semibold
        text-[#292524]
      ">
        {value}
      </div>

    </div>
  );
}


/* -------------------------------- */
/* Shared MUI styles                */
/* -------------------------------- */

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#ffffff",

    "& fieldset": {
      borderColor: "#d6d3d1",
    },

    "&:hover fieldset": {
      borderColor: "#a8a29e",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#292524",
      borderWidth: "1px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#78716c",
    fontSize: "14px",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#292524",
  },

  "& input": {
    fontSize: "14px",
  },
};


const primaryButtonStyle = {
  backgroundColor: "#171717",
  color: "#ffffff",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "13px",
  padding: "8px 16px",
  borderRadius: "8px",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#292524",
    boxShadow: "none",
  },

  "&.Mui-disabled": {
    backgroundColor: "#e7e5e4",
    color: "#a8a29e",
  },
};


const secondaryButtonStyle = {
  color: "#57534e",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "13px",
  padding: "8px 14px",
  borderRadius: "8px",

  "&:hover": {
    backgroundColor: "#f5f5f4",
  },
};
