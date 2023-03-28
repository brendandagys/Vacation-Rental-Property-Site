export interface IJwtToken {
  username: string;
  last: string;
  first: string;
  exp: number;
}

export interface ILogInRequest {
  username: string;
  password: string;
}

export interface ILogInResponse {
  token: string;
}
