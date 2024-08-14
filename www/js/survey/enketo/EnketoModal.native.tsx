import React from 'react';
import { ModalProps } from 'react-native-paper';
import { SurveyOptions } from './enketoHelper';

type Props = Omit<ModalProps, 'children'> & {
  surveyName: string;
  onResponseSaved: (response: any) => void;
  opts?: SurveyOptions;
};

const EnketoModal = ({ surveyName, onResponseSaved, opts, ...rest }: Props) => {
  return null;
};

export default EnketoModal;
