import {atom} from "recoil";

export const modalState = atom({
    key:"modalState",
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