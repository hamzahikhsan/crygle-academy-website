import * as React from 'react';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | string;
  reviews?: string;
  stars?: number;
  size?: number;
}

export declare function Rating(props: RatingProps): JSX.Element;
