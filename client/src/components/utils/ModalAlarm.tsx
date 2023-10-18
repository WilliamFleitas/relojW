import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen?: boolean;
  onClose: (value: boolean) => void;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  Content?: JSX.Element;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}
export default function ModalAlarm({
  Content,
  isOpen,
  onClose,
  header,
}: ModalProps) {
  return (
  <div>
  {
    
  true ? 
    <div className="w-full h-screen absolute z-50 top-0 left-0">
    {Content}
    </div> : <></>
  }
  </div>
  )
}
