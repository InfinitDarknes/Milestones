let TargetInput;
let TargetInputID = "";
let DateObject = {
  // Do Not Panic if Values are Null they will get Assigned by LoadToday() on window.onload
  SolarYear: null,
  SolarMonth: null,
  SolarDay: null,
  GregorianYear: null,
  GregorianMonth: null,
  GregorianDay: null,
  Hour: null,
  Minute: null,
};
function SetupTargetInput(Selector) {
  TargetInput = document.querySelector(Selector);
}
function ToggleDatePicker(Selector, NumericDate) {
  if (document.querySelector(".date-picker")) HideDatePicker();
  else {
    CreateDatePicker(Selector);
    if (NumericDate) {
      LoadCustomDate(NumericDate);
    } else {
      if (AppObj.CurrentWindow.includes("Today")) {
        LoadToday();
      } else if (AppObj.CurrentWindow.includes("Tomorrow")) {
        LoadTomorrow();
      } else if (AppObj.CurrentWindow.includes("In2Days")) {
        LoadIn2Days();
      } else {
        LoadToday();
      }
    }
    UpdateDatePicker();
  }
}
function AssignWidthToDatePicker() {
  let DatePicker = document.querySelector(".date-picker");
  let TargetInput = document.querySelector(TargetInputID);
  let TargetInputWidth = Number(getComputedStyle(TargetInput).width.replace("px", ""));
  let TargetInputPaddingRight = Number(getComputedStyle(TargetInput).paddingRight.replace("px", ""));
  let TargetInputPaddingLeft = Number(getComputedStyle(TargetInput).paddingLeft.replace("px", ""));
  let TargetInputMarginRight = Number(getComputedStyle(TargetInput).marginRight.replace("px", ""));
  let TargetInputMarginLeft = Number(getComputedStyle(TargetInput).marginLeft.replace("px", ""));
  let TargetInputHeight = Number(getComputedStyle(TargetInput).height.replace("px", ""));
  let TargetInputPaddingTop = Number(getComputedStyle(TargetInput).paddingTop.replace("px", ""));
  let TargetInputPaddingBottom = Number(getComputedStyle(TargetInput).paddingBottom.replace("px", ""));
  let TargetInputOffsetTop = Number(TargetInput.offsetTop);
  let TargetInputFinalWidth = TargetInputWidth + TargetInputPaddingRight + TargetInputPaddingLeft;
  let TargetInputFinalHeight = TargetInputHeight + TargetInputPaddingTop + TargetInputPaddingBottom;
  if (TargetInputFinalWidth > 350) {
    let Diff = (TargetInputFinalWidth - 350) / 2;
    DatePicker.style.width = `${350}px`;
    DatePicker.style.marginRight = `${Diff}px`;
    DatePicker.style.marginLeft = `${Diff}px`;
    DatePicker.style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  } else if (TargetInputFinalWidth < 250) {
    let Diff = (TargetInputFinalWidth - 250) / 2;
    DatePicker.style.width = `${250}px`;
    DatePicker.style.marginRight = `${Diff}px`;
    DatePicker.style.marginLeft = `${Diff}px`;
    DatePicker.style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  } else {
    DatePicker.style.width = `${TargetInputFinalWidth}px`;
    DatePicker.style.marginRight = `${TargetInputMarginRight}px`;
    DatePicker.style.marginLeft = `${TargetInputMarginLeft}px`;
    DatePicker.style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  }
}
// Pure Functions for manuplating date object only
function LoadCurrentDate() {
  let GregorianYear = new Date().getFullYear();
  let GregorianMonth = new Date().getMonth() + 1;
  let GregorianDay = new Date().getDate();
  DateObject.Hour = new Date().getHours();
  DateObject.Minute = new Date().getMinutes();
  //
  if (UserSettings.Calendar === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
}
function PickDays(Day) {
  if (UserSettings.Calendar === "Solar") {
    DateObject.SolarDay = Number(Day);
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") DateObject.GregorianDay = Number(Day);
  UpdateDatePicker();
}
function LoadToday() {
  let GregorianYear = new Date().getFullYear();
  let GregorianMonth = new Date().getMonth() + 1;
  let GregorianDay = new Date().getDate();
  if (UserSettings.Calendar === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  UpdateDatePicker();
}
function LoadTomorrow() {
  console.log("Loading Tomorrow");
  let TodayNumericTime = new Date().getTime();
  let TomorrowNumericTime = TodayNumericTime + 24 * 60 * 60 * 1000;
  let GregorianYear = new Date(TomorrowNumericTime).getFullYear();
  let GregorianDay = new Date(TomorrowNumericTime).getDate();
  let GregorianMonth = new Date(TomorrowNumericTime).getMonth() + 1;
  //
  if (UserSettings.Calendar === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  UpdateDatePicker();
}
function LoadIn2Days() {
  let TodayNumericTime = new Date().getTime();
  let In2DaysNumericTime = TodayNumericTime + 48 * 60 * 60 * 1000;
  let GregorianYear = new Date(In2DaysNumericTime).getFullYear();
  let GregorianDay = new Date(In2DaysNumericTime).getDate();
  let GregorianMonth = new Date(In2DaysNumericTime).getMonth() + 1;
  //
  if (UserSettings.Calendar === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  UpdateDatePicker();
}
function LoadNextMonth() {
  if (UserSettings.Calendar === "Solar") {
    if (DateObject.SolarMonth >= 12) {
      let NumYear = DateObject.SolarYear;
      DateObject.SolarYear = NumYear + 1;
      DateObject.SolarMonth = 1;
    } else {
      let NumMonth = DateObject.SolarMonth;
      DateObject.SolarMonth = NumMonth + 1;
    }
    if (DateObject.SolarDay === 31) if (DateObject.SolarMonth > 6) DateObject.SolarDay = 30;
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    if (DateObject.GregorianMonth >= 12) {
      DateObject.GregorianYear += 1;
      DateObject.GregorianMonth = 1;
    } else {
      DateObject.GregorianMonth += 1;
    }
    if (DateObject.GregorianDay === 31) if (DateObject.GregorianMonth > 6) DateObject.GregorianDay = 30;
  }
  UpdateDatePicker();
}
function LoadPreviousMonth() {
  if (UserSettings.Calendar === "Solar") {
    if (DateObject.SolarMonth <= 1) {
      DateObject.SolarYear -= 1;
      DateObject.SolarMonth = 12;
    } else {
      DateObject.SolarMonth -= 1;
    }
    if (DateObject.SolarDay === 31) if (DateObject.SolarMonth > 6) DateObject.SolarDay = 30;
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    if (DateObject.GregorianMonth <= 1) {
      DateObject.GregorianYear -= 1;
      DateObject.GregorianMonth = 12;
    } else {
      DateObject.GregorianMonth -= 1;
    }
    if (DateObject.GregorianDay === 31) if (DateObject.GregorianMonth > 6) DateObject.GregorianDay = 30;
  }
  UpdateDatePicker();
}
function LoadGregorianDateFromSolar() {
  let FullGregorianDate = farvardin.solarToGregorian(DateObject.SolarYear, DateObject.SolarMonth, DateObject.SolarDay, "array");
  DateObject.GregorianYear = FullGregorianDate[0];
  DateObject.GregorianMonth = FullGregorianDate[1];
  DateObject.GregorianDay = FullGregorianDate[2];
}
function LoadCustomDate(NumericDate) {
  let GregorianYear = new Date(NumericDate).getFullYear();
  let GregorianMonth = new Date(NumericDate).getMonth() + 1;
  let GregorianDay = new Date(NumericDate).getDate();
  DateObject.Hour = new Date(NumericDate).getHours();
  DateObject.Minute = new Date(NumericDate).getMinutes();
  //
  if (UserSettings.Calendar === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (UserSettings.Calendar === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  DisplayDateStringIntoInput();
  UpdateDatePicker();
}
function ExtractDate(Request, DateType) {
  if (Request === "Gregorian") {
    if (DateType === "Object") {
      return { Year: DateObject.GregorianYear, Month: DateObject.GregorianMonth, Day: DateObject.GregorianDay };
    } else if (DateType === "String") {
      return `${DateObject.GregorianYear} / ${DateObject.GregorianMonth.toString().padStart(2, "0")} / ${DateObject.GregorianDay.toString().padStart(2, "0")}`;
    }
  }
  if (Request === "Solar") {
    if (DateType === "Object") {
      return { Year: DateObject.SolarYear, Month: DateObject.SolarMonth, Day: DateObject.SolarDay };
    } else if (DateType === "String") {
      return `${DateObject.SolarYear} / ${DateObject.SolarMonth.toString().padStart(2, "0")} / ${DateObject.SolarDay.toString().padStart(2, "0")}`;
    }
  }
  if (Request === "Numeric") {
    let GregorianYear = DateObject.GregorianYear.toString();
    let GregorianMonth = DateObject.GregorianMonth.toString().padStart(2, "0");
    let GregorianDay = DateObject.GregorianDay.toString().padStart(2, "0");
    let Hour = DateObject.Hour.toString().padStart(2, "0");
    let Minute = DateObject.Minute.toString().padStart(2, "0");
    let DateString = `${GregorianYear}-${GregorianMonth}-${GregorianDay}T${Hour}:${Minute}:00`;
    return new Date(DateString).getTime();
  }
}
function NumericToGregorian(NumericDate) {
  let GregorianYear = new Date(NumericDate).getFullYear();
  let GregorianMonth = new Date(NumericDate).getMonth() + 1;
  let GregorianDay = new Date(NumericDate).getDate();
  let GregorianDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
  return GregorianDate;
}
function NumericToSolar(NumericDate) {
  let GregorianYear = new Date(NumericDate).getFullYear();
  let GregorianMonth = new Date(NumericDate).getMonth() + 1;
  let GregorianDay = new Date(NumericDate).getDate();
  let SolarDateArray = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
  return `${SolarDateArray[0]} / ${SolarDateArray[1].toString().padStart(2, "0")} / ${SolarDateArray[2].toString().padStart(2, "0")}`;
}
function NumericToTime(NumericDate) {
  let Hour = new Date(NumericDate).getHours().toString().padStart(2, "0");
  let Minute = new Date(NumericDate).getMinutes().toString().padStart(2, "0");
  let Time = `${Hour} : ${Minute}`;
  return Time;
}
// Functions that change the input values of datepicker and manuplate what user sees
function CreateDatePicker(Selector) {
  // Interval variables for fast increament/decreament on mouse down and up
  let FastHourIncreament, FastHourDecreament, FastMinuteIncreament, FastMinuteDecreament;
  TargetInputID = Selector;
  const TargetInput = document.querySelector(Selector);
  // Declear elements
  const DatePickerElement = document.createElement("div");
  const DatePickerHeader = document.createElement("section");
  const PickTodayButton = document.createElement("button");
  const PickTomorrowButton = document.createElement("button");
  const PickIn2DaysButton = document.createElement("button");
  const PickYearMonthContainer = document.createElement("div");
  const NextMonthButton = document.createElement("button");
  const PreviousMonthButton = document.createElement("button");
  const NextMonthButtonIcon = document.createElement("img");
  const PreviousMonthButtonIcon = document.createElement("img");
  const YearMonthContainer = document.createElement("div");
  const Month = document.createElement("span");
  const Year = document.createElement("span");
  const DayButtonsContainer = document.createElement("div");
  for (Counter = 1; Counter <= 31; Counter++) {
    const PickDayButton = document.createElement("button");
    PickDayButton.className = "pick-day-button";
    PickDayButton.id = "Day-" + Counter;
    PickDayButton.setAttribute("data-day", Counter);
    PickDayButton.innerText = PlacePersianNumbers(Counter);
    DayButtonsContainer.append(PickDayButton);
    PickDayButton.addEventListener("click", () => PickDays(PickDayButton.dataset.day));
  }
  const TimePickerElement = document.createElement("section");
  const TimePickerHourSection = document.createElement("section");
  const HourInput = document.createElement("input");
  const TweakHourButtonsContainer = document.createElement("div");
  const IncreamentHourButton = document.createElement("button");
  const IncreamentHourButtonIcon = document.createElement("img");
  const DecreamentHourButton = document.createElement("button");
  const DecreamentHourButtonIcon = document.createElement("img");
  const TimePickerSeperator = document.createElement("span");
  const TimePickerSeperatorIcon = document.createElement("img");
  const TimePickerMinuteSection = document.createElement("div");
  const MinuteInput = document.createElement("input");
  const TweakMinuteButtonsContainer = document.createElement("div");
  const IncreamentMinuteButton = document.createElement("button");
  const IncreamentMinuteButtonIcon = document.createElement("img");
  const DecreamenMinuteButton = document.createElement("button");
  const DecreamenMinuteButtonIcon = document.createElement("img");
  // Assign class names
  TimePickerHourSection.className = "time-picker-inner-container";
  HourInput.className = "time-picker-input task-hour-input";
  MinuteInput.className = "time-picker-input task-minute-input";
  TweakHourButtonsContainer.className = "tweak-time-buttons";
  TimePickerMinuteSection.className = "time-picker-inner-container";
  TweakMinuteButtonsContainer.className = "tweak-time-buttons";
  NextMonthButtonIcon.className = "icon";
  PreviousMonthButtonIcon.className = "icon";
  IncreamentHourButtonIcon.className = "icon";
  DecreamentHourButtonIcon.className = "icon";
  IncreamentMinuteButtonIcon.className = "icon";
  DecreamenMinuteButtonIcon.className = "icon";
  DatePickerElement.className = "date-picker";
  DatePickerHeader.className = "date-picker-header";
  PickTodayButton.className = "pick-today-button date-picker-btn";
  PickTomorrowButton.className = "pick-tomorrow-button date-picker-btn";
  PickIn2DaysButton.className = "pick-in-2-days-button date-picker-btn";
  PickYearMonthContainer.className = "pick-year-month-container";
  NextMonthButton.className = "next-month date-picker-btn";
  PreviousMonthButton.className = "previous-month date-picker-btn";
  YearMonthContainer.className = "year-month-container";
  Month.className = "month";
  Year.className = "year";
  DayButtonsContainer.className = "pick-days";
  TimePickerElement.className = "time-picker";
  IncreamentHourButton.className = "increament-hour date-picker-btn";
  DecreamentHourButton.className = "decreament-hour date-picker-btn";
  TimePickerSeperator.className = "time-picker-separator";
  IncreamentMinuteButton.className = "increament-minute date-picker-btn";
  DecreamenMinuteButton.className = "decreament-minute date-picker-btn";
  // Assign innertText
  PickTodayButton.innerText = DPStrings.PickTodayButton[UserSettings.Lang];
  PickTomorrowButton.innerText = DPStrings.PickTomorrowButton[UserSettings.Lang];
  PickIn2DaysButton.innerText = DPStrings.PickIn2DaysButton[UserSettings.Lang];
  // Assign src
  NextMonthButtonIcon.src = "../Icons/arrow-right-s-fill.svg";
  PreviousMonthButtonIcon.src = "../Icons/arrow-left-s-fill.svg";
  IncreamentHourButtonIcon.src = "../Icons/arrow-up-s-fill.svg";
  DecreamentHourButtonIcon.src = "../Icons/arrow-down-s-fill.svg";
  TimePickerSeperatorIcon.src = "../Icons/arrow-right-s-fill.svg";
  IncreamentMinuteButtonIcon.src = "../Icons/arrow-up-s-fill.svg";
  DecreamenMinuteButtonIcon.src = "../Icons/arrow-down-s-fill.svg";
  // Assign type (inputs)
  HourInput.type = "text";
  MinuteInput.type = "text";
  // Set event listeners
  HourInput.addEventListener("change", () => {
    if (+HourInput.value >= 0 && +HourInput.value <= 24) {
      DateObject.Hour = +HourInput.value;
    }
    UpdateDatePicker();
  });
  MinuteInput.addEventListener("change", () => {
    if (+MinuteInput.value >= 0 && +MinuteInput.value <= 60) {
      DateObject.Minute = +MinuteInput.value;
      UpdateDatePicker();
    }
  });
  PickTodayButton.addEventListener("click", LoadToday);
  PickTomorrowButton.addEventListener("click", LoadTomorrow);
  PickIn2DaysButton.addEventListener("click", LoadIn2Days);
  NextMonthButton.addEventListener("click", LoadNextMonth);
  PreviousMonthButton.addEventListener("click", LoadPreviousMonth);
  IncreamentHourButton.addEventListener("click", IncreamentHour);
  DecreamentHourButton.addEventListener("click", DecreamentHour);
  IncreamentMinuteButton.addEventListener("click", IncreamentMinute);
  DecreamenMinuteButton.addEventListener("click", DecreamentMinute);
  IncreamentHourButton.addEventListener("mousedown", () => (FastHourIncreament = setInterval(() => IncreamentHour(), 100)));
  IncreamentHourButton.addEventListener("mouseup", () => clearInterval(FastHourIncreament));
  IncreamentHourButton.addEventListener("mouseout", () => clearInterval(FastHourIncreament));
  DecreamentHourButton.addEventListener("mousedown", () => (FastHourDecreament = setInterval(() => DecreamentHour(), 100)));
  DecreamentHourButton.addEventListener("mouseup", () => clearInterval(FastHourDecreament));
  DecreamentHourButton.addEventListener("mouseout", () => clearInterval(FastHourDecreament));
  //
  IncreamentMinuteButton.addEventListener("mousedown", () => (FastMinuteIncreament = setInterval(() => IncreamentMinute(), 100)));
  IncreamentMinuteButton.addEventListener("mouseup", () => clearInterval(FastMinuteIncreament));
  IncreamentMinuteButton.addEventListener("mouseout", () => clearInterval(FastMinuteIncreament));
  DecreamenMinuteButton.addEventListener("mousedown", () => (FastMinuteDecreament = setInterval(() => DecreamentMinute(), 100)));
  DecreamenMinuteButton.addEventListener("mouseup", () => clearInterval(FastMinuteDecreament));
  DecreamenMinuteButton.addEventListener("mouseout", () => clearInterval(FastMinuteDecreament));
  // Appending elements
  DatePickerHeader.append(PickTodayButton, PickTomorrowButton, PickIn2DaysButton);
  NextMonthButton.append(NextMonthButtonIcon);
  PreviousMonthButton.append(PreviousMonthButtonIcon);
  PickYearMonthContainer.append(PreviousMonthButton, YearMonthContainer, NextMonthButton);
  YearMonthContainer.append(Month, Year);
  TimePickerHourSection.append(HourInput, TweakHourButtonsContainer);
  TweakHourButtonsContainer.append(IncreamentHourButton, DecreamentHourButton);
  IncreamentHourButton.append(IncreamentHourButtonIcon);
  DecreamentHourButton.append(DecreamentHourButtonIcon);
  TimePickerSeperator.append(TimePickerSeperatorIcon);
  TimePickerMinuteSection.append(MinuteInput, TweakMinuteButtonsContainer);
  TweakMinuteButtonsContainer.append(IncreamentMinuteButton, DecreamenMinuteButton);
  IncreamentMinuteButton.append(IncreamentMinuteButtonIcon);
  DecreamenMinuteButton.append(DecreamenMinuteButtonIcon);
  TimePickerElement.append(TimePickerHourSection, TimePickerSeperator, TimePickerMinuteSection);
  DatePickerElement.append(DatePickerHeader, PickYearMonthContainer, DayButtonsContainer, TimePickerElement);
  // Append all elements to the main container div
  TargetInput.parentNode.insertBefore(DatePickerElement, TargetInput.nextSibling);
  AssignWidthToDatePicker();
}
function HideDatePicker() {
  if (document.querySelector(".date-picker")) document.querySelector(".date-picker").remove();
}
function UpdateDatePicker() {
  const DatePicker = document.querySelector(".date-picker");
  const TimePicker = document.querySelector(".time-picker");
  const Month = document.querySelector(".month");
  const Year = document.querySelector(".year");

  const DayButtons = document.querySelectorAll(".pick-day-button");
  let SolarMonthArray = ["", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  let GregorianMonthArray = [
    "",
    DPStrings.January[UserSettings.Lang],
    DPStrings.February[UserSettings.Lang],
    DPStrings.March[UserSettings.Lang],
    DPStrings.April[UserSettings.Lang],
    DPStrings.May[UserSettings.Lang],
    DPStrings.June[UserSettings.Lang],
    DPStrings.July[UserSettings.Lang],
    DPStrings.August[UserSettings.Lang],
    DPStrings.September[UserSettings.Lang],
    DPStrings.October[UserSettings.Lang],
    DPStrings.November[UserSettings.Lang],
    DPStrings.December[UserSettings.Lang],
  ];
  if (UserSettings.Calendar === "Solar") {
    if (DatePicker) {
      Year.innerText = PlacePersianNumbers(DateObject.SolarYear);
      Month.innerText = SolarMonthArray[DateObject.SolarMonth];
      HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
    }
  }
  if (UserSettings.Calendar === "Gregorian") {
    if (DatePicker) {
      Year.innerText = PlacePersianNumbers(DateObject.GregorianYear);
      Month.innerText = GregorianMonthArray[DateObject.GregorianMonth];
      HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
    }
  }
  TargetInput.dataset.numericdate = ExtractDate("Numeric");
  if (DatePicker) CheckDaysOfTheMonth(DayButtons);
  DisplayDateStringIntoInput();
  if (TimePicker) {
    const TaskHourInput = document.querySelector(".task-hour-input");
    const TaskMinuteInput = document.querySelector(".task-minute-input");
    TaskHourInput.value = PlacePersianNumbers(DateObject.Hour.toString().padStart(2, "0"));
    TaskMinuteInput.value = PlacePersianNumbers(DateObject.Minute.toString().padStart(2, "0"));
  }
}
function CheckDaysOfTheMonth(DayButtons) {
  if (UserSettings.Calendar === "Solar") {
    if (DateObject.SolarMonth <= 6) {
      DayButtons[30].removeAttribute("inert");
      DayButtons[30].style = "";
    }
    if (DateObject.SolarMonth > 6) {
      DayButtons[30].setAttribute("inert", "true");
      DayButtons[30].style.opacity = "0.4";
    }
  }
  if (UserSettings.Calendar === "Gregorian") {
    if (DateObject.GregorianMonth <= 6) {
      DayButtons[30].removeAttribute("inert");
      DayButtons[30].style = "";
    }
    if (DateObject.GregorianMonth > 6) {
      DayButtons[30].setAttribute("inert", "true");
      DayButtons[30].style.opacity = "0.4";
    }
  }
}
function DisplayDateStringIntoInput() {
  if (UserSettings.Calendar === "Solar") {
    if (TargetInput) TargetInput.value = PlacePersianNumbers(ExtractDate("Solar", "String"));
  }
  if (UserSettings.Calendar === "Gregorian") {
    if (TargetInput) TargetInput.value = PlacePersianNumbers(ExtractDate("Gregorian", "String"));
  }
}
function IncreamentHour() {
  DateObject.Hour++;
  if (DateObject.Hour > 23) DateObject.Hour = 0;
  UpdateDatePicker();
}
function DecreamentHour() {
  DateObject.Hour--;
  if (DateObject.Hour < 0) DateObject.Hour = 23;
  UpdateDatePicker();
}
function IncreamentMinute() {
  DateObject.Minute++;
  if (DateObject.Minute > 59) DateObject.Minute = 0;
  UpdateDatePicker();
}
function DecreamentMinute() {
  DateObject.Minute--;
  if (DateObject.Minute < 0) DateObject.Minute = 59;
  UpdateDatePicker();
}
function HighLightSelectedDay(ID) {
  const DayButtons = document.querySelectorAll(".pick-day-button");
  DayButtons.forEach((Button) => {
    if (!Button.className.includes("selected-day")) return;
    Button.className = "pick-day-button";
    Button.style = "";
  });
  const SelectedDay = document.getElementById(ID);
  SelectedDay.classList.add("selected-day");
  SelectedDay.style.backgroundColor = ThemeObj.Hovered.Themes[UserSettings.Theme].BgColor;
  SelectedDay.style.transform = "scale(1.1)";
}
window.addEventListener("resize", () => {
  if (DoesElementExist("date-picker")) AssignWidthToDatePicker();
});
