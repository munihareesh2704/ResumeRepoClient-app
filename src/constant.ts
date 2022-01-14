export const LoggedInUserKey = "currentUser";

export interface GoogleAuthModel {
  ClientId: string;
  ClientSecret: string;
  AuthURI: string;
  TokenURI: string;
}

export const GoogleAuth: GoogleAuthModel = {
  ClientId:
    "630284701628-tus1tk8a0ji8fs19g8rod9gh86nmgs37.apps.googleusercontent.com",
  ClientSecret: "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",
  AuthURI: "https://accounts.google.com/o/oauth2/auth",
  TokenURI: "https://oauth2.googleapis.com/token",
};

export interface AmazonS3Access {
  AccessKeyID: string;
  SecretAccessKey: string;
}

export const AmazonAccess: AmazonS3Access = {
  AccessKeyID: "AKIAWVPFXW36ICRWXFCS",
  SecretAccessKey: "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",
};
