import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/cooperativadetaxis/cooperativadetaxisSlice';
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

const CooperativadetaxisView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cooperativadetaxis } = useAppSelector(
    (state) => state.cooperativadetaxis,
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
        <title>{getPageTitle('View cooperativadetaxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View cooperativadetaxis')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/cooperativadetaxis/cooperativadetaxis-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>name</p>
            <p>{cooperativadetaxis?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users cooperativadetaxiid</p>
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
                    {cooperativadetaxis.users_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.users_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.users_cooperativadetaxiid.map(
                        (item: any) => (
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
                              {dataFormatter.booleanFormatter(
                                item.emailverified,
                              )}
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
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.users_cooperativadetaxiid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Appointments cooperativadetaxiid
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>date</th>

                      <th>time</th>

                      <th>appointment_status</th>

                      <th>creation_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.appointments_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.appointments_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.appointments_cooperativadetaxiid.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/appointments/appointments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='date'>
                              {dataFormatter.dateTimeFormatter(item.date)}
                            </td>

                            <td data-label='time'>
                              {dataFormatter.dateTimeFormatter(item.time)}
                            </td>

                            <td data-label='appointment_status'>
                              {item.appointment_status}
                            </td>

                            <td data-label='creation_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.creation_date,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.appointments_cooperativadetaxiid
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Departments cooperativadetaxiid
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>

                      <th>color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.departments_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.departments_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.departments_cooperativadetaxiid.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/departments/departments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='color'>{item.color}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.departments_cooperativadetaxiid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Documents cooperativadetaxiid
            </p>
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
                    {cooperativadetaxis.documents_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.documents_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.documents_cooperativadetaxiid.map(
                        (item: any) => (
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
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.documents_cooperativadetaxiid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Locations cooperativadetaxiid
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>latitude</th>

                      <th>longitude</th>

                      <th>last_update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.locations_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.locations_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.locations_cooperativadetaxiid.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/locations/locations-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='latitude'>{item.latitude}</td>

                            <td data-label='longitude'>{item.longitude}</td>

                            <td data-label='last_update'>
                              {dataFormatter.dateTimeFormatter(
                                item.last_update,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.locations_cooperativadetaxiid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Services cooperativadetaxiid
            </p>
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
                    {cooperativadetaxis.services_cooperativadetaxiid &&
                      Array.isArray(
                        cooperativadetaxis.services_cooperativadetaxiid,
                      ) &&
                      cooperativadetaxis.services_cooperativadetaxiid.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/services/services-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='service_type'>
                              {dataFormatter.dateTimeFormatter(
                                item.service_type,
                              )}
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
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.services_cooperativadetaxiid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/cooperativadetaxis/cooperativadetaxis-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CooperativadetaxisView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_COOPERATIVADETAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CooperativadetaxisView;
