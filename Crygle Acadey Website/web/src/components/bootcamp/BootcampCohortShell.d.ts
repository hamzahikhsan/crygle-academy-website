import type { ReactNode } from 'react';

export interface BootcampCohortShellProps {
  active: 'jadwal' | 'booking' | 'tugas' | 'leaderboard';
  children: ReactNode;
}

export declare function BootcampCohortShell(props: BootcampCohortShellProps): JSX.Element;
