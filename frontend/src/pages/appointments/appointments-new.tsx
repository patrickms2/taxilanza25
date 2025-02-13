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

import { create } from '../../stores/appointments/appointmentsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  date: '',

  time: '',

  departmentid: '',

  appointment_status: 'public.enum_appointments_appointment_status',

  creation_date: '',

  cooperativadetaxiid: '',
};

const AppointmentsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/appointments/appointments-list');
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
              <FormField label='date'>
                <Field type='datetime-local' name='date' placeholder='date' />
              </FormField>

              <FormField label='time'>
                <Field type='datetime-local' name='time' placeholder='time' />
              </FormField>

              <FormField label='departmentid' labelFor='departmentid'>
                <Field
                  name='departmentid'
                  id='departmentid'
                  component={SelectField}
                  options={[]}
                  itemRef={'departments'}
                ></Field>
              </FormField>

              <FormField
                label='appointment_status'
                labelFor='appointment_status'
              >
                <Field
                  name='appointment_status'
                  id='appointment_status'
                  component='select'
                >
                  <option value='public.enum_appointments_appointment_status'>
                    public.enum_appointments_appointment_status
                  </option>

                  <option value='creatorId uuid'>creatorId uuid</option>
                </Field>
              </FormField>

              <FormField label='creation_date'>
                <Field
                  type='datetime-local'
                  name='creation_date'
                  placeholder='creation_date'
                />
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
                  onClick={() => router.push('/appointments/appointments-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

AppointmentsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_APPOINTMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AppointmentsNew;
