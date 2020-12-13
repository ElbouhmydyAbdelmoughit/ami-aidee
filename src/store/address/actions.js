import { createAction } from '../../utils';

// Types
export const types = {
  ADDRESSES_REQUEST: 'ADDRESSES_REQUEST',
  ADDRESSES_FAILURE: 'ADDRESSES_FAILURE',
  ADDRESSES_SUCCESS: 'ADDRESSES_SUCCESS',

  ADDRESSES_CREATE_REQUEST: 'ADDRESSES_CREATE_REQUEST',
  ADDRESSES_CREATE_SUCCESS: 'ADDRESSES_CREATE_SUCCESS',

  ADDRESSES_DELETE_REQUEST: 'ADDRESSES_DELETE_REQUEST',
  ADDRESSES_DELETE_SUCCESS: 'ADDRESSES_DELETE_SUCCESS',

  ADDRESSES_MODIFY_REQUEST: 'ADDRESSES_MODIFY_REQUEST',
  ADDRESSES_MODIFY_SUCCESS: 'ADDRESSES_MODIFY_SUCCESS',

  ADDRESSES_PDF_REQUEST: 'ADDRESSES_PDF_REQUEST',
  ADDRESSES_PDF_SUCCESS: 'ADDRESSES_PDF_SUCCESS',
};

// Actions
export default {
  /** REQUEST */
  addressesRequest: (filters = {}) =>
    createAction(types.ADDRESSES_REQUEST, { filters }),
  addressesSuccess: (addresses) =>
    createAction(types.ADDRESSES_SUCCESS, { addresses }),
  addressesFailure: () =>
    createAction(types.ADDRESSES_FAILURE),

  addressesCreateRequest: (filters = {}) =>
    createAction(types.ADDRESSES_CREATE_REQUEST, { filters }),
  addressesCreateSuccess: () =>
    createAction(types.ADDRESSES_CREATE_SUCCESS),

  addressesDeleteRequest: (id) =>
    createAction(types.ADDRESSES_DELETE_REQUEST, { id }),
  addressesDeleteSuccess: (id) =>
    createAction(types.ADDRESSES_DELETE_SUCCESS, { id }),

  addressesModifyRequest: (address = {}) =>
    createAction(types.ADDRESSES_MODIFY_REQUEST, { address }),
  addressesModifySuccess: (addresses) =>
    createAction(types.ADDRESSES_MODIFY_SUCCESS, { addresses }),

  addressesPDFRequest: (id) =>
    createAction(types.ADDRESSES_PDF_REQUEST, { id }),
  addressesPDFSuccess: (id) =>
    createAction(types.ADDRESSES_PDF_SUCCESS, { id }),
};
