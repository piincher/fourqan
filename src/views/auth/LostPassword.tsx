import AuthFormContainer from '@components/AuthFormContainer';
import Form from '@components/form';
import AuthInputField from '@components/form/AuthInputField';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
const lostPassword = yup.object({
  email: yup
    .string()
    .trim('')
    .email('Invalid email')
    .required('Email is required'),
});

interface Props {}
const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = () => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
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
              title="J'ai perdu mon mot de passe"
              onPress={() => console.log('Sign in')}
            />
            <AppLink title="S'inscrire" onPress={() => {}} />
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
