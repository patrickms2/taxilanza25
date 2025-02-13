import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/appointmentsusersusers/appointmentsusersusersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const AppointmentsusersusersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appointmentsusersusers } = useAppSelector(
    (state) => state.appointmentsusersusers,
  );

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View appointmentsusersusers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View appointmentsusersusers')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/appointmentsusersusers/appointmentsusersusers-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>appointments_usersid</p>
            <p>{appointmentsusersusers?.appointments_usersid}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>userid</p>
            <p>{appointmentsusersusers?.userid}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/appointmentsusersusers/appointmentsusersusers-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AppointmentsusersusersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_APPOINTMENTSUSERSUSERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AppointmentsusersusersView;
