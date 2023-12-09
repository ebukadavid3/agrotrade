import { CircularProgress } from "@mui/material";

export default function LoadingIndicator () {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <CircularProgress/>
        </div>
    )
}