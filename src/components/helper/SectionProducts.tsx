import SectionTitle from "./SectionTitle";
import { Suspense } from "react";
import CardLoading from "./card/CardLoading";
import LoadSectionProducts from "./LoadSectionProducts";

const FallbackCard = Array.from({ length: 8 }).map((_, i) => (
  <CardLoading key={i} />
));

const SectionProducts = async ({
  title,
  categoryId,
}: {
  title: string;
  categoryId: number;
}) => {
  return (
    <div className="space-y-10 pb-10">
      <SectionTitle title={title} />
      <Suspense
        fallback={
          <div className="grid grid-cols-4 gap-10 my-10">{FallbackCard}</div>
        }
      >
        <LoadSectionProducts categoryId={categoryId} />
      </Suspense>
    </div>
  );
};

export default SectionProducts;
