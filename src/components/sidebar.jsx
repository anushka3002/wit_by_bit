import React, { useState } from 'react'
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
  } from "../images/SvgImages";
  import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { schoolRoute } from '../recoil/atoms/studentAtoms';
import School from '../images/school';

const Sidebar = () => {
  const [schoolPageRoute, setSchoolPageRoute] = useRecoilState(schoolRoute);
const location = useLocation()
      const [hoveredDashboardIndex, setHoveredDashboardIndex] = useState(null);
  const navigate = useNavigate()

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

  return (
        <div className="w-[25%] shadow-2xl px-[24px] h-screen border pt-2">
        <div className="flex justify-between mb-[10px]">
          <div className="bg-[#FFBF3F] p-4 rounded-[8px] w-[60px] h-[48px]">
            <div className="mb-2 mx-auto mt-[-10px] flex flex-cols justify-center">
              <School />
            </div>
          </div>
          <p className="SchoolSpace font-bold text-[22px]">School Space</p>
        </div>
        <hr></hr>
        <div className="mt-[11px]">
          {sidebarContent.map((e, index) => {
            const isDashboardHovered = hoveredDashboardIndex === index;
            return (
              <div
                onClick={()=>{setSchoolPageRoute(e.name);navigate(`${e.name}`)}}
                onMouseEnter={() => setHoveredDashboardIndex(index)}
                onMouseLeave={() => setHoveredDashboardIndex(null)}
                className={`flex cursor-pointer pl-3 mr-7 rounded-[18px] ${(location.pathname.substring(1)==e.name || (location.pathname=="/" && e.name=='Students')) && "bg-[#eaf6fc] text-[16px] font-medium text-[#2CA4D8]"} hover:bg-[#eaf6fc] py-[6px] hover:text-[16px] hover:font-medium hover:text-[#2CA4D8]`}
              >
                {isDashboardHovered || location.pathname.substring(1)==e.name || (location.pathname=="/" && e.name=='Students')? (
                  <span className="w-[30px]">{e.imageBlue}</span>
                ) : (
                  <span className="w-[30px]">{e.imageGrey}</span>
                )}
                <p className={`ml-5 text-[14px]`}>{e.name}</p>
              </div>
            );
          })}
        </div>
        <div className='fixed bottom-4 w-[16%]'>
          <img className='w-[40px] h-[40px]' src="./profilePic.png"></img>
          <p className='text-[14px] font-medium mt-2'>Andy Samberg</p>
          <p className='text-[12px] text-[#7F878A]'>andy.samberg@gmail.com</p>
          <p className='cursor-pointer text-[#2CA4D8] border-[2px] mt-4 border-[#2CA4D8] rounded-[7px] px-5 py-1 tracking-wider text-[12px] font-semibold text-center'>VIEW PROFILE</p>
        </div>
    </div>
  )
}

export default Sidebar