import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import appointmentsSlice from './appointments/appointmentsSlice';
import appointmentstaxistasusersSlice from './appointmentstaxistasusers/appointmentstaxistasusersSlice';
import appointmentsusersusersSlice from './appointmentsusersusers/appointmentsusersusersSlice';
import cooperativadetaxisSlice from './cooperativadetaxis/cooperativadetaxisSlice';
import departmentsSlice from './departments/departmentsSlice';
import documentsSlice from './documents/documentsSlice';
import locationsSlice from './locations/locationsSlice';
import paymentsSlice from './payments/paymentsSlice';
import permissionsSlice from './permissions/permissionsSlice';
import rolesSlice from './roles/rolesSlice';
import rolespermissionspermissionsSlice from './rolespermissionspermissions/rolespermissionspermissionsSlice';
import servicesSlice from './services/servicesSlice';
import taxisSlice from './taxis/taxisSlice';
import taxisdriversusersSlice from './taxisdriversusers/taxisdriversusersSlice';
import userscustom_permissionspermissionsSlice from './userscustom_permissionspermissions/userscustom_permissionspermissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    appointments: appointmentsSlice,
    appointmentstaxistasusers: appointmentstaxistasusersSlice,
    appointmentsusersusers: appointmentsusersusersSlice,
    cooperativadetaxis: cooperativadetaxisSlice,
    departments: departmentsSlice,
    documents: documentsSlice,
    locations: locationsSlice,
    payments: paymentsSlice,
    permissions: permissionsSlice,
    roles: rolesSlice,
    rolespermissionspermissions: rolespermissionspermissionsSlice,
    services: servicesSlice,
    taxis: taxisSlice,
    taxisdriversusers: taxisdriversusersSlice,
    userscustom_permissionspermissions: userscustom_permissionspermissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
