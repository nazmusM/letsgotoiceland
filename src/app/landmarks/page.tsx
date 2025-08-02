export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page =
    (searchParams.page && +searchParams.page && +searchParams.page) || 1;

  return <div className="mx-auto md:max-w-[1200px]">LANDMARKS page?</div>;
}
