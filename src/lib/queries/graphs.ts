import WelcomeBanner from "@/slices/WelcomeBanner";
import { PrismicDocumentTypeValues } from "../enums";

const blogPostFields = `
  uid
  title
  subtitle
  image
  author {
    name
    image
  }
  published
  read_time
  tag {
    name {
      uid
      name
      badge
    }
  }`;

const experienceFields = `
    uid
    title
    price
    location {
    name {
        title
    }
    }
    tag {
    name {
        uid
        name
        badge
    }
    }
    physical_difficulty
    duration
`;

const advertisementSlice = `
... on advertisement {
    variation {
      ... on default {
        primary {
          advertisement {
            background
            content
            cta_label
            cta_link
            inverted_text_color
          }
        }
      }
      ... on double {
        primary {
          advertisement {
            background
            content
            cta_label
            cta_link
            inverted_text_color
          }
          advertisement2 {
            background
            content
            cta_label
            cta_link
            inverted_text_color
          }
        }
      }
    }
  }`;

const paragraphSlice = `
... on paragraph {
  variation {
    ... on default {
      items {
        content
      }
      primary {
        title
      }
    }
  }
}`;

const imageGallerySlice = `
... on image_gallery {
  variation {
    ... on default {
      items {
        image
      }
    }
  }
}`;

const listSlice = `
... on list {
  variation {
    ... on default {
      items {
        content
      }
      primary {
        title
        multi_column
        icon_type
      }
    }
  }
}`;

const locationSlice = `
... on location {
  variation {
    ... on default {
      primary {
        information
        distance_reykjavic
        start_geopoint
        start_info
        start_time
        end_geopoint
        end_info
        end_time
      }
    }
  }
}`;

const experienceSlice = `
... on experience {
  variation {
    ... on default {
      primary {
        discount_code
        experience {
            ${experienceFields}
          slices {
            ${imageGallerySlice}
          }
        }
      }
    }
  }
}`;

export const experiencesListGraphQuery = (withSlice: boolean = true) => `{
    experience {
      ${experienceFields}
      ${
        withSlice
          ? `slices {
        ${imageGallerySlice}
      }`
          : ""
      }
    }
  }`;

export const locationGraphQuery = `{
    location {
      uid
      title
      subtitle
      image
    }
  }`;

export const categoryGraphQuery = `{
    category {
      uid
      title
      subtitle
      image
    }
  }`;

export const experienceTypeSchema = `{
    experience {
      meta_title
    }
  }
`;

export const experienceGraphQuery = `{
    experience {
      meta_title
      meta_description
      meta_image
      ${experienceFields}
      icons
      offer
      disclaimer
      tag
      subtitle
      season
      landmark {
        name {
          uid
          title
          hero_image
          location
        }
      }
      bokun_id
      geopoint
      type
      group_size {
        name {
          uid
          name
        }
      }
      age {
        name {
          uid
          name
        }
      }
      category
      slices {
        ${imageGallerySlice}
        ${paragraphSlice}
        ${listSlice}
        ${locationSlice}
        ${advertisementSlice}
      }
    }
  }`;

const curatedContentSlice = `
... on curated_content {
  variation {
    ... on default {
      primary {
        title
        subtitle
      }
      items {
        blog_post {
          ... on blogpost {
            ${blogPostFields}
          }
        }
      }
    }
  }
}`;

const experienceSearchBlockSlice = `
... on experience_search_block {
  variation {
    ... on default {
      primary {
        title
        subtitle
      }
    }
  }
}`;

const appBlockSlice = `
... on app_block {
    variation {
      ... on default {
        primary {
          title
          description
          image
          app_store_link
          google_play_link
          app_store_icon
          google_play_icon
        }
        items {
          title
          description
          svg
        }
      }
    }
  }
`;

const StepsBlockSlice = `
... on steps_block {
    variation {
      ... on default {
        primary {
          title
          description
        }
        items {
          title
          description
          svg
        }
      }
    }
  }
`;

const experiencesGallerySlice = `
... on experiences_gallery {
  variation {
    ... on default {
      primary {
        title
        subtitle
      }
    }
  }
}`;

const CategoryGallerySlice = `
... on category_gallery {
  variation {
    ... on default {
      primary {
        title
        subtitle
      }
    }
  }
}`;

export const archiveGraphQuery = (
  type: PrismicDocumentTypeValues,
  withSlice: boolean = true,
) => `{
    ${type} {
      uid
      title
      subtitle
      siblings {
        link {
          ...on category {
            title
          }
          ...on type {
            title
          }
          ...on season {
            title
          }
          ...on view {
            title
          }
        }
      }
      ${
        withSlice
          ? `slices {
        ${advertisementSlice}
        ${curatedContentSlice}
      }`
          : ""
      }
    }
  }`;

export const blogPostsListGraphQuery = `{
  blogpost {
    ${blogPostFields}
  }
}`;

export const blogPostsDetailsGraphQuery = `{
  blogpost {
   ${blogPostFields}
    slices {
        ${paragraphSlice}
        ${listSlice}
        ${advertisementSlice}
        ${experienceSlice}
    }
  }
}`;

const WelcomeBannerSlice = `
... on welcome_banner {
  variation {
    ... on default {
      primary {
        message
        cta_name
        cta_link

      }
    }
  }
}`;

const TriptychSlice = `
... on triptych {
  variation {
    ... on default {
      items {
        link {
          uid
          title
          hero_image
          location
        }
      }
    }
    ... on promoted {
      primary {
        title
      }
      items {
        link {
          background
          content
          cta_label
          cta_link
          inverted_text_color
        }
      }
    
    }
  }
}`;

// TODO - Add the rest of the slices

//       ${experiencesGallerySlice}

export const homepageGraphQuery = `{
  homepage {
    meta_title
    meta_description
    meta_image
    slices {
      ${WelcomeBannerSlice}
      ${TriptychSlice}
      ${StepsBlockSlice}
      ${experienceSearchBlockSlice}
      ${appBlockSlice}
      ${CategoryGallerySlice}
      ${curatedContentSlice}
    }
  }
}`;
