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

import { update, fetch } from '../../stores/documents/documentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDocumentsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    document_type: '',

    year: '',

    month: '',

    creatorid: '',

    creation_date: new Date(),

    cooperativadetaxiid: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { documents } = useAppSelector((state) => state.documents);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof documents === 'object') {
      setInitialValues(documents);
    }
  }, [documents]);

  useEffect(() => {
    if (typeof documents === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = documents[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [documents]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/documents/documents-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit documents')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit documents'}
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
              <FormField label='name'>
                <Field name='name' placeholder='name' />
              </FormField>

              <FormField label='document_type' labelFor='document_type'>
                <Field
                  name='document_type'
                  id='document_type'
                  component='select'
                >
                  <option value='public.enum_documents_document_type'>
                    public.enum_documents_document_type
                  </option>

                  <option value='departmentId uuid'>departmentId uuid</option>
                </Field>
              </FormField>

              <FormField label='year'>
                <Field type='number' name='year' placeholder='year' />
              </FormField>

              <FormField label='month'>
                <Field type='number' name='month' placeholder='month' />
              </FormField>

              <FormField label='creatorid' labelFor='creatorid'>
                <Field
                  name='creatorid'
                  id='creatorid'
                  component={SelectField}
                  options={initialValues.creatorid}
                  itemRef={'users'}
                  showField={'id'}
                ></Field>
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
                  onClick={() => router.push('/documents/documents-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDocumentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDocumentsPage;
