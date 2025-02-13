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

import { update, fetch } from '../../stores/services/servicesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditServices = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    service_type: new Date(),

    reservation_date: new Date(),

    service_status: '',

    taxistaid: '',

    cooperativadetaxiid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { services } = useAppSelector((state) => state.services);

  const { servicesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: servicesId }));
  }, [servicesId]);

  useEffect(() => {
    if (typeof services === 'object') {
      setInitialValues(services);
    }
  }, [services]);

  useEffect(() => {
    if (typeof services === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = services[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [services]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: servicesId, data }));
    await router.push('/services/services-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit services')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit services'}
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
              <FormField label='service_type'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.service_type
                      ? new Date(
                          dayjs(initialValues.service_type).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, service_type: date })
                  }
                />
              </FormField>

              <FormField label='reservation_date'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.reservation_date
                      ? new Date(
                          dayjs(initialValues.reservation_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      reservation_date: date,
                    })
                  }
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
                  options={initialValues.taxistaid}
                  itemRef={'users'}
                  showField={'id'}
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

EditServices.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SERVICES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditServices;
