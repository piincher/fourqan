import AuthFormContainer from '@components/AuthFormContainer';
import AppButton from '@ui/AppButton';
import AppLink from '@ui/AppLink';
import OTPField from '@ui/OTPField';
import { colors } from '@utils/colors';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View, Text } from 'react-native';
import { AuthNavigationProps } from 'src/@types/navigation';
import { client } from 'src/api/client';

const otpFields = new Array(6).fill('');

const Verification = ({ route }: AuthNavigationProps<'Verification'>) => {
  const [otp, setOtp] = useState<string[]>([...otpFields]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(10);
  const [canSendOtp, setCanSendOtp] = useState<boolean>(false);
  const inputRef = React.useRef<TextInput>(null);
  const { userInfo } = route.params;

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace' && index !== 0) {
      if (!newOtp[index]) {
        setActiveOtpIndex(index - 1);
      }
      newOtp[index] = '';
    } else if (value !== 'Backspace') {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp(newOtp);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSendOtp) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          setCanSendOtp(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canSendOtp]);

  const isValidOtp = otp.every((value) => {
    return value.trim();
  });
  const handleSubmit = async () => {
    console.log(otp.join(''));

    if (!isValidOtp) return;
    setSubmitting(true);
    try {
      const { data } = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  const requestForOtp = async () => {
    setCountdown(30);
    setCanSendOtp(false);
    try {
      await client.post('/auth/re-verify-email', {
        userId: userInfo.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthFormContainer
      title="Regarde votre telephone"
      subTitle="Reinitialise votre mot de passe"
    >
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otpFields.map((_, index) => {
            return (
              <OTPField
                keyboardType="numeric"
                key={index}
                ref={activeOtpIndex === index ? inputRef : null}
                onKeyPress={({ nativeEvent }) => {
                  handleChange(nativeEvent.key, index);
                }}
                value={otp[index] || ''}
                onChangeText={handlePaste}
              />
            );
          })}
        </View>

        <AppButton busy={submitting} title="Confirmez" onPress={handleSubmit} />

        <View style={styles.linkContainer}>
          {countdown > 0 ? (
            <Text style={styles.countDown}>{countdown} sec</Text>
          ) : null}
          <AppLink
            title="Renvoyez"
            onPress={requestForOtp}
            active={canSendOtp}
          />
        </View>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: { width: '100%' },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 10,
  },
});

export default Verification;
