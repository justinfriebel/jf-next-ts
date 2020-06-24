import Link from "next/link";
import { config } from "config";
import logo from "public/logo.svg";
import { Menu, X } from "react-feather";
import { useState } from "react";
import { useMedia } from "react-media";
import { colors } from "colors";

const Nav = () => {
  const { displayLogo, name, nav, globalMediaQueries } = config;

  const matches = useMedia({ queries: globalMediaQueries });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileNav = (event: React.FormEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="navContainer">
        {displayLogo && (
          <Link href="/">
            <img src={logo} alt={`${name} logo`} />
          </Link>
        )}

        {(matches.medium || matches.large) &&
          nav.map((navItem) => (
            <Link href={navItem.link} key={navItem.text}>
              <a
                className={displayLogo ? "navLinksWithLogo" : "navLinksNoLogo"}
              >
                {navItem.text}
              </a>
            </Link>
          ))}

        {matches.small && (
          <a onClick={(event) => toggleMobileNav(event)} className="menuIcon">
            <Menu />
          </a>
        )}
      </div>

      {isOpen && (
        <div className="mobileNavContainer">
          <div className="navLinkContainer">
            <a onClick={(event) => toggleMobileNav(event)}>
              <X />
            </a>
          </div>

          {nav.map((navItem) => (
            <div className="navLinkContainer">
              <Link href={navItem.link} key={navItem.text}>
                <a>{navItem.text}</a>
              </Link>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .navContainer {
          display: flex;
          flex: 1;
          align-items: center;
        }
        .navLinksWithLogo {
          margin-right: 12px;
          margin-left: 12px;
        }
        .navLinksNoLogo {
          margin-right: 15px;
        }
        .menuIcon {
          margin-left: 12px;
        }
        .mobileNavContainer {
          position: fixed;
          left: 50%;
          top: 0;
          transform: translate(-50%, 0%);
          background: ${colors.navBackground};
          z-index: 9;
          height: 66%;
          width: 88%;
          border-radius: 0px 0px 8px 8px;
          display: flex;
          flex-direction: column;
          -webkit-filter: drop-shadow(0px 0px 3px ${colors.navBackground});
          filter: drop-shadow(0px 0px 3px ${colors.navBackground});
        }
        .navLinkContainer {
          flex: 1;
          align-items: center;
          display: flex;
          margin: 16px auto;
          cursor: pointer;
        }
        .navLinkContainer:first-child {
          margin-top: 32px;
        }
        .navLinkContainer:last-child {
          margin-bottom: 32px;
        }
      `}</style>
    </div>
  );
};

export { Nav };
