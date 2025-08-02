import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import footer from "@/footerData.json";
import Image from "next/image";
import Button from "./Button";

export default function Footer() {
  const renderLinks = (list: any[]) => {
    return (
      <ul role="list" className="mt-6 space-y-3">
        {list.map((item) => {
          const externalLink = item.link?.target === "_blank";
          if (isFilled.link(item.link)) {
            return (
              <li key={item.label}>
                <PrismicNextLink
                  key={item.label}
                  field={item.link}
                  className={`text-l leading-6 text-darkGray hover:text-gray_900 `}
                >
                  <span
                    className={`flex ${(externalLink && "text-blue-600") || ""}`}
                  >
                    {item.label}
                    {externalLink && (
                      <Image
                        src={`/icons/Arrow-up-right.svg`}
                        alt="arrow up icon"
                        width={20}
                        height={20}
                      />
                    )}
                  </span>
                </PrismicNextLink>
              </li>
            );
          }
          return (
            <li
              key={item.label}
              className="text-l leading-6 text-darkGray hover:text-gray_900"
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <footer
      className="mx-auto w-full max-w-[1200px] bg-white px-2"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto grid w-full grid-cols-2 gap-4 pb-8 pt-16 sm:pt-24 md:col-span-1 md:px-0 lg:pt-32">
        <div className="col-span-2 space-y-8 md:col-span-1 ">
          <PrismicNextImage field={footer.data.logo} fallbackAlt="" />
          <p className="md:w-2/3">{footer.data.description}</p>
          <div className="custom_pera_space my-3">
            <div className="flex font-bold">
              <Image
                src={`/icons/Call.svg`}
                alt="location icon"
                width={20}
                height={20}
                className="mr-2"
              />
              {footer.data.phone}
            </div>
            <div className="flex font-bold">
              <Image
                src={`/icons/Mail.svg`}
                alt="location icon"
                width={20}
                height={20}
                className="mr-2"
              />
              {footer.data.email}
            </div>
            <div className="flex font-bold">
              <Image
                src={`/icons/Location-footer.svg`}
                alt="location icon"
                width={20}
                height={20}
                className="mr-2"
              />
              {footer.data.address}
            </div>
          </div>

          <Button variant="primary" link={footer.data.cta[0].link}>
            {footer.data.cta[0].label}
          </Button>

          <p className="text-l leading-5 text-darkGray">
            &copy; {`${new Date().getFullYear()} let'sgotoiceland`}
          </p>
        </div>

        <div className="col-span-2 flex w-full flex-col justify-between pt-4 md:col-span-1 md:pt-0">
          <div className="flex w-full flex-1">
            <div className="w-1/2">
              <h3 className="text-l font-semibold leading-6">Book Online</h3>
              <ul role="list" className="mt-6 space-y-4">
                {renderLinks(footer.data.book_links)}
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="text-l font-semibold leading-6">Useful Links</h3>
              <ul role="list" className="mt-6 space-y-4">
                {renderLinks(footer.data.useful_links)}
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-6">
            {footer.data.social_media.map((item) => {
              if (isFilled.link(item.link)) {
                return (
                  <a
                    key={item.label}
                    href={item.link.url}
                    className="text-gray-400 hover:text-darkGray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.label}</span>
                    <PrismicNextImage field={item.icon} fallbackAlt="" />
                  </a>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 w-full border-t border-gray-900/10 py-8 text-center">
        <div className="flex w-full flex-col justify-between space-y-4 md:flex-row">
          <span className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <span className="text-left md:w-36">Member of: </span>
            <span className="inline-flex w-full overflow-y-clip md:gap-10">
              {footer.data.member_logos.map((logo, index) => {
                return (
                  <PrismicNextImage
                    key={"partners-" + index}
                    field={logo.image}
                    className="object-contain p-1"
                    fallbackAlt=""
                  />
                );
              })}
            </span>
          </span>
          <span className="mx-auto inline-flex space-x-2 md:mx-0">
            {footer.data.payment_logos.map((item, index) => {
              return (
                <PrismicNextImage
                  key={"payment-" + index}
                  field={item.image}
                  fallbackAlt=""
                />
              );
            })}
          </span>
        </div>
      </div>
    </footer>
  );
}
