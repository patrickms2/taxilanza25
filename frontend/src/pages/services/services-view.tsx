import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/services/servicesSlice';
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

const ServicesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.services);

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
        <title>{getPageTitle('View services')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View services')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/services/services-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='service_type'>
            {services.service_type ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  services.service_type
                    ? new Date(
                        dayjs(services.service_type).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No service_type</p>
            )}
          </FormField>

          <FormField label='reservation_date'>
            {services.reservation_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  services.reservation_date
                    ? new Date(
                        dayjs(services.reservation_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No reservation_date</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>service_status</p>
            <p>{services?.service_status ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>taxistaid</p>

            <p>{services?.taxistaid?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxiid</p>

            <p>{services?.cooperativadetaxiid?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Payments serviceid</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>amount</th>

                      <th>payment_status</th>

                      <th>payment_method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.payments_serviceid &&
                      Array.isArray(services.payments_serviceid) &&
                      services.payments_serviceid.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/payments/payments-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='amount'>{item.amount}</td>

                          <td data-label='payment_status'>
                            {dataFormatter.dateTimeFormatter(
                              item.payment_status,
                            )}
                          </td>

                          <td data-label='payment_method'>
                            {item.payment_method}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!services?.payments_serviceid?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/services/services-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ServicesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SERVICES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ServicesView;
