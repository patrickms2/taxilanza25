import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/userscustom_permissionspermissions/userscustom_permissionspermissionsSlice';
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

const Userscustom_permissionspermissionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userscustom_permissionspermissions } = useAppSelector(
    (state) => state.userscustom_permissionspermissions,
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
        <title>{getPageTitle('View userscustom_permissionspermissions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View userscustom_permissionspermissions')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/userscustom_permissionspermissions/userscustom_permissionspermissions-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>users_custom_permissionsid</p>
            <p>
              {userscustom_permissionspermissions?.users_custom_permissionsid}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>permissionid</p>
            <p>{userscustom_permissionspermissions?.permissionid}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/userscustom_permissionspermissions/userscustom_permissionspermissions-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Userscustom_permissionspermissionsView.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_USERSCUSTOM_PERMISSIONSPERMISSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Userscustom_permissionspermissionsView;
