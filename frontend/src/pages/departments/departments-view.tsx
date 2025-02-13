import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/departments/departmentsSlice';
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

const DepartmentsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.departments);

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
        <title>{getPageTitle('View departments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View departments')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/departments/departments-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>name</p>
            <p>{departments?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>color</p>
            <p>{departments?.color}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxiid</p>

            <p>{departments?.cooperativadetaxiid?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Appointments departmentid</p>
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
                    {departments.appointments_departmentid &&
                      Array.isArray(departments.appointments_departmentid) &&
                      departments.appointments_departmentid.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!departments?.appointments_departmentid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/departments/departments-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DepartmentsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DEPARTMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DepartmentsView;
