import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Container, Text } from './styles';

export default function Button({ children, fontStyle, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={fontStyle}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  fontStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Button.defaultProps = {
  loading: false,
  fontStyle: {},
};
