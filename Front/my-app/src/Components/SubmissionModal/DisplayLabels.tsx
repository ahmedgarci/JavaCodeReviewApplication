import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { Tag } from "lucide-react";
import type { labelsResponse } from "../../Models/Labels";
import useFetch from "../../Services/Fetch";

interface DisplayLabelsProps{
    handleClick:(id:number)=>void,
    selectedLabels:number[]
}

export default function DisplayLabels({handleClick,selectedLabels}:DisplayLabelsProps) {

    const { data, error, loading } = useFetch<labelsResponse[]>("/labels");

   


    if (loading) {
        return <CircularProgress size={25}/>;
    }


    if (error) {
        return (
            <Typography color="error">
                Failed to load labels
            </Typography>
        );
    }


    return (
        <Box
            sx={{
                mt:4,
                display:"flex",
                flexWrap:"wrap",
                gap:1
            }}
        >
            {data?.map((label)=>{

                const selected = selectedLabels.includes(label.id);

                return (
                    <Chip
                        key={label.id}
                        icon={<Tag size={15}/>}
                        label={label.name}
                        onClick={() => handleClick(label.id)}

                        sx={{
                            borderRadius:"999px",
                            fontWeight:600,
                            cursor:"pointer",
                            backgroundColor: selected 
                                ? "#2563eb" 
                                : "#f1f5f9",
                            color: selected
                                ? "white"
                                : "#334155",
                            border: selected
                                ? "1px solid #2563eb"
                                : "1px solid #cbd5e1",
                            "& .MuiChip-icon":{
                                color: selected 
                                    ? "white"
                                    : "#64748b"
                            },
                            "&:hover":{
                                backgroundColor: selected
                                    ? "#1d4ed8"
                                    : "#e2e8f0"
                            }
                        }}
                    />
                );
            })}
        </Box>
    );
}