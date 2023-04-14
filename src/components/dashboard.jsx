import React, { useEffect, useState } from "react";
import StudentModal from "./studentModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  clearFormValues,
  deleteModalState,
  editFormFlag,
  inputModalState,
  itemToRemove,
  studentData,
} from "../recoil/atoms/studentAtoms";
import Edit from "../images/edit";
import Delete from "../images/delete";
import DeleteModal from "./deleteModal";

const Dashboard = () => {
 const [isInputModalOpen, setInputIsModalOpen] =
    useRecoilState(inputModalState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const studentsData = useRecoilValue(studentData);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [editFormFlagVal, setEditFormFlag] = useRecoilState(editFormFlag);
  const modalOpen = useRecoilValue(deleteModalState);
  const [_, setStudentData] = useRecoilState(studentData);
  const [__,setClearFormFlag] = useRecoilState(clearFormValues)
  const [itemToRemoveValue, setItemToRemoveValue] =
    useRecoilState(itemToRemove);
  const removeData = () => {
    setStudentData(studentsData.filter((data) => data !== itemToRemoveValue));
    setIsDeleteModalOpen(false);
  };

  useEffect(()=>{
    !isDeleteModalOpen && !isInputModalOpen && setHoveredRowIndex(null)
  },[isDeleteModalOpen,isInputModalOpen])

  return (
    <div className="w-full mr-6 pr-[24px] pt-4 bg-[#f9fcfe]">
      {/* modals */}
      <StudentModal itemToRemoveValue={itemToRemoveValue} />
      <DeleteModal removeData={removeData} />
      {/* table */}
      <div className=" w-full ml-6">
        <div className="flex justify-between mb-4">
          <p className="text-[20px] font-bold">Students</p>
          <button
            onClick={() => {
              setInputIsModalOpen(true);
              setEditFormFlag(false);
              setClearFormFlag(true);
            }}
            className="text-white flex px-6 justify-between py-2 bg-[#2CA4D8] rounded-[10px]"
          >
            <img
              className="my-auto w-[14px] h-[14px] mr-1"
              src="./add.png"
            ></img>
            <p className="text-[14px] font-medium">ADD</p>
          </button>
        </div>
        <div className="h-[445px] border bg-white text-center">
        <table className="table-auto w-full border rounded-[10px]">
          <thead className="bg-[#f1f4f8] border">
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
                  onClick={()=>setHoveredRowIndex(index)}
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => {(isDeleteModalOpen || isInputModalOpen)  ? setHoveredRowIndex(index) : setHoveredRowIndex(null)}}
                    className="border cursor-pointer hover:bg-[#F1F4F8] text-[14px]"
                  >
                    <td className="py-2 text-[#242424]">{index + 1}</td>
                    <td className="text-[14px] text-[#242424]">{e.name}</td>
                    <td>{e.class}{e.class==1 ? "st" : e.class==2 ? "nd" : e.class==3 ? "rd" : "th"}</td>
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
                    <td className="text-[#242424]">{e.score}/100</td>
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
                        } mb-2 font-medium`}
                      >
                        {e.grade}
                      </p>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          setInputIsModalOpen(true);
                          setItemToRemoveValue(e);
                          setEditFormFlag(true);
                          setClearFormFlag(false);
                        }}
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
        {studentsData.length==0 && <p className="text-[35px] text-[#d4d4d4] text-center pt-40 font-bold">Add Data</p>}
        </div>
        <p className="text-[12px] py-4">Showing {studentsData.length} of {studentsData.length} entries</p>
      </div>
    </div>
  );
};

export default Dashboard;
