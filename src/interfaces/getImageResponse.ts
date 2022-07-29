import { Image } from './images';

export interface GetImageResponse {
  after: string;
  data: Image[];
}
