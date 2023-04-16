import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";
import { clearFormValues, inputModalState, studentData } from "../recoil/atoms/studentAtoms.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { generateUID } from "./uuid/utils.tsx";
import { useEffect } from "react";

interface StudentDataValue{
  id?:string;
  name?: string;
  class?: number;
  score?: number;
  result?: string;
  grade?:string;
}

interface StudentModalprops{
  itemToRemoveValue:StudentDataValue
}

const StudentModal:React.FC<StudentModalprops>= ({itemToRemoveValue}): React.ReactElement => {
  const modalOpen = useRecoilValue(inputModalState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(inputModalState)
  const [studentDataList, setStudentData] = useRecoilState<StudentDataValue[]>(studentData);
  const clearFormFlag = useRecoilValue<boolean>(clearFormValues)

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

  const score = watch("score") as number;
  const student_class = watch("class") as number;
  const result = watch("result") as string;
  const grade = watch("grade") as string;
  const {onClose} = useDisclosure()

  useEffect(()=>{
    if(score>=0 && score<= 30 && score.toString().length>0){
      setValue("result","Failed")
      setValue("grade","Poor")
    } else if(score>=31 && score <=75 ){
      setValue("result","Passed")
      setValue("grade","Average")
    }else if(score>=76 && score<=100){
      setValue("result","Passed")
      setValue("grade","Excellent")
    }
    else if(score?.toString().length==0 || score>100){
      setValue("result","-")
      setValue("grade","-")
    }
  },[score,setValue])

  useEffect(()=>{
    !clearFormFlag && reset(itemToRemoveValue)
  },[itemToRemoveValue,clearFormFlag])

  const clearForm = () =>{
    setValue("name","")
    setValue("class","")
    setValue("score","")
    setValue("result","-")
    setValue("grade","-")
    clearErrors("name")
  }

  useEffect(()=>{
    clearFormFlag && clearForm() 
  },[clearFormFlag])


  const onSubmit=(data:any):void=>{
    setStudentData((prev:StudentDataValue[]) => [
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

  const onEdit = (data:any) =>{
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
    clearFormFlag && clearForm()
  }

  return (
    <>
      <Modal
        isCentered
        size={"lg"}
        isOpen={modalOpen}
        onClose={onClose}
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
              <div className="w-full">
                <form onSubmit={handleSubmit(clearFormFlag ? onSubmit : onEdit)} className="bg-white rounded">
                  <div className="mb-4">
                    <label
                      className="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                    >
                      STUDENT NAME*
                    </label>
                    <input
                    {...register("name")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="text"
                    />
                    {typeof errors.name?.message === "string" ? <p className="text-red-500 text-xs italic">
                      {errors.name?.message}
                    </p> : null}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                    >
                      CLASS*
                    </label>
                    <input
                    {...register("class")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="number"
                    />
                    {typeof errors.class?.message === "string" ? <p className={`${student_class ? "text-red-500" : "text-[#666A6C]"} text-xs italic`}>
                    {student_class ? errors.class?.message : "Please enter values between 1 & 12"}
                    </p> : null}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-[12px] text-[#7F878A] mb-2 tracking-wider"
                    >
                      SCORE*
                    </label>
                    <input
                    id="score"
                    {...register("score")}
                      className="border rounded-[5px] w-full focus:outline-none px-[14px] py-[4px]"
                      type="number"
                    />
                    {typeof errors.score?.message === "string" ? <p className={`${score ? "text-red-500" : "text-[#666A6C]"} text-xs italic`}>
                      {score ? errors.score?.message : "Please enter values between 0 & 100"}
                    </p> : null}
                  </div>
                  <div>
                    <p className="block text-[12px] text-[#7F878A] tracking-wider">
                      RESULT
                    </p>
                    <input
                    id="result"
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
                    id="grade"
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
