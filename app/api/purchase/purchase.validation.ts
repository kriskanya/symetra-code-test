import Joi, { ValidationOptions } from 'joi'
import {
  NON_EMPTY_STR,
  POSITIVE_NONZERO_INT,
  UI_DB_ID,
  validate
} from '@/app/api/common/constants/common-validation.constants'
import { Purchase } from '@/app/api/helpers/helpers'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

export const CREATE_PURCHASE_PAYLOAD = Joi.object().keys({
  discountCode   : NON_EMPTY_STR,
  itemName       : NON_EMPTY_STR,
  originalPrice  : POSITIVE_NONZERO_INT,
  customerId     : UI_DB_ID
}).label('createPurchasePayload')

export function validateCreatePurchasePayload(params: Purchase) {
  return validate(params, CREATE_PURCHASE_PAYLOAD, VALIDATION_OPTS)
}