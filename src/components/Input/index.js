import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, ErrorMessage, TInput } from './styles';

function Input({ style, hasError, messageError, ...rest }, ref) {
  return (
    <>
      <Container hasError={hasError} style={style}>
        <TInput {...rest} ref={ref} />
      </Container>
      {hasError && <ErrorMessage>{messageError}</ErrorMessage>}
    </>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hasError: PropTypes.bool,
  messageError: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  hasError: false,
  messageError: null,
};

export default forwardRef(Input);
