import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/rolespermissionspermissions/rolespermissionspermissionsSlice';
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

const RolespermissionspermissionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rolespermissionspermissions } = useAppSelector(
    (state) => state.rolespermissionspermissions,
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
        <title>{getPageTitle('View rolespermissionspermissions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View rolespermissionspermissions')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/rolespermissionspermissions/rolespermissionspermissions-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>roles_permissionsid</p>
            <p>{rolespermissionspermissions?.roles_permissionsid}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>permissionid</p>
            <p>{rolespermissionspermissions?.permissionid}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/rolespermissionspermissions/rolespermissionspermissions-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

RolespermissionspermissionsView.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_ROLESPERMISSIONSPERMISSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default RolespermissionspermissionsView;
