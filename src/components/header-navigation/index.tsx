// src/components/SideNav.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "@mui/material";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import avatar from "../../assets/images/avatar.png";
import fullLogo from "../../assets/icons/full-logo.svg";
import logo from "../../assets/icons/logo.svg";
import { CancelIcon, EventsIcon, HamburgerIcon, HomeIcon, MessageIcon, NotificationIcon, ReportsIcon, SettingsIcon, SpeakIcon } from "..";
import { Link, useLocation } from "react-router-dom";
import useInnerWidth from "../../lib/hooks/use-window-width";
import ROUTES from "../../lib/routes";
import useDarkMode from "../../lib/hooks/use-darkmode";

const SideNav: React.FC = () => {
  const [showNav, setShowNav] = useState(false);
  const [isNavOpen, setNavOpen] = useState(true);
  const [classToggle, setClassToggle] = useState(true);
  const [darkMode, setDarkMode] = useDarkMode();
  const { isMobile } = useInnerWidth();
  const handleDrawerToggle = () => {
    setClassToggle(!classToggle);
    setTimeout(() => {
      setNavOpen(!isNavOpen);
    }, classToggle ? 400 : 0);
  };
  const { pathname } = useLocation();
  const classNavWidth = classToggle ? "w-[280px] nsm:w-[100vw]" : "w-[60px]";
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const sideNavItems = useMemo(() => (
    [
      {
        title: 'Home',
        icon: <HomeIcon />,
        extraComponent: null,
        link: ROUTES.home,
      },
      {
        title: 'Events',
        icon: <EventsIcon />,
        extraComponent: null,
        link: ROUTES.events,
      },
      {
        title: 'Speakers',
        icon: <SpeakIcon />,
        extraComponent: null,
        link: ROUTES.speakers,
      },
      {
        title: 'Reports',
        icon: <ReportsIcon />,
        extraComponent: null,
        link: ROUTES.reports,
      },
      {
        title: 'Notifications',
        icon: <NotificationIcon />,
        extraComponent: <span className="badge">3</span>,
        link: ROUTES.notifications,
      },
      {
        title: 'Messages',
        icon: <MessageIcon />,
        extraComponent: <span className="badge">5</span>,
        link: ROUTES.messages,
      },
      {
        title: 'Settings',
        icon: <SettingsIcon />,
        extraComponent: null,
        link: ROUTES.settings,
      },
    ]
  ), []);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setShowNav(!isMobile)
    setClassToggle(!isMobile)
    if (isMobile) {
      setNavOpen(true);
    }
  }, [isMobile])


  return (
    <header className={`sm:p-[24px] sm:pt-[15px] h-[64px] sm:h-[100vh] sm:max-h-screen overflow-y-auto transition-width duration-500 ease-in-out ${classNavWidth} overflow-x-hidden nsm:min-w-[100vw] nsm:overflow-hidden ${!showNav ? "nsm:border-b nsm:border-1 nsm:border-b-[#334155] nsm:border-opacity-25" : ""}`}>
      <div className={`w-full nsm:p-[16px] nsm:h-[64px] flex justify-between items-center relative z-[5]  ${showNav ? "nsm:border-b nsm:border-1 nsm:border-b-[#334155] nsm:border-opacity-25" : ""}`}>
        <h1 className={`text-xl font-bold ${classToggle ? "w-[64px]" : "w-[32px] min-w-[32px]"} h-[32px]  flex items-center justify-center relative sm:mb-[25px]`}>
          <img src={classToggle ? fullLogo : logo} alt="logo" className="min-w-full" />
        </h1>
        <button className="sm:hidden block bg-none w-[24px] h-[24px] flex items-center justify-center text-[#ADA9BB] dark:text-black cursor-pointer" onClick={() => setShowNav(!showNav)}>
          {showNav ? <CancelIcon /> : <div className="w-full h-full text-[#ADA9BB] dark:text-white"><HamburgerIcon /></div>}
        </button>
      </div>
      <nav
        className={`${isNavOpen ? "sm:min-w-[240px] text-[#8576ff] text-[#ADA9BB]" : "sm:min-w-[60px] text-[#334155]"} dark:text-white nsm:absolute z-[4] nsm:h-[100vh] sm:h-[calc(100vh-64px)] nsm:left-0 nsm:top-0 pt-[81px] nsm:ease-in-out nsm:bg-white nsm:dark:bg-[#383544] nsm:bg-black transition-all duration-1000 ease-in-out ${showNav ? "nsm:max-w-[100vw] nsm:w-[100vw]  nsm:px-[20px]" : "nsm:max-w-[0px] nsm:w-[0px] "} nsm:overflow-hidden sm:relative nsm:overflow-y-auto`}
      >
        <ul className="flex flex-col items-start gap-3 ">
          {
            sideNavItems.map((item, index) => (
              <li className={`h-[30px] w-full flex items-center px-2  ${pathname === item.link ? "bg-[#fcf7ff]  dark:bg-[#8576ff] text-[#8576ff] dark:text-white" : ""}`}>
                <Link to={item.link} className="block min-w-full">
                  <Tooltip title={isNavOpen ? "" : item.title} placement="right" key={index} className="block sm:min-w-full">
                    <div className={`flex gap-4 items-center min-w-full justify-start`}>
                      <span className="block min-w-[20px] w-[28px] h-[20px] flex justify-start items-center">
                        {item.icon}
                      </span>
                      {isNavOpen && <p className={` ${pathname === item.link ? "text-[#8576ff] dark:text-white" : ""} `}>{item.title}</p>}
                    </div>
                  </Tooltip>
                </Link>
              </li>
            ))
          }

        </ul>
        <div className={`flex flex-col gap-2 mt-2 w-full max-w-full`}>
          <div className="max-w-full w-full">

            <Tooltip title={isNavOpen ? "" : "Expand"} placement="right" className="nsm:hidden !w-full !max-w-full">
              <button onClick={handleDrawerToggle} className={`bg-none flex gap-6 items-center ${isNavOpen ? "w-[100px]" : "w-[50px]"}!max-w-full ml-[6px] text-[#334155] dark:text-white`} disabled={isNavOpen !== classToggle}>
                {isNavOpen ? <KeyboardDoubleArrowLeft className="max-w-[50px] max-w-[20px] max-h-[20px]" /> : <KeyboardDoubleArrowRight className="max-w-[20px] max-h-[20px]" />}
                {isNavOpen && <p className="text-[#334155] dark:text-white">Collapse</p>}
              </button>
            </Tooltip>
          </div>

          {
            isNavOpen &&
            <div className="flex gap-2 items-center ml-[8px]">
              <button className={`w-[24px] min-w-[24px] rounded-full h-[16px] min-h-[16px] bg-[#e2e8f0] dark:bg-[#8576ff] flex items-center dark:justify-end relative`} onClick={toggleDarkMode}>
                <div className="block rounded-full bg-white w-[12px] h-[12px] min-w-[12px] min-h-[12px] absolute left-[2px] dark:left-auto top-[2px] dark:right-[2px] "></div>
              </button>
              <p>Dark Mode</p>
            </div>
          }
          <div className="flex gap-2 items-center  ml-[3px]">
            <img src={avatar} alt="home" className="w-[32px] h-[32px] min-w-[32px]" />
            {isNavOpen &&
              <div className="flex flex-col gap-1">
                <p className="leading-[100%]">Rudra Devi</p>
                <p className="leading-[100%] text-[14px] text-gray-400 dark:text-[#fff8]">rudra.dev@gmail.com</p>
              </div>
            }
          </div>
        </div>

      </nav>
    </header>

  );
};


export default SideNav;
