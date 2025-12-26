import type { LucideProps } from 'lucide-react';
import type React from 'react';

export type PageComponent = {
  label: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  component: React.JSX.Element;
};
