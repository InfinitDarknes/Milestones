let TargetInputID = "";
let DateObject = {
  // Do Not Panic if Values are Null they will get Assigned by DatePicker("Today") on window.onload
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
  today_btn: true,
  tomorrow_btn: true,
  in_2_days_btn: true,
  date_month_select_box: true,
  time_picker: true,
  load_date_on_window_onload: true,
  lang: "",
  type: "",
};
window.onresize = function () {
  if (document.getElementById("date-picker")) {
    AssignWidthToDatePicker();
  }
};
function FixDir() {
  let MainStyleSheet = document.getElementById("main-style-sheet");
  switch (DatePickerSettings.lang) {
    case "en":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "fa":
      MainStyleSheet.href = "Styles/Main/style_rtl.css";
      break;
    case "ar":
      MainStyleSheet.href = "Styles/Main/style_rtl.css";
      break;
    case "es":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "fr":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "de":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "ru":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "zh":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "hi":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "ja":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "kr":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "pt":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "ur":
      MainStyleSheet.href = "Styles/Main/style_rtl.css";
      break;
  }
}
function AssignWidthToDatePicker() {
  let TargetInput = document.getElementById(TargetInputID);
  let TargetInputWidth = parseFloat(
    getComputedStyle(TargetInput).width.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputPaddingRight = parseFloat(
    getComputedStyle(TargetInput).paddingRight.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputPaddingLeft = parseFloat(
    getComputedStyle(TargetInput).paddingLeft.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputMarginRight = parseFloat(
    getComputedStyle(TargetInput).marginRight.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputMarginLeft = parseFloat(
    getComputedStyle(TargetInput).marginLeft.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputHeight = parseFloat(
    getComputedStyle(TargetInput).height.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputPaddingTop = parseFloat(
    getComputedStyle(TargetInput).paddingTop.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputPaddingBottom = parseFloat(
    getComputedStyle(TargetInput).paddingBottom.substring(0, getComputedStyle(TargetInput).width.length - 2)
  );
  let TargetInputOffsetTop = parseFloat(TargetInput.offsetTop);

  let TargetInputFinalWidth = TargetInputWidth + TargetInputPaddingRight + TargetInputPaddingLeft;
  let TargetInputFinalHeight = TargetInputHeight + TargetInputPaddingTop + TargetInputPaddingBottom;
  if (TargetInputFinalWidth > 350) {
    let Diff = (TargetInputFinalWidth - 350) / 2;
    document.getElementById("date-picker").style.width = `${350}px`;
    document.getElementById("date-picker").style.marginRight = `${Diff}px`;
    document.getElementById("date-picker").style.marginLeft = `${Diff}px`;
    document.getElementById("date-picker").style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  } else if (TargetInputFinalWidth < 250) {
    let Diff = (TargetInputFinalWidth - 250) / 2;
    document.getElementById("date-picker").style.width = `${250}px`;
    document.getElementById("date-picker").style.marginRight = `${Diff}px`;
    document.getElementById("date-picker").style.marginLeft = `${Diff}px`;
    document.getElementById("date-picker").style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  } else {
    document.getElementById("date-picker").style.width = `${TargetInputFinalWidth}px`;
    document.getElementById("date-picker").style.marginRight = `${TargetInputMarginRight}px`;
    document.getElementById("date-picker").style.marginLeft = `${TargetInputMarginLeft}px`;
    document.getElementById("date-picker").style.top = `${TargetInputFinalHeight + TargetInputOffsetTop + 5}px`;
  }
}
function LoadCurrentTime() {
  if (DatePickerSettings.type === "Gregorian") {
    let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
    let GregorianMonth = new Date().getMonth() + 1;
    let GregorianDay = new Date().getDate();
    DateObject.GregorianYear = GregorianYear;
    DateObject.GregorianMonth = GregorianMonth;
    DateObject.GregorianDay = GregorianDay;
  }
  if (DatePickerSettings.type === "Solar") {
    let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
    let GregorianMonth = new Date().getMonth() + 1;
    let GregorianDay = new Date().getDate();
    let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    DateObject.SolarYear = FullSolarDate[0];
    DateObject.SolarMonth = FullSolarDate[1];
    DateObject.SolarDay = FullSolarDate[2];
    DatePicker("GetGregorianDate");
    DateObject.Hour = new Date().getHours();
    DateObject.Minute = new Date().getMinutes();
    TimePicker("FormatTime");
    console.log(DateObject);
  }
}
function CreateDatePicker(ID) {
  if (document.getElementById("date-picker")) {
    document.getElementById("date-picker").remove();
  } else {
    TargetInputID = ID;
    let TargetInput = document.getElementById(ID.toString());
    let DatePickerElement = document.createElement("div");
    DatePickerElement.id = "date-picker";
    let DatePickerHeader;
    if (DatePickerSettings.today_btn || DatePickerSettings.tomorrow_btn || DatePickerSettings.in_2_days_btn) {
      DatePickerHeader = document.createElement("div");
      DatePickerHeader.id = "date-picker-header";
      DatePickerElement.appendChild(DatePickerHeader);
    }
    if (DatePickerSettings.today_btn) {
      let PickTodayBtn = document.createElement("button");
      PickTodayBtn.id = "pick-today-button";
      PickTodayBtn.innerText = DPStrings.PickTodayButton[UserSettings.CurrentLang];
      DatePickerHeader.appendChild(PickTodayBtn);
    }
    if (DatePickerSettings.tomorrow_btn) {
      let PickTomorrowBtn = document.createElement("button");
      PickTomorrowBtn.id = "pick-tomorrow-button";
      PickTomorrowBtn.innerText = DPStrings.PickTomorrowButton[UserSettings.CurrentLang];
      DatePickerHeader.appendChild(PickTomorrowBtn);
    }
    if (DatePickerSettings.in_2_days_btn) {
      let PickIn2DaysButton = document.createElement("button");
      PickIn2DaysButton.id = "pick-in-2-days-button";
      PickIn2DaysButton.innerText = DPStrings.PickIn2DaysButton[UserSettings.CurrentLang];
      DatePickerHeader.appendChild(PickIn2DaysButton);
    }
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
    NextMonthButton.innerHTML = '<img src="Icons/RightArrowIcon.png">';
    PreviousMonthButton.innerHTML = '<img src="Icons/LeftArrowIcon.png">';
    YearMonthContainer.id = "year-month-container";
    Month.id = "month";
    Year.id = "year";
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
      PickDayButton.id = "Day-" + Counter.toString().padStart(2,"0");
      PickDayButton.setAttribute("data-Day", Counter);
      PickDayButton.innerText = Counter;
      PickDay.appendChild(PickDayButton);
    }
    DatePickerElement.appendChild(PickDay);
    if (DatePickerSettings.time_picker) {
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

      const increaseHourButton = document.createElement("button");
      increaseHourButton.id = "increament-hour";
      const increaseHourImage = document.createElement("img");
      increaseHourImage.src = "Icons/UpArrowIcon.png";
      increaseHourButton.appendChild(increaseHourImage);

      const decreaseHourButton = document.createElement("button");
      decreaseHourButton.id = "decreament-hour";
      const decreaseHourImage = document.createElement("img");
      decreaseHourImage.src = "Icons/DownArrowIcon.png";
      decreaseHourButton.appendChild(decreaseHourImage);

      tweakTimeButtons1.appendChild(increaseHourButton);
      tweakTimeButtons1.appendChild(decreaseHourButton);

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

      const increaseMinuteButton = document.createElement("button");
      increaseMinuteButton.id = "increament-minute";
      const increaseMinuteImage = document.createElement("img");
      increaseMinuteImage.src = "Icons/UpArrowIcon.png";
      increaseMinuteButton.appendChild(increaseMinuteImage);

      const decreaseMinuteButton = document.createElement("button");
      decreaseMinuteButton.id = "decreament-minute";
      const decreaseMinuteImage = document.createElement("img");
      decreaseMinuteImage.src = "Icons/DownArrowIcon.png";
      decreaseMinuteButton.appendChild(decreaseMinuteImage);

      tweakTimeButtons2.appendChild(increaseMinuteButton);
      tweakTimeButtons2.appendChild(decreaseMinuteButton);

      timePickerInnerContainer2.appendChild(taskMinuteInput);
      timePickerInnerContainer2.appendChild(tweakTimeButtons2);

      // Append all elements to the main container div
      container.appendChild(timePickerInnerContainer1);
      container.appendChild(timePickerSeparator);
      container.appendChild(timePickerInnerContainer2);

      // Append the main container div to the document body
      DatePickerElement.appendChild(container);
    }
    TargetInput.parentNode.insertBefore(DatePickerElement, TargetInput.nextSibling);
    DatePicker("Today");
    AddDatePickerEventListeners();
    if (DatePickerSettings.time_picker) {
      AddTimePickerEventListeners();
      TimePicker("LoadCurrentTime");
    }
    AssignWidthToDatePicker();
  }
}
function AddDatePickerEventListeners() {
  let TargetInput = document.getElementById(TargetInputID.toString());
  if (DatePickerSettings.today_btn) {
    let PickTodayButton = document.getElementById("pick-today-button");
    PickTodayButton.addEventListener("click", function () {
      DatePicker("Today");
      DatePicker("DisplayDateStringIntoInput");
    });
  }
  if (DatePickerSettings.tomorrow_btn) {
    let PickTomorrowButton = document.getElementById("pick-tomorrow-button");
    PickTomorrowButton.addEventListener("click", function () {
      DatePicker("Tomorrow");
      DatePicker("DisplayDateStringIntoInput");
    });
  }
  if (DatePickerSettings.in_2_days_btn) {
    let PickIn2DaysButton = document.getElementById("pick-in-2-days-button");
    PickIn2DaysButton.addEventListener("click", function () {
      DatePicker("In2Days");
      DatePicker("DisplayDateStringIntoInput");
    });
  }
  let NextMonthButton = document.getElementById("next-month");
  let PreviousMonthButton = document.getElementById("previous-month");
  let DayButtons = document.querySelectorAll(".pick-day-button");
  NextMonthButton.addEventListener("click", function () {
    DatePicker("NextMonth");
  });
  PreviousMonthButton.addEventListener("click", function () {
    DatePicker("PreviousMonth");
  });
  for (IndexOfButton = 0; IndexOfButton < DayButtons.length; IndexOfButton++) {
    DayButtons[IndexOfButton].addEventListener("click", function () {
      PickDay(Number(this.innerText), this.id);
    });
  }
}
function PickDay(Day, ID) {
  if (DatePickerSettings.type === "Solar") {
    DateObject.SolarDay = Day;
    DatePicker("FormatSolarDate");
    DatePicker("GetGregorianDate");
    DatePicker("DisplayDateStringIntoInput");
    HighLightSelectedDay(ID);
    console.log(ExtractDate("Solar", "String"));
  }
  if (DatePickerSettings.type === "Gregorian") {
    DateObject.GregorianDay = Day;
    DatePicker("FormatGregorianDate");
    DatePicker("DisplayDateStringIntoInput");
    HighLightSelectedDay(ID);
    console.log(ExtractDate("Gregorian", "String"));
  }
}
function AddTimePickerEventListeners() {
  let IncreamentHourButton = document.getElementById("increament-hour");
  let IncreamentMinuteButton = document.getElementById("increament-minute");
  let DecreamentHourButton = document.getElementById("decreament-hour");
  let DecreamenMinuteButton = document.getElementById("decreament-minute");
  IncreamentHourButton.addEventListener("click", function () {
    TimePicker("IncreamentHour");
    TimePicker("FormatTimePickerInputs");
    TimePicker("FormatTime");
  });
  IncreamentMinuteButton.addEventListener("click", function () {
    TimePicker("IncreamentMinute");
    TimePicker("FormatTimePickerInputs");
    TimePicker("FormatTime");
  });
  DecreamentHourButton.addEventListener("click", function () {
    TimePicker("DecreamentHour");
    TimePicker("FormatTimePickerInputs");
    TimePicker("FormatTime");
  });
  DecreamenMinuteButton.addEventListener("click", function () {
    TimePicker("DecreamentMinute");
    TimePicker("FormatTimePickerInputs");
    TimePicker("FormatTime");
  });
}
function DatePicker(Action) {
  const TargetInput = document.getElementById(TargetInputID.toString());
  const Month = document.getElementById("month");
  const Year = document.getElementById("year");
  const DayButtons = document.querySelectorAll(".pick-day-button");
  let SolarMonthArray = [
    "",
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
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
  if (Action === "FormatSolarDate") {
    switch (Number(DateObject.SolarDay)) {
      case 0:
        DateObject.SolarDay = "00";
        break;
      case 1:
        DateObject.SolarDay = "01";
        break;
      case 2:
        DateObject.SolarDay = "02";
        break;
      case 3:
        DateObject.SolarDay = "03";
        break;
      case 4:
        DateObject.SolarDay = "04";
        break;
      case 5:
        DateObject.SolarDay = "05";
        break;
      case 6:
        DateObject.SolarDay = "06";
        break;
      case 7:
        DateObject.SolarDay = "07";
        break;
      case 8:
        DateObject.SolarDay = "08";
        break;
      case 9:
        DateObject.SolarDay = "09";
        break;
    }
    switch (Number(DateObject.SolarMonth)) {
      case 0:
        DateObject.SolarMonth = "00";
        break;
      case 1:
        DateObject.SolarMonth = "01";
        break;
      case 2:
        DateObject.SolarMonth = "02";
        break;
      case 3:
        DateObject.SolarMonth = "03";
        break;
      case 4:
        DateObject.SolarMonth = "04";
        break;
      case 5:
        DateObject.SolarMonth = "05";
        break;
      case 6:
        DateObject.SolarMonth = "06";
        break;
      case 7:
        DateObject.SolarMonth = "07";
        break;
      case 8:
        DateObject.SolarMonth = "08";
        break;
      case 9:
        DateObject.SolarMonth = "09";
        break;
    }
  }
  if (Action === "FormatGregorianDate") {
    switch (Number(DateObject.GregorianDay)) {
      case 0:
        DateObject.GregorianDay = "00";
        break;
      case 1:
        DateObject.GregorianDay = "01";
        break;
      case 2:
        DateObject.GregorianDay = "02";
        break;
      case 3:
        DateObject.GregorianDay = "03";
        break;
      case 4:
        DateObject.GregorianDay = "04";
        break;
      case 5:
        DateObject.GregorianDay = "05";
        break;
      case 6:
        DateObject.GregorianDay = "06";
        break;
      case 7:
        DateObject.GregorianDay = "07";
        break;
      case 8:
        DateObject.GregorianDay = "08";
        break;
      case 9:
        DateObject.GregorianDay = "09";
        break;
    }
    switch (Number(DateObject.GregorianMonth)) {
      case 0:
        DateObject.GregorianMonth = "00";
        break;
      case 1:
        DateObject.GregorianMonth = "01";
        break;
      case 2:
        DateObject.GregorianMonth = "02";
        break;
      case 3:
        DateObject.GregorianMonth = "03";
        break;
      case 4:
        DateObject.GregorianMonth = "04";
        break;
      case 5:
        DateObject.GregorianMonth = "05";
        break;
      case 6:
        DateObject.GregorianMonth = "06";
        break;
      case 7:
        DateObject.GregorianMonth = "07";
        break;
      case 8:
        DateObject.GregorianMonth = "08";
        break;
      case 9:
        DateObject.GregorianMonth = "09";
        break;
    }
  }
  if (Action === "CheckDaysOfTheMonth") {
    if (DatePickerSettings.type === "Solar") {
      if (Number(DateObject.SolarMonth) <= 6) {
        DayButtons[30].removeAttribute("inert");
        DayButtons[30].style = "";
      }
      if (Number(DateObject.SolarMonth) > 6) {
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
  if (Action === "Today") {
    if (DatePickerSettings.type === "Solar") {
      let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
      let GregorianMonth = new Date().getMonth() + 1;
      let GregorianDay = new Date().getDate();
      let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
      DateObject.SolarYear = FullSolarDate[0];
      DateObject.SolarMonth = FullSolarDate[1];
      DateObject.SolarDay = FullSolarDate[2];
      DatePicker("FormatSolarDate");
      DatePicker("GetGregorianDate");
      Year.innerText = DateObject.SolarYear;
      Month.innerText = SolarMonthArray[DateObject.SolarMonth];
      HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
      DatePicker("CheckDaysOfTheMonth");
      console.log(ExtractDate("Solar", "String"));
    }
    if (DatePickerSettings.type === "Gregorian") {
      let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
      let GregorianMonth = new Date().getMonth() + 1;
      let GregorianDay = new Date().getDate();
      DateObject.GregorianYear = GregorianYear;
      DateObject.GregorianMonth = GregorianMonth;
      DateObject.GregorianDay = GregorianDay;
      DatePicker("FormatGregorianDate");
      Year.innerText = DateObject.GregorianYear;
      Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
      HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
      DatePicker("CheckDaysOfTheMonth");
      console.log(ExtractDate("Gregorian", "String"));
    }
  }
  if (Action === "Tomorrow") {
    DatePicker("Today");
    if (DatePickerSettings.type === "Solar") {
      if (Number(DateObject.SolarMonth) <= 6) {
        if (Number(DateObject.SolarDay) < 31) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate();
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay + 1, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth + 1, 1, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        }
      }
      if (Number(DateObject.SolarMonth) > 6) {
        if (Number(DateObject.SolarDay) < 30) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate();
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay + 1, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth + 1, 1, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        }
      }
    }
    if (DatePickerSettings.type === "Gregorian") {
      if (Number(DateObject.GregorianMonth) <= 6) {
        if (Number(DateObject.GregorianDay) < 31) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate() + 1;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 2;
          let GregorianDay = 1;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        }
      }
      if (Number(DateObject.GregorianMonth) > 6) {
        if (Number(DateObject.GregorianDay) < 30) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate() + 1;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 2;
          let GregorianDay = 1;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        }
      }
    }
  }
  if (Action === "In2Days") {
    DatePicker("Today");
    if (DatePickerSettings.type === "Solar") {
      if (Number(DateObject.SolarMonth) <= 6) {
        if (Number(DateObject.SolarDay) < 31) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate();
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay + 2, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth + 1, 2, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        }
      }
      if (Number(DateObject.SolarMonth) > 6) {
        if (Number(DateObject.SolarDay) < 30) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate();
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay + 2, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth + 1, 2, "array");
          DateObject.SolarYear = FullSolarDate[0];
          DateObject.SolarMonth = FullSolarDate[1];
          DateObject.SolarDay = FullSolarDate[2];
          DatePicker("FormatSolarDate");
          DatePicker("GetGregorianDate");
          Year.innerText = DateObject.SolarYear;
          Month.innerText = SolarMonthArray[DateObject.SolarMonth];
          HighLightSelectedDay(`Day-${DateObject.SolarDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Solar", "String"));
        }
      }
    }
    if (DatePickerSettings.type === "Gregorian") {
      if (DateObject.GregorianMonth <= 6) {
        if (DateObject.GregorianDay < 31) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate() + 2;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 2;
          let GregorianDay = 2;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[DateObject.GregorianMonth];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        }
      }
      if (DateObject.GregorianMonth > 6) {
        if (DateObject.GregorianDay < 30) {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 1;
          let GregorianDay = new Date().getDate() + 2;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        } else {
          let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
          let GregorianMonth = new Date().getMonth() + 2;
          let GregorianDay = 2;
          DateObject.GregorianYear = GregorianYear;
          DateObject.GregorianMonth = GregorianMonth;
          DateObject.GregorianDay = GregorianDay;
          DatePicker("FormatGregorianDate");
          Year.innerText = DateObject.GregorianYear;
          Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
          HighLightSelectedDay(`Day-${DateObject.GregorianDay}`);
          DatePicker("CheckDaysOfTheMonth");
          console.log(ExtractDate("Gregorian", "String"));
        }
      }
    }
  }
  if (Action === "NextMonth") {
    if (DatePickerSettings.type === "Solar") {
      if (Number(DateObject.SolarMonth) >= 12) {
        let NumYear = Number(DateObject.SolarYear);
        DateObject.SolarYear = NumYear + 1;
        DateObject.SolarMonth = 1;
        DatePicker("FormatSolarDate");
        Year.innerText = DateObject.SolarYear;
        Month.innerText = SolarMonthArray[Number(DateObject.SolarMonth)];
        DatePicker("GetGregorianDate");
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Solar", "String"));
      } else {
        let NumMonth = Number(DateObject.SolarMonth);
        DateObject.SolarMonth = NumMonth + 1;
        DatePicker("FormatSolarDate");
        Month.innerText = SolarMonthArray[Number(DateObject.SolarMonth)];
        DatePicker("GetGregorianDate");
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Solar", "String"));
      }
    }
    if (DatePickerSettings.type === "Gregorian") {
      if (Number(DateObject.GregorianMonth) >= 12) {
        let NumYear = Number(DateObject.GregorianYear);
        DateObject.GregorianYear = NumYear + 1;
        DateObject.GregorianMonth = 1;
        DatePicker("FormatGregorianDate");
        Year.innerText = DateObject.GregorianYear;
        Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Gregorian", "String"));
      } else {
        let NumMonth = Number(DateObject.GregorianMonth);
        DateObject.GregorianMonth = NumMonth + 1;
        DatePicker("FormatGregorianDate");
        Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Gregorian", "String"));
      }
    }
  }
  if (Action === "PreviousMonth") {
    if (DatePickerSettings.type === "Solar") {
      if (Number(DateObject.SolarMonth) <= 1) {
        let NumYear = Number(DateObject.SolarYear);
        DateObject.SolarYear = NumYear - 1;
        DateObject.SolarMonth = 12;
        DatePicker("FormatSolarDate");
        DatePicker("FormatGregorianDate");
        Year.innerText = Number(DateObject.SolarYear);
        Month.innerText = SolarMonthArray[Number(DateObject.SolarMonth)];
        DatePicker("GetGregorianDate");
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Solar", "String"));
      } else {
        let NumMonth = Number(DateObject.SolarMonth);
        DateObject.SolarMonth = NumMonth - 1;
        DatePicker("FormatSolarDate");
        Month.innerText = SolarMonthArray[Number(DateObject.SolarMonth)];
        DatePicker("GetGregorianDate");
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Solar", "String"));
      }
    }
    if (DatePickerSettings.type === "Gregorian") {
      if (Number(DateObject.GregorianMonth) <= 1) {
        let NumYear = Number(DateObject.GregorianYear);
        DateObject.GregorianYear = NumYear - 1;
        DateObject.GregorianMonth = 12;
        DatePicker("FormatGregorianDate");
        Year.innerText = Number(DateObject.GregorianYear);
        Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Gregorian", "String"));
      } else {
        let NumMonth = Number(DateObject.GregorianMonth);
        DateObject.GregorianMonth = NumMonth - 1;
        DatePicker("FormatGregorianDate");
        Month.innerText = GregorianMonthArray[Number(DateObject.GregorianMonth)];
        DatePicker("DisplayDateStringIntoInput");
        DatePicker("CheckDaysOfTheMonth");
        console.log(ExtractDate("Gregorian", "String"));
      }
    }
  }
  if (Action === "GetGregorianDate") {
    DatePicker("FormatGregorianDate")
    let FullGregorianDate = farvardin.solarToGregorian(
      Number(DateObject.SolarYear),
      Number(DateObject.SolarMonth),
      Number(DateObject.SolarDay),
      "array"
    );
    DateObject.GregorianYear = FullGregorianDate[0];
    DateObject.GregorianMonth = FullGregorianDate[1];
    DateObject.GregorianDay = FullGregorianDate[2];
  }
  if (Action === "DisplayDateStringIntoInput") {
    if (DatePickerSettings.type === "Solar") {
      if (TargetInput) {
        TargetInput.value = ExtractDate("Solar", "String");
      }
    }
    if (DatePickerSettings.type === "Gregorian") {
      if (TargetInput) {
        TargetInput.value = ExtractDate("Gregorian", "String");
      }
    }
  }
}
function TimePicker(action) {
  const TaskHourInput = document.getElementById("task-hour-input");
  const TaskMinuteInput = document.getElementById("task-minute-input");
  if (action === "FormatTimePickerInputs") {
    if (TaskHourInput.value < 0) {
      TaskHourInput.value = "00";
    }
    if (TaskMinuteInput.value < 0) {
      TaskMinuteInput.value = "00";
    }
    switch (parseInt(TaskHourInput.value)) {
      case 0:
        TaskHourInput.value = "00";
        break;
      case 1:
        TaskHourInput.value = "01";
        break;
      case 2:
        TaskHourInput.value = "02";
        break;
      case 3:
        TaskHourInput.value = "03";
        break;
      case 4:
        TaskHourInput.value = "04";
        break;
      case 5:
        TaskHourInput.value = "05";
        break;
      case 6:
        TaskHourInput.value = "06";
        break;
      case 7:
        TaskHourInput.value = "07";
        break;
      case 8:
        TaskHourInput.value = "08";
        break;
      case 9:
        TaskHourInput.value = "09";
        break;
      case 24:
        TaskHourInput.value = "00";
        break;
    }
    switch (parseInt(TaskMinuteInput.value)) {
      case 0:
        TaskMinuteInput.value = "00";
        break;
      case 1:
        TaskMinuteInput.value = "01";
        break;
      case 2:
        TaskMinuteInput.value = "02";
        break;
      case 3:
        TaskMinuteInput.value = "03";
        break;
      case 4:
        TaskMinuteInput.value = "04";
        break;
      case 5:
        TaskMinuteInput.value = "05";
        break;
      case 6:
        TaskMinuteInput.value = "06";
        break;
      case 7:
        TaskMinuteInput.value = "07";
        break;
      case 8:
        TaskMinuteInput.value = "08";
        break;
      case 9:
        TaskMinuteInput.value = "09";
        break;
      case 60:
        TaskMinuteInput.value = "00";
        TaskHourInput.value = parseInt(TaskHourInput.value) + 1;
        TimePicker("FormatTimePickerInputs");
        break;
    }
  }
  if (action === "FormatTime") {
    switch (parseInt(DateObject.Hour)) {
      case 0:
        DateObject.Hour = "00";
        break;
      case 1:
        DateObject.Hour = "01";
        break;
      case 2:
        DateObject.Hour = "02";
        break;
      case 3:
        DateObject.Hour = "03";
        break;
      case 4:
        DateObject.Hour = "04";
        break;
      case 5:
        DateObject.Hour = "05";
        break;
      case 6:
        DateObject.Hour = "06";
        break;
      case 7:
        DateObject.Hour = "07";
        break;
      case 8:
        DateObject.Hour = "08";
        break;
      case 9:
        DateObject.Hour = "09";
        break;
    }
    switch (parseInt(DateObject.Minute)) {
      case 0:
        DateObject.Minute = "00";
        break;
      case 1:
        DateObject.Minute = "01";
        break;
      case 2:
        DateObject.Minute = "02";
        break;
      case 3:
        DateObject.Minute = "03";
        break;
      case 4:
        DateObject.Minute = "04";
        break;
      case 5:
        DateObject.Minute = "05";
        break;
      case 6:
        DateObject.Minute = "06";
        break;
      case 7:
        DateObject.Minute = "07";
        break;
      case 8:
        DateObject.Minute = "08";
        break;
      case 9:
        DateObject.Minute = "09";
        break;
    }
  }
  if (action === "LoadCurrentTime") {
    console.log("Loading Current Time Into DateObject");
    TaskHourInput.value = new Date().getHours();
    TaskMinuteInput.value = new Date().getMinutes();
    DateObject.Hour = new Date().getHours();
    DateObject.Minute = new Date().getMinutes();
    TimePicker("FormatTime");
    TimePicker("FormatTimePickerInputs");
  }
  if (action === "IncreamentHour") {
    TaskHourInput.value = parseInt(TaskHourInput.value) + 1;
    DateObject.Hour = parseInt(TaskHourInput.value);
  }
  if (action === "IncreamentMinute") {
    TaskMinuteInput.value = parseInt(TaskMinuteInput.value) + 1;
    DateObject.Minute = parseInt(TaskMinuteInput.value);
  }
  if (action === "DecreamentHour") {
    TaskHourInput.value = parseInt(TaskHourInput.value) - 1;
    DateObject.Hour = parseInt(TaskHourInput.value);
  }
  if (action === "DecreamentMinute") {
    TaskMinuteInput.value = parseInt(TaskMinuteInput.value) - 1;
    DateObject.Minute = parseInt(TaskMinuteInput.value);
  }
}
function HighLightSelectedDay(ID) {
  console.log(ID);
  const DayButtons = document.querySelectorAll(".pick-day-button");
  for (n of DayButtons) {
    if (n.className.includes("selected-day")) {
      n.className = "pick-day-button";
      n.style = "";
      n.style = "";
    }
  }
  document.getElementById(ID).classList.add("selected-day");
  document.getElementById(ID).style.backgroundColor = "#40C057";
  document.getElementById(ID).style.transform = "scale(1.1)";
}
function ExtractDate(Request, DateType) {
  if (Request === "Gregorian") {
    if (DateType === "Object") {
      return { Year: Number(DateObject.GregorianYear), Month: Number(DateObject.GregorianMonth), Day: Number(DateObject.GregorianDay) };
    } else if (DateType === "String") {
      return `${DateObject.GregorianYear} / ${DateObject.GregorianMonth} / ${DateObject.GregorianDay}`;
    }
  }
  if (Request === "Solar") {
    if (DateType === "Object") {
      return { Year: Number(DateObject.SolarYear), Month: Number(DateObject.SolarMonth), Day: Number(DateObject.SolarDay) };
    } else if (DateType === "String") {
      return `${DateObject.SolarYear} / ${DateObject.SolarMonth} / ${DateObject.SolarDay}`;
    }
  }
  if (Request === "Numeric") {
    DatePicker("FormatGregorianDate");
    let DateString = `${DateObject.GregorianYear}-${DateObject.GregorianMonth}-${DateObject.GregorianDay}T${DateObject.Hour}:${DateObject.Minute}:00`;
    return new Date(DateString).getTime();
  }
}
