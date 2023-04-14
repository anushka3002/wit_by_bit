import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { clearFormValues, editFormFlag, inputModalState, itemToRemove, studentData } from "../recoil/atoms/studentAtoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { generateUID } from "./uuid/utils";

const StudentModal = () => {
  const modalOpen = useRecoilValue(inputModalState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(inputModalState)
  const [studentDataList, setStudentData] = useRecoilState(studentData);
  const itemToRemoveValue = useRecoilValue(itemToRemove);
  const editFormFlagVal = useRecoilValue(editFormFlag);
  // const setClearFormFunction = useSetRecoilState(clearFormValues)
  const clearFormFlag = useRecoilValue(clearFormValues)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Error: Name field cannot be left blank"),
    class: Yup.number()
      .typeError("Error: Please input values between 1 & 12")
      .integer("Error: Please input values between 1 & 12")
      .min(1, "Error: Please input values between 1 & 12")
      .max(12, "Error: Please input values between 1 & 12")
      .required("Error: Class field cannot be left blank"),
    score: Yup.number()
      .typeError("Error: Please input values between 0 & 100")
      .min(0, "Error: Please input values between 0 & 100")
      .max(100, "Error: Please input values between 0 & 100")
      .required("Error: Score field cannot be left blank")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const defaultValues = itemToRemoveValue;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    clearErrors
  } = useForm({
    defaultValues,
    ...formOptions
  });

  const score = watch("score")
  const student_class = watch("class")
  const result = watch("result")
  const grade = watch("grade")

  useEffect(()=>{
    if(score>=0 && score<= 30 && score.length>0){
      setValue("result","Failed")
      setValue("grade","Poor")
    } else if(score>=31 && score <=75 ){
      setValue("result","Passed")
      setValue("grade","Average")
    }else if(score>=76 && score<=100){
      setValue("result","Passed")
      setValue("grade","Excellent")
    }
    else if(score?.length==0 || score>100){
      setValue("result","-")
      setValue("grade","-")
    }
  },[score,setValue])

  useEffect(()=>{
    reset(itemToRemoveValue)
  },[itemToRemoveValue])

  const clearForm = () =>{
    console.log("clear ho rha")
    setValue("name","")
    setValue("class","")
    setValue("score","")
    setValue("result","-")
    setValue("grade","-")
    clearErrors("name")
  }

  useEffect(()=>{
    console.log(clearFormFlag,"clear the values")
    clearFormFlag && clearForm()
  },[clearFormFlag])


  const onSubmit=(data)=>{
    setStudentData((prev) => [
      ...prev,
      {
        id:generateUID(),
        name: data.name,
        class: data.class,
        score: data.score,
        result:data.result,
        grade:data.grade
      }
    ]);
    setIsModalOpen(false)
    clearForm()
  }

  const onEdit = (data) =>{
    reset(data)
    setIsModalOpen(false)
    setStudentData(prev=>{
      return prev.map(student=>{
        if(student.id === data.id){
          return data
        }
        return student;
      })
    })
  }

  const handleCancel=()=>{
    setIsModalOpen(false)
    !editFormFlagVal && clearForm()
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
            <ModalBody>
              <hr className="pb-[16px]"></hr>
              <div class="w-full">
                <form onSubmit={handleSubmit(editFormFlagVal ? onEdit : onSubmit)} class="bg-white rounded">
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
                    <p class="text-red-500 text-xs italic">
                      {errors.name?.message}
                    </p>
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
                      type="number"
                    />
                    <p class={`${student_class ? "text-red-500" : "text-[#666A6C]"} text-xs italic`}>
                    {student_class ? errors.class?.message : "Please enter values between 1 & 12"}
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
                    <p class={`${score ? "text-red-500" : "text-[#666A6C]"} text-xs italic`}>
                      {score ? errors.score?.message : "Please enter values between 0 & 100"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-[12px] text-[#7F878A] tracking-wider">
                      RESULT
                    </p>
                    <input
                    name="result"
                    {...register("result")}
                    className={`${result=="Failed" ? "bg-red-500 text-white" : result=="Passed" ? "bg-[#2CBF6E] text-white" : "bg-[white] text-black" } focus:outline-none mb-2 rounded-[14px] text-[12px] font-medium py-[2px] px-2`}
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
                    className={`${result=="Failed" ? "text-red-500" : grade == "Average" ? "text-[#2CA4D8]" : result =="Passed" ? "text-[#2CBF6E]" : "text-black px-2" } mb-2 text-[14px] font-medium`}
                    type="button"
                    ></input>
                  </div>
                  <hr className="my-[16px]"></hr>
                  <div className="flex justify-end">
                    <div>
                      <input type="button" value="CANCEL" onClick={handleCancel} className="cursor-pointer border border-[#2CA4D8] text-[#2CA4D8] tracking-wider text-[14px] font-medium py-[6px] px-8 rounded-[10px]">
                      </input>
                      <input value="CONFIRM" type="submit" className={`border ${errors.score || errors.class || errors.name ? "bg-[#A8B4B9] cursor-not-allowed" : "bg-[#2CA4D8] cursor-pointer"} text-white text-[14px] tracking-wider font-medium py-[6px] px-8 ml-5 rounded-[10px]`}>
                      </input>
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
