export type PhoneBookEntry = {
  id: number;
  name: string;
  number: number;
};

export type Page = {
  columns: PhoneBookEntry[][]
}
