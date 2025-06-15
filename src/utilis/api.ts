import { console } from "inspector";

const API_URL = 'https://remotive.com/api/remote-jobs';

export async function fetchJobs() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.jobs; 
}
