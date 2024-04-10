import { Modal } from "antd";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: ReactNode;
}

export const BaseModal = ({ open, setOpen, children }: Props) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => <></>}
    >
      {children}
    </Modal>
  );
};
