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
} from '../../stores/rolespermissionspermissions/rolespermissionspermissionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditRolespermissionspermissionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    roles_permissionsid: '',

    permissionid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { rolespermissionspermissions } = useAppSelector(
    (state) => state.rolespermissionspermissions,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof rolespermissionspermissions === 'object') {
      setInitialValues(rolespermissionspermissions);
    }
  }, [rolespermissionspermissions]);

  useEffect(() => {
    if (typeof rolespermissionspermissions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = rolespermissionspermissions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [rolespermissionspermissions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push(
      '/rolespermissionspermissions/rolespermissionspermissions-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit rolespermissionspermissions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit rolespermissionspermissions'}
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
              <FormField label='roles_permissionsid'>
                <Field
                  name='roles_permissionsid'
                  placeholder='roles_permissionsid'
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
                      '/rolespermissionspermissions/rolespermissionspermissions-list',
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

EditRolespermissionspermissionsPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ROLESPERMISSIONSPERMISSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditRolespermissionspermissionsPage;
