import Image from "next/image";
import { GetStaticProps } from "next";
import { Job } from "@/types/index";
import JobCard from "@/components/JobCard";
interface HomeProps {
  jobs: Job[];
}

export default function Home({ jobs }: HomeProps) {
  return (
    <div>
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-[#111111] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/TwoWomen.jpeg')",
            opacity: 0.9,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

        <div className="container mx-auto px-4 pt-44 relative z-10">
          <h1 className="text-white text-4xl font-bold mb-8">
            Find your next remote job
          </h1>
          <div className="flex max-w-xl relative">
            <input
              className="p-3 pl-10 bg-white rounded-lg w-full border border-gray-200 shadow-sm"
              placeholder="Search for jobs"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button className="bg-blue-500 text-white px-8 py-2 m-1  rounded-lg hover:bg-blue-600 transition-colors absolute right-0">
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold">Featured Jobs</h2>
      <div className="space-y-1">
         {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://remotive.com/api/remote-jobs");
  const data = await res.json();

  const jobs = data.jobs.slice(0, 4).map((job: any) => ({
    id: job.id,
    title: job.title,
    company_name: job.company_name,
    salary: job.salary || "$120,000 - $150,000",
    company_logo: job.company_logo ?? null,
    slug: job.id.toString(),
  }));

  return {
    props: { jobs },
    revalidate: 30,
  };
};
