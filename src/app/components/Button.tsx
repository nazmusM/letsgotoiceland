import React from "react";
import { LinkField, isFilled } from "@prismicio/client";
import { MouseEventHandler } from "react";
import Link from "next/link";

type ButtonVariantType = "primary" | "secondary";

type ButtonClassesChoices = {
  base: string;
  variant: Record<ButtonVariantType, string>;
};

function Button({
  onClick,
  className,
  variant = "primary",
  link,
  linkString,
  children,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: ButtonVariantType;
  link?: LinkField;
  linkString?: string;
  children: React.ReactNode;
}) {
  const cls = (input?: string): string | undefined =>
    input
      ?.replace(/\s+/gm, " ")
      ?.split(" ")
      ?.filter((cond) => typeof cond === "string")
      ?.join(" ")
      ?.trim();

  const classes: ButtonClassesChoices = {
    base: "inline-block px-4 py-2 rounded-full text-sm md:text-base border border-1 border-black",
    variant: {
      primary: "bg-black text-white border-white",
      secondary: "bg-white text-black",
    },
  };

  const btnClassNames = cls(`
  ${classes.base}
  ${classes.variant[variant]}
  ${className}
`);

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!!onClick) {
      onClick(event);
    }
  };

  if ((link && isFilled.link(link) && link.url) || linkString) {
    const url = linkString || (link && isFilled.link(link) && link.url) || "";
    return (
      <Link href={url} className={btnClassNames}>
        {children}
      </Link>
    );
  }

  return (
    <button className={btnClassNames} onClick={onClickHandler}>
      {children}
    </button>
  );
}

export default Button;
