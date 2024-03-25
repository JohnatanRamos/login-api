export interface IPayloadToken {
  // role: typeRoles;
  role: string;
  sub: string;
  iat?: number;
  exp?: number;
}

export type typeRoles = 'Admin';
