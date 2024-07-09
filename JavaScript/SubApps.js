let TextIndex = 0;
// Sub Components
function AutoWriter() {
  let DisplayText = document.querySelector(".display-text");
  let Texts, Text, LetterArray, LetterIndex, AutoWriterInterval;
  switch (UserSettings.CurrentLang) {
    case "en":
      Texts = TextArray.EnglishTextArray;
      break;
    case "fa":
      Texts = TextArray.PersianTextArray;
      break;
  }
  if (TextIndex < Texts.length) {
    Text = Texts[TextIndex];
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
  const FullDate = document.querySelector(".full-date");
  let GregorianYear = new Date().getFullYear();
  let GregorianMonth = new Date().getMonth() + 1;
  let GregorianDay = new Date().getDate();
  switch (UserSettings.Calendar) {
    case "Solar":
      let FullSolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
      FullDate.innerText = PlacePersianNumbers(
        `${FullSolarDate[0].toString().padStart("2", "0")} / ${FullSolarDate[1].toString().padStart("2", "0")} / ${FullSolarDate[2].toString().padStart("2", "0")}`
      );
      break;
    default:
      FullDate.innerText = PlacePersianNumbers(
        `${GregorianYear.toString().padStart("2", "0")} / ${GregorianMonth.toString().padStart("2", "0")} / ${GregorianDay.toString().padStart("2", "0")}`
      );
      break;
  }
}
function GetTime() {
  let TimeIcon = document.querySelector(".time-icon");
  let Time = document.querySelector(".time");
  let Hour = new Date().getHours().toString();
  let Minutes = new Date().getMinutes().toString();
  let Seconds = new Date().getSeconds().toString();
  if (Hour === 0) Hour = 12;
  Time.innerText = `${PlacePersianNumbers(Hour.padStart(2, "0"))} : ${PlacePersianNumbers(Minutes.padStart(2, "0"))} : ${PlacePersianNumbers(Seconds.padStart(2, "0"))}`;
  if ((+Hour > 0 && +Hour < 5) || +Hour >= 18 || +Hour === 0) TimeIcon.src = "../Icons/moon-line.svg";
  if (+Hour > 5 && +Hour < 18) TimeIcon.src = "../Icons/sun-line.svg";
}
function DoesElementExist(ID) {
  if (document.getElementById(ID)) return true;
  else return false;
}
function GetRandomNumber(Min, Max) {
  return Math.floor(Math.random() * (Max - Min + 1)) + Min;
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
function InitTinyMce(Target, ReadOnly) {
  tinymce.init({
    target: Target,
    readonly: ReadOnly,
    plugins: "lists codesample link autolink quickbars searchreplace",
    toolbar: "undo redo | styles | bold italic code | outdent indent | alignleft aligncenter alignright | numlist bullist | codesample link quicktable | searchreplace",
    quickbars_selection_toolbar: "bold italic | blocks | quicklink blockquote",
    license_key: "gpl",
    skin: UserSettings.Theme === "Dark" ? "oxide-dark" : UserSettings.Theme === "Light" ? "oxide" : "oxide",
  });
}
function DisplayMessage(Type, Message) {
  const MessageBox = document.querySelector(".msg-box");
  if (MessageBox) MessageBox.remove();
  // Define
  const MsgBox = document.createElement("section");
  const MsgTypeWrapper = document.createElement("div");
  const MsgTypeIcon = document.createElement("img");
  const MsgTypeText = document.createElement("span");
  const ActuallMsg = document.createElement("span");
  // ClassName
  MsgBox.className = "msg-box";
  MsgTypeWrapper.className = "msg-type-wrapper";
  MsgTypeIcon.className = "msg-type-icon icon";
  MsgTypeText.className = "msg-type-text text";
  ActuallMsg.className = "msg-text text";
  // InnerText and src
  ActuallMsg.innerHTML = Message;
  switch (Type) {
    case "Error":
      MsgTypeIcon.src = "../Icons/error-warning-line.svg";
      MsgTypeText.classList.add("error");
      MsgTypeText.innerHTML = MessageBoxStrings.Error[UserSettings.CurrentLang];
      break;
    case "Success":
      MsgTypeIcon.src = "../Icons/checkbox-circle-line.svg";
      MsgTypeText.classList.add("success");
      MsgTypeText.innerHTML = MessageBoxStrings.Success[UserSettings.CurrentLang];
      break;
    default:
      MsgTypeText.innerHTML = MessageBoxStrings.Defualt[UserSettings.CurrentLang];
      break;
  }
  // Final
  MsgTypeWrapper.append(MsgTypeIcon, MsgTypeText);
  MsgBox.append(MsgTypeWrapper, ActuallMsg);
  document.body.append(MsgBox);
}
