import { useState, useRef } from 'react'

import moment from 'moment'
import classNames from 'classnames'

import { Calendar } from 'antd'

import useClickAway from './useClickAway'

import 'antd/dist/antd.css'

import './App.scss'


moment.updateLocale('en', {
  weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
});

moment.locale('en', {
  week: {
    dow: 1,
  },
});

const CalendarHeader = ({ value, onChange, onChangeMonth, onClose }) => {
  return (
    <>
      <div className="datepicker__header">
        <div className="datepicker__header__title-container">
          <p className="datepicker__header__title">{moment(value).format('YYYY')}</p>
          <p className="datepicker__header__title">{moment(value).format('ddd, MMM')}</p>
        </div>
        <button
          className='datepicker__header__action'
          onClick={onClose}
        >
          &#10006;
        </button>
      </div>
      <div className='calendar__header'>
        <button
          className='calendar__header__action'
          onClick={() => onChangeMonth({ type: 'prev', value, onChange })}
        >
          Prev
        </button>
        <p className='calendar__header__title'>{moment(value).format('MMMM YYYY')}</p>
        <button
          className='calendar__header__action'
          onClick={() => onChangeMonth({ type: 'next', value, onChange })}
        >
          Next
        </button>
      </div>
    </>
  )
}


function App() {
  const calendarSelectRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDateInPicker, setSelectedDateInPicker] = useState('')
  const [showCalendarSelect, setShowCalendarSelect] = useState(false)

  const handleShowCalendarSelect = () => setShowCalendarSelect(true)
  const handleCloseCalendarSelect = () => setShowCalendarSelect(false)

  const handleSelectDateInPicker = (val) => {
    setSelectedDateInPicker(val)
  }

  const handleChangeMonth = ({ type = 'prev', value = moment(), onChange }) => {
    const changeType = {
      prev: -1,
      next: 1
    }

    const newDate = value.clone();
    newDate.month(parseInt(value.month() + changeType[type], 10));

    return onChange?.(newDate);
  }

  const handleSubmit = () => {
    setSelectedDate(selectedDateInPicker);
    handleCloseCalendarSelect()
  }

  useClickAway(calendarSelectRef, handleCloseCalendarSelect, ['click'])

  return (
    <div className="App">
      <div className='datepicker' ref={calendarSelectRef} >
        <button
          className='datepicker-btn'
          disabled={showCalendarSelect}
          onClick={handleShowCalendarSelect}
        >
          <input
            type='text'
            disabled
            placeholder={showCalendarSelect ? (selectedDateInPicker ? moment(selectedDateInPicker).format('MM/DD/YYYY') : 'Select date') : 'Select date'}
            className={classNames('datepicker-input', { active: showCalendarSelect })}
            value={!showCalendarSelect ? (selectedDate ? moment(selectedDate).format('MM/DD/YYYY') : '') : ''}
          />
        </button>
        {showCalendarSelect &&
          <div className="datepicker-select" >
            <div className='datepicker__calendar'>
              <Calendar
                mode='month'
                fullscreen={false}
                locale={{ firstWeekDay: 1 }}
                headerRender={(props) =>
                  <CalendarHeader
                    onClose={handleCloseCalendarSelect}
                    onChangeMonth={handleChangeMonth}
                    {...props}
                  />
                }
                value={selectedDateInPicker || moment()}
                onSelect={handleSelectDateInPicker}
              />
            </div>
            <div className="datepicker__footer">
              <button
                className='datepicker__footer__action'
                onClick={handleCloseCalendarSelect}
              >
                Cancel
              </button>
              <button
                className='datepicker__footer__action'
                onClick={handleSubmit}
              >
                OK
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
