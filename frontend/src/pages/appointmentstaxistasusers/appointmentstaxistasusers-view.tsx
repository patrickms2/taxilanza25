import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/appointmentstaxistasusers/appointmentstaxistasusersSlice';
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

const AppointmentstaxistasusersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appointmentstaxistasusers } = useAppSelector(
    (state) => state.appointmentstaxistasusers,
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
        <title>{getPageTitle('View appointmentstaxistasusers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View appointmentstaxistasusers')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/appointmentstaxistasusers/appointmentstaxistasusers-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>appointments_taxistasid</p>
            <p>{appointmentstaxistasusers?.appointments_taxistasid}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>userid</p>
            <p>{appointmentstaxistasusers?.userid}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/appointmentstaxistasusers/appointmentstaxistasusers-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AppointmentstaxistasusersView.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_APPOINTMENTSTAXISTASUSERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AppointmentstaxistasusersView;
