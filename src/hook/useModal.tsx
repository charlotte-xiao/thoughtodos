import React, { useState } from "react";
import Modal from "../component/Modal";

type ModalProps = {
  id: string;
  title: string;
};

export const useModal = (modalProps: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }: { children: React.ReactNode }) => (
    <>
      {isVisible && (
        <Modal closeModal={hide} title={modalProps.title} id={modalProps.id}>
          {children}
        </Modal>
      )}
    </>
  );

  return { show, hide, RenderModal };
};
