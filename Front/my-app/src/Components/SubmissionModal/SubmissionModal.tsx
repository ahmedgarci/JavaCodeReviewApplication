import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Box,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFetch from "../../Services/Fetch";
import type { User } from "../../Models/SubmissionDetails";
import {
  createSubmission,
  type SubmissionData,
} from "../../Services/SubmissionService";

import DisplayLabels from "./DisplayLabels";
import SonarAnalysisButton from "./SonarButtonAnalysis";

interface SubmissionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmissionModal({
  open,
  onClose,
}: SubmissionModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = Number(id);

  useEffect(() => {
    if (!id || Number.isNaN(projectId)) {
      navigate("/repositories");
    }
  }, [id, projectId, navigate]);

  const [isLoading, setLoading] = useState(false);

  const [submission, setSubmission] =
    useState<SubmissionData>({
      title: "",
      description: "",
      reviewers: [],
      labels: [],
    });

  const [files, setFiles] = useState<File[]>([]);

  const {
    data,
    loading,
    error,
  } = useFetch<User[]>(`/project/${projectId}`);

  const reviewers = data ?? [];

  async function handleSubmit() {
    try {
      setLoading(true);

      await createSubmission(
        projectId,
        submission,
        files
      );

      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLabelSelection(labelId: number) {
    setSubmission((prev) => {
      const alreadySelected =
        prev.labels.includes(labelId);

      return { ...prev,labels: alreadySelected
          ? prev.labels.filter(
              (label) => label !== labelId
            )
          : [...prev.labels, labelId],
      };
    });
  }


  if (loading) {
    return (
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        sx={
        dialogPaperStyle
        }
      >
        <DialogContent
          sx={{
            minHeight: 240,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            size={26}
            thickness={3}
            sx={{
              color: "#171717",
            }}
          />

          <Typography
            sx={{
              fontSize: "13px",
              color: "#737373",
            }}
          >
            Loading reviewers...
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  /* -------------------------------- */
  /* Error                            */
  /* -------------------------------- */

  if (error) {
    return (
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        sx={dialogPaperStyle}
        
      >
        <DialogContent
          sx={{
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-red-50
              border
              border-red-100
              flex
              items-center
              justify-center
              text-red-600
              mb-4
            "
          >
            !
          </div>

          <Typography
            sx={{
              color: "#292524",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Unable to load reviewers
          </Typography>

          <Typography
            sx={{
              color: "#a8a29e",
              fontSize: "13px",
              mt: 0.7,
            }}
          >
            Please close this window and try again.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={dialogPaperStyle}      
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor:
              "rgba(23, 23, 23, 0.32)",
          },
        },
      }}
    >

      {/* -------------------------------- */}
      {/* HEADER                           */}
      {/* -------------------------------- */}

      <DialogTitle
        sx={{
          px: 3.5,
          pt: 3,
          pb: 2.5,
        }}
      >

        <div className="flex items-start justify-between">

          <div>

            <div className="
              flex
              items-center
              gap-2
              mb-3
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
                text-[#57534e]
              ">
                ↗
              </div>

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-[#a8a29e]
              ">
                Code review
              </span>

            </div>


            <h2 className="
              text-[22px]
              font-semibold
              tracking-tight
              text-[#171717]
            ">
              New submission
            </h2>

            <p className="
              mt-1.5
              text-sm
              text-[#78716c]
              leading-relaxed
            ">
              Share your changes and request a review.
            </p>

          </div>


          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-[#a8a29e]
              hover:text-[#292524]
              hover:bg-[#f5f5f4]
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


      <Divider
        sx={{
          borderColor: "#f0efed",
        }}
      />


      {/* -------------------------------- */}
      {/* CONTENT                          */}
      {/* -------------------------------- */}

      <DialogContent
        sx={{
          px: 3.5,
          py: 3,
        }}
      >

        {/* Section */}
        <SectionHeader
          title="Submission details"
          description="Tell reviewers what you changed and why."
        />


        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          placeholder="Improve authentication flow"
          value={submission.title}
          onChange={(e) =>
            setSubmission({
              ...submission,
              title: e.target.value,
            })
          }
          sx={{
            mb: 2,
            ...inputStyle,
          }}
        />


        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          placeholder="Describe what you implemented, changed, or want feedback on..."
          value={submission.description}
          onChange={(e) =>
            setSubmission({
              ...submission,
              description: e.target.value,
            })
          }
          sx={{
            ...inputStyle,
          }}
        />


        {/* -------------------------------- */}
        {/* Reviewers                        */}
        {/* -------------------------------- */}

        <div className="mt-7">

          <SectionHeader
            title="Reviewers"
            description="Choose who should review your submission."
          />


          <FormControl
            fullWidth
            sx={{
              mt: 2,
            }}
          >

            <Select
              multiple
              value={submission.reviewers}
              displayEmpty
              onChange={(e) =>
                setSubmission((prev) => ({
                  ...prev,
                  reviewers: (
                    e.target.value as number[]
                  ).map(Number),
                }))
              }
              renderValue={(selectedIds) => {

                const ids =
                  selectedIds as number[];

                if (ids.length === 0) {
                  return (
                    <span className="text-[#a8a29e]">
                      Select reviewers
                    </span>
                  );
                }

                return (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.7,
                      flexWrap: "wrap",
                    }}
                  >
                    {ids.map((reviewerId) => {

                      const reviewer =
                        reviewers.find(
                          (user) =>
                            user.id === reviewerId
                        );

                      if (!reviewer) return null;

                      return (
                        <Chip
                          key={reviewer.id}
                          avatar={
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: 11,
                                backgroundColor:
                                  "#292524",
                                color: "#fff",
                              }}
                            >
                              {reviewer.username
                                .charAt(0)
                                .toUpperCase()}
                            </Avatar>
                          }
                          label={reviewer.username}
                          sx={{
                            height: 30,
                            backgroundColor:
                              "#f5f5f4",
                            border:
                              "1px solid #e7e5e4",
                            color: "#44403c",
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        />
                      );
                    })}
                  </Box>
                );
              }}
              sx={selectStyle}
            >

              {reviewers.map((reviewer) => {

                const selected =
                  submission.reviewers.includes(
                    reviewer.id
                  );

                return (
                  <MenuItem
                    key={reviewer.id}
                    value={reviewer.id}
                    sx={{
                      py: 1.2,
                      px: 1.5,
                    }}
                  >

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "space-between",
                        width: "100%",
                      }}
                    >

                      <Box
                        sx={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: 1.5,
                        }}
                      >

                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            backgroundColor:
                              "#f5f5f4",
                            color: "#57534e",
                            border:
                              "1px solid #e7e5e4",
                            fontSize: 12,
                          }}
                        >
                          {reviewer.username
                            .charAt(0)
                            .toUpperCase()}
                        </Avatar>

                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "#292524",
                          }}
                        >
                          {reviewer.username}
                        </Typography>

                      </Box>


                      {selected && (
                        <span className="
                          text-[#171717]
                          font-semibold
                          text-sm
                        ">
                          ✓
                        </span>
                      )}

                    </Box>

                  </MenuItem>
                );
              })}

            </Select>

          </FormControl>

        </div>


        {/* -------------------------------- */}
        {/* Files                            */}
        {/* -------------------------------- */}

        <div className="mt-7">

          <SectionHeader
            title="Files"
            description="Add the source files you want reviewed."
          />


          <div className="
            mt-2
            rounded-xl
            border
            border-dashed
            border-[#d6d3d1]
            bg-[#fafaf9]
            px-5
            py-6
            text-center
            transition
            hover:border-[#a8a29e]
          ">

            <div className="
              mx-auto
              w-9
              h-9
              rounded-lg
              bg-white
              border
              border-[#e7e5e4]
              flex
              items-center
              justify-center
              text-[#57534e]
              mb-3
            ">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
            </div>


            <p className="
              text-sm
              font-medium
              text-[#292524]
            ">
              Add files for review
            </p>

            <p className="
              mt-1
              text-xs
              text-[#a8a29e]
            ">
              Source files, components, or other code
            </p>


            <input
              id="file-upload"
              type="file"
              multiple
              hidden
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) => {

                const selectedFiles =
                  e.target.files;

                if (!selectedFiles) return;

                setFiles((prev) => [
                  ...prev,
                  ...Array.from(
                    selectedFiles
                  ),
                ]);
              }}
            />


            <label htmlFor="file-upload">

              <Button
                component="span"
                variant="outlined"
                sx={{
                  mt: 2,
                  borderRadius: "8px",
                  color: "#292524",
                  borderColor: "#d6d3d1",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 500,

                  "&:hover": {
                    borderColor: "#a8a29e",
                    backgroundColor:
                      "#f5f5f4",
                  },
                }}
              >
                Choose files
              </Button>

            </label>


            {/* Selected files */}
            {files.length > 0 && (

              <div className="
                mt-4
                text-left
                rounded-lg
                border
                border-[#e7e5e4]
                bg-white
                overflow-hidden
              ">

                <div className="
                  px-3
                  py-2.5
                  border-b
                  border-[#f0efed]
                  text-xs
                  font-medium
                  text-[#78716c]
                ">
                  {files.length}{" "}
                  {files.length === 1
                    ? "file"
                    : "files"}{" "}
                  selected
                </div>


                <div className="px-3 py-2">

                  {files.map(
                    (file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="
                          flex
                          items-center
                          gap-2
                          py-1.5
                          text-xs
                          text-[#57534e]
                        "
                      >
                        <span className="
                          text-[#a8a29e]
                        ">
                          •
                        </span>

                        <span className="
                          truncate
                        ">
                          {file.name}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>


        {/* -------------------------------- */}
        {/* Labels                           */}
        {/* -------------------------------- */}

        <div className="mt-7">

          <SectionHeader
            title="Labels"
            description="Categorize this submission."
          />

          <div className="mt-3">
            <DisplayLabels
              handleClick={handleLabelSelection}
              selectedLabels={
                submission.labels
              }
            />
          </div>

        </div>

      </DialogContent>


      {/* -------------------------------- */}
      {/* FOOTER                           */}
      {/* -------------------------------- */}

      <Divider
        sx={{
          borderColor: "#f0efed",
        }}
      />


      <DialogActions
        sx={{
          px: 3.5,
          py: 2,
          backgroundColor: "#fafaf9",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >

        <Button
          onClick={onClose}
          sx={secondaryButtonStyle}
        >
          Cancel
        </Button>


        <div className="
          flex
          items-center
          gap-2
        ">

          <SonarAnalysisButton
            projectId={projectId}
            onClose={onClose}
          />


          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant="contained"
            sx={primaryButtonStyle}
          >
            {isLoading
              ? "Submitting..."
              : "Submit for review"}
          </Button>

        </div>

      </DialogActions>

    </Dialog>
  );
}


/* ================================= */
/* Section Header                    */
/* ================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#292524",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: "12px",
          color: "#a8a29e",
          mt: 0.4,
        }}
      >
        {description}
      </Typography>

    </div>
  );
}


/* ================================= */
/* Styles                            */
/* ================================= */

const dialogPaperStyle = {
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  boxShadow:
    "0 24px 70px rgba(0, 0, 0, 0.12)",
  overflow: "hidden",
};


const inputStyle = {
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

  "& input, & textarea": {
    fontSize: "14px",
  },
};


const selectStyle = {
  borderRadius: "9px",
  backgroundColor: "#ffffff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d6d3d1",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a8a29e",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#292524",
    borderWidth: "1px",
  },

  "& .MuiSelect-select": {
    fontSize: "14px",
    minHeight: "20px",
  },
};


const primaryButtonStyle = {
  backgroundColor: "#171717",
  color: "#ffffff",
  borderRadius: "8px",
  px: 2.2,
  py: 0.9,
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 500,
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
  borderRadius: "8px",
  px: 1.5,
  py: 0.9,
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 500,

  "&:hover": {
    backgroundColor: "#f5f5f4",
  },
};
