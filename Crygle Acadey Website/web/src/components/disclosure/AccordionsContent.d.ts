import * as React from 'react';

export interface AccordionItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface AccordionsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: AccordionItem[];
  /** Controlled index of the open item (-1 = all closed). */
  openIndex?: number;
  /** Uncontrolled initial open index (default 0). */
  defaultOpenIndex?: number;
  onOpenChange?: (openIndex: number) => void;
  gap?: number;
}

export declare function AccordionsContent(props: AccordionsContentProps): JSX.Element;
