// app\_components\Social\index.tsx
import type { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

type SocialProps = {
  iconSize?: CSSProperties["fontSize"];
};

type SocialStyle = CSSProperties & {
  "--icon-size": CSSProperties["fontSize"];
};

export default function Social({ iconSize = "initial" }: SocialProps) {
  const socialStyle: SocialStyle = {
    "--icon-size": iconSize,
  };

  return (
    <ul
      className="flex gap-[1.5em] [font-size:var(--icon-size,24px)]"
      style={socialStyle}
    >
      <li>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
          <span className="sr-only">Twitter</span>
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="sr-only">Facebook</span>
        </a>
      </li>

      <li>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
    </ul>
  );
}
