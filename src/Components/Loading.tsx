import { TailSpin } from "react-loader-spinner";

export function Loading({ isOpen }: { isOpen: boolean }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader flex justify-around py-36  ">
                <TailSpin height="100" width="100" color="#CD0000" ariaLabel="loading" />
            </div>
        </div>
    )     
}