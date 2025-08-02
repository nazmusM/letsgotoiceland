import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Instagram`.
 */
export type InstagramProps = SliceComponentProps<Content.InstagramSlice>;

/**
 * Component for "Instagram" Slices.
 */
const Instagram = ({ slice }: InstagramProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for instagram (variation: {slice.variation}) Slices
    </section>
  );
};

export default Instagram;
