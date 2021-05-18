import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import Holidays from '@date/holidays-us';
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

export function getWeekArr(date) {
  return getWeekDays(getWeekRange(date).from)
};

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
          selectedDays: [],
          holidays: []
      }; 
    }

  componentDidMount()
  {
    if (this.state.selectedDays.length === 0)
    {
      this.handleDayChange(new Date());
    }
    if (this.state.holidays.length === 0)
    {
      let day = new Date();
      let year = day.getFullYear();
      this.getHolidays(year);
    }
  }

  getHolidays = year => {
    let holidaysArr = [];
    var currentDay = new Date();

    var newYears = Holidays.newYearsDay(year);
    holidaysArr.push(newYears);

    var mlk = Holidays.martinLutherKingDay(year);
    holidaysArr.push(mlk);

    var memorial = Holidays.memorialDay(year);
    holidaysArr.push(memorial);

    var indp = Holidays.independenceDay(year);
    holidaysArr.push(indp);

    var labor = Holidays.laborDay(year);
    holidaysArr.push(labor);

    var veterans = Holidays.veteransDay(year);
    holidaysArr.push(veterans);

    var thanksgiving = Holidays.thanksgiving(year);
    holidaysArr.push(thanksgiving);

    var thanksgivingDate = thanksgiving.getDate();
    var thanksgivingObs = Holidays.thanksgiving(year);
    thanksgivingObs.setDate(thanksgivingDate + 1);
    holidaysArr.push(thanksgivingObs);

    var christmas = Holidays.christmas(year).observed;
    holidaysArr.push(christmas);

    // get new year's date of next year and update it to be Dec. 31st of current year
    var newYearsObs = Holidays.newYearsDay(year+1);
    newYearsObs.setDate(0);
    holidaysArr.push(newYearsObs);

    // if current month is december add next year's January dates in the holiday array
    //only 2 holidays in January observed by Meals That Connect
    if (currentDay.getMonth() == christmas.getMonth()){
      //show new year's day for next year on calendar
      var nextNewYear = Holidays.newYearsDay(year+1);
      holidaysArr.push(nextNewYear);

      var nextYearMLK = Holidays.martinLutherKingDay(year+1);
      holidaysArr.push(nextYearMLK);
    }

    this.setState({ holidays: holidaysArr });
    //console.log(this.props)
    this.props.updateHoliday(holidaysArr);
    //console.log(holidaysArr);
  }

  handleDayChange = date => {
    // calculate the week that cannot be advanced (4 weeks after the current week)
    let numWeeks = 4;
    let maxAdvancement = new Date();
    var currDay = maxAdvancement.getDay();
    let sunday = maxAdvancement.getDate() - currDay;
    maxAdvancement = new Date(maxAdvancement.setDate(sunday));
    maxAdvancement.setDate(maxAdvancement.getDate() + numWeeks * 7);

    // get an array of the week of the date clicked
    let days = getWeekDays(getWeekRange(date).from)

    // refresh the calendar if the date clicedk is within the 4 week advancement range
    if (days[0] < maxAdvancement) {
      this.setState({ selectedDays: days });
      localStorage.setItem("week", this.state.selectedDays);
      this.props.updateWeek(days)

      let day = new Date();
      let year = day.getFullYear();
      this.getHolidays(year)
    }
    // give an error if the date clicked is not within the 4 week advancement range
    else {
      alert("Scheduling is only available 4 weeks in advance.")
    }
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

    const { hoverRange, selectedDays, holidays } = this.state;

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
          disabledDays={holidays}
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
              background-color: #4EB2AC !important;
              border-top-color: #4EB2AC;
              border-bottom-color: #4EB2AC;
              border-left-color: #4EB2AC;
              border-right-color: #4EB2AC;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #0D2E46 !important;
              border-left: 1px solid #082e04;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #0D2E46 !important;
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