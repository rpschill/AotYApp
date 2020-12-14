export enum FilterOptionsEnum {
  NULL,
  YEAR,
  ARTIST,
  GENRE
}

export const FilterOptionsMap = new Map<number, string>([
  [FilterOptionsEnum.NULL, null],
  [FilterOptionsEnum.YEAR, 'Year'],
  [FilterOptionsEnum.ARTIST, 'Artist'],
  [FilterOptionsEnum.GENRE, 'Genre']
]);
