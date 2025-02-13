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

import { update, fetch } from '../../stores/appointments/appointmentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAppointments = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    date: new Date(),

    time: new Date(),

    departmentid: '',

    appointment_status: '',

    creation_date: new Date(),

    cooperativadetaxiid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { appointments } = useAppSelector((state) => state.appointments);

  const { appointmentsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: appointmentsId }));
  }, [appointmentsId]);

  useEffect(() => {
    if (typeof appointments === 'object') {
      setInitialValues(appointments);
    }
  }, [appointments]);

  useEffect(() => {
    if (typeof appointments === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = appointments[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [appointments]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: appointmentsId, data }));
    await router.push('/appointments/appointments-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit appointments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit appointments'}
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
              <FormField label='date'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date
                      ? new Date(
                          dayjs(initialValues.date).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date: date })
                  }
                />
              </FormField>

              <FormField label='time'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.time
                      ? new Date(
                          dayjs(initialValues.time).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, time: date })
                  }
                />
              </FormField>

              <FormField label='departmentid' labelFor='departmentid'>
                <Field
                  name='departmentid'
                  id='departmentid'
                  component={SelectField}
                  options={initialValues.departmentid}
                  itemRef={'departments'}
                  showField={'id'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.creation_date
                      ? new Date(
                          dayjs(initialValues.creation_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, creation_date: date })
                  }
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
                  options={initialValues.cooperativadetaxiid}
                  itemRef={'cooperativadetaxis'}
                  showField={'id'}
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

EditAppointments.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APPOINTMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAppointments;
