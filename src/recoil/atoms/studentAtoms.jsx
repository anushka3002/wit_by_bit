import {atom} from "recoil";

export const inputModalState = atom({
    key:"inputModalState",
    default:false
})

export const deleteModalState = atom({
  key:"deleteModalState",
  default:false
})

export const itemToRemove = atom({
  key:"itemToRemove",
  default:null
})

export const editFormFlag = atom({
  key:"editFormFlag",
  default:false
})

export const studentData = atom({
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