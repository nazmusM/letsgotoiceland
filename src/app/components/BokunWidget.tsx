"use client";
import "./BokunWidget.module.css";

export default function BokunWidget({ bokunId }: { bokunId: string }) {
  if (!bokunId) return "";
  return (
    <div
      className="bokunWidget"
      data-src={`https://widgets.bokun.io/online-sales/28bde3d6-63ff-4dcc-91b3-c9c8deff0e76/experience-calendar/${bokunId}`}
    ></div>
  );
}
