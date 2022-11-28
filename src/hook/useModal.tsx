import React, { useState } from "react";
import Modal from "../component/Modal";

type ModalProps = {
  id: string;
  title: string;
  preHandle: () => void;
};

export const useModal = ({ id, title, preHandle }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const commit = () => {
    preHandle();
    hide();
  };

  const RenderModal = ({ children }: { children: React.ReactNode }) => (
    <>
      {isVisible && (
        <Modal close={hide} title={title} id={id} commit={commit}>
          {children}
        </Modal>
      )}
    </>
  );

  return { show, hide, RenderModal };
};
