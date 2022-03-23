import { ReactNode } from 'react';

export const RenderIfTrue = (props: { children: JSX.Element; condition: boolean }) => {
  if (props.condition) {
    return props.children;
  } else {
    return null;
  }
};
