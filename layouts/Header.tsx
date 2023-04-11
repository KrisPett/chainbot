import React, {useEffect, useState} from "react";
import Image from "next/image";
import chainbotWhite from "../assets/images/chainbot-logo-white.png";
import chainbotBlack from "../assets/images/chainbot-logo-black.png";
import {useTheme} from "next-themes";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {links} from "@/components/utils/Links";
import ThemeSwitch from "@/lib/ThemeSwitch";
import Button from "@/lib/Button";
import {signOut, useSession} from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const {theme} = useTheme();
  const [isTheme, setIsTheme] = useState<string>();
  const {data: session} = useSession();

  useEffect(() => {
    setIsTheme(theme);
  }, [theme]);

  const handleSignOut = async () => {
    if (session) {
      const post_logout_redirect_uri = process.env.NEXT_PUBLIC_CLIENT_URL;
      const logoutUrl = `https://auth.chaincuet.com/auth/realms/chainbot/protocol/openid-connect/logout?id_token_hint=${session.id_token}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
      signOut().then(() => router.replace(logoutUrl));
    }
  };

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-10 w-full bg-zinc-300 from-zinc-600 to-gray-500 dark:bg-zinc-600 dark:bg-gradient-to-r"
      }
    >
      <div className={"flex items-center justify-between py-3"}>
        <div className={"flex"}>
          <div className={"flex items-center"}>
            <Link href={"/"} className="btn-ghost btn hover:bg-transparent">
              <Image
                src={isTheme === "light" ? chainbotBlack : chainbotWhite}
                alt=""
                width={200}
                height={200}
                className="min-w-full"
                priority={true}
              />
            </Link>
          </div>
          <div className={"flex items-center"}>
            <ul className={"flex space-x-1"}>
              <div className="navbar-center hidden lg:flex">
                <ul className="flex">
                  <li>
                    <div className=" dropdown dropdown-bottom dropdown-hover">
                      <label
                        tabIndex={0}
                        className="btn-ghost btn text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500"
                      >
                        Artificial Intelligence
                        <svg
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu space-y-4 rounded-lg bg-zinc-300 from-zinc-600 to-gray-500 p-4 dark:bg-zinc-600 dark:bg-gradient-to-b"
                      >
                        <li className={"mt-0"}>
                          <Link
                            href={"/chatbot"}
                            className={
                              "btn-ghost btn h-20 text-base capitalize text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500 xxs:w-40 xs:w-80"
                            }
                          >
                            ChatBot
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/imagebot/-1"}
                            className={
                              "btn-ghost btn h-20 text-base capitalize text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500 xxs:w-40 xs:w-80"
                            }
                          >
                            ImageBot
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link
                      href={links.chaincuet}
                      target={"_self"}
                      className={
                        "btn-ghost btn text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500"
                      }
                    >
                      <div className={"flex items-center space-x-2"}>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                        </div>
                        <div>Chaincue Technologies</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <div className="mr-4 flex flex-wrap justify-center gap-1">
          <div className={"flex flex-nowrap sm:flex-row-reverse"}>
            <div className={"mr-2 flex"}>
              <ThemeSwitch/>
            </div>
            <div className="dropdown-hover dropdown dropdown-end lg:hidden">
              <label
                tabIndex={0}
                className="btn-ghost btn text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500"
              >
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu space-y-4 rounded-lg bg-zinc-100 from-zinc-600 to-gray-500 p-4 dark:bg-zinc-600 dark:bg-gradient-to-b"
              >
                <li className={"mt-0"}>
                  <Link
                    href={"/chatbot"}
                    replace
                    className={
                      "btn-ghost btn h-20 text-base capitalize text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500 xxs:w-40 xs:w-80"
                    }
                  >
                    ChatBot
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/imagebot/-1"}
                    replace
                    className={
                      "btn-ghost btn h-20 text-base capitalize text-gray-600 hover:text-orange-800 dark:text-gray-200 dark:hover:text-orange-500 xxs:w-40 xs:w-80"
                    }
                  >
                    ImageBot
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={"xxs:hidden xs:hidden sm:block"}>
            <Button onClick={() => handleSignOut()} title={"Sign out"}/>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
