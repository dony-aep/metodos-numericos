export type MethodStatus = 'available' | 'coming-soon';

export interface NumericalMethod {
  slug: string;
  title: string;
  shortDescription: string;
  status: MethodStatus;
}
