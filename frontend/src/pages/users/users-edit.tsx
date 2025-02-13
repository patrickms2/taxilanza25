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

import { update, fetch } from '../../stores/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditUsersPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    firstName: '',

    lastName: '',

    phoneNumber: '',

    email: '',

    role: '',

    disabled: false,

    avatar: [],

    firstname: '',

    lastname: '',

    phonenumber: '',

    emailverified: false,

    emailverificationtoken: '',

    emailverificationtokenexpiresat: new Date(),

    passwordresettoken: '',

    passwordresettokenexpiresat: new Date(),

    app_roleid: '',

    cooperativadetaxiid: '',

    password: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { users } = useAppSelector((state) => state.users);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof users === 'object') {
      setInitialValues(users);
    }
  }, [users]);

  useEffect(() => {
    if (typeof users === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = users[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [users]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/users/users-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit users'}
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
              <FormField label='First Name'>
                <Field name='firstName' placeholder='First Name' />
              </FormField>

              <FormField label='Last Name'>
                <Field name='lastName' placeholder='Last Name' />
              </FormField>

              <FormField label='Phone Number'>
                <Field name='phoneNumber' placeholder='Phone Number' />
              </FormField>

              <FormField label='E-mail'>
                <Field name='email' placeholder='E-mail' />
              </FormField>

              <FormField label='Role'>
                <FormCheckRadioGroup>
                  <FormCheckRadio type='radio' label='admin'>
                    <Field type='radio' name='role' value='admin' />
                  </FormCheckRadio>

                  <FormCheckRadio type='radio' label='user'>
                    <Field type='radio' name='role' value='user' />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <FormField label='Disabled' labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField>
                <Field
                  label='Avatar'
                  color='info'
                  icon={mdiUpload}
                  path={'users/avatar'}
                  name='avatar'
                  id='avatar'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='firstname'>
                <Field name='firstname' placeholder='firstname' />
              </FormField>

              <FormField label='lastname'>
                <Field name='lastname' placeholder='lastname' />
              </FormField>

              <FormField label='phonenumber'>
                <Field name='phonenumber' placeholder='phonenumber' />
              </FormField>

              <FormField label='emailverified' labelFor='emailverified'>
                <Field
                  name='emailverified'
                  id='emailverified'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label='emailverificationtoken'>
                <Field
                  name='emailverificationtoken'
                  placeholder='emailverificationtoken'
                />
              </FormField>

              <FormField label='emailverificationtokenexpiresat'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.emailverificationtokenexpiresat
                      ? new Date(
                          dayjs(
                            initialValues.emailverificationtokenexpiresat,
                          ).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      emailverificationtokenexpiresat: date,
                    })
                  }
                />
              </FormField>

              <FormField label='passwordresettoken'>
                <Field
                  name='passwordresettoken'
                  placeholder='passwordresettoken'
                />
              </FormField>

              <FormField label='passwordresettokenexpiresat'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.passwordresettokenexpiresat
                      ? new Date(
                          dayjs(
                            initialValues.passwordresettokenexpiresat,
                          ).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      passwordresettokenexpiresat: date,
                    })
                  }
                />
              </FormField>

              <FormField label='app_roleid' labelFor='app_roleid'>
                <Field
                  name='app_roleid'
                  id='app_roleid'
                  component={SelectField}
                  options={initialValues.app_roleid}
                  itemRef={'roles'}
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

              <FormField label='Password'>
                <Field name='password' placeholder='password' />
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
                  onClick={() => router.push('/users/users-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditUsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_USERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditUsersPage;
