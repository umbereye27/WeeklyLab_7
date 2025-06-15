
import { Job } from "@/types/index";
import JobCard from "./JobCard";
interface JobListProps {
  jobs?: Job[];
}

export default function JobList({ jobs = [] }: JobListProps) {
  if (!jobs.length) return null;

  return (
    <section className="pt-5">
      <h2 className="font-bold text-xl mb-5">Job Listings</h2>
      <div className="space-y-1">
               {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              
            </div>
    </section>
  );
}

// Helper to generate job slugs
const slugifyJob = (title: string, id: number) => {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${id}`;
};
