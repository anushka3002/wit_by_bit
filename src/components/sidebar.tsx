import {
  DashboardIcon,
  DashboardIconGrey,
  CourseBook,
  CourseBookGrey,
  Exams,
  ExamsGrey,
  LiveStreaming,
  LiveStreamingGrey,
  NoticeBoard,
  NoticeBoardGrey,
  Notifications,
  NotificationsGrey,
  Results,
  ResultsGrey,
  Students,
  StudentsGrey,
} from "../images/SvgImages.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { schoolRoute, showSidebarFlag } from "../recoil/atoms/studentAtoms.tsx";
import School from "../images/school.tsx";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [schoolPageRoute, setSchoolPageRoute] =
    useRecoilState<string>(schoolRoute);
    const [showSidebarFlagVal, setShowSidebarFlag] = useRecoilState<boolean>(showSidebarFlag);
    // const showSidebarFlagVal = useRecoilValue(showSidebarFlag);
    useRecoilState<string>(schoolRoute);
  const location = useLocation();
  const [hoveredDashboardIndex, setHoveredDashboardIndex] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  const sidebarContent = [
    {
      name: "Dashboard",
      imageGrey: <DashboardIconGrey />,
      imageBlue: <DashboardIcon />,
    },
    {
      name: "Courses",
      imageGrey: <CourseBookGrey />,
      imageBlue: <CourseBook />,
    },
    { name: "Students", imageGrey: <StudentsGrey />, imageBlue: <Students /> },
    { name: "Exams", imageGrey: <ExamsGrey />, imageBlue: <Exams /> },
    { name: "Results", imageGrey: <ResultsGrey />, imageBlue: <Results /> },
    {
      name: "Notice Board",
      imageGrey: <NoticeBoardGrey />,
      imageBlue: <NoticeBoard />,
    },
    {
      name: "Live Classes",
      imageGrey: <LiveStreamingGrey />,
      imageBlue: <LiveStreaming />,
    },
    {
      name: "Notifications",
      imageGrey: <NotificationsGrey />,
      imageBlue: <Notifications />,
    },
  ];

  // sidebar
  return (
    <div className={`${showSidebarFlagVal ? "sm:-translate-x-full translate-x-0 " : "sm:translate-x-0 -translate-x-full"} ease-in-out duration-300 sm:w-[25%] w-[20%] shadow-2xl sm:px-[24px] px-[9px] h-screen border pt-2 fixed sm:static bg-white`}>
      <div className="flex justify-between mb-[10px] sm:mt-0 mt-3">
        <img onClick={()=>setShowSidebarFlag(false)} className="sm:hidden block w-[20px] h-[20px] my-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"></img>
        <div className="bg-[#FFBF3F] sm:p-4 p-2 rounded-[8px] sm:w-[60px] w-[30px] sm:h-[48px] h-[28px]">
          <div className="mb-2 mx-auto mt-[-10px] flex flex-cols justify-center">
            <School />
          </div>
        </div>
        <p className="SchoolSpace font-bold text-[22px] sm:block hidden">School Space</p>
      </div>
      <hr></hr>
      <div className="mt-[11px]">
        {sidebarContent.map((e, index) => {
          const isDashboardHovered = hoveredDashboardIndex === index;
          return (
            <div
              onClick={() => {
                setSchoolPageRoute(e.name);
                navigate(`${e.name}`);
              }}
              onMouseEnter={() => setHoveredDashboardIndex(index)}
              onMouseLeave={() => setHoveredDashboardIndex(null)}
              className={`flex cursor-pointer pl-3 mr-7 sm:rounded-[18px] rounded-[10px] ${
                (location.pathname.substring(1) == e.name ||
                  (location.pathname == "/" && e.name == "Students")) &&
                "bg-[#eaf6fc] w-full text-[16px] font-medium text-[#2CA4D8]"
              } hover:bg-[#eaf6fc] py-[6px] hover:text-[16px] hover:font-medium hover:text-[#2CA4D8]`}
            >
              {isDashboardHovered ||
              location.pathname.substring(1) == e.name ||
              (location.pathname == "/" && e.name == "Students") ? (
                <span className="w-[30px]">{e.imageBlue}</span>
              ) : (
                <span className="w-[30px]">{e.imageGrey}</span>
              )}
              <p className={` sm:block hidden ml-5 text-[14px]`}>{e.name}</p>
            </div>
          );
        })}
      </div>
      {/* <div className="fixed bottom-4 w-[16%]">
        <img className="w-[40px] h-[40px]" src="./profilePic.png"></img>
        <p className="text-[14px] font-medium mt-2">Andy Samberg</p>
        <p className="text-[12px] text-[#7F878A]">andy.samberg@gmail.com</p>
        <p className="cursor-pointer text-[#2CA4D8] border-[2px] mt-4 border-[#2CA4D8] rounded-[7px] px-5 py-1 tracking-wider text-[12px] font-semibold text-center">
          VIEW PROFILE
        </p>
      </div> */}
    </div>
  );
};

export default Sidebar;
