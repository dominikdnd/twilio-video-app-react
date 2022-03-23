import { Transition } from '@headlessui/react';
import React from 'react';
import { ReactNode, useEffect, useState } from 'react';

export const AppearAfter = (props: { timeout?: number; children: ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, props.timeout ?? 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Transition
      show={show}
      className="transition-opacity duration-500 w-full h-full"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {props.children}
    </Transition>
  );
};
