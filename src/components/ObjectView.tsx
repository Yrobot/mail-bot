function ObjectView({
  data,
}: {
  data: Record<string, string | number | undefined | null>;
}) {
  return (
    <div className="w-full max-w-xl space-y-2 text-sm opacity-60">
      {Object.entries(data).map(([title, value]) =>
        value === undefined || value === null ? null : (
          <p className="" key={title}>
            <span className="mr-2 inline-block w-32 uppercase">{title}:</span>
            <span>{value}</span>
          </p>
        ),
      )}
    </div>
  );
}

export default ObjectView;
