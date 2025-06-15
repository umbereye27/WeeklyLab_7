import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-35 w-full">
      <AiOutlineLoading3Quarters className="animate-spin text-secondaryColor text-4xl" />
    </div>
  );
}