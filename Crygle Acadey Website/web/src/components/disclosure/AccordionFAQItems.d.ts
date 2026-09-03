import * as React from 'react';

export interface AccordionFAQItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  question: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}

export declare function AccordionFAQItems(props: AccordionFAQItemsProps): JSX.Element;
