import AppButton from '@ui/AppButton';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';

interface Props {
  title: string;
  busy?: boolean;
}

const SubmitBtn: FC<Props> = (props: Props) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <AppButton busy={isSubmitting} title={props.title} onPress={handleSubmit} />
  );
};

export default SubmitBtn;
