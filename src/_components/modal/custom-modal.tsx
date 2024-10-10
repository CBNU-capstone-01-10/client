import { ReactNode } from "react";
import Modal from "react-modal";

const defaultStyles = {
  content: {
    borderRadius: "1rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
};

// COMPONENT: 커스텀 모달창
interface ICustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  customStyles?: ReactModal.Styles;
  contentLabel?: string;
}
export default function CustomModal({
  isOpen,
  onRequestClose,
  children,
  customStyles = defaultStyles,
  contentLabel = "Modal",
}: ICustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={contentLabel}
      appElement={document.getElementById("root")!}
    >
      {children}
    </Modal>
  );
}
