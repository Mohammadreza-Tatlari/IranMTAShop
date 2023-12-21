"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../LoginButton";
import Cookies from "js-cookie";
import useUserState from "@/app/hooks/useUserState";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const userState = useUserState();
  const [currentUser, setCurrentUser] = useState<boolean | undefined>(
    userState.isVerified
  );
  const [HumbergerMenu, setHumbergerMenu] = useState<boolean>(false);
  const [SignOutDropDown, setSignOutDropDown] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const loginModal = useLoginModal();
  const router = useRouter();
  const [userName, setUserName] = useState<string | undefined>(userState.userName);

  useEffect(() => {
    if (userName) { 
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }, [currentUser, userName , userState]);

  useEffect(() => {
    setUserName(userState.userName)
  }, [userState])

  function handleHumbergerMenu() {
    setHumbergerMenu(!HumbergerMenu);
  }

  function handleSignOutDropDown() {
    setSignOutDropDown(true);
  }

  //checks if the size is propert to display the feature in Small sized Menu
  useEffect(() => {
    const isMobileSized = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", isMobileSized);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", isMobileSized);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const toggleLogin = () => {
    loginModal.onOpen();
  };

  //this function will remove all the cookies and reset all the global variable that are related to userState
  function handleSignOut() {
    router.push("/");
    Cookies.remove("JWTToken", { secure: true, httpOnly: false });
    Cookies.remove("userName", { secure: true, httpOnly: false });
    Cookies.remove("needToVerify", { secure: true, httpOnly: false });
    userState.onSetUserName('');
    setUserName('');
    setSignOutDropDown(false);
    setCurrentUser(false);
    toast("به درود", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    //setTimeout(hardReload, 1000)
  }

  // function hardReload() {
  //   window.location.reload();
  // }

  return (
    <nav className="flex-row-reverse block z-50 bg-gradient-to-r from-slate-950 to-slate-800 text-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around max-md:justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            IranMTA
          </span> */}
          <LoginButton userName="IRAN MTA SHOP" onClick={() => {}} />
        </Link>
        <button
          onClick={handleHumbergerMenu}
          className={
            "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-50 rounded-sm md:hidden   dark:text-gray-100 dark:hover:border-2 hover:border-slate-400" +
            (HumbergerMenu
              ? " dark:focus:ring-gray-200 focus:outline-none focus:ring-2"
              : "")
          }
        >
          {/* HumbergerMenu - Menu - menubutton */}
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          id="hamburgerMenu"
          className={
            (HumbergerMenu ? "" : "hidden") + " w-full md:block md:w-auto"
          }
        >
          <ul className="flex flex-col md:items-center font-medium p-4 md:p-0 mt-4 rounded-sm md:flex-row md:space-x-8  md:mt-0 md:border-0 border-black">
            <li>
              <a
                // onClick={() => router.push("/")}
                href="https://iranmta.ir/"
                target="_blank"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto hover:cursor-pointer transition md:hover:text-indigo-500 focus:text-white "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://forum.iranmta.ir/"
                target="_blank"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition md:hover:text-indigo-500 focus:text-white "
              >
                Forum
              </a>
            </li>
            <li>
              <a
                onClick={() => router.push("/Shop")}
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition md:hover:text-indigo-500 hover:cursor-pointer focus:text-white "
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="https://forum.iranmta.ir/"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition md:hover:text-indigo-500 focus:text-white "
              >
                Contact Us
              </a>
            </li>
            <div className="">
              {!currentUser ? (
                <LoginButton userName="Login" onClick={toggleLogin} />
              ) : (
                <LoginButton
                  userName={userName}
                  onClick={handleSignOutDropDown}
                />
              )}
              <div
                onMouseLeave={() => {
                  setSignOutDropDown(false);
                }}
                className={
                  "absolute z-[1000] " +
                  (SignOutDropDown === false ? "hidden" : "") +
                  " font-normal bg-slate-900 divide-y  rounded-md shadow w-44 divide-gray-600"
                }
              >
                <ul className="py-2 text-sm text-white">
                  <li
                    className="px-4 py-2 hover:cursor-pointer hover:text-indigo-300"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            </div>

            {isMobile && (
              <>
                <li>
                  <a
                    href="#"
                    className="flex flex-row justify-between py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto md:hover:border-b-2 focus:text-white "
                  >
                    Telegram
                    <li className="fill-white hover:cursor-pointer hover:fill-blue-400 transition duration-200">
                      <svg viewBox="0 0 50 50" width="27px" height="26px">
                        <path d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z" />
                      </svg>
                    </li>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex flex-row justify-between py-2 pl-3 pr-4 text-white hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto md:hover:border-b-2 focus:text-white"
                  >
                    Instagram
                    <li className="fill-white hover:cursor-pointer hover:fill-[#e8085e] transition duration-200">
                      <svg viewBox="0 0 50 50" width="26px" height="26px">
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                      </svg>
                    </li>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <ul className="text-white flex flex-row space-x-4  max-md:hidden">
          <Link
            target="_blank"
            href="https://www.instagram.com/iranmtaofficial"
          >
            <li className="fill-white hover:cursor-pointer hover:fill-[#e8085e] transition duration-200">
              <svg viewBox="0 0 50 50" width="26px" height="26px">
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
              </svg>
            </li>
          </Link>
          <Link target="_blank" href="https://telegram.org/iranmta">
            <li className="fill-white hover:cursor-pointer hover:fill-blue-400 transition duration-200">
              <svg viewBox="0 0 50 50" width="27px" height="26px">
                <path d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z" />
              </svg>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
