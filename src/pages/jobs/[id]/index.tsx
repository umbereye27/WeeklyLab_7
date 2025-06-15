import { Job } from "@/types/index";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

export default function JobDetail({ job }: { job: Job }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between">
       <div> <h1 className="text-3xl font-extrabold mb-2">{job.title}</h1>
        <p className="text-gray-600">at {job.company_name}</p>
        </div>
        <div ><Link href={''} className="bg-gray-100 px-6 py-2 rounded-full text-sm font-bold ">Save Job</Link></div>
      </div>
        <h3 className=" border-b-1 border-gray-300 py-6 mb-2 font-bold">Job Detail</h3>
      <div className="grid grid-cols-2 gap-8 mb-8  ">
        <div className="">
          <h3 className="text-gray-500 mb-1">Experience level</h3>
          <p>5+ years</p>
        </div>
        <div>
          <h3 className="text-gray-500 mb-1">Employment type</h3>
          <p>{job.job_type}</p>
        </div>
        <div>
          <h3 className="text-gray-500 mb-1">Location</h3>
          <p>{job.candidate_required_location}</p>
        </div>
        <div>
          <h3 className="text-gray-500 mb-1">Open to remote</h3>
          <p>Yes</p>
        </div>
        <div>
          <h3 className="text-gray-500 mb-1">Job function</h3>
          <p>{job.category}</p>
        </div>
        <div>
          <h3 className="text-gray-500 mb-1">Industries</h3>
          <p>Technology</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">About {job.company_name}</h2>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Benefits</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Health Insurance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Dental Insurance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Vision Insurance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Life Insurance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">401(k)</span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Paid time off
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Remote work allowance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Life Insurance
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">401(k)</span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Paid time off
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            Remote work allowance
          </span>
        </div>
      </div>
      <div className="flex justify-end mb-6 gap-4 ">
        <Link href = {''} className="bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-blue-600">
          Apply now
        </Link>
        <Link href={''} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
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
