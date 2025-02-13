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
} from '../../stores/taxisdriversusers/taxisdriversusersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTaxisdriversusers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    taxis_driversid: '',

    userid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { taxisdriversusers } = useAppSelector(
    (state) => state.taxisdriversusers,
  );

  const { taxisdriversusersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: taxisdriversusersId }));
  }, [taxisdriversusersId]);

  useEffect(() => {
    if (typeof taxisdriversusers === 'object') {
      setInitialValues(taxisdriversusers);
    }
  }, [taxisdriversusers]);

  useEffect(() => {
    if (typeof taxisdriversusers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = taxisdriversusers[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [taxisdriversusers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: taxisdriversusersId, data }));
    await router.push('/taxisdriversusers/taxisdriversusers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit taxisdriversusers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit taxisdriversusers'}
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
              <FormField label='taxis_driversid'>
                <Field name='taxis_driversid' placeholder='taxis_driversid' />
              </FormField>

              <FormField label='userid'>
                <Field name='userid' placeholder='userid' />
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
                    router.push('/taxisdriversusers/taxisdriversusers-list')
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

EditTaxisdriversusers.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TAXISDRIVERSUSERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTaxisdriversusers;
