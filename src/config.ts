import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://requirementsfirst.com/",
  author: "Arun Mehta",
  profile: "https://requirementsfirst.com/",
  desc: "Problem-understanding first, story-writing second. A site for business analysts, product owners, and product managers who want to do the analytical work that actually moves projects forward.",
  title: "RequirementsFirst",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Asia/Kolkata",
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-IN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Mail",
    href: "mailto:hello@requirementsfirst.com",
    linkTitle: `Send an email to RequirementsFirst`,
    active: true,
  },
];

export const SHARE_LINKS: SocialObjects = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    active: true,
  },
];
