import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_USER_PASSWORD_BEGIN,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
  SET_SEARCH_STATUS,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  const lookup = {
    [DISPLAY_ALERT]: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      };
    },
    [CLEAR_ALERT]: (state, action) => {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    },
    [SETUP_USER_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        showAlert: true,
        alertType: 'wait',
        alertText: 'Please Wait...',
      };
    },
    [SETUP_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      };
    },
    [SETUP_USER_ERROR]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    },
    [TOGGLE_SIDEBAR]: (state, action) => {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    },
    [LOGOUT_USER]: (state, action) => {
      return {
        ...initialState,
        userLoading: false,
      };
    },
    [UPDATE_USER_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [UPDATE_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!',
      };
    },
    [UPDATE_USER_ERROR]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    },
    [CHANGE_USER_PASSWORD_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [CHANGE_USER_PASSWORD_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Password Changed!',
      };
    },
    [CHANGE_USER_PASSWORD_ERROR]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    },
    [HANDLE_CHANGE]: (state, action) => {
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    },
    [CLEAR_VALUES]: (state, action) => {
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: '',
        jobType: 'full-time',
        status: 'pending',
      };
      return {
        ...state,
        ...initialState,
      };
    },
    [CREATE_JOB_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [CREATE_JOB_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job Created!',
      };
    },
    [CREATE_JOB_ERROR]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    },
    [GET_JOBS_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    },
    [GET_JOBS_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    },
    [SET_SEARCH_STATUS]: (state, action) => {
      return {
        ...state,
        searchStatus: action.payload.searchStatus,
      };
    },
    [SET_EDIT_JOB]: (state, action) => {
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    },
    [DELETE_JOB_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [EDIT_JOB_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [EDIT_JOB_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Updated!',
      };
    },
    [EDIT_JOB_ERROR]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    },
    [SHOW_STATS_BEGIN]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    },
    [SHOW_STATS_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    },
    [CLEAR_FILTERS]: (state, action) => {
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      };
    },
    [CHANGE_PAGE]: (state, action) => {
      return {
        ...state,
        page: action.payload.page,
      };
    },
    [GET_CURRENT_USER_BEGIN]: (state, action) => {
      return {
        ...state,
        userLoading: true,
        showAlert: false,
      };
    },
    [GET_CURRENT_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
      };
    },
  };

  if (lookup[action.type]) {
    return lookup[action.type](state, action);
  }

  throw new Error(`no such action :${action.type}`);
};

export default reducer;
