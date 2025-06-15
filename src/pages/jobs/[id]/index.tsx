import { Job } from "@/types/index";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { slugify } from "../../company/[slug]"; 
export default function JobDetail({ job }: { job: Job }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{job.title}</h1>
          <p className="text-gray-600">at {job.company_name}</p>
        </div>
        <div>
          <Link 
            href={`/company/${slugify(job.company_name)}`} 
            className="inline-block bg-gray-100 text-black text-sm font-bold px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Visit company
          </Link>
        </div>
      </div>

      <h3 className="border-b border-gray-300 py-4 sm:py-6 mb-4 font-bold">Job Detail</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Experience level</h3>
          <p className="font-medium">5+ years</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Employment type</h3>
          <p className="font-medium">{job.job_type}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Location</h3>
          <p className="font-medium">{job.candidate_required_location}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Open to remote</h3>
          <p className="font-medium">Yes</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Job function</h3>
          <p className="font-medium">{job.category}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-gray-500 text-sm mb-1">Industries</h3>
          <p className="font-medium">Technology</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">About {job.company_name}</h2>
        <div
          className="text-gray-600 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Benefits</h2>
        <div className="flex flex-wrap gap-2">
          {["Health Insurance", "Dental Insurance", "Vision Insurance", "Life Insurance", 
            "401(k)", "Paid time off", "Remote work allowance"].map((benefit) => (
            <span 
              key={benefit}
              className="bg-gray-100 px-3 sm:px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end mb-6 gap-3 sm:gap-4">
        <Link 
          href={''} 
          className="bg-blue-500 text-white text-center text-sm font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply now
        </Link>
        <Link 
          href={''} 
          className="border border-gray-300 text-center px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Message company
        </Link>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://remotive.com/api/remote-jobs");
  const data = await res.json();
  const jobs = data.jobs;

  const paths = jobs.slice(0, 10).map((job: Job) => ({
    params: { id: job.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }

  try {
    const res = await fetch("https://remotive.com/api/remote-jobs");
    const data = await res.json();
    const jobs = data.jobs;

    const job = jobs.find((job: Job) => job.id.toString() === params.id);

    if (!job) {
      return { notFound: true };
    }

    return {
      props: { job },
      revalidate: 20,
    };
  } catch (error) {
    return { notFound: true };
  }
};
