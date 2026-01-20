
import { Category } from './constants';

export interface Tool {
  name: string;
  description: string;
  link: string;
  category: Category;
  icon: string;
}
