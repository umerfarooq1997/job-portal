import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] border-r p-4">
      <nav className="grid gap-2">
        <Link
          href="/dashboard"
          className="rounded-md px-3 py-2 hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/jobs"
          className="rounded-md px-3 py-2 hover:bg-gray-100"
        >
          Jobs
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
