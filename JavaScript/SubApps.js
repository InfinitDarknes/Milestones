let TextIndex = 0;
// Sub Components
function AutoWriter() {
  let DisplayText = document.getElementById("display-text");
  let TextArray, Text, LetterArray, LetterIndex, AutoWriterInterval;
  switch (UserSettings.CurrentLang) {
    case "en":
      TextArray = EnglishTextArray;
      break;
    case "fa":
      TextArray = PersianTextArray;
      break;
  }
  if (TextIndex < TextArray.length) {
    Text = TextArray[TextIndex];
    LetterArray = Text.split("");
    LetterIndex = 0;
    //
    AutoWriterInterval = setInterval(() => {
      if (LetterIndex < LetterArray.length) Write();
      else Remove();
    }, 100);
  } else Reset();
  function Write() {
    DisplayText.append(LetterArray[LetterIndex]);
    LetterIndex++;
  }
  function Reset() {
    TextIndex = 0;
    AutoWriter();
  }
  let RemoveLetters;
  function Remove() {
    clearInterval(AutoWriterInterval);
    setTimeout(() => {
      RemoveLetters = setInterval(() => {
        let Text = DisplayText.innerText.trim();
        if (!DisplayText.innerText) NextSentence();
        else DisplayText.innerText = Text.substring(0, Text.length - 1);
      }, 100);
    }, 5000);
  }
  function NextSentence() {
    clearInterval(RemoveLetters);
    setTimeout(() => {
      TextIndex++;
      AutoWriter();
    }, 1500);
  }
}
function ShowDateAndClock() {
  const FullDate = document.getElementById("full-date");
  switch (UserSettings.Calendar) {
    case "Solar":
      FullDate.innerText = PlacePersianNumbers(ExtractDate("Solar", "String"));
      break;
    default:
      FullDate.innerText = PlacePersianNumbers(ExtractDate("Gregorian", "String"));
      break;
  }
}
function GetTime() {
  let TimeIcon = document.getElementById("time-icon");
  let Time = document.getElementById("time");
  let Hour = new Date().getHours().toString().padStart(2, "0");
  let Minutes = new Date().getMinutes().toString().padStart(2, "0");
  let Seconds = new Date().getSeconds().toString().padStart(2, "0");
  if (Hour === 0) Hour = 12;
  Time.innerText = `${PlacePersianNumbers(Hour)} : ${PlacePersianNumbers(Minutes)} : ${PlacePersianNumbers(Seconds)}`;
  if ((Hour > 0 && Hour < 5) || Hour >= 18 || Hour === 0) TimeIcon.src = IconsSrc.MoonIcon[UserSettings.Theme];
  if (Hour > 5 && Hour < 18) TimeIcon.src = IconsSrc.SunIcon[UserSettings.Theme];
}
function DoesElementExist(ID) {
  if (document.getElementById(ID)) return true;
  else return false;
}
function GenerateUniqeID(Length) {
  const Min = Math.pow(10, Length - 1);
  const Max = Math.pow(10, Length) - 1;
  let ID = Math.abs(Math.round(Math.random() * (Max - Min - 1)) + Min);
  return ID;
}
function FetchLocalStorge() {
  let Keys = Object.keys(localStorage);
  let LocalStorgeObject = {};
  Keys.forEach((Key) => {
    LocalStorgeObject[Key] = localStorage.getItem(Key);
  });
  return JSON.stringify(LocalStorgeObject);
}
function PlacePersianNumbers(String) {
  String = String.toString();
  if (UserSettings.CurrentLang !== "fa") return String;
  const PersianNumbers = [
    { English: "0", Persian: "۰" },
    { English: "1", Persian: "۱" },
    { English: "2", Persian: "۲" },
    { English: "3", Persian: "۳" },
    { English: "4", Persian: "۴" },
    { English: "5", Persian: "۵" },
    { English: "6", Persian: "۶" },
    { English: "7", Persian: "۷" },
    { English: "8", Persian: "۸" },
    { English: "9", Persian: "۹" },
  ];
  for (n = 0; n < PersianNumbers.length; n++) {
    if (String.includes(PersianNumbers[n].English)) {
      String = String.replaceAll(new RegExp(PersianNumbers[n].English, "g"), PersianNumbers[n].Persian);
    }
  }
  return String;
}
