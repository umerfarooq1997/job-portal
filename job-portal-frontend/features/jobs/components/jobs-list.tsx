"use client";

import { useEffect, useState } from "react";
import { Job } from "../types/job.types";
import { jobsService } from "../services/job.service";

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsService.findAll();

        if (response.success) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) return <div>{"Loading..."}</div>;
  if (!jobs.length) return <div>{"No jobs found!"}</div>;

  return (
    <div className="grid gap-4">
      {jobs.map((job: Job) => {
        return (
          <div key={job._id} className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{job.title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {job.company} · {job.location}
            </p>

            <p className="mt-2">{job.description}</p>

            <p className="mt-2">Salary: {job.salary}</p>

            <p className="mt-1">Type: {job.employmentType}</p>

            <p className="mt-1">Status: {job.status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default JobsList;
