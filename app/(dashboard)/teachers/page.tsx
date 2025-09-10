export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Teachers</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {["Jacob Jones","Theresa Webb","Albert Flores","Courtney Henry","Devon Lane","Darrell Steward"].map((name) => (
          <div key={name} className="flex items-center gap-3 p-4 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <img src="/file.svg" alt="Teacher" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-500">Department • Subject</p>
            </div>
            <div className="ml-auto flex gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50">Edit</button>
              <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


