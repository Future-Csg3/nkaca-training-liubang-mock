import React from "react";

interface OutputDetailsProp {
    prop: {
        outputDetails: any
    }
}

const OutputDetails: React.FC<OutputDetailsProp> = ({ prop }) => {
    return (
        <div className="metrics-container mt-4 flex flex-col space-y-3">
            <p className="text-sm">
                Status:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                    {prop.outputDetails?.status?.description}
                </span>
            </p>
            <p className="text-sm">
                Memory:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                    {prop.outputDetails?.memory}
                </span>
            </p>
            <p className="text-sm">
                Time:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                    {prop.outputDetails?.time}
                </span>
            </p>
        </div>
    );
};

// export default OutputDetails;