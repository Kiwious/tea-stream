/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { useLazyQuery, useMutation, useQuery, useSuspenseQuery } from '@apollo/client/react'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  Upload: { input: unknown; output: unknown; }
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  streams: Array<StreamModel>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangeChatSettingsInput = {
  isChatEnabled: Scalars['Boolean']['input'];
  isChatFollowersOnly: Scalars['Boolean']['input'];
  isChatPremiumFollowersOnly: Scalars['Boolean']['input'];
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
};

export type ChangeNotificationSettingsInput = {
  siteNotifications: Scalars['Boolean']['input'];
  telegramNotifications: Scalars['Boolean']['input'];
};

export type ChangeNotificationSettingsResponse = {
  __typename?: 'ChangeNotificationSettingsResponse';
  notificationSettings: NotificationSettingsModel;
  telegramAuthToken?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangeProfileInfoInput = {
  bio: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChangeStreamInfoInput = {
  categoryId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ChatMessageModel = {
  __typename?: 'ChatMessageModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  stream: StreamModel;
  streamId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type CreatePlanInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeactivateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type FiltersInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type FollowModel = {
  __typename?: 'FollowModel';
  createdAt: Scalars['DateTime']['output'];
  follower: UserModel;
  followerId: Scalars['String']['output'];
  following: UserModel;
  followingId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GenerateStreamTokenInput = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type GenerateStreamTokenModel = {
  __typename?: 'GenerateStreamTokenModel';
  token: Scalars['String']['output'];
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MakePaymentModel = {
  __typename?: 'MakePaymentModel';
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeChatSettings: Scalars['Boolean']['output'];
  changeEmail: Scalars['Boolean']['output'];
  changeNotificationSettings: ChangeNotificationSettingsResponse;
  changePassword: Scalars['Boolean']['output'];
  changeProfileAvatar: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeStreamInfo: Scalars['Boolean']['output'];
  changeStreamThumbnail: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createIngress: Scalars['Boolean']['output'];
  createSocialLink: Scalars['Boolean']['output'];
  createSponsorshipPlan: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deactivateAccount: AuthModel;
  disableTotp: Scalars['Boolean']['output'];
  enableTotp: Scalars['Boolean']['output'];
  followChannel: Scalars['Boolean']['output'];
  generateStreamToken: GenerateStreamTokenModel;
  loginUser: AuthModel;
  logoutUser: Scalars['Boolean']['output'];
  makePayment: MakePaymentModel;
  newPassword: Scalars['Boolean']['output'];
  removeAvatar: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  removeSponsorshipPlan: Scalars['Boolean']['output'];
  removeStreamThumbnail: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendChatMessage: ChatMessageModel;
  unfollowChannel: Scalars['Boolean']['output'];
  updateSocialLink: Scalars['Boolean']['output'];
  verifyAccount: UserModel;
};


export type MutationChangeChatSettingsArgs = {
  data: ChangeChatSettingsInput;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangeNotificationSettingsArgs = {
  data: ChangeNotificationSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationChangeStreamInfoArgs = {
  data: ChangeStreamInfoInput;
};


export type MutationChangeStreamThumbnailArgs = {
  thumbnail: Scalars['Upload']['input'];
};


export type MutationCreateIngressArgs = {
  ingressType: Scalars['Float']['input'];
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateSponsorshipPlanArgs = {
  data: CreatePlanInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationFollowChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationGenerateStreamTokenArgs = {
  data: GenerateStreamTokenInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationMakePaymentArgs = {
  planId: Scalars['String']['input'];
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSponsorshipPlanArgs = {
  planId: Scalars['String']['input'];
};


export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendChatMessageArgs = {
  data: SendMessageInput;
};


export type MutationUnfollowChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type NotificationSettingsModel = {
  __typename?: 'NotificationSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  siteNotifications: Scalars['Boolean']['output'];
  telegramNotifications: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export enum NotificationType {
  EnableTwoFactor = 'ENABLE_TWO_FACTOR',
  NewFollower = 'NEW_FOLLOWER',
  NewSponsorship = 'NEW_SPONSORSHIP',
  StreamStart = 'STREAM_START',
  VerifiedChannel = 'VERIFIED_CHANNEL'
}

export type PlanModel = {
  __typename?: 'PlanModel';
  channel: UserModel;
  channelId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  stripePlanId: Scalars['String']['output'];
  stripeProductId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<CategoryModel>;
  findAllStreams: Array<StreamModel>;
  findCategoryBySlug: CategoryModel;
  findChannelByUsername: UserModel;
  findChatMessagesByStream: Array<ChatMessageModel>;
  findCurrentSession: SessionModel;
  findFollowersCountByChannel: Scalars['Float']['output'];
  findMyFollowers: Array<FollowModel>;
  findMyFollowings: Array<FollowModel>;
  findMySponsors: Array<SubscriptionModel>;
  findMySponsorshipPlans: Array<PlanModel>;
  findMyTransactions: Array<TransactionModel>;
  findNotificationsByUser: Array<NotificationModel>;
  findNotificationsUnreadCount: Scalars['Float']['output'];
  findProfile: UserModel;
  findRandomCategories: Array<CategoryModel>;
  findRandomStreams: Array<StreamModel>;
  findRecommendedChannels: Array<UserModel>;
  findSessionsByUser: Array<SessionModel>;
  findSocialLinks: Array<SocialLinkModel>;
  findSponsorsByChannel: Array<SubscriptionModel>;
  generateTotpSecret: TotpModel;
};


export type QueryFindAllStreamsArgs = {
  filter: FiltersInput;
};


export type QueryFindCategoryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFindChannelByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindChatMessagesByStreamArgs = {
  streamId: Scalars['String']['input'];
};


export type QueryFindFollowersCountByChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindSponsorsByChannelArgs = {
  channelId: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type SendMessageInput = {
  streamId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type SessionMetaDataModel = {
  __typename?: 'SessionMetaDataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata: SessionMetaDataModel;
  userId: Scalars['String']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkModel = {
  __typename?: 'SocialLinkModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type StreamModel = {
  __typename?: 'StreamModel';
  category: CategoryModel;
  categoryId: Scalars['String']['output'];
  chatMessages: Array<ChatMessageModel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ingressId?: Maybe<Scalars['String']['output']>;
  isChatEnabled: Scalars['Boolean']['output'];
  isChatFollowersOnly: Scalars['Boolean']['output'];
  isChatPremiumFollowersOnly: Scalars['Boolean']['output'];
  isLive: Scalars['Boolean']['output'];
  serverUrl?: Maybe<Scalars['String']['output']>;
  streamKey?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatMessageAdded: ChatMessageModel;
};


export type SubscriptionChatMessageAddedArgs = {
  streamId: Scalars['String']['input'];
};

export type SubscriptionModel = {
  __typename?: 'SubscriptionModel';
  channel: UserModel;
  channelId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  sponsorshipPlan: PlanModel;
  sponsorshipPlanId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId?: Maybe<Scalars['String']['output']>;
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type TransactionModel = {
  __typename?: 'TransactionModel';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: TransactionStatus;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum TransactionStatus {
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowModel>;
  followings: Array<FollowModel>;
  id: Scalars['ID']['output'];
  isDeactivated: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars['String']['output'];
  socialLinks: Array<SocialLinkModel>;
  stream: StreamModel;
  telegramId?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type ChangeEmailInput = {
  email: string;
};

export type ChangePasswordInput = {
  newPassword: string;
  oldPassword: string;
};

export type ChangeProfileInfoInput = {
  bio: string;
  displayName: string;
  username: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  username: string;
};

export type LoginInput = {
  login: string;
  password: string;
  pin?: string | null | undefined;
};

export type NewPasswordInput = {
  password: string;
  passwordRepeat: string;
  token: string;
};

export type NotificationType =
  | 'ENABLE_TWO_FACTOR'
  | 'NEW_FOLLOWER'
  | 'NEW_SPONSORSHIP'
  | 'STREAM_START'
  | 'VERIFIED_CHANNEL';

export type ResetPasswordInput = {
  email: string;
};

export type SocialLinkInput = {
  title: string;
  url: string;
};

export type SocialLinkOrderInput = {
  id: string;
  position: number;
};

export type VerificationInput = {
  token: string;
};

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { clearSessionCookie: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { createUser: boolean };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { loginUser: { message: string | null, user: { username: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { logoutUser: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { newPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { resetPassword: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { verifyAccount: { isEmailVerified: boolean } };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { changeEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: boolean };

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: unknown;
}>;


export type ChangeProfileAvatarMutation = { changeProfileAvatar: boolean };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;


export type ChangeProfileInfoMutation = { changeProfileInfo: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { createSocialLink: boolean };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { removeAvatar: boolean };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: string;
}>;


export type RemoveSocialLinkMutation = { removeSocialLink: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { reorderSocialLinks: boolean };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: string;
  data: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { updateSocialLink: boolean };

export type FindRecommendedChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRecommendedChannelsQuery = { findRecommendedChannels: Array<{ username: string, avatar: string | null, isVerified: boolean, stream: { isLive: boolean } }> };

export type FindNotificationsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsByUserQuery = { findNotificationsByUser: Array<{ id: string, message: string, type: NotificationType }> };

export type FindNotificationsUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsUnreadCountQuery = { findNotificationsUnreadCount: number };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { findProfile: { username: string, email: string, displayName: string, avatar: string | null, bio: string | null } };

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialLinksQuery = { findSocialLinks: Array<{ id: string, title: string, url: string, position: number }> };


export const ClearSessionCookieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearSessionCookie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearSessionCookie"}}]}}]} as unknown as DocumentNode<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const NewPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}}]}}]}}]} as unknown as DocumentNode<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfileAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeProfileAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeProfileAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}]}]}}]} as unknown as DocumentNode<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;
export const ChangeProfileInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeProfileInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeProfileInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeProfileInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const CreateSocialLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSocialLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSocialLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const RemoveProfileAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProfileAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAvatar"}}]}}]} as unknown as DocumentNode<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;
export const RemoveSocialLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSocialLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSocialLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const ReorderSocialLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderSocialLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLinkOrderInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderSocialLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}}]}]}}]} as unknown as DocumentNode<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const UpdateSocialLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSocialLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSocialLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const FindRecommendedChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRecommendedChannels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRecommendedChannels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLive"}}]}}]}}]}}]} as unknown as DocumentNode<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>;
export const FindNotificationsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindNotificationsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findNotificationsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export const FindNotificationsUnreadCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindNotificationsUnreadCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findNotificationsUnreadCount"}}]}}]} as unknown as DocumentNode<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>;
export const FindProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<FindProfileQuery, FindProfileQueryVariables>;
export const FindSocialLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSocialLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSocialLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<FindSocialLinksQuery, FindSocialLinksQueryVariables>;
export function useClearSessionCookieMutation(options?: useMutation.Options<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
	return useMutation(ClearSessionCookieDocument, options as useMutation.Options<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>)
}

export function useCreateUserMutation(options?: useMutation.Options<CreateUserMutation, CreateUserMutationVariables>) {
	return useMutation(CreateUserDocument, options as useMutation.Options<CreateUserMutation, CreateUserMutationVariables>)
}

export function useLoginUserMutation(options?: useMutation.Options<LoginUserMutation, LoginUserMutationVariables>) {
	return useMutation(LoginUserDocument, options as useMutation.Options<LoginUserMutation, LoginUserMutationVariables>)
}

export function useLogoutUserMutation(options?: useMutation.Options<LogoutUserMutation, LogoutUserMutationVariables>) {
	return useMutation(LogoutUserDocument, options as useMutation.Options<LogoutUserMutation, LogoutUserMutationVariables>)
}

export function useNewPasswordMutation(options?: useMutation.Options<NewPasswordMutation, NewPasswordMutationVariables>) {
	return useMutation(NewPasswordDocument, options as useMutation.Options<NewPasswordMutation, NewPasswordMutationVariables>)
}

export function useResetPasswordMutation(options?: useMutation.Options<ResetPasswordMutation, ResetPasswordMutationVariables>) {
	return useMutation(ResetPasswordDocument, options as useMutation.Options<ResetPasswordMutation, ResetPasswordMutationVariables>)
}

export function useVerifyAccountMutation(options?: useMutation.Options<VerifyAccountMutation, VerifyAccountMutationVariables>) {
	return useMutation(VerifyAccountDocument, options as useMutation.Options<VerifyAccountMutation, VerifyAccountMutationVariables>)
}

export function useChangeEmailMutation(options?: useMutation.Options<ChangeEmailMutation, ChangeEmailMutationVariables>) {
	return useMutation(ChangeEmailDocument, options as useMutation.Options<ChangeEmailMutation, ChangeEmailMutationVariables>)
}

export function useChangePasswordMutation(options?: useMutation.Options<ChangePasswordMutation, ChangePasswordMutationVariables>) {
	return useMutation(ChangePasswordDocument, options as useMutation.Options<ChangePasswordMutation, ChangePasswordMutationVariables>)
}

export function useChangeProfileAvatarMutation(options?: useMutation.Options<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>) {
	return useMutation(ChangeProfileAvatarDocument, options as useMutation.Options<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>)
}

export function useChangeProfileInfoMutation(options?: useMutation.Options<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
	return useMutation(ChangeProfileInfoDocument, options as useMutation.Options<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>)
}

export function useCreateSocialLinkMutation(options?: useMutation.Options<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
	return useMutation(CreateSocialLinkDocument, options as useMutation.Options<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>)
}

export function useRemoveProfileAvatarMutation(options?: useMutation.Options<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>) {
	return useMutation(RemoveProfileAvatarDocument, options as useMutation.Options<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>)
}

export function useRemoveSocialLinkMutation(options?: useMutation.Options<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
	return useMutation(RemoveSocialLinkDocument, options as useMutation.Options<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>)
}

export function useReorderSocialLinksMutation(options?: useMutation.Options<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
	return useMutation(ReorderSocialLinksDocument, options as useMutation.Options<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>)
}

export function useUpdateSocialLinkMutation(options?: useMutation.Options<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
	return useMutation(UpdateSocialLinkDocument, options as useMutation.Options<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>)
}

export function useFindRecommendedChannelsQuery(...[options]: {} extends FindRecommendedChannelsQueryVariables ? [options?: useQuery.Options<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>] : [options: useQuery.Options<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>]) {
	return useQuery(FindRecommendedChannelsDocument, options as useQuery.Options<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>)
}

export function useFindRecommendedChannelsLazyQuery(options?: useLazyQuery.Options<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
	return useLazyQuery(FindRecommendedChannelsDocument, options as useLazyQuery.Options<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>)
}

export function useFindRecommendedChannelsSuspenseQuery(...[options]: {} extends FindRecommendedChannelsQueryVariables ? [options?: useSuspenseQuery.Options<FindRecommendedChannelsQueryVariables>] : [options: useSuspenseQuery.Options<FindRecommendedChannelsQueryVariables>]) {
	return useSuspenseQuery(FindRecommendedChannelsDocument, options as useSuspenseQuery.Options<FindRecommendedChannelsQueryVariables>)
}

export function useFindNotificationsByUserQuery(...[options]: {} extends FindNotificationsByUserQueryVariables ? [options?: useQuery.Options<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>] : [options: useQuery.Options<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>]) {
	return useQuery(FindNotificationsByUserDocument, options as useQuery.Options<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>)
}

export function useFindNotificationsByUserLazyQuery(options?: useLazyQuery.Options<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
	return useLazyQuery(FindNotificationsByUserDocument, options as useLazyQuery.Options<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>)
}

export function useFindNotificationsByUserSuspenseQuery(...[options]: {} extends FindNotificationsByUserQueryVariables ? [options?: useSuspenseQuery.Options<FindNotificationsByUserQueryVariables>] : [options: useSuspenseQuery.Options<FindNotificationsByUserQueryVariables>]) {
	return useSuspenseQuery(FindNotificationsByUserDocument, options as useSuspenseQuery.Options<FindNotificationsByUserQueryVariables>)
}

export function useFindNotificationsUnreadCountQuery(...[options]: {} extends FindNotificationsUnreadCountQueryVariables ? [options?: useQuery.Options<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>] : [options: useQuery.Options<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>]) {
	return useQuery(FindNotificationsUnreadCountDocument, options as useQuery.Options<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>)
}

export function useFindNotificationsUnreadCountLazyQuery(options?: useLazyQuery.Options<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
	return useLazyQuery(FindNotificationsUnreadCountDocument, options as useLazyQuery.Options<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>)
}

export function useFindNotificationsUnreadCountSuspenseQuery(...[options]: {} extends FindNotificationsUnreadCountQueryVariables ? [options?: useSuspenseQuery.Options<FindNotificationsUnreadCountQueryVariables>] : [options: useSuspenseQuery.Options<FindNotificationsUnreadCountQueryVariables>]) {
	return useSuspenseQuery(FindNotificationsUnreadCountDocument, options as useSuspenseQuery.Options<FindNotificationsUnreadCountQueryVariables>)
}

export function useFindProfileQuery(...[options]: {} extends FindProfileQueryVariables ? [options?: useQuery.Options<FindProfileQuery, FindProfileQueryVariables>] : [options: useQuery.Options<FindProfileQuery, FindProfileQueryVariables>]) {
	return useQuery(FindProfileDocument, options as useQuery.Options<FindProfileQuery, FindProfileQueryVariables>)
}

export function useFindProfileLazyQuery(options?: useLazyQuery.Options<FindProfileQuery, FindProfileQueryVariables>) {
	return useLazyQuery(FindProfileDocument, options as useLazyQuery.Options<FindProfileQuery, FindProfileQueryVariables>)
}

export function useFindProfileSuspenseQuery(...[options]: {} extends FindProfileQueryVariables ? [options?: useSuspenseQuery.Options<FindProfileQueryVariables>] : [options: useSuspenseQuery.Options<FindProfileQueryVariables>]) {
	return useSuspenseQuery(FindProfileDocument, options as useSuspenseQuery.Options<FindProfileQueryVariables>)
}

export function useFindSocialLinksQuery(...[options]: {} extends FindSocialLinksQueryVariables ? [options?: useQuery.Options<FindSocialLinksQuery, FindSocialLinksQueryVariables>] : [options: useQuery.Options<FindSocialLinksQuery, FindSocialLinksQueryVariables>]) {
	return useQuery(FindSocialLinksDocument, options as useQuery.Options<FindSocialLinksQuery, FindSocialLinksQueryVariables>)
}

export function useFindSocialLinksLazyQuery(options?: useLazyQuery.Options<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
	return useLazyQuery(FindSocialLinksDocument, options as useLazyQuery.Options<FindSocialLinksQuery, FindSocialLinksQueryVariables>)
}

export function useFindSocialLinksSuspenseQuery(...[options]: {} extends FindSocialLinksQueryVariables ? [options?: useSuspenseQuery.Options<FindSocialLinksQueryVariables>] : [options: useSuspenseQuery.Options<FindSocialLinksQueryVariables>]) {
	return useSuspenseQuery(FindSocialLinksDocument, options as useSuspenseQuery.Options<FindSocialLinksQueryVariables>)
}