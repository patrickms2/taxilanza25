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

import { update, fetch } from '../../stores/taxis/taxisSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTaxisPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    ownerid: '',

    license_plate: '',

    brand: '',

    model: '',

    year: '',

    color: '',

    taxi_status: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { taxis } = useAppSelector((state) => state.taxis);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof taxis === 'object') {
      setInitialValues(taxis);
    }
  }, [taxis]);

  useEffect(() => {
    if (typeof taxis === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = taxis[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [taxis]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/taxis/taxis-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit taxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit taxis'}
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
              <FormField label='ownerid' labelFor='ownerid'>
                <Field
                  name='ownerid'
                  id='ownerid'
                  component={SelectField}
                  options={initialValues.ownerid}
                  itemRef={'users'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='license_plate'>
                <Field name='license_plate' placeholder='license_plate' />
              </FormField>

              <FormField label='brand'>
                <Field name='brand' placeholder='brand' />
              </FormField>

              <FormField label='model'>
                <Field name='model' placeholder='model' />
              </FormField>

              <FormField label='year'>
                <Field type='number' name='year' placeholder='year' />
              </FormField>

              <FormField label='color'>
                <Field name='color' placeholder='color' />
              </FormField>

              <FormField label='taxi_status' labelFor='taxi_status'>
                <Field name='taxi_status' id='taxi_status' component='select'>
                  <option value='public.enum_taxis_taxi_status'>
                    public.enum_taxis_taxi_status
                  </option>

                  <option value='cooperativadetaxiId uuid'>
                    cooperativadetaxiId uuid
                  </option>
                </Field>
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
                  onClick={() => router.push('/taxis/taxis-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditTaxisPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTaxisPage;
