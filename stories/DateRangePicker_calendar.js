import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP } from '../src/constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

function CustomMonthNav({ children, style }) {
  return (
    <span
      style={{
        border: '1px solid #dce0e0',
        borderRadius: 2,
        backgroundColor: '#fff',
        color: '#484848',
        fontSize: 24,
        padding: '0 3px',
        position: 'absolute',
        marginTop: -2,
        top: 30,
        left: 26,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

storiesOf('DRP - Calendar Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper autoFocus />
  ))
  .addWithInfo('open up', () => (
    <div style={{ marginTop: '450px' }}>
      <DateRangePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('single month', () => (
    <DateRangePickerWrapper numberOfMonths={1} autoFocus />
  ))
  .addWithInfo('3 months', () => (
    <DateRangePickerWrapper numberOfMonths={3} autoFocus />
  ))
  .addWithInfo('with custom day size', () => (
    <DateRangePickerWrapper daySize={50} autoFocus />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  ))
  .addWithInfo('vertical anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
      autoFocus
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal autoFocus />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  ))
  .addWithInfo('disable scroll', () => (
    <div style={{ height: '100vh' }}>
      <div>This content scrolls.</div>
      <DateRangePickerWrapper preventScroll autoFocus />
    </div>
  ))
  .addWithInfo('appended to body', () => <DateRangePickerWrapper appendToBody autoFocus />)
  .addWithInfo('appended to body (in scrollable container)', () => (
    <div style={{ height: 200, overflow: 'auto', background: 'whitesmoke' }}>
      <div>This content scrolls.</div>
      <div style={{ marginBottom: 300 }}>
        <DateRangePickerWrapper appendToBody autoFocus />
      </div>
    </div>
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  ))
  .addWithInfo('with custom month navigation', () => (
    <DateRangePickerWrapper
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 48 }}>&#8250;</CustomMonthNav>}
      numberOfMonths={1}
      autoFocus
    />
  ))
  .addWithInfo('vertical with custom month navigation', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 48 }}>&#8250;</CustomMonthNav>}
      autoFocus
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  ))
  .addWithInfo('with info panel default', () => (
    <DateRangePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with info panel before', () => (
    <DateRangePickerWrapper
      calendarInfoPosition="before"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with info panel after', () => (
    <DateRangePickerWrapper
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with info panel bottom', () => (
    <DateRangePickerWrapper
      calendarInfoPosition="bottom"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with info panel top', () => (
    <DateRangePickerWrapper
      calendarInfoPosition="top"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with keyboard shortcuts panel hidden', () => (
    <DateRangePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  ))
  .addWithInfo('with RTL support (and anchor right)', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        isRTL
        autoFocus
      />
    </div>
  ))
  .addWithInfo('vertical with RTL support', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      isRTL
      autoFocus
    />
  ))
  .addWithInfo('with custom first day of week', () => (
    <DateRangePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  ))
  .addWithInfo('with onClose handler', () => (
    <DateRangePickerWrapper
      onClose={({ startDate, endDate }) => alert(`onClose: startDate = ${startDate}, endDate = ${endDate}`)}
      autoFocus
    />
  ))
  .addWithInfo('with no animation', () => (
    <DateRangePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  ))
  .addWithInfo('with custom vertical spacing', () => (
    <DateRangePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  ));

