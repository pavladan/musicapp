export interface IThirdPartyProvider {
  provider_name: string;
  provider_id: string;
  provider_data: object;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  email_is_verified: boolean;
  password: string;
  referral_code: string;
  referred_by: string;
  third_party_auth: IThirdPartyProvider;
  date: Date;
}

export interface IUserDTO {
  email: string;
  password: string;
}
