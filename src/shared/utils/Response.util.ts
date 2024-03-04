import { Request } from 'express';
import { HttpException } from '@nestjs/common';
import { IRequestResponse } from '../interfaces/IRequestResponse.interface';
import { IErrorResponse } from '../interfaces/IErrorResponse.interface';

export const buildResponseSuccess = ({
  data,
  msg,
  code = 200,
  totalRecords
}: IRequestResponse): IRequestResponse => {

  const response = {
    data: data || {},
    msg: msg || 'The request was successful.',
    code,
  };

  if (totalRecords) response['totalRecords'] = totalRecords; 

  return response;
};

const defaultError = (
  exception: HttpException,
  request: Request,
): IErrorResponse => {
  return {
    timestamp: new Date().toISOString(),
    path: request.url,
    exceptionMessage: exception.message,
    typeException: exception.name,
    statusCode: 500,
    customMessage: 'Something is wrong.',
    tag: 'ErrorServer',
  };
};

export const BuildReponseError = (
  exception: HttpException,
  request: Request,
): IErrorResponse => {
  if (!exception.getStatus) {
    return defaultError(exception, request);
  }
  return {
    ...defaultError(exception, request),
    statusCode: exception.getStatus(),
    customMessage: exception.getResponse()['customMessage'],
    tag: exception.getResponse()['tag'],
  };
};
