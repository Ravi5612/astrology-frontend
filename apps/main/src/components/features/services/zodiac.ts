import zodiacData from "../../../../public/data/zodiac.json";

export interface ZodiacData {
  id: string;
  image: string;
  title: string;
  date: string;
  nature: string;
}

export const ZodiacSignsData: ZodiacData[] = zodiacData;
