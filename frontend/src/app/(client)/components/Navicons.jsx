'use client'

import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useState } from "react";
import LoginModal from "./LoginModal";


const Navicons = () => {
  const [isLoginModal, setIsLoginModal] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full hover:opacity-85 cursor-pointer">
        <FaCartShopping className=" text-white" />
      </div>
      <div onClick={() => setIsLoginModal(true)} className="w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full hover:opacity-85 cursor-pointer">
        <FaRegUser className=" text-white" />
      </div>
      <Modal
        isOpen={isLoginModal}
        onClose={() => setIsLoginModal(false)}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        radius="none"
        size="2xl"
      >
        <ModalContent>
          <ModalBody>
            <LoginModal onClose={() => setIsLoginModal(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default Navicons