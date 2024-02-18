import AppButton from '@ui/AppButton';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = (props: Props) => {
    const { handleSubmit } = useFormikContext();
    return <AppButton title={props.title} onPress={handleSubmit} />;
};

export default SubmitBtn;
