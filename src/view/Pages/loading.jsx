import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-500" />
        </div>
    );
}