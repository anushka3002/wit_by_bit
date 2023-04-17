import { useEffect, useState } from "react";
import StudentModal from "./studentModal.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clearFormValues,
  deleteModalState,
  inputModalState,
  itemToRemove,
  showSidebarFlag,
  studentData,
} from "../recoil/atoms/studentAtoms.tsx";
import Edit from "../images/edit.tsx";
import Delete from "../images/delete.tsx";
import DeleteModal from "./deleteModal.tsx";
import School from "../images/school.tsx";

interface StudentDataValue{
  id?:string;
  name?: string;
  class?: number;
  score?: number;
  result?: string;
  grade?:string;
}

const Dashboard:React.FC<StudentDataValue> = (): React.ReactElement => {
 const [isInputModalOpen, setInputIsModalOpen] =
    useRecoilState(inputModalState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const studentsData = useRecoilValue(studentData);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const modalOpen = useRecoilValue(deleteModalState);
  const [_, setStudentData] = useRecoilState(studentData);
  const [__,setClearFormFlag] = useRecoilState(clearFormValues);
  const [showSidebarFlagVal, setShowSidebarFlag] = useRecoilState<boolean>(showSidebarFlag);
  const [itemToRemoveValue, setItemToRemoveValue] =
    useRecoilState<StudentDataValue>(itemToRemove);

  const removeData = () => {
    setStudentData(studentsData.filter((data:any) => data !== itemToRemoveValue));
    setIsDeleteModalOpen(false);
  };

  useEffect(()=>{
    !isDeleteModalOpen && !isInputModalOpen && setHoveredRowIndex(null)
  },[isDeleteModalOpen,isInputModalOpen])

  return (
    <div className="w-full sm:mr-6 mr-2 sm:pr-[24px] pr-[10px] pt-4 bg-[#f9fcfe] h-screen sm:h-full">
      {/* modals */}
      <StudentModal itemToRemoveValue={itemToRemoveValue} />
      <DeleteModal removeData={removeData} />
      {/* table */}
      <div className=" w-full ml-2 sm:ml-6 h-[85%] sm:h-full">
        <div className="flex justify-between mb-4">
        <div className="flex sm:hidden block ">
          <img onClick={()=>setShowSidebarFlag(true)} className="w-[20px] h-[20px] my-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"></img>
        <div className="mt-1 ml-2 bg-[#FFBF3F] sm:p-4 p-2 rounded-[8px] sm:w-[60px] w-[30px] sm:h-[48px] h-[28px]">
          <div className=" mx-auto mt-[-10px] flex flex-cols justify-center">
            <School />
          </div>
          </div>
          </div>
          <p className="text-[20px] font-bold">Students</p>
          <button
            onClick={() => {
              setInputIsModalOpen(true);
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
          {/* <button>Show sidebar</button> */}
        </div>
        <div className="h-full sm:h-[445px] bg-white text-center overflow-y-scroll border">
        <table className="table-auto w-full border rounded-[10px]">
          <thead className="bg-[#f1f4f8] border">
            <tr className="sm:text-[14px] text-[10px] font-medium">
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
            {studentsData.map((e:any, index) => {
              const isHovered = hoveredRowIndex === index;
              return (
                <>
                  <tr
                  onClick={()=>setHoveredRowIndex(index)}
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => {(isDeleteModalOpen || isInputModalOpen)  ? setHoveredRowIndex(index) : setHoveredRowIndex(null)}}
                    className="border cursor-pointer hover:bg-[#F1F4F8] sm:text-[14px] text-[10px]"
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
                        } mx-auto focus:outline-none mb-1 rounded-[20px] text-white font-medium sm:w-[70px] w-[50px] py-[2px] my-auto mt-1 tracking-wider`}
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
                        } my-auto font-medium`}
                      >
                        {e.grade}
                      </p>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          setInputIsModalOpen(true);
                          setItemToRemoveValue(e);
                          setClearFormFlag(false);
                        }}
                        className={`${isHovered ? "visible" : "sm:invisible visible"}`}
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
                        className={`${isHovered ? "visible" : "sm:invisible visible"}`}
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
        {studentsData.length==0 && <p className="text-[35px] text-[#d4d4d4] text-center pt-40 font-bold">Add Student</p>}
        </div>
        <p className="text-[12px] py-4">Showing {studentsData.length} of {studentsData.length} entries</p>
      </div>
    </div>
  );
};

export default Dashboard;
