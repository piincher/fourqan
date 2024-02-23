import AuthFormContainer from '@components/AuthFormContainer';
import Form from '@components/form';
import AuthInputField from '@components/form/AuthInputField';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import { FormikHelpers } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthNavigationProps } from 'src/@types/navigation';
import { client } from 'src/api/client';
import * as yup from 'yup';
const lostPassword = yup.object({
  email: yup
    .string()
    .trim('')
    .email('Invalid email')
    .required('Email is required'),
});

interface Props {}
interface newUser {
  email: string;
}
const initialValues = {
  email: '',
};

const LostPassword = ({ navigation }: AuthNavigationProps<'LostPassword'>) => {
  const handleSubmit = async (
    values: newUser,
    action: FormikHelpers<newUser>,
  ) => {
    action.setSubmitting(true);
    try {
      const { data } = await client.post<{
        user: {
          email: string;
          id: string;
          name: string;
        };
      }>('/auth/forget-password', {
        ...values,
      });
      console.log(data);
    } catch (error) {
      console.log('signin error', error);
    }
    action.setSubmitting(false);
  };
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={lostPassword}
    >
      <AuthFormContainer
        title="Ravi de vous revoir"
        subTitle="Reinitialise votre mot de passe"
      >
        <View style={styles.formContainer}>
          <AuthInputField
            label="Email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.containerStyle}
            name="email"
          />

          <SubmitBtn title="Envoyer" />
          <View style={styles.link}>
            <AppLink
              title="Se connecter"
              onPress={() => navigation.navigate('SignIn')}
            />
            <AppLink
              title="S'inscrire"
              onPress={() => navigation.navigate('SignUp')}
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

export default LostPassword;
