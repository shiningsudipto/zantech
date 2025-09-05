import Filter from "@/components/shared/Filter";

const page = () => {
  return (
    <div className="section-gap py-20 grid grid-cols-10 gap-5">
      <div className="col-span-2">
        <Filter />
      </div>
      <div className="col-span-8 bg-red-100">
        <p>Products</p>
      </div>
    </div>
  );
};

export default page;
