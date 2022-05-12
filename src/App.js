import { useState } from 'react'

import moment from 'moment'

import { Calendar } from 'antd'

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
  const [selectedDate, setSelectedDate] = useState(moment())

  const handleClickButton = (name) => console.info(`${name} button clicked`)

  const handleSelectDate = (val) => {
    setSelectedDate(val)
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
    console.info('Selected date: ', selectedDate)
  }


  return (
    <div className="App">
      <div className="datepicker-container">
        <div className='datepicker__calendar'>
          <Calendar
            mode='month'
            fullscreen={false}
            locale={{ firstWeekDay: 1 }}
            headerRender={(props) =>
              <CalendarHeader
                onClose={() => handleClickButton('Close')}
                onChangeMonth={handleChangeMonth}
                {...props}
              />
            }
            value={selectedDate}
            onSelect={handleSelectDate}
          />
        </div>
        <div className="datepicker__footer">
          <button
            className='datepicker__footer__action'
            onClick={() => handleClickButton('Cancel')}
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
    </div>
  );
}

export default App;
