import React, { Suspense } from "react";
import OurExpert from "@/components/layout/main/ourExpert";
import { ExpertGridSkeleton } from "@/components/features/experts/SkeletonCard";
import ExpertListWrapper from "@/components/features/experts/ExpertListWrapper";

function OurExpertsLoading() {
  return (
    <section className="expert-list " style={{ minHeight: '100vh' }}>
      <div className="container">
        <h2 className="title-line mt-4">
          <span>Our Experts</span>
        </h2>
        <ExpertGridSkeleton count={12} />
      </div>
    </section>
  );
}

const page = ({ searchParams }: { searchParams: any }) => {
  return (
    <Suspense fallback={<OurExpertsLoading />}>
      <ExpertListWrapper
        searchParams={searchParams}
        layout="grid"
        title="Our Experts"
      />
    </Suspense>
  );
};

export default page;


