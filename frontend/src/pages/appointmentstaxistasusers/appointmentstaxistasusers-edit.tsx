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
} from '../../stores/appointmentstaxistasusers/appointmentstaxistasusersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAppointmentstaxistasusersPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    appointments_taxistasid: '',

    userid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { appointmentstaxistasusers } = useAppSelector(
    (state) => state.appointmentstaxistasusers,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof appointmentstaxistasusers === 'object') {
      setInitialValues(appointmentstaxistasusers);
    }
  }, [appointmentstaxistasusers]);

  useEffect(() => {
    if (typeof appointmentstaxistasusers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = appointmentstaxistasusers[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [appointmentstaxistasusers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push(
      '/appointmentstaxistasusers/appointmentstaxistasusers-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit appointmentstaxistasusers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit appointmentstaxistasusers'}
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
              <FormField label='appointments_taxistasid'>
                <Field
                  name='appointments_taxistasid'
                  placeholder='appointments_taxistasid'
                />
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
                    router.push(
                      '/appointmentstaxistasusers/appointmentstaxistasusers-list',
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

EditAppointmentstaxistasusersPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APPOINTMENTSTAXISTASUSERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAppointmentstaxistasusersPage;
