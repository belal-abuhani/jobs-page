export interface Job {
  id: number;
  image: string;
  title: string;
  city: string;
  country: string;
  sector: string;
  description: string;
}

export interface Filters {
  search: string;
  city: string[];
  sector: string[];
  country: string[];
}

export type FiltersInput = {
  name: string;
  checkboxes: { value: string; isChecked: boolean }[];
}[];
