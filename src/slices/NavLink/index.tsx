import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavLink`.
 */
export type NavLinkProps = SliceComponentProps<Content.NavLinkSlice>;

/**
 * Component for "NavLink" Slices.
 */
const NavLink = ({ slice }: NavLinkProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for nav_link (variation: {slice.variation}) Slices
    </section>
  );
};

export default NavLink;
