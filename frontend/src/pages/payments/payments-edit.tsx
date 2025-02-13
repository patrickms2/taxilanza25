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

import { update, fetch } from '../../stores/payments/paymentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditPaymentsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    serviceid: '',

    amount: '',

    payment_status: new Date(),

    payment_method: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { payments } = useAppSelector((state) => state.payments);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof payments === 'object') {
      setInitialValues(payments);
    }
  }, [payments]);

  useEffect(() => {
    if (typeof payments === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = payments[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [payments]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/payments/payments-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit payments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit payments'}
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
              <FormField label='serviceid' labelFor='serviceid'>
                <Field
                  name='serviceid'
                  id='serviceid'
                  component={SelectField}
                  options={initialValues.serviceid}
                  itemRef={'services'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='amount'>
                <Field type='number' name='amount' placeholder='amount' />
              </FormField>

              <FormField label='payment_status'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.payment_status
                      ? new Date(
                          dayjs(initialValues.payment_status).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, payment_status: date })
                  }
                />
              </FormField>

              <FormField label='payment_method' labelFor='payment_method'>
                <Field
                  name='payment_method'
                  id='payment_method'
                  component='select'
                >
                  <option value='public.enum_payments_payment_method'>
                    public.enum_payments_payment_method
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
                  onClick={() => router.push('/payments/payments-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPaymentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PAYMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPaymentsPage;
