export class GetBooksDTO {
  skip: string;
  take: string;
}

export class GetBooksByTagNameDTO {
  name: string;
}

export class GetBooksByPointDTO {
  min: string;
  max: string;
}

export class GetBooksByTitleDTO {
  name: string;
}
