import { CircularProgress } from "@mui/material";

export default function ActivityIndicator () {
    return (
        <div className="flex justify-center items-center bg-gray-500">
            <CircularProgress color="success"/>
        </div>
    )
}