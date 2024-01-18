let TextIndex = 0;
// Sub Components
function AutoWriter() {
  let TextArray;
  switch (UserSettings.CurrentLang) {
    case "en":
      TextArray = EnglishTextArray;
      break;
    case "fa":
      TextArray = PersianTextArray;
      break;
    case "ar":
      TextArray = ArabicTextArray;
      break;
    case "fr":
      TextArray = FrenchTextArray;
      break;
    case "es":
      TextArray = SpanishTextArray;
      break;
    case "de":
      TextArray = GermanTextArray;
      break;
    case "ru":
      TextArray = RussianTextArray;
      break;
    case "pt":
      TextArray = PortugueseTextArray;
      break;
    case "zh":
      TextArray = ChineseTextArray;
      break;
    case "ja":
      TextArray = JapaneseTextArray;
      break;
    case "hi":
      TextArray = HindiTextArray;
      break;
    case "kr":
      TextArray = KoreanTextArray;
      break;
    case "ur":
      TextArray = UrduTextArray;
      break;
  }
  if (TextIndex < TextArray.length) {
    let Text = TextArray[TextIndex];
    let LetterArray = Text.split("");
    let LetterIndex = 0;
    let AutoWriterInterval = setInterval(function () {
      if (LetterIndex < LetterArray.length) {
        document.getElementById("display-text").append(LetterArray[LetterIndex]);
        LetterIndex++;
      } else {
        clearInterval(AutoWriterInterval);
        setTimeout(function () {
          let RemoveLetters = setInterval(function () {
            if (document.getElementById("display-text").innerText === "") {
              clearInterval(RemoveLetters);
              setTimeout(function () {
                TextIndex++;
                AutoWriter();
              }, 1500);
            }
            document.getElementById("display-text").innerText = document
              .getElementById("display-text")
              .innerText.substring(0, document.getElementById("display-text").innerText.length - 1);
          }, 100);
        }, 5000);
      }
    }, 100);
  } else {
    TextIndex = 0;
    AutoWriter();
  }
}
function ShowDateAndClock() {
  switch (UserSettings.Calendar) {
    case "Solar":
      document.getElementById("full-date").innerText = ExtractDate("Solar", "String");
      break;
    default:
      document.getElementById("full-date").innerText = ExtractDate("Gregorian", "String");
      break;
  }
}
function GetTime() {
  let TimeIcon = document.getElementById("time-icon");
  let Hour = new Date().getHours();
  if (Hour === 0) {
    Hour = 12;
  }
  switch (Hour) {
    case 0:
      Hour = 12;
      break;
  }
  if ((Hour > 0 && Hour < 5) || Hour >= 18 || Hour === 0) {
    TimeIcon.innerHTML = '<img src="Icons/MoonIcon.png" alt="" />';
  }
  if (Hour > 5 && Hour < 18) {
    TimeIcon.innerHTML = '<img src="Icons/SunIcon.png" alt="" />';
  }
  let Minutes = new Date().getMinutes();
  switch (Minutes) {
    case 0:
      Minutes = "00";
      break;
    case 1:
      Minutes = "01";
      break;
    case 2:
      Minutes = "02";
      break;
    case 3:
      Minutes = "03";
      break;
    case 4:
      Minutes = "04";
      break;
    case 5:
      Minutes = "05";
      break;
    case 6:
      Minutes = "06";
      break;
    case 7:
      Minutes = "07";
      break;
    case 8:
      Minutes = "08";
      break;
    case 9:
      Minutes = "09";
      break;
  }
  let Seconds = new Date().getSeconds();
  switch (Seconds) {
    case 0:
      Seconds = "00";
      break;
    case 1:
      Seconds = "01";
      break;
    case 2:
      Seconds = "02";
      break;
    case 3:
      Seconds = "03";
      break;
    case 4:
      Seconds = "04";
      break;
    case 5:
      Seconds = "05";
      break;
    case 6:
      Seconds = "06";
      break;
    case 7:
      Seconds = "07";
      break;
    case 8:
      Seconds = "08";
      break;
    case 9:
      Seconds = "09";
      break;
  }
  document.getElementById("time").textContent = `${Hour} : ${Minutes} : ${Seconds}`;
}
function DoesElementExist(ID) {
  if (document.getElementById(ID)) {
    return true;
  } else {
    return false;
  }
}
function GenerateUniqeID(Length) {
  const Min = Math.pow(10, Length - 1);
  const Max = Math.pow(10, Length) - 1;
  let ID = Math.round(Math.random() * (Max - Min - 1)) + 1;
  return ID;
}
