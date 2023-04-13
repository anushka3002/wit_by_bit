import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { deleteModalState, itemToRemove } from "../recoil/atoms/studentAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

const DeleteModal = ({ removeData }) => {
  const modalOpen = useRecoilValue(deleteModalState);
  const itemToRemoveValue = useRecoilValue(itemToRemove);
  const [isModalOpen, setIsModalOpen] = useRecoilState(deleteModalState);

  console.log(modalOpen);

  return (
    <div>
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
            marginTop="70px"
            borderRadius={10}
          >
            <ModalHeader>
              <p className="text-[18px] font-medium mb-[16px]">Remove student</p>
            </ModalHeader>
            <ModalBody>
              <hr className="pb-[16px]"></hr>
              <div class="w-full">
                <p className="text-[16px] font-semibold">Are you sure you want to remove the current student from the list?</p>
                <p className="text-[12px] font-medium text-[#7F878A] mt-6">STUDENT NAME</p>
                <p className="mt-2 text-[14px]">{itemToRemoveValue?.name}</p>
                <p className="text-[12px] font-medium text-[#7F878A] mt-4">CLASS</p>
                <p className="mt-2 text-[14px]">{itemToRemoveValue?.class}th</p>
                <hr className="my-6"></hr>
                <div className="flex justify-end">
                  <input
                    type="button"
                    value="CANCEL"
                    onClick={() => setIsModalOpen(false)}
                    className="cursor-pointer border border-[#2CA4D8] text-[#2CA4D8] tracking-wider text-[14px] font-medium py-[6px] px-8 rounded-[10px]"
                  ></input>
                  <button
                    onClick={removeData}
                    type="submit"
                    className="border bg-[#F24643] text-white text-[14px] tracking-wider font-medium py-[6px] px-8 ml-5 rounded-[10px]"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default DeleteModal;
