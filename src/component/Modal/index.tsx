import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const MaskModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

const DialogModal = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 30px;
  width: 500px;
  background-color: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Btn = styled.button`
  border: none;
  font-size: 1.25rem;
  width: 6rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin: 1rem 2rem 0 2rem;

  &.close {
    margin: 0;
    background-color: white;
    position: absolute;
    right: 10px;
    top: 25px;
  }

  &.cancel {
    color: black;
    background-color: rgb(237, 242, 247);
  }

  &.save {
    color: white;
    background-color: rgb(68, 157, 217);
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: start;
`;

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = React.memo(({ id, title, children, closeModal }: Props) => {
  const domEl = document.getElementById(id);

  if (!domEl) return null;
  return ReactDOM.createPortal(
    <MaskModal>
      <DialogModal>
        <div>
          <Title>{title}</Title>
          <Btn className="close" onClick={closeModal}>
            X
          </Btn>
        </div>
        <div>{children}</div>
        <div>
          <Btn className="cancel" onClick={closeModal}>
            Cancel
          </Btn>
          <Btn className="save">Save</Btn>
        </div>
      </DialogModal>
    </MaskModal>,
    domEl
  );
});

Modal.displayName = "Modal";

export default Modal;
