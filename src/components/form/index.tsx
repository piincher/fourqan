import { Formik, FormikHelpers } from 'formik';
import React, { ReactNode } from 'react';

interface Props<T> {
  initialValues: T;
  children: ReactNode;
  validationSchema: unknown;
  onSubmit: ((
    values: T,
    formikHelpers: FormikHelpers<unknown>,
  ) => void | Promise<unknown>) &
    ((values: unknown) => void);
}

const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      {props.children}
    </Formik>
  );
};

export default Form;
