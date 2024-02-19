import AuthFormContainer from '@components/AuthFormContainer';
import Form from '@components/form';
import AuthInputField from '@components/form/AuthInputField';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthNavigationProps } from 'src/@types/navigation';
import * as yup from 'yup';

import { Magic } from '@magic-sdk/react-native-expo';
import { useSupabase } from 'src/hooks/useSupabase';
import { client } from 'src/api/client';
import { FormikHelpers } from 'formik';

export const magic = new Magic('pk_live_29F70767E6BA237B');

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('')
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

interface newUser {
  email: string;
  password: string;
}

const SignIn = ({ navigation }: AuthNavigationProps<'SignIn'>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const handleSubmit = async (
    values: newUser,
    actions: FormikHelpers<newUser>,
  ) => {
    try {
      const { data } = await client.post<{
        user: { email: string; id: string; name: string };
      }>('/auth/sign-in', {
        ...values,
      });
      console.log(data);
    } catch (error) {
      console.log('signin error', error);
    }
  };
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupSchema}
    >
      <AuthFormContainer title="Ravi de vous revoir" subTitle="Connectez-Vous">
        <View style={styles.formContainer}>
          <AuthInputField
            label="Email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.containerStyle}
            name="email"
          />
          <AuthInputField
            name="password"
            label="Password"
            autoCapitalize="none"
            placeholder="**********"
            secureTextEntry={secureTextEntry}
            containerStyle={styles.containerStyle}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureTextEntry} />}
            onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
          />
          <SubmitBtn title="Se Connecter" />
          <View style={styles.link}>
            <AppLink
              title="J'ai perdu mon mot de passe"
              onPress={() => navigation.navigate('LostPassword')}
            />
            <AppLink
              title="S'inscrire"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: { width: '100%' },

  containerStyle: {
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignIn;
