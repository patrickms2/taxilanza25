import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
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

const UsersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

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
        <title>{getPageTitle('View users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View users')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/users/users-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>First Name</p>
            <p>{users?.firstName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Last Name</p>
            <p>{users?.lastName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone Number</p>
            <p>{users?.phoneNumber}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>E-mail</p>
            <p>{users?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Role</p>
            <p>{users?.role ?? 'No data'}</p>
          </div>

          <FormField label='Disabled'>
            <SwitchField
              field={{ name: 'disabled', value: users?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Avatar</p>
            {users?.avatar?.length ? (
              <ImageField
                name={'avatar'}
                image={users?.avatar}
                className='w-20 h-20'
              />
            ) : (
              <p>No Avatar</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>firstname</p>
            <p>{users?.firstname}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>lastname</p>
            <p>{users?.lastname}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>phonenumber</p>
            <p>{users?.phonenumber}</p>
          </div>

          <FormField label='emailverified'>
            <SwitchField
              field={{ name: 'emailverified', value: users?.emailverified }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>emailverificationtoken</p>
            <p>{users?.emailverificationtoken}</p>
          </div>

          <FormField label='emailverificationtokenexpiresat'>
            {users.emailverificationtokenexpiresat ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  users.emailverificationtokenexpiresat
                    ? new Date(
                        dayjs(users.emailverificationtokenexpiresat).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No emailverificationtokenexpiresat</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>passwordresettoken</p>
            <p>{users?.passwordresettoken}</p>
          </div>

          <FormField label='passwordresettokenexpiresat'>
            {users.passwordresettokenexpiresat ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  users.passwordresettokenexpiresat
                    ? new Date(
                        dayjs(users.passwordresettokenexpiresat).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No passwordresettokenexpiresat</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>app_roleid</p>

            <p>{users?.app_roleid?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxiid</p>

            <p>{users?.cooperativadetaxiid?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Documents creatorid</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>

                      <th>document_type</th>

                      <th>year</th>

                      <th>month</th>

                      <th>creation_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.documents_creatorid &&
                      Array.isArray(users.documents_creatorid) &&
                      users.documents_creatorid.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/documents/documents-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='document_type'>
                            {item.document_type}
                          </td>

                          <td data-label='year'>{item.year}</td>

                          <td data-label='month'>{item.month}</td>

                          <td data-label='creation_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.creation_date,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.documents_creatorid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Services taxistaid</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>service_type</th>

                      <th>reservation_date</th>

                      <th>service_status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.services_taxistaid &&
                      Array.isArray(users.services_taxistaid) &&
                      users.services_taxistaid.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/services/services-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='service_type'>
                            {dataFormatter.dateTimeFormatter(item.service_type)}
                          </td>

                          <td data-label='reservation_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.reservation_date,
                            )}
                          </td>

                          <td data-label='service_status'>
                            {item.service_status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.services_taxistaid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Taxis ownerid</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>license_plate</th>

                      <th>brand</th>

                      <th>model</th>

                      <th>year</th>

                      <th>color</th>

                      <th>taxi_status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.taxis_ownerid &&
                      Array.isArray(users.taxis_ownerid) &&
                      users.taxis_ownerid.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/taxis/taxis-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='license_plate'>
                            {item.license_plate}
                          </td>

                          <td data-label='brand'>{item.brand}</td>

                          <td data-label='model'>{item.model}</td>

                          <td data-label='year'>{item.year}</td>

                          <td data-label='color'>{item.color}</td>

                          <td data-label='taxi_status'>{item.taxi_status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.taxis_ownerid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/users/users-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USERS'}>{page}</LayoutAuthenticated>
  );
};

export default UsersView;
