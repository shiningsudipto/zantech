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
    <div>
      <SectionTitle title={title} />
      <Suspense
        fallback={<div className="grid gap-10 my-10">{FallbackCard}</div>}
      >
        <LoadSectionProducts categoryId={categoryId} />
      </Suspense>
    </div>
  );
};

export default SectionProducts;
