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
let DatePickerSettings = {
  lang: "",
  type: "",
};
window.onresize = () => {
  if (DoesElementExist("date-picker")) AssignWidthToDatePicker();
};
function SetupTargetInput(ID) {
  TargetInput = document.getElementById(ID);
  console.log(TargetInput);
}
function ToggleDatePicker(ID, NumericDate) {
  if (DoesElementExist("date-picker")) HideDatePicker();
  else {
    CreateDatePicker(ID);
    if (EditMode) LoadCustomDate(NumericDate);
    else LoadToday();
    UpdateDatePicker();
  }
}
function AssignWidthToDatePicker() {
  let DatePicker = document.getElementById("date-picker");
  let TargetInput = document.getElementById(TargetInputID);
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
  if (DatePickerSettings.type === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
}
function PickDay(Day) {
  if (DatePickerSettings.type === "Solar") {
    DateObject.SolarDay = Number(Day);
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") DateObject.GregorianDay = Number(Day);
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateDatePicker();
}
function LoadToday() {
  let GregorianYear = new Date().getFullYear();
  let GregorianMonth = new Date().getMonth() + 1;
  let GregorianDay = new Date().getDate();
  if (DatePickerSettings.type === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateDatePicker();
}
function LoadTomorrow() {
  let TodayNumericTime = new Date().getTime();
  let TomorrowNumericTime = TodayNumericTime + 24 * 60 * 60 * 1000;
  let GregorianYear = new Date(TomorrowNumericTime).getFullYear();
  let GregorianDay = new Date(TomorrowNumericTime).getDate();
  let GregorianMonth = new Date(TomorrowNumericTime).getMonth() + 1;
  //
  if (DatePickerSettings.type === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateDatePicker();
}
function LoadIn2Days() {
  let TodayNumericTime = new Date().getTime();
  let In2DaysNumericTime = TodayNumericTime + 48 * 60 * 60 * 1000;
  let GregorianYear = new Date(In2DaysNumericTime).getFullYear();
  let GregorianDay = new Date(In2DaysNumericTime).getDate();
  let GregorianMonth = new Date(In2DaysNumericTime).getMonth() + 1;
  //
  if (DatePickerSettings.type === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateDatePicker();
}
function LoadNextMonth() {
  if (DatePickerSettings.type === "Solar") {
    if (DateObject.SolarMonth >= 12) {
      let NumYear = DateObject.SolarYear;
      DateObject.SolarYear = NumYear + 1;
      DateObject.SolarMonth = 1;
    } else {
      let NumMonth = DateObject.SolarMonth;
      DateObject.SolarMonth = NumMonth + 1;
    }
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    if (DateObject.GregorianMonth >= 12) {
      let NumYear = DateObject.GregorianYear;
      DateObject.GregorianYear = NumYear + 1;
      DateObject.GregorianMonth = 1;
    } else {
      let NumMonth = DateObject.GregorianMonth;
      DateObject.GregorianMonth = NumMonth + 1;
      Month.innerText = GregorianMonthArray[DateObject.GregorianMonth];
    }
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateDatePicker();
}
function LoadPreviousMonth() {
  if (DatePickerSettings.type === "Solar") {
    if (DateObject.SolarMonth <= 1) {
      let NumYear = DateObject.SolarYear;
      DateObject.SolarYear = NumYear - 1;
      DateObject.SolarMonth = 12;
    } else {
      let NumMonth = DateObject.SolarMonth;
      DateObject.SolarMonth = NumMonth - 1;
    }
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    if (DateObject.GregorianMonth <= 1) {
      let NumYear = DateObject.GregorianYear;
      DateObject.GregorianYear = NumYear - 1;
      DateObject.GregorianMonth = 12;
    } else {
      let NumMonth = DateObject.GregorianMonth;
      DateObject.GregorianMonth = NumMonth - 1;
    }
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
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
  if (DatePickerSettings.type === "Solar") {
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    LoadGregorianDateFromSolar();
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
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
// Functions that change the input values of datepicker and manuplate what user sees
function CreateDatePicker(ID) {
  TargetInputID = ID;
  let TargetInput = document.getElementById(ID.toString());
  let DatePickerElement = document.createElement("div");
  DatePickerElement.id = "date-picker";
  let DatePickerHeader;
  DatePickerHeader = document.createElement("div");
  DatePickerHeader.id = "date-picker-header";
  DatePickerElement.appendChild(DatePickerHeader);

  let PickTodayBtn = document.createElement("button");
  PickTodayBtn.id = "pick-today-button";
  PickTodayBtn.innerText = DPStrings.PickTodayButton[UserSettings.CurrentLang];
  DatePickerHeader.appendChild(PickTodayBtn);

  let PickTomorrowBtn = document.createElement("button");
  PickTomorrowBtn.id = "pick-tomorrow-button";
  PickTomorrowBtn.innerText = DPStrings.PickTomorrowButton[UserSettings.CurrentLang];
  DatePickerHeader.appendChild(PickTomorrowBtn);

  let PickIn2DaysButton = document.createElement("button");
  PickIn2DaysButton.id = "pick-in-2-days-button";
  PickIn2DaysButton.innerText = DPStrings.PickIn2DaysButton[UserSettings.CurrentLang];
  DatePickerHeader.appendChild(PickIn2DaysButton);

  // Create the main container div
  const container = document.createElement("div");
  container.id = "time-picker";

  // Create the first time picker section
  const timePickerInnerContainer1 = document.createElement("div");
  timePickerInnerContainer1.className = "time-picker-inner-container";

  const taskHourInput = document.createElement("input");
  taskHourInput.type = "text";
  taskHourInput.id = "task-hour-input";
  taskHourInput.className = "time-picker-input";

  const tweakTimeButtons1 = document.createElement("div");
  tweakTimeButtons1.className = "tweak-time-buttons";
  let FastIncreament, FastDecreament;
  const IncreamentHourButton = document.createElement("button");
  IncreamentHourButton.id = "increament-hour";
  const increaseHourImage = document.createElement("img");
  increaseHourImage.src = "Icons/UpArrowIcon.png";
  IncreamentHourButton.addEventListener("click", IncreamentHour);
  IncreamentHourButton.appendChild(increaseHourImage);
  const DecreamentHourButton = document.createElement("button");
  DecreamentHourButton.id = "decreament-hour";
  const decreaseHourImage = document.createElement("img");
  decreaseHourImage.src = "Icons/DownArrowIcon.png";
  DecreamentHourButton.addEventListener("click", DecreamentHour);
  DecreamentHourButton.appendChild(decreaseHourImage);

  tweakTimeButtons1.appendChild(IncreamentHourButton);
  tweakTimeButtons1.appendChild(DecreamentHourButton);

  timePickerInnerContainer1.appendChild(taskHourInput);
  timePickerInnerContainer1.appendChild(tweakTimeButtons1);

  // Create the separator span element
  const timePickerSeparator = document.createElement("span");
  timePickerSeparator.id = "time-picker-separator";
  const separatorImage = document.createElement("img");
  separatorImage.src = "Icons/SeperatorIcon.png";
  timePickerSeparator.appendChild(separatorImage);

  // Create the second time picker section
  const timePickerInnerContainer2 = document.createElement("div");
  timePickerInnerContainer2.className = "time-picker-inner-container";

  const taskMinuteInput = document.createElement("input");
  taskMinuteInput.type = "text";
  taskMinuteInput.id = "task-minute-input";
  taskMinuteInput.className = "time-picker-input";

  const tweakTimeButtons2 = document.createElement("div");
  tweakTimeButtons2.className = "tweak-time-buttons";

  const IncreamentMinuteButton = document.createElement("button");
  IncreamentMinuteButton.id = "increament-minute";
  const increaseMinuteImage = document.createElement("img");
  increaseMinuteImage.src = "Icons/UpArrowIcon.png";
  IncreamentMinuteButton.addEventListener("click", IncreamentMinute);
  IncreamentMinuteButton.appendChild(increaseMinuteImage);

  const DecreamenMinuteButton = document.createElement("button");
  DecreamenMinuteButton.id = "decreament-minute";
  const decreaseMinuteImage = document.createElement("img");
  decreaseMinuteImage.src = "Icons/DownArrowIcon.png";
  DecreamenMinuteButton.addEventListener("click", DecreamentMinute);
  DecreamenMinuteButton.appendChild(decreaseMinuteImage);

  tweakTimeButtons2.appendChild(IncreamentMinuteButton);
  tweakTimeButtons2.appendChild(DecreamenMinuteButton);

  timePickerInnerContainer2.appendChild(taskMinuteInput);
  timePickerInnerContainer2.appendChild(tweakTimeButtons2);

  // Append all elements to the main container div
  container.appendChild(timePickerInnerContainer1);
  container.appendChild(timePickerSeparator);
  container.appendChild(timePickerInnerContainer2);

  // Append the main container div to the document body
  DatePickerElement.appendChild(container);

  //
  let PickYearMonthContainer = document.createElement("div");
  let NextMonthButton = document.createElement("button");
  let PreviousMonthButton = document.createElement("button");
  let YearMonthContainer = document.createElement("div");
  let Month = document.createElement("span");
  let Year = document.createElement("span");
  PickYearMonthContainer.id = "pick-year-month-container";
  NextMonthButton.id = "next-month";
  PreviousMonthButton.id = "previous-month";
  YearMonthContainer.id = "year-month-container";
  Month.id = "month";
  Year.id = "year";
  NextMonthButton.innerHTML = '<img src="Icons/RightArrowIcon.png">';
  PreviousMonthButton.innerHTML = '<img src="Icons/LeftArrowIcon.png">';
  DatePickerElement.appendChild(PickYearMonthContainer);
  PickYearMonthContainer.appendChild(PreviousMonthButton);
  PickYearMonthContainer.appendChild(YearMonthContainer);
  PickYearMonthContainer.appendChild(NextMonthButton);
  YearMonthContainer.appendChild(Month);
  YearMonthContainer.appendChild(Year);
  //
  let PickDay = document.createElement("div");
  PickDay.id = "pick-days";
  for (Counter = 1; Counter <= 31; Counter++) {
    let PickDayButton = document.createElement("button");
    PickDayButton.className = "pick-day-button";
    PickDayButton.id = "Day-" + Counter;
    PickDayButton.setAttribute("data-Day", Counter);
    PickDayButton.innerText = Counter;
    PickDay.appendChild(PickDayButton);
  }
  DatePickerElement.appendChild(PickDay);
  TargetInput.parentNode.insertBefore(DatePickerElement, TargetInput.nextSibling);
  AddDatePickerEventListeners();
  AssignWidthToDatePicker();
}
function HideDatePicker() {
  if (DoesElementExist("date-picker")) document.getElementById("date-picker").remove();
}
function AddDatePickerEventListeners() {
  const PickTodayButton = document.getElementById("pick-today-button");
  PickTodayButton.addEventListener("click", LoadToday);
  const PickTomorrowButton = document.getElementById("pick-tomorrow-button");
  PickTomorrowButton.addEventListener("click", LoadTomorrow);
  const PickIn2DaysButton = document.getElementById("pick-in-2-days-button");
  PickIn2DaysButton.addEventListener("click", LoadIn2Days);
  const NextMonthButton = document.getElementById("next-month");
  const PreviousMonthButton = document.getElementById("previous-month");
  const DayButtons = document.querySelectorAll(".pick-day-button");
  NextMonthButton.addEventListener("click", LoadNextMonth);
  PreviousMonthButton.addEventListener("click", LoadPreviousMonth);
  DayButtons.forEach((Button) => {
    Button.addEventListener("click", () => {
      PickDay(Button.innerText);
    });
  });
}
function UpdateDatePicker() {
  const TargetInput = document.getElementById(TargetInputID.toString());
  const DatePicker = document.getElementById("date-picker");
  const TimePicker = document.getElementById("time-picker");
  const Month = document.getElementById("month");
  const Year = document.getElementById("year");
  const DayButtons = document.querySelectorAll(".pick-day-button");
  let SolarMonthArray = ["", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  let GregorianMonthArray = [
    "",
    DPStrings.January[UserSettings.CurrentLang],
    DPStrings.February[UserSettings.CurrentLang],
    DPStrings.March[UserSettings.CurrentLang],
    DPStrings.April[UserSettings.CurrentLang],
    DPStrings.May[UserSettings.CurrentLang],
    DPStrings.June[UserSettings.CurrentLang],
    DPStrings.July[UserSettings.CurrentLang],
    DPStrings.August[UserSettings.CurrentLang],
    DPStrings.September[UserSettings.CurrentLang],
    DPStrings.October[UserSettings.CurrentLang],
    DPStrings.November[UserSettings.CurrentLang],
    DPStrings.December[UserSettings.CurrentLang],
  ];
  if (DatePickerSettings.type === "Solar") {
    if (!DatePicker) return;
    Year.innerText = DateObject.SolarYear;
    Month.innerText = SolarMonthArray[DateObject.SolarMonth];
    HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
  }
  if (DatePickerSettings.type === "Gregorian") {
    if (!DatePicker) return;
    Year.innerText = DateObject.GregorianYear;
    Month.innerText = GregorianMonthArray[DateObject.GregorianMonth];
    HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
  }
  CheckDaysOfTheMonth(DayButtons);
  DisplayDateStringIntoInput(TargetInput);
  if (!TimePicker) return;
  UpdateTimePicker();
}
function CheckDaysOfTheMonth(DayButtons) {
  if (DatePickerSettings.type === "Solar") {
    if (DateObject.SolarMonth <= 6) {
      DayButtons[30].removeAttribute("inert");
      DayButtons[30].style = "";
    }
    if (DateObject.SolarMonth > 6) {
      DayButtons[30].setAttribute("inert", "true");
      DayButtons[30].style.opacity = "0.4";
    }
  }
  if (DatePickerSettings.type === "Gregorian") {
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
function DisplayDateStringIntoInput(TargetInput) {
  if (DatePickerSettings.type === "Solar") {
    if (TargetInput) TargetInput.value = ExtractDate("Solar", "String");
  }
  if (DatePickerSettings.type === "Gregorian") {
    if (TargetInput) TargetInput.value = ExtractDate("Gregorian", "String");
  }
}
function IncreamentHour() {
  DateObject.Hour++;
  if (DateObject.Hour > 23) DateObject.Hour = 0;
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateTimePicker();
}
function DecreamentHour() {
  DateObject.Hour--;
  if (DateObject.Hour < 0) DateObject.Hour = 23;
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateTimePicker();
}
function IncreamentMinute() {
  DateObject.Minute++;
  if (DateObject.Minute > 59) DateObject.Minute = 0;
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateTimePicker();
}
function DecreamentMinute() {
  DateObject.Minute--;
  if (DateObject.Minute < 0) DateObject.Minute = 59;
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
  UpdateTimePicker();
}
function UpdateTimePicker() {
  const TaskHourInput = document.getElementById("task-hour-input");
  const TaskMinuteInput = document.getElementById("task-minute-input");
  TaskHourInput.value = DateObject.Hour.toString().padStart(2, "0");
  TaskMinuteInput.value = DateObject.Minute.toString().padStart(2, "0");
  TargetInput.dataset.DateObject = JSON.stringify(DateObject);
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
  SelectedDay.style.backgroundColor = "#40C057";
  SelectedDay.style.transform = "scale(1.1)";
}
