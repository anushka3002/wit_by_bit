import React, { useState } from "react";
import School from "../images/school";
import StudentModal from "./studentModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  deleteModalState,
  editFormFlag,
  inputModalState,
  itemToRemove,
  studentData,
} from "../recoil/atoms/studentAtoms";
import Edit from "../images/edit";
import Delete from "../images/delete";
import DeleteModal from "./deleteModal";
import { DashboardIcon, DashboardIconGrey, CourseBook, CourseBookGrey , Exams, ExamsGrey, LiveStreaming, LiveStreamingGrey, NoticeBoard, NoticeBoardGrey, Notifications, NotificationsGrey, Results, ResultsGrey, Students, StudentsGrey } from "../images/SvgImages";

const Dashboard = () => {
  const sidebarContent = [
    { name: "Dashboard", imageGrey: <DashboardIconGrey/>, imageBlue : <DashboardIcon/> },
    { name: "Courses", imageGrey: <CourseBookGrey/> ,imageBlue : <CourseBook/> },
    { name: "Students", imageGrey: <StudentsGrey/>, imageBlue : <Students/> },
    { name: "Exams", imageGrey: <ExamsGrey/>, imageBlue : <Exams/> },
    { name: "Results", imageGrey: <ResultsGrey/>, imageBlue : <Results/> },
    { name: "Notice Board", imageGrey: <NoticeBoardGrey/> , imageBlue : <NoticeBoard/>},
    { name: "Live Classes", imageGrey: <LiveStreamingGrey/> , imageBlue : <LiveStreaming/>},
    { name: "Notifications", imageGrey: <NotificationsGrey/>, imageBlue : <Notifications/> },
  ];

  const [isInputModalOpen, setInputIsModalOpen] =
    useRecoilState(inputModalState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const studentsData = useRecoilValue(studentData);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [hoveredDashboardIndex, setHoveredDashboardIndex] = useState(null)
  const [editFormFlagVal, setEditFormFlag] = useRecoilState(editFormFlag);
  const modalOpen = useRecoilValue(deleteModalState);
  const [_, setStudentData] = useRecoilState(studentData);
  const [itemToRemoveValue, setItemToRemoveValue] = useRecoilState(itemToRemove);
  const [imageBlue,setImageBlue] = useState(false)

  const removeData = () => {
    setStudentData(studentsData.filter((data) => data !== itemToRemoveValue));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-full flex pr-[24px]">
      {/* sidebar */}
      <div className="w-[25%] shadow-2xl px-[24px] h-screen border pt-5">
        <div className="flex justify-between mb-[20px]">
          <div className="bg-[#FFBF3F] p-4 rounded-[8px] w-[60px] h-[48px]">
            <div className="mb-2 mx-auto mt-[-10px] flex flex-cols justify-center">
              <School />
            </div>
          </div>
          <p className="SchoolSpace font-bold text-[22px]">School Space</p>
        </div>
        <hr></hr>
        <div className="mt-[11px]">
          {sidebarContent.map((e,index) => {
             const isDashboardHovered = hoveredDashboardIndex === index;
            return (
              <div onMouseEnter={() => setHoveredDashboardIndex(index)}
              onMouseLeave={() => setHoveredDashboardIndex(null)} className={`flex cursor-pointer pl-3 mr-7 rounded-[18px] hover:bg-[#eaf6fc] py-[10px] hover:text-[16px] hover:font-medium hover:text-[#2CA4D8]`}>
                {isDashboardHovered ? <span>{e.imageBlue}</span> : <span>{e.imageGrey}</span>}
                <p className={`ml-5 text-[14px]`}>{e.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* modals */}
      <StudentModal itemToRemoveValue={itemToRemoveValue}/>
      <DeleteModal removeData={removeData} />
      {/* table */}
      <div className=" w-full ml-6">
        <div className="flex justify-between">
          <p className="text-[20px] font-bold">Students</p>
          <button
            onClick={() => {setInputIsModalOpen(true);setEditFormFlag(false)}}
            className="text-white flex px-7 justify-between py-2 bg-[#2CA4D8] rounded-[10px]"
          >
            <img
              className="my-auto w-[14px] h-[14px] mr-1"
              src="./add.png"
            ></img>
            <p>ADD</p>
          </button>
        </div>
        <table className="table-auto w-full border">
          <thead className="bg-[#f1f4f8] border rounded-t-[10px]">
            <tr className="text-[14px] font-medium">
              <th className="py-1">No.</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Result</th>
              <th>Score</th>
              <th>Grade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((e, index) => {
              const isHovered = hoveredRowIndex === index;
              return (
                <>
                  <tr
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    className="border cursor-pointer hover:bg-[#F1F4F8]"
                  >
                    <td className="py-2 text-[14px]">{index + 1}</td>
                    <td className="text-[14px]">{e.name}</td>
                    <td>{e.class}</td>
                    <td className="mx-auto">
                      <p
                        className={`${
                          e.score >= 0 && e.score <= 30
                            ? "bg-red-500"
                            : e.score >= 31 && e.score <= 100
                            ? "bg-[#2CBF6E]"
                            : "bg-[white]"
                        } mx-auto focus:outline-none mb-2 rounded-[20px] text-white text-[12px] font-medium w-[70px] py-[2px] my-auto mt-1 tracking-wider`}
                      >
                        {e.result}
                      </p>
                    </td>
                    <td>{e.score}/100</td>
                    <td>
                      <p
                        className={`${
                          e.score >= 0 && e.score <= 30
                            ? "text-red-500"
                            : e.score >= 31 && e.score <= 75
                            ? "text-[#2CA4D8]"
                            : e.score >= 76
                            ? "text-[#2CBF6E]"
                            : "text-black"
                        } mb-2 text-[14px] font-medium`}
                      >
                        {e.grade}
                      </p>
                    </td>
                    <td>
                      <span
                      onClick={() => {setInputIsModalOpen(true);setItemToRemoveValue(e);setEditFormFlag(true)}}
                        className={`${isHovered ? "visible" : "invisible"}`}
                      >
                        <Edit />
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setItemToRemoveValue(e);
                        }}
                        className={`${isHovered ? "visible" : "invisible"}`}
                      >
                        <Delete />
                      </span>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
