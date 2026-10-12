import { Chip, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import { updateSubmissionStatus } from "../../Services/SubmissionStatusService";
import { useNavigate, useParams } from "react-router-dom";

interface SubmissionDetailsProps {
  title: string;
  description: string;
  status: string;
  submitted_at: string;
  labels:string[]
}

export default function DisplaySubmissionHeaderDetails({
  title,
  description,
  status,
  submitted_at,
  labels
}: SubmissionDetailsProps) {

  const { id } = useParams();
  const navigate = useNavigate();

  const submissionId = Number(id);
  const [currentStatus, setStatus] = useState<string>(status);
  const [error, setError] = useState<string | null>(null);

  if (!id || isNaN(submissionId)) {
    navigate("/repositories");
    return null;
  }


  const handleStatusChange = async (e: SelectChangeEvent) => {
    const newStatus = e.target.value;

    const oldStatus = currentStatus;

    setError(null);

    setStatus(newStatus);

    try {
      await updateSubmissionStatus(submissionId, newStatus);

    } catch (err: any) {
      setStatus(oldStatus);

      if (err.response) {
        const message = err.response.data?.value;
        setError(message)
      } else {
        setError("Server is unreachable");
      }
    }
  };


  return (
    <section
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-5
      "
    >

      <div
        className="
          flex
          justify-between
          items-start
          gap-5
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-[#12395B]
            "
          >
            {title}
          </h1>


          <p
            className="
              mt-3
              text-gray-500
            "
          >
            {description}
          </p>

          <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    mt: 1
  }}
>
  {labels && labels.map((label) => (
    <Box
      key={label}
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: 600,
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        color: "#1976d2",
        border: "1px solid rgba(25, 118, 210, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: 0.5
      }}
    >
      <span>🏷</span>
      {label}
    </Box>
  ))}
</Box>

        </div>

        <Select
          disabled={currentStatus === "APPROVED" || currentStatus === "DECLINED"}
          value={currentStatus}
          onChange={handleStatusChange}
          size="small"
          renderValue={(selected)=>(
            <Chip
              label={selected}
              color={
                selected === "APPROVED"
                  ? "success"
                  : selected === "DECLINED"
                  ? "error"
                  : "warning"
              }
              size="small"
            />
          )}
        >

          <MenuItem value="PENDING">
            Pending
          </MenuItem>

          <MenuItem value="APPROVED">
            Approved
          </MenuItem>

          <MenuItem value="DECLINED">
            Declined
          </MenuItem>

        </Select>

      </div>


      {error && (
        <p
          className="
            mt-4
            text-sm
            text-red-500
          "
        >
          {error}
        </p>
      )}


      <p
        className="
          mt-5
          text-sm
          text-gray-400
        "
      >
        Submitted at:{" "}
        {new Date(submitted_at).toLocaleString()}
      </p>

    </section>
  );
}