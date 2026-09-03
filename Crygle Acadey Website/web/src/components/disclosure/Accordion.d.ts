import * as React from 'react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  question: React.ReactNode;
  answer: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
}

export declare function Accordion(props: AccordionProps): JSX.Element;
