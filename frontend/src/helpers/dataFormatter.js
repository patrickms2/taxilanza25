import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  cooperativadetaxisManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  cooperativadetaxisOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  cooperativadetaxisManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  cooperativadetaxisOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  departmentsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  departmentsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  departmentsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  departmentsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  servicesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  servicesOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  servicesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  servicesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  taxisManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  taxisOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  taxisManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  taxisOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },
};
