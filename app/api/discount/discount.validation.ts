import Joi, { ValidationOptions } from 'joi'
import {
  NON_EMPTY_STR, POSITIVE_INT_LESS_THAN_ONE,
  POSITIVE_NONZERO_INT,
  validate
} from '@/app/api/common/constants/common-validation.constants'
import { DiscountCode } from '@/app/api/shared/types'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

export const CREATE_DISCOUNT_CODE_PAYLOAD = Joi.object().keys({
  discountCode     : NON_EMPTY_STR,
  nthTransaction   : POSITIVE_NONZERO_INT,
  discountedAmount : POSITIVE_INT_LESS_THAN_ONE
}).label('createDiscountCodePayload')

export const FETCH_DISCOUNT_CODE_PAYLOAD = Joi.object().keys({
  discountCode   : NON_EMPTY_STR,
}).label('fetchDiscountCodePayload')

export function validateCreateDiscountCodePayload(params: DiscountCode) {
  return validate(params, CREATE_DISCOUNT_CODE_PAYLOAD, VALIDATION_OPTS)
}

export function validateFetchDiscountCodePayload(params: { discountCode: string | null }) {
  return validate(params, FETCH_DISCOUNT_CODE_PAYLOAD, VALIDATION_OPTS)
}