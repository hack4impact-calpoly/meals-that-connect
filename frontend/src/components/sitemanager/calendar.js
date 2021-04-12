import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import '../../css/Calendar.css';

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
      .toDate(),
  };
}

export default class Example extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          hoverRange: undefined,
          selectedDays: []
      }; 
    }

  componentDidMount()
  {
    if (this.state.selectedDays.length === 0)
    {
      this.handleDayChange(new Date());
    }
  }

  handleDayChange = date => {
    let days = getWeekDays(getWeekRange(date).from)
    this.setState({ selectedDays: days });
    localStorage.setItem("week", this.state.selectedDays);
    this.props.updateWeek(days)
  };

  handleDayEnter = date => {
    this.setState({
      hoverRange: getWeekRange(date),
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  handleWeekClick = (days) => {
    this.setState({
      selectedDays: days,
    });
  };

  render() {

    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <div className="SelectedWeekExample">
        <DayPicker
          selectedDays={selectedDays}
          showOutsideDays
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
          onDayMouseEnter={this.handleDayEnter}
          onDayMouseLeave={this.handleDayLeave}
          onWeekClick={this.handleWeekClick}
        />

        <Helmet>
          <style>{`
            .SelectedWeekExample .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeekExample .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeekExample .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange {
              background-color: #e6f7e4 !important;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange {
              background-color: #19850d !important;
              border-top-color: #19850d;
              border-bottom-color: #19850d;
              border-left-color: #19850d;
              border-right-color: #19850d;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #0e4f07 !important;
              border-left: 1px solid #082e04;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #0e4f07 !important;
              border-right: 1px solid #082e04;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: white !important;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }
          `}</style>
        </Helmet>
      </div>
    );
  }
}