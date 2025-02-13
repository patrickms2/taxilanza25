import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/roles/rolesSlice';
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

const RolesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);

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
        <title>{getPageTitle('View roles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View roles')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/roles/roles-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>name</p>
            <p>{roles?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>role_customization</p>
            <p>{roles?.role_customization}</p>
          </div>

          <FormField label='globalaccess'>
            <SwitchField
              field={{ name: 'globalaccess', value: roles?.globalaccess }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Users app_roleid</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-mail</th>

                      <th>Role</th>

                      <th>Disabled</th>

                      <th>firstname</th>

                      <th>lastname</th>

                      <th>phonenumber</th>

                      <th>emailverified</th>

                      <th>emailverificationtoken</th>

                      <th>emailverificationtokenexpiresat</th>

                      <th>passwordresettoken</th>

                      <th>passwordresettokenexpiresat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.users_app_roleid &&
                      Array.isArray(roles.users_app_roleid) &&
                      roles.users_app_roleid.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='role'>{item.role}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>

                          <td data-label='firstname'>{item.firstname}</td>

                          <td data-label='lastname'>{item.lastname}</td>

                          <td data-label='phonenumber'>{item.phonenumber}</td>

                          <td data-label='emailverified'>
                            {dataFormatter.booleanFormatter(item.emailverified)}
                          </td>

                          <td data-label='emailverificationtoken'>
                            {item.emailverificationtoken}
                          </td>

                          <td data-label='emailverificationtokenexpiresat'>
                            {dataFormatter.dateTimeFormatter(
                              item.emailverificationtokenexpiresat,
                            )}
                          </td>

                          <td data-label='passwordresettoken'>
                            {item.passwordresettoken}
                          </td>

                          <td data-label='passwordresettokenexpiresat'>
                            {dataFormatter.dateTimeFormatter(
                              item.passwordresettokenexpiresat,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!roles?.users_app_roleid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/roles/roles-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

RolesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ROLES'}>{page}</LayoutAuthenticated>
  );
};

export default RolesView;
