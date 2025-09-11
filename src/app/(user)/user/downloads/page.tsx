const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Downloads</h1>
      <p className="text-lg text-gray-600 mb-6">
        This feature is coming soon. Stay tuned!
      </p>
      <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  );
};

export default page;
