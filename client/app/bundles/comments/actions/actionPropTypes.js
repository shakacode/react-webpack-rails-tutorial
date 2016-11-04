import { PropTypes } from 'react';

export default PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })).isRequired;
