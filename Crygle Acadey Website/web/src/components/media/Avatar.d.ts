import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: number;
  /** Inset ring colour (defaults to no ring). */
  ring?: string;
}

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  people?: Array<{ src?: string; name?: string }>;
  size?: number;
  overlap?: number;
  ring?: string;
}

export declare function Avatar(props: AvatarProps): JSX.Element;
export declare function AvatarStack(props: AvatarStackProps): JSX.Element;
