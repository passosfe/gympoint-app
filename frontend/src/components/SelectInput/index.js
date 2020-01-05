import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Input } from './styles';

import api from '~/services/api';

export default function SelectInput({ name, from, setSubscription, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [options, setOptions] = useState([]);

  const defaultOption = useCallback(() => {
    async function getDefaultField() {
      const response = await api.get(`${from}/${defaultValue}`);

      const data = {
        id: response.data.id,
        title: name === 'name' ? response.data.name : response.data.title,
        data: response.data,
      };
      setOptions([data]);
      setSelectedValue(data);

      if (setSubscription) setSubscription(data);
    }

    getDefaultField();
  }, [defaultValue, from, name, setSubscription]);

  useEffect(() => {
    defaultOption();
  }, [defaultOption]);

  const loadOptions = useCallback(
    (inputValue = '') => {
      async function load() {
        const response = await api.get(from, {
          params: {
            per_page: 10,
            name: inputValue,
          },
        });

        const data = response.data.map(option => ({
          id: option.id,
          title: from === 'students' ? option.name : option.title,
          data: option,
        }));

        setOptions(data);
        return data;
      }

      return load();
    },
    [from]
  );

  function getDefaultValue() {
    if (!defaultValue || !options) return null;

    return options.filter(option => option.id === defaultValue);
  }

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });

    loadOptions();
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Input
        name={fieldName}
        defaultOptions={defaultValue ? options : true}
        loadOptions={loadOptions}
        ref={ref}
        value={selectedValue}
        defaultValue={getDefaultValue()}
        onChange={value => {
          console.tron.log(value);
          setSelectedValue(value);
          setSubscription(value);
        }}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  setSubscription: PropTypes.func,
};

SelectInput.defaultProps = {
  setSubscription: () => {},
};
