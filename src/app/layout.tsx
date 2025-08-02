import type { Metadata } from "next";
import Breadcrumb from "./components/Breadcrumb";
import { PrismicPreview } from "@prismicio/next";
import Head from "next/head";
import { repositoryName } from "@/prismicio";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import MessageBanner from "./components/MessageBanner";
import Script from "next/script";
import Footer from "./components/Footer";

const neueHaas = localFont({
  src: [
    {
      path: "../../public/fonts/NeueHaasDisplayXXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayXThin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayThin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayLight.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayRoman.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayMedium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasDisplayBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Let's Go To Iceland",
  description: "Explore the beauty of Iceland with us!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <body className={`${neueHaas.className} overflow-x-hidden`}>
        <MessageBanner />
        <Navbar />
        <Breadcrumb
          homeElement={"Home"}
          separator={<span className="mr-3"> {">"} </span>}
          activeClasses="font-semibold"
          containerClasses="flex py-5 px-4 md:max-w-[1200px] md:px-0 md:mx-auto whitespace-nowrap text-sm md:text-base"
          listClasses="hover:underline mr-3 font-medium"
          capitalizeLinks
        />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=28bde3d6-63ff-4dcc-91b3-c9c8deff0e76"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
