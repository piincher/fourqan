import type { NativeStackScreenProps } from '@react-navigation/native-stack'
interface newUserInfo {
  email: string;
  id: string;
  name: string;
}
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  LostPassword: undefined;
  Verification: { userInfo: newUserInfo };
};

export type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList>;
