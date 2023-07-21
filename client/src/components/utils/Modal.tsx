import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen?: boolean;
  onClose: (value: boolean) => void ;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  Content?: JSX.Element;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}
export default function Modal({Content, isOpen, onClose, header, icon, primaryButton, secondaryButton}:ModalProps) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 "
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity items-center " />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex     items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform w-screen h-screen overflow-hidden bg-[#242323] text-white transition-all p-5 flex flex-col text-center items-center justify-center">
                <div className=" ">
                  <Dialog.Title className={"pb-2 flex flex-row text-center justify-center gap-x-2 items-center "}>
                    
                    <div className="bg-[#b5611811] shadow-md border border-[#b561184f] rounded-md py-2 px-4 mr-auto font-medium text-[20px] ">
                      <h2 className=" tracking-widest">{header?.toString().toUpperCase()}</h2>
                    </div>
                  </Dialog.Title>

                  <div className="">
                    {Content}
                  </div>
                </div>



                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {
                    primaryButton ? <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button> : <></>
                  }
                  
                  {
                    secondaryButton ?  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button> : <></>
                  }
                 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
