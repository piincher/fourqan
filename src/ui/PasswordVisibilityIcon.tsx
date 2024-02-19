import { Entypo } from '@expo/vector-icons';
import { colors } from '@utils/colors';
import React, { FC } from 'react';

interface Props {
  privateIcon: boolean;
}

const PasswordVisibilityIcon: FC<Props> = ({ privateIcon }) => {
  return privateIcon ? (
    <Entypo name="eye" size={16} color={colors.SECONDARY} />
  ) : (
    <Entypo name="eye-with-line" size={16} color={colors.SECONDARY} />
  );
};

export default PasswordVisibilityIcon;
