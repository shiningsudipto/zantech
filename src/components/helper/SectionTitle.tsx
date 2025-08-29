const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative w-full">
      <h3 className="relative z-10 inline-block text-[#242424] text-3xl capitalize font-bold border-b-2 border-primary pb-2">
        {title}
      </h3>

      {/* full width border behind */}
      <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-200"></div>
    </div>
  );
};

export default SectionTitle;
