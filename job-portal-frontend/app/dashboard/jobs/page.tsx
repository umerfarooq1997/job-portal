import JobsList from "@/features/jobs/components/jobs-list";

const JobsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Jobs</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage available jobs.
        </p>
      </div>

      <JobsList />
    </div>
  );
};

export default JobsPage;
