import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  users: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListUsers = ({
  users,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_USERS');

  const corners = useAppSelector((state) => state.style.corners);
  const bgColor = useAppSelector((state) => state.style.cardsColor);

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          users.map((item) => (
            <CardBox
              hasTable
              isList
              key={item.id}
              className={'rounded shadow-none'}
            >
              <div
                className={`flex rounded  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
              >
                <ImageField
                  name={'Avatar'}
                  image={item.avatar}
                  className='w-24 h-24 rounded-l overflow-hidden hidden md:block'
                  imageClassName={
                    'rounded-l rounded-r-none h-full object-cover'
                  }
                />

                <Link
                  href={`/users/users-view/?id=${item.id}`}
                  className={
                    'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                  }
                >
                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>First Name</p>
                    <p className={'line-clamp-2'}>{item.firstName}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Last Name</p>
                    <p className={'line-clamp-2'}>{item.lastName}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Phone Number</p>
                    <p className={'line-clamp-2'}>{item.phoneNumber}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>E-mail</p>
                    <p className={'line-clamp-2'}>{item.email}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Role</p>
                    <p className={'line-clamp-2'}>{item.role}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Disabled</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.booleanFormatter(item.disabled)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Avatar</p>
                    <ImageField
                      name={'Avatar'}
                      image={item.avatar}
                      className='mx-auto w-8 h-8'
                    />
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>firstname</p>
                    <p className={'line-clamp-2'}>{item.firstname}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>lastname</p>
                    <p className={'line-clamp-2'}>{item.lastname}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>phonenumber</p>
                    <p className={'line-clamp-2'}>{item.phonenumber}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>emailverified</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.booleanFormatter(item.emailverified)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>
                      emailverificationtoken
                    </p>
                    <p className={'line-clamp-2'}>
                      {item.emailverificationtoken}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>
                      emailverificationtokenexpiresat
                    </p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.dateTimeFormatter(
                        item.emailverificationtokenexpiresat,
                      )}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>
                      passwordresettoken
                    </p>
                    <p className={'line-clamp-2'}>{item.passwordresettoken}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>
                      passwordresettokenexpiresat
                    </p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.dateTimeFormatter(
                        item.passwordresettokenexpiresat,
                      )}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>app_roleid</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.rolesOneListFormatter(item.app_roleid)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>
                      cooperativadetaxiid
                    </p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.cooperativadetaxisOneListFormatter(
                        item.cooperativadetaxiid,
                      )}
                    </p>
                  </div>
                </Link>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/users/users-edit/?id=${item.id}`}
                  pathView={`/users/users-view/?id=${item.id}`}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </div>
            </CardBox>
          ))}
        {!loading && users.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListUsers;
