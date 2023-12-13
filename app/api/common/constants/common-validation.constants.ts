import Joi, { Schema, ValidationOptions } from 'joi'
import { IIdParam } from '@/app/api/common/constants/app.constants'

// STRINGS
export const NON_EMPTY_STR           = Joi.string().trim().options({ convert:true })
export const OPTIONAL_NULLABLE_STR   = NON_EMPTY_STR.allow(null, '')
export const OPTIONAL_STR            = NON_EMPTY_STR.allow('')

// NUMBERS
export const POSITIVE_NONZERO_INT    = Joi.number().min(1).integer().positive()
export const POSITIVE_INT_LESS_THAN_ONE    = Joi.number().max(1).positive()
export const UI_DB_ID                = POSITIVE_NONZERO_INT.options({ convert:true })
export const ID_PARAM     = Joi.object({ id:UI_DB_ID }).label('id')

// OBJECTS
export const JSON_OBJECT             = Joi.object()
export const JSON_ARRAY              = Joi.array()

export function validateIdParam(param:IIdParam):IIdParam {
  return validate(param, ID_PARAM)
}

export function validate<T>(obj:T, schema:Schema, prefs: ValidationOptions = {}):T {
  const { error, value } = schema.prefs(prefs).validate(obj)

  if (error) throw error
  else
    return <T>value
}