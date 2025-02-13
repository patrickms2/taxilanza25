import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/services/servicesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  service_type: '',

  reservation_date: '',

  service_status: 'public.enum_services_service_status',

  taxistaid: '',

  cooperativadetaxiid: '',
};

const ServicesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/services/services-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='service_type'>
                <Field
                  type='datetime-local'
                  name='service_type'
                  placeholder='service_type'
                />
              </FormField>

              <FormField label='reservation_date'>
                <Field
                  type='datetime-local'
                  name='reservation_date'
                  placeholder='reservation_date'
                />
              </FormField>

              <FormField label='service_status' labelFor='service_status'>
                <Field
                  name='service_status'
                  id='service_status'
                  component='select'
                >
                  <option value='public.enum_services_service_status'>
                    public.enum_services_service_status
                  </option>

                  <option value='clientId uuid'>clientId uuid</option>
                </Field>
              </FormField>

              <FormField label='taxistaid' labelFor='taxistaid'>
                <Field
                  name='taxistaid'
                  id='taxistaid'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField
                label='cooperativadetaxiid'
                labelFor='cooperativadetaxiid'
              >
                <Field
                  name='cooperativadetaxiid'
                  id='cooperativadetaxiid'
                  component={SelectField}
                  options={[]}
                  itemRef={'cooperativadetaxis'}
                ></Field>
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
                  onClick={() => router.push('/services/services-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

ServicesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_SERVICES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ServicesNew;
