import React from "react";

function PageHead({
  title,
  extend,
}: {
  title: string;
  extend?: React.ReactNode;
}) {
  return (
    <div className="mb-8 mt-2 flex items-center justify-between">
      <h1 className="mr-auto text-4xl font-extrabold text-base-content">
        {title}
      </h1>
      <div className="space-x-2">{extend}</div>
    </div>
  );
}

export default PageHead;
