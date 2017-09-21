import React from 'react';
import { action, storiesOf } from '@storybook/react';

import CalendarDay from '../src/components/CalendarDay';
import CalendarMonth from '../src/components/CalendarMonth';
import CalendarMonthGrid from '../src/components/CalendarMonthGrid';
import DayPickerNavigation from '../src/components/DayPickerNavigation';
import KeyboardShortcutRow from '../src/components/KeyboardShortcutRow';
import DayPickerKeyboardShortcuts from '../src/components/DayPickerKeyboardShortcuts';
import DateInput from '../src/components/DateInput';
import SingleDatePickerInput from '../src/components/SingleDatePickerInput';
import DateRangePickerInput from '../src/components/DateRangePickerInput';

import { VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../constants';

storiesOf('withStyles', module)
  .addWithInfo('CalendarDay', () => (
    <table>
      <tr>
        <CalendarDay />
        <CalendarDay isOutsideDay />
        <CalendarDay modifiers={new Set(['highlighted-calendar'])} />
        <CalendarDay modifiers={new Set(['blocked-minimum-nights'])} />
        <CalendarDay modifiers={new Set(['selected-span'])} />
        <CalendarDay modifiers={new Set(['selected'])} />
        <CalendarDay modifiers={new Set(['selected-start'])} />
        <CalendarDay modifiers={new Set(['selected-end'])} />
        <CalendarDay modifiers={new Set(['hovered-span'])} />
        <CalendarDay modifiers={new Set(['after-hovered-start'])} />
        <CalendarDay modifiers={new Set(['blocked-calendar'])} />
        <CalendarDay modifiers={new Set(['blocked-out-of-range'])} />
      </tr>
    </table>
  ))
  .addWithInfo('CalendarMonth', () => (
    <CalendarMonth
      isVisible
    />
  ))
  .addWithInfo('CalendarMonthGrid', () => (
    <CalendarMonthGrid />
  ))
  .addWithInfo('DayPickerNavigation', () => (
    <div>
      <div
        style={{
          border: '1px solid black',
          position: 'relative',
          height: 200,
          width: 300,
          display: 'inline-block',
        }}
      >
        <DayPickerNavigation
          onPrevMonthClick={action('onPrevMonthClick')}
          onNextMonthClick={action('onNextMonthClick')}
        />
      </div>

      <div
        style={{
          border: '1px solid black',
          position: 'relative',
          height: 200,
          width: 300,
          display: 'inline-block',
        }}
      >
        <DayPickerNavigation orientation={VERTICAL_ORIENTATION} />
      </div>

      <div
        style={{
          border: '1px solid black',
          position: 'relative',
          height: 200,
          width: 300,
          display: 'inline-block',
        }}
      >
        <DayPickerNavigation orientation={VERTICAL_SCROLLABLE} />
      </div>
    </div>
  ))
  .addWithInfo('KeyboardShortcutRow', () => (
    <KeyboardShortcutRow
      unicode="↵"
      label="Enter key"
      action="Select the currently focused date"
    />
  ))
  .addWithInfo('DayPickerKeyboardShortcuts', () => (
    <div>
      <div
        style={{
          border: '1px solid black',
          position: 'relative',
          height: 300,
          width: 600,
          display: 'inline-block',
        }}
      >
        <DayPickerKeyboardShortcuts showKeyboardShortcutsPanel />
      </div>
    </div>
  ))
  .addWithInfo('DateInput', () => (
    <div>
      <div>
        <DateInput />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateInput disabled />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateInput focused />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateInput focused showCaret />
      </div>
    </div>
  ))
  .addWithInfo('SingleDatePickerInput', () => (
    <div>
      <div>
        <SingleDatePickerInput />
      </div>

      <div style={{ marginTop: 8 }}>
        <SingleDatePickerInput focused />
      </div>

      <div style={{ marginTop: 8 }}>
        <SingleDatePickerInput showClearDate displayValue="Test" />
      </div>

      <div style={{ marginTop: 8 }}>
        <SingleDatePickerInput showDefaultInputIcon />
      </div>
    </div>
  ))

  .addWithInfo('DateRangePickerInput', () => (
    <div>
      <div>
        <DateRangePickerInput />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateRangePickerInput isStartDateFocused />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateRangePickerInput isEndDateFocused />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateRangePickerInput disabled />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateRangePickerInput showClearDates startDate="Test" />
      </div>

      <div style={{ marginTop: 8 }}>
        <DateRangePickerInput showDefaultInputIcon />
      </div>
    </div>
  ));
