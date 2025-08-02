import QUERIES from "@/lib/queries";
import { redirect } from "next/navigation";
import { components } from "@/slices";
import { PrismicRichText, SliceZone } from "@prismicio/react";

export default async function Experience({
  params,
}: {
  params: { uid: string };
}) {
  const landmark = await QUERIES.landmark.getByUID(params.uid);
  if (!landmark) {
    redirect("/landmarks");
  }

  return (
    <div className="mx-auto mt-8 p-2 px-4 md:max-w-[1200px] md:p-0 md:px-4">
      <div className="md:w-2/3">
        <h1 className="text-2xl md:text-7xl my-3 font-normal">
          {landmark.data.title as string}
        </h1>
        <PrismicRichText field={landmark.data.subtitle} />
      </div>
      <SliceZone slices={landmark.data.slices} components={components} />
    </div>
  );
}
