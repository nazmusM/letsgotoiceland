import { formatUID } from "@/utils";
import Button from "./Button";

export type SiblingType = {
  type: string;
  uid: string;
};

export default function SiblingDocumentSelector({
  siblings,
}: {
  siblings?: SiblingType[];
}) {
  if (!siblings) return null;
  return (
    <div
      className="border-1 scr flex h-full flex-row items-center gap-3 overflow-x-scroll py-3 md:py-5"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {siblings.map((sibling, index) => {
        const { type, uid } = sibling;
        return (
          <Button
            key={index}
            variant="secondary"
            linkString={`/experiences/${type}/${uid}`}
            className="whitespace-nowrap font-semibold"
          >
            {formatUID(uid)}
          </Button>
        );
      })}
    </div>
  );
}
