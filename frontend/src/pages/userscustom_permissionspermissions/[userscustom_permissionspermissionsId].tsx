import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/userscustom_permissionspermissions/userscustom_permissionspermissionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditUserscustom_permissionspermissions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    users_custom_permissionsid: '',

    permissionid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { userscustom_permissionspermissions } = useAppSelector(
    (state) => state.userscustom_permissionspermissions,
  );

  const { userscustom_permissionspermissionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: userscustom_permissionspermissionsId }));
  }, [userscustom_permissionspermissionsId]);

  useEffect(() => {
    if (typeof userscustom_permissionspermissions === 'object') {
      setInitialValues(userscustom_permissionspermissions);
    }
  }, [userscustom_permissionspermissions]);

  useEffect(() => {
    if (typeof userscustom_permissionspermissions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) =>
          (newInitialVal[el] = userscustom_permissionspermissions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [userscustom_permissionspermissions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: userscustom_permissionspermissionsId, data }));
    await router.push(
      '/userscustom_permissionspermissions/userscustom_permissionspermissions-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit userscustom_permissionspermissions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit userscustom_permissionspermissions'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='users_custom_permissionsid'>
                <Field
                  name='users_custom_permissionsid'
                  placeholder='users_custom_permissionsid'
                />
              </FormField>

              <FormField label='permissionid'>
                <Field name='permissionid' placeholder='permissionid' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/userscustom_permissionspermissions/userscustom_permissionspermissions-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditUserscustom_permissionspermissions.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated
      permission={'UPDATE_USERSCUSTOM_PERMISSIONSPERMISSIONS'}
    >
      {page}
    </LayoutAuthenticated>
  );
};

export default EditUserscustom_permissionspermissions;
