import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { modalState, studentData } from "../recoil/atoms/studentAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import {useForm} from "react-hook-form";

const StudentModal = () => {
  const modalOpen = useRecoilValue(modalState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  const [scoreColor,setScoreColor] = useState("black")
  const [_, setStudentData] = useRecoilState(studentData);

  const {
    register,
    handleSubmit,
    watch,
    setValue
  } = useForm();

  const score = watch("score")

  useEffect(()=>{
    if(score>=0 && score<= 30){
      setValue("result","Failed")
      setValue("grade","Poor")
      setScoreColor("red")
    } else if(score>=31 && score <=75 ){
      setValue("result","Passed")
      setValue("grade","Average")
      setScoreColor("#f78800")
    }else if(score>=76){
      setValue("result","Passed")
      setValue("grade","Excellent")
      setScoreColor("#2CBF6E")
    }
  },[score,setValue])

  const onSubmit=(data)=>{
    console.log(data,"data")
    setStudentData((prev) => [
      ...prev,
      {
        name: data.name,
        class: data.class,
        score: data.score,
        result:data.result,
        grade:data.grade
      }
    ]);
  }

  return (
    <>
      <Modal
        isCentered
        padding={"0"}
        background="[#000000]"
        width={400}
        size={"lg"}
        className="z-20"
        isOpen={modalOpen}
        closeOnOverlayClick={true}
      >
        <ModalOverlay bg="rgba(0,0,0,0.4)">
          <ModalContent
            width={"400px"}
            paddingX={"24px"}
            paddingY={"24px"}
            background="white"
            margin="auto"
            marginTop="10px"
            borderRadius={10}
          >
            <ModalHeader>
              <p className="text-[18px] font-medium mb-[16px]">Add student</p>
            </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <hr className="pb-[16px]"></hr>
              <div class="w-full">
                <form onSubmit={handleSubmit(onSubmit)} class="bg-white rounded">
                  <div class="mb-4">
                    <label
                      class="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                      for="username"
                    >
                      STUDENT NAME*
                    </label>
                    <input
                    {...register("name")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="text"
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      class="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                      for="username"
                    >
                      CLASS*
                    </label>
                    <input
                    {...register("class")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="text"
                    />
                    <p class="text-red-500 text-xs italic">
                      Please input values between 1 & 12
                    </p>
                  </div>
                  <div class="mb-6">
                    <label
                      class="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                      for="username"
                    >
                      SCORE*
                    </label>
                    <input
                    name="score"
                    {...register("score")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="number"
                    />
                    <p class="text-red-500 text-xs italic">
                      Please input values between 0 & 100
                    </p>
                  </div>
                  <div>
                    <p className="block text-[12px] text-[#7F878A] tracking-wider">
                      RESULT
                    </p>
                    <input
                    name="result"
                    {...register("result")}
                    className={`bg-[${scoreColor}] focus:outline-none mb-2 rounded-[14px] "text-white" text-[12px] font-medium py-[2px] px-2`}
                    type="button"
                    ></input>
                  </div>
                  <div>
                    <p className="block text-[12px] text-[#7F878A] tracking-wider">
                      Grade
                    </p>
                    <input
                    name="grade"
                    {...register("grade")}
                    className={`text-[${scoreColor}] mb-2 text-[14px] font-medium`}
                    type="button"
                    ></input>
                  </div>
                  <hr className="my-[16px]"></hr>
                  <div className="flex justify-end">
                    <div>
                      <button onClick={()=>setIsModalOpen(false)} className="border border-[#2CA4D8] text-[#2CA4D8] tracking-wider text-[14px] font-medium py-[6px] px-8 rounded-[10px]">
                        CANCEL
                      </button>
                      <button type="submit" onClick={()=>setIsModalOpen(false)} className="border bg-[#2CA4D8] text-white text-[14px] tracking-wider font-medium py-[6px] px-8 ml-5 rounded-[10px]">
                        CONFIRM
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default StudentModal;
