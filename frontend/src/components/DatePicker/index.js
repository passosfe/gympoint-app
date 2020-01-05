import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('br', pt);

export default function DatePicker({
  name,
  disabled,
  placeholder,
  onChange,
  initialData,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    if (defaultValue) {
      setStartDate(new Date(defaultValue));
      onChange(new Date(defaultValue));
    }
  }, [defaultValue, onChange]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={startDate || initialData}
        minDate={new Date()}
        locale="br"
        dateFormat="dd/MM/yyyy"
        readOnly={disabled}
        disabled={disabled}
        onChange={date => {
          setStartDate(date);
          onChange(date);
        }}
        ref={ref}
        autoComplete="off"
        placeholderText={placeholder}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  initialData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

DatePicker.defaultProps = {
  disabled: false,
  placeholder: '',
  onChange: () => {},
  initialData: null,
};
