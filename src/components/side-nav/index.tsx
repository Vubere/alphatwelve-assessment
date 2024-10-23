// src/components/SideNav.tsx
import React, { useEffect, useMemo, useState } from "react";
import { ListItemText, Tooltip } from "@mui/material";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import avatar from "../../assets/images/avatar.png";
import fullLogo from "../../assets/icons/full-logo.svg";
import logo from "../../assets/icons/logo.svg";
import { EventsIcon, HomeIcon, MessageIcon, NotificationIcon, ReportsIcon, SettingsIcon, SpeakIcon } from "..";
import { Link, useLocation } from "react-router-dom";

const SideNav: React.FC = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [classToggle, setClassToggle] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const handleDrawerToggle = () => {
    setClassToggle(!classToggle);
    setTimeout(() => {
      setNavOpen(!isNavOpen);
    }, classToggle ? 400 : 0);
  };
  const { pathname } = useLocation();
  console.log(pathname)
  const classNavWidth = classToggle ? "w-[280px]" : "w-[60px]";
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const sideNavItems = useMemo(() => (
    [
      {
        title: 'Home',
        icon: <HomeIcon />,
        extraComponent: null,
        link: '/',
      },
      {
        title: 'Events',
        icon: <EventsIcon />,
        extraComponent: null,
        link: '/events',
      },
      {
        title: 'Speakers',
        icon: <SpeakIcon />,
        extraComponent: null,
        link: '/speakers',
      },
      {
        title: 'Reports',
        icon: <ReportsIcon />,
        extraComponent: null,
        link: '/reports',
      },
      {
        title: 'Notifications',
        icon: <NotificationIcon />,
        extraComponent: <span className="badge">3</span>,
        link: '/notifications',
      },
      {
        title: 'Messages',
        icon: <MessageIcon />,
        extraComponent: <span className="badge">5</span>,
        link: '/messages',
      },
      {
        title: 'Settings',
        icon: <SettingsIcon />,
        extraComponent: null,
        link: '/settings',
      },
    ]
  ), []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode])


  return (
    <header className={`p-[24px] h-[100vh] max-h-screen overflow-y-auto transition-all duration-500 ease-in-out ${classNavWidth} overflow-x-hidden`}>
      <h1 className={`text-xl font-bold ${classToggle ? "w-[64px]" : "w-[32px]"} h-[32px] bg-[#007BFF] flex items-center justify-center relative mb-[30px]`}>
        <img src={classToggle ? fullLogo : logo} alt="logo" />
      </h1>
      <nav
        className={`${isNavOpen ? "min-w-[240px]" : "min-w-[60px]"} `}
      >
        <ul className="flex flex-col items-start gap-3">
          {
            sideNavItems.map((item, index) => (
              <li className={`h-[30px] w-full flex items-center px-2  ${pathname === item.link ? "bg-[#fcf7ff] text-[#8576ff] dark:bg-[#8576ff] dark:text-white " : ""}`}>
                <Link to={item.link} className="block min-w-full">
                  <Tooltip title={isNavOpen ? "" : item.title} placement="right" key={index} className="block min-w-full">
                    <div className={`flex gap-4 items-center min-w-full`}>
                      <span className="block min-w-[20px] w-[20px] h-[20px]">
                        {item.icon}
                      </span>
                      {isNavOpen && <p className="text">{item.title}</p>}
                    </div>
                  </Tooltip>
                </Link>
              </li>
            ))
          }

        </ul>
        <div className="flex flex-col gap-2 mt-2 min-w-[240px]">
          <Tooltip title={isNavOpen ? "" : "Collapse"} placement="right" >
            <button onClick={handleDrawerToggle} className="bg-none flex gap-2 items-center w-[100px]" disabled={isNavOpen !== classToggle}>
              {isNavOpen ? <KeyboardDoubleArrowLeft className="max-w-[50px]" /> : <KeyboardDoubleArrowRight />}
              {isNavOpen && <ListItemText primary="collapse" />}
            </button>
          </Tooltip>

          {
            isNavOpen &&
            <div className="flex gap-2 items-center">
              <button className={`w-[24px] min-w-[24px] rounded-full h-[16px] min-h-[16px] bg-[#e2e8f0] dark:bg-[#8576ff] flex items-center dark:justify-end relative`} onClick={toggleDarkMode}>
                <div className="block rounded-full bg-white w-[12px] h-[12px] min-w-[12px] min-h-[12px] absolute left-[2px] dark:left-auto top-[2px] dark:right-[2px] "></div>
              </button>
              <p>Dark Mode</p>
            </div>
          }
          <div className="flex gap-2 items-center">
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
