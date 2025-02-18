export interface IAuthContext {
  token: string;
  login: (access_token: string) => void;
  signout: () => void;
}