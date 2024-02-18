import AuthFormContainer from '@components/AuthFormContainer';
import Form from '@components/form';
import AuthInputField from '@components/form/AuthInputField';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';

import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthNavigationProps } from 'src/@types/navigation';
import { useSupabase } from 'src/hooks/useSupabase';
import * as yup from 'yup';

import { Magic } from '@magic-sdk/react-native-expo';

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

const SignIn = ({ navigation }: AuthNavigationProps) => {
    const { getGoogleOAuthUrl, setOAuthSession, register } = useSupabase();
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        WebBrowser.warmUpAsync();

        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    const signInWithGoogle = async (values: {
    email: string;
    password: string;
  }) => {
        const response = await magic.auth.loginWithEmailOTP({
            email: values.email,
            showUI: true,
        });
        console.log('token', response);
    };

    const extractParamsFromUrl = (url: string) => {
        const params = new URLSearchParams(url.split('#')[1]);
        const data = {
            access_token: params.get('access_token'),
            expires_in: parseInt(params.get('expires_in') || '0'),
            refresh_token: params.get('refresh_token'),
            token_type: params.get('token_type'),
            provider_token: params.get('provider_token'),
        };

        return data;
    };
    return (
        <Form
            initialValues={initialValues}
            onSubmit={(values) => {
                signInWithGoogle(values);
            }}
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
