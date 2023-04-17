import {atom} from "recoil";

interface StudentDataValue{
  id?:string;
  name?: string;
  class?: number;
  score?: number;
  result?: string;
  grade?:string;
}

export const inputModalState = atom({
    key:"inputModalState",
    default:false
})

export const deleteModalState = atom({
  key:"deleteModalState",
  default:false
})

export const itemToRemove = atom<StudentDataValue>({
  key:"itemToRemove",
  default:{}
})

export const schoolRoute = atom({
  key:"schoolRoute",
  default:"Students"
})

export const clearFormValues = atom({
  key:"clearFormValues",
  default:false,
})

export const showSidebarFlag = atom({
  key:"showSidebarFlag",
  default:false,
})

export const studentData = atom<StudentDataValue[]>({
    key: "studentData",
    default: [],
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((e) => {
          console.debug("Current Tasks", e);
        });
      }
    ]
  });