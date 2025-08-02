"use client";
import { useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import Image from "next/image";
import { PrismicLink } from "@prismicio/react";
import QUERIES from "@/lib/queries";

export default function MessageBanner() {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState<
    Content.MessagebannerDocument | undefined
  >(undefined);

  useEffect(() => {
    const getMessage = async () => await QUERIES.messageBanner.get();
    if (!message) {
      getMessage().then((messageResponse) => {
        setMessage(messageResponse);
        if (messageResponse.data.display) {
          setDisplayMessage(true);
        }
      });
    }
  }, [displayMessage, message]);

  if (message && displayMessage) {
    return (
      <div className="flex w-full bg-orangeBanner py-2 text-center">
        <div className="flex-grow text-base">
          {message.data.message}
          {message.data.link && (
            <PrismicLink
              field={message.data.link}
              className="ml-1 font-semibold underline"
            >
              {`Read more`}
            </PrismicLink>
          )}
        </div>
        <div
          onClick={() => setDisplayMessage(false)}
          className="flex shrink-0 items-center hover:cursor-pointer"
        >
          <Image
            src={`/icons/Close.svg`}
            height={24}
            width={24}
            alt="grid icon"
          />
        </div>
      </div>
    );
  }
}
