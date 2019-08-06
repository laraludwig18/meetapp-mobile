import React, { useEffect, useState, useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(
    defaultValue ? new Date(defaultValue) : null
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container>
        <ReactDatePicker
          name={fieldName}
          id="date-picker"
          selected={selected}
          showTimeSelect
          locale={pt}
          placeholderText="Data do meetup"
          timeIntervals={60}
          timeFormat="HH:mm"
          minDate={new Date()}
          dateFormat="dd/MM/yyyy HH:mm"
          onChange={date => setSelected(date)}
          ref={ref}
        />
      </Container>

      {error && <span>Data inválida</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};
