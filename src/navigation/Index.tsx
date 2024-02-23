import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Loader from '@ui/Loader';
import { getFromasyncStorage, keys } from '@utils/asyncStorage';
import { colors } from '@utils/colors';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { client } from 'src/api/client';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  updateBusyState,
  updateLoginState,
  updateProfile,
} from 'src/store/auth';

import { AuthNavigator } from './AuthNavigation';
import TabNavigator from './TabNavigator';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
  },
};

const Index: FC<Props> = () => {
  const busy = useAppSelector((state) => state.busy);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAuthLogin = async () => {
      try {
        dispatch(updateBusyState(true));
        const token = await getFromasyncStorage(keys.AUTH_TOKEN);
        if (!token) {
          dispatch(updateBusyState(false));
          return;
        }
        const { data } = await client.get('/auth/is-auth');
        dispatch(updateProfile(data.profile));
        dispatch(updateLoginState(true));
        dispatch(updateBusyState(false));
      } catch (error) {
        console.log('fetchAuthLogin error', error);
      }
    };

    fetchAuthLogin();
  }, []);
  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Index;
