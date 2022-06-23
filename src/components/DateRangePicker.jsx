import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import includes from 'array-includes';

import isTouchDevice from '../utils/isTouchDevice';
import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isInclusivelyBeforeDay from '../utils/isInclusivelyBeforeDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';

import OutsideClickHandler from './OutsideClickHandler';
import DateRangePickerInput from './DateRangePickerInput';
import DayPicker from './DayPicker';

import CloseButton from '../svg/close.svg';

import DateRangePickerShape from '../shapes/DateRangePickerShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from '../constants';

const propTypes = DateRangePickerShape;

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  focusedInput: null,
  minimumNights: 1,
  isDayBlocked: () => false,
  disabledDays: [],
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  enableOutsideDays: false,
  numberOfMonths: 2,
  showClearDates: false,
  disabled: false,

  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  withFullScreenPortal: false,

  onDatesChange() {},
  onFocusChange() {},
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: 'Close',
    clearDates: 'Clear Dates',
  },
};

export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDate: null,
    };

    this.isTouchDevice = isTouchDevice();

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onClearFocus = this.onClearFocus.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocus = this.onStartDateFocus.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocus = this.onEndDateFocus.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

  onClearFocus() {
    this.props.onFocusChange(null);
  }

  onDayClick(day, modifiers, e) {
    if (e) e.preventDefault();
    if (includes(modifiers, 'blocked')) return;

    const { focusedInput } = this.props;
    let { startDate, endDate } = this.props;

    if (focusedInput === START_DATE) {
      this.props.onFocusChange(END_DATE);

      startDate = day;
      if (isInclusivelyAfterDay(day, endDate)) {
        endDate = null;
      }
    } else if (focusedInput === END_DATE) {
      if (isInclusivelyBeforeDay(day, startDate)) {
        startDate = day;
        endDate = null;
      } else {
        endDate = day;
        if (!startDate) {
          this.props.onFocusChange(START_DATE);
        } else {
          this.props.onFocusChange(null);
        }
      }
    }

    this.props.onDatesChange({ startDate, endDate });
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;

    this.setState({
      hoverDate: day,
    });
  }

  onDayMouseLeave() {
    if (this.isTouchDevice) return;

    this.setState({
      hoverDate: null,
    });
  }

  onEndDateChange(endDateString) {
    const endDate = toMomentObject(endDateString);

    const { startDate, isOutsideRange, onDatesChange, onFocusChange } = this.props;
    const isEndDateValid = endDate && !isOutsideRange(endDate) &&
      !isInclusivelyBeforeDay(endDate, startDate);
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      onFocusChange(null);
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const { startDate, onFocusChange, orientation, disabled } = this.props;

    if (!startDate && orientation === VERTICAL_ORIENTATION && !disabled) {
      // Since the vertical datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(START_DATE);
    } else if (!disabled) {
      onFocusChange(END_DATE);
    }
  }

  onOutsideClick() {
    const { focusedInput, onFocusChange } = this.props;
    if (!focusedInput) return;

    onFocusChange(null);
  }

  onStartDateChange(startDateString) {
    const startDate = toMomentObject(startDateString);

    let { endDate } = this.props;
    const { isOutsideRange, onDatesChange, onFocusChange } = this.props;
    const isStartDateValid = startDate && !isOutsideRange(startDate);
    if (isStartDateValid) {
      if (isInclusivelyBeforeDay(endDate, startDate)) {
        endDate = null;
      }

      onDatesChange({ startDate, endDate });
      onFocusChange(END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        endDate,
      });
    }
  }

  onStartDateFocus() {
    if (!this.props.disabled) {
      this.props.onFocusChange(START_DATE);
    }
  }

  getDayPickerContainerClasses() {
    const { focusedInput, orientation, withPortal, withFullScreenPortal } = this.props;
    const { hoverDate } = this.state;
    const showDatepicker = focusedInput === START_DATE || focusedInput === END_DATE;

    const dayPickerClassName = cx('DateRangePicker__picker', {
      'DateRangePicker__picker--show': showDatepicker,
      'DateRangePicker__picker--invisible': !showDatepicker,
      'DateRangePicker__picker--start': focusedInput === START_DATE,
      'DateRangePicker__picker--end': focusedInput === END_DATE,
      'DateRangePicker__picker--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'DateRangePicker__picker--vertical': orientation === VERTICAL_ORIENTATION,
      'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
      'DateRangePicker__picker--full-screen-portal': withFullScreenPortal,
      'DateRangePicker__picker--valid-date-hovered': hoverDate && !this.isBlocked(hoverDate),
    });

    return dayPickerClassName;
  }

  getDayPickerDOMNode() {
    return ReactDOM.findDOMNode(this.dayPicker);
  }

  clearDates() {
    this.props.onDatesChange({ startDate: null, endDate: null });
    this.props.onFocusChange(START_DATE);
  }

  doesNotMeetMinimumNights(day) {
    const { startDate, isOutsideRange, focusedInput, minimumNights } = this.props;
    if (focusedInput !== END_DATE) return false;

    if (startDate) {
      const dayDiff = day.diff(startDate, 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
  }

  isDayAfterHoveredStartDate(day) {
    const { startDate, endDate } = this.props;
    const { hoverDate } = this.state;
    return !!startDate && !endDate && isNextDay(hoverDate, day) &&
      isSameDay(hoverDate, startDate);
  }

  isEndDate(day) {
    return isSameDay(day, this.props.endDate);
  }

  isHovered(day) {
    return isSameDay(day, this.state.hoverDate);
  }

  isInHoveredSpan(day) {
    const { startDate, endDate } = this.props;
    const { hoverDate } = this.state;

    const isForwardRange = !!startDate && !endDate &&
      (day.isBetween(startDate, hoverDate) ||
       isSameDay(hoverDate, day));
    const isBackwardRange = !!endDate && !startDate &&
      (day.isBetween(hoverDate, endDate) ||
       isSameDay(hoverDate, day));

    return isForwardRange || isBackwardRange;
  }

  isInSelectedSpan(day) {
    const { startDate, endDate } = this.props;
    return day.isBetween(startDate, endDate);
  }

  isLastInRange(day) {
    return this.isInSelectedSpan(day) && isNextDay(day, this.props.endDate);
  }

  isStartDate(day) {
    return isSameDay(day, this.props.startDate);
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
  }

  maybeRenderDayPickerWithPortal() {
    const { focusedInput, withPortal, withFullScreenPortal } = this.props;

    if (withPortal || withFullScreenPortal) {
      return (
        <Portal isOpened={focusedInput !== null}>
          {this.renderDayPicker()}
        </Portal>
      );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      isDayBlocked,
      isOutsideRange,
      numberOfMonths,
      orientation,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      withPortal,
      withFullScreenPortal,
      enableOutsideDays,
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      'blocked-minimum-nights': day => this.doesNotMeetMinimumNights(day),
      valid: day => !this.isBlocked(day),
      // before anything has been set or after both are set
      hovered: day => this.isHovered(day),

      // while start date has been set, but end date has not been
      'hovered-span': day => this.isInHoveredSpan(day),
      'after-hovered-start': day => this.isDayAfterHoveredStartDate(day),
      'last-in-range': day => this.isLastInRange(day),

      // once a start date and end date have been set
      'selected-start': day => this.isStartDate(day),
      'selected-end': day => this.isEndDate(day),
      'selected-span': day => this.isInSelectedSpan(day),
    };

    const onOutsideClick = withPortal ? this.onOutsideClick : () => {};

    return (
      <div className={this.getDayPickerContainerClasses()}>
        <DayPicker
          ref={ref => { this.dayPicker = ref; }}
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          modifiers={modifiers}
          numberOfMonths={numberOfMonths}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayMouseLeave={this.onDayMouseLeave}
          onDayMouseDown={this.onDayClick}
          onDayTouchTap={this.onDayClick}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          onOutsideClick={onOutsideClick}
        />

        {withFullScreenPortal &&
          <button
            className="DateRangePicker__close"
            type="button"
            onClick={this.onOutsideClick}
          >
            <span className="screen-reader-only">
              {this.props.phrases.closeDatePicker}
            </span>
            <CloseButton />
          </button>
        }
      </div>
    );
  }

  render() {
    const {
      startDate,
      endDate,
      focusedInput,
      showClearDates,
      disabled,
      startDateId,
      endDateId,
      phrases,
      withPortal,
      withFullScreenPortal,
    } = this.props;

    const startDateString = toLocalizedDateString(startDate);
    const endDateString = toLocalizedDateString(endDate);

    const onOutsideClick = !withPortal && !withFullScreenPortal ? this.onOutsideClick : () => {};

    return (
      <div className="DateRangePicker">
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DateRangePickerInput
            startDateId={startDateId}
            startDatePlaceholderText={this.props.startDatePlaceholderText}
            isStartDateFocused={focusedInput === START_DATE}
            endDateId={endDateId}
            endDatePlaceholderText={this.props.endDatePlaceholderText}
            isEndDateFocused={focusedInput === END_DATE}
            onStartDateChange={this.onStartDateChange}
            onStartDateFocus={this.onStartDateFocus}
            onStartDateShiftTab={this.onClearFocus}
            onEndDateChange={this.onEndDateChange}
            onEndDateFocus={this.onEndDateFocus}
            onEndDateTab={this.onClearFocus}
            startDate={startDateString}
            endDate={endDateString}
            showClearDates={showClearDates}
            onClearDates={this.clearDates}
            disabled={disabled}
            phrases={phrases}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;
