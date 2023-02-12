import React, { HTMLAttributeAnchorTarget } from "react";
import Mail from "assets/icons/mail.svg";
import Github from "assets/icons/github.svg";
import Facebook from "assets/icons/facebook.svg";
import Youtube from "assets/icons/youtube.svg";
import Linkedin from "assets/icons/linkedin.svg";
import Twitter from "assets/icons/twitter.svg";
import Gitlab3 from "assets/icons/gitlab.svg";
import Blank from "assets/icons/blank.svg";

interface ISocialIcon {
  kind: string;
  href: string;
  tooltip: string;
  _blank: HTMLAttributeAnchorTarget;
}

const components: any = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  gitlab: Gitlab3,
  blank: Blank,
};

const IconHeader = ({ kind, href, tooltip, _blank }: ISocialIcon) => {
  const SocialSvg = components[kind];

  return (
    <a
      href={href}
      target={_blank}
      className={"group tooltip-bottom tooltip"}
      data-tip={tooltip}
    >
      <span className="sr-only">{kind}</span>
      <button
        className=" btn-outline btn-circle btn inline-flex items-center rounded-full border
              border-orange-700 p-2.5 text-center text-sm
              font-medium text-orange-700 hover:border-orange-700 hover:bg-zinc-100 hover:fill-current hover:text-white focus:outline-none focus:ring-1 focus:ring-orange-500
              dark:border-orange-500 dark:text-orange-500 dark:hover:bg-zinc-500 dark:hover:text-white dark:focus:ring-orange-400"
      >
        <SocialSvg
          className={`h-4 w-4 fill-current text-gray-700 hover:fill-current 
          hover:text-orange-500 group-hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400 dark:group-hover:text-orange-400`}
        />
      </button>
    </a>
  );
};

export default IconHeader;
