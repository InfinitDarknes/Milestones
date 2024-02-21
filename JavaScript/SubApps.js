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
      FullDate.innerText = ExtractDate("Solar", "String");
      break;
    default:
      FullDate.innerText = ExtractDate("Gregorian", "String");
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
  Time.innerText = `${Hour} : ${Minutes} : ${Seconds}`;
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
