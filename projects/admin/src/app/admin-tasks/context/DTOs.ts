export interface task {
  userId: string,
  title: string,
  deadline: Date,
  image: object,
  description: string,
}

export interface IFilteration{
  keyword?:string;
  userId?:string;
  fromDate?:string,
  toDate?:string,
}

