import Link from "next/link";
import { Job } from "@/types";
import Image from "next/image";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex items-center bg-white py-4">
      {job.company_logo && (
        <Image
          src={job.company_logo}
          alt={job.company_name}
          height={35}
          width={35}
        />
      )}
      <div className="mx-3">
        <div className="text-sm font-semibold">
          {job.title} at {job.company_name}
        </div>
        <div className="text-gray-500 text-sm">{job.salary}</div>
      </div>
      <div className="ml-auto">
        <Link
          href={`/jobs/${job.id.toString()}`}
          className="bg-gray-200 px-4 py-1 text-sm rounded-full"
        >
          View
        </Link>
      </div>
    </div>
  );
}
