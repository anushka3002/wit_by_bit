import React from "react";
import School from "../images/school";

const Dashboard = () => {
  const array = [
    { name: "Dashboard", image: "./dashboard.png" },
    { name: "Courses", image: "./courses.png" },
    { name: "Students", image: "./students.png" },
    { name: "Exams", image: "./exams.png" },
    { name: "Results", image: "./results.png" },
    { name: "Notice Board", image: "./notice.png" },
    { name: "Live Classes", image: "./live.png" },
    { name: "Notifications", image: "./notifications.png" },
  ];
  return (
    <div className="w-full flex pr-[24px] mt-5">
      {/* sidebar */}
      <div className="w-[24%] shadow-2xl pl-[24px] h-screen">
        <div className="flex w-[240px] justify-between mb-[20px]">
          <div className="bg-[#FFBF3F] p-4 rounded-[8px] w-[60px] h-[48px]">
            <div className="mb-2 mx-auto mt-[-10px] flex flex-cols justify-center">
              <School />
            </div>
          </div>
          <p className="SchoolSpace font-bold text-[25px]">School Space</p>
        </div>
        <hr></hr>
        <div className="mt-[11px]">
          {array.map((e) => {
            return (
              <div className="flex cursor-pointer pl-3 mr-7 rounded-[18px] hover:bg-[#eaf6fc] py-[11px] hover:text-[16px] hover:font-medium hover:text-[#2CA4D8]">
                <img className="w-[24px] h-[24px]" src={e.image}></img>
                <p className="ml-5">{e.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* table */}
      <div className=" w-full ml-6">
        <div className="flex justify-between">
          <p className="text-[20px] font-bold">Students</p>
          <button className="text-white flex px-7 justify-between py-2 bg-[#2CA4D8] rounded-[10px]">
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
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="py-2 text-[14px]">1</td>
              <td className="text-[14px]">Robert Fox</td>
              <td>6th</td>
              <td>Passed</td>
              <td>78/100</td>
              <td>Excellent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
