"use client"
import JobForm from "@/features/jobs/components/job-form";

const CreateJobPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Create Job</h2>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Create a new job listing.
      </p>

      <JobForm />
    </div>
  );
};

export default CreateJobPage;