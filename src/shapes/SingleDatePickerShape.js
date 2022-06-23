import { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import OrientationShape from '../shapes/OrientationShape';

export default {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  date: momentPropTypes.momentObj,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,

  onDateChange: PropTypes.func,
  onFocusChange: PropTypes.func,

  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: OrientationShape,

  // portal options
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    closeDatePicker: PropTypes.node,
  }),
};
