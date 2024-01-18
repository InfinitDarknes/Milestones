const UserSettings = {
  CurrentLang: null,
  AutoWriter: null,
  SideBar: null,
  TopBar: null,
  AutoBackUp: null,
  Calendar: null,
  ClockFormat: null,
  Theme: null,
};
function DisplaySettings() {
  if (DoesElementExist("settings-container")) return;
  const SettingsContainer = document.createElement("section");
  const SettingItemsContainer = document.createElement("section");
  SettingItemsContainer.id = "setting-items-container";
  SettingsContainer.id = "settings-container";
  // Setting Title and hide setting button
  const SettingHeader = document.createElement("header");
  const SettingTitle = document.createElement("span");
  const HideSettingButton = document.createElement("button");
  const HideSettingButtonIcon = document.createElement("img");
  SettingHeader.id = "settings-header";
  SettingTitle.id = "settings-title";
  HideSettingButton.id = "hide-settings-button";
  HideSettingButtonIcon.id = "hide-settings-button-icon";
  SettingTitle.innerText = Strings.SettingTitle[UserSettings.CurrentLang];
  HideSettingButtonIcon.src = "Icons/CrossSign.png";
  HideSettingButton.addEventListener("click", HideSettings);
  SettingHeader.appendChild(SettingTitle);
  SettingHeader.appendChild(HideSettingButton);
  HideSettingButton.appendChild(HideSettingButtonIcon);
  SettingsContainer.appendChild(SettingHeader);
  SettingsContainer.appendChild(SettingItemsContainer);
  document.body.appendChild(SettingsContainer);
  // Lang
  const LanguageSettingContainer = document.createElement("section");
  const LanguageSettingTitle = document.createElement("span");
  const LanguageSettingSelectBox = document.createElement("select");
  LanguageSettingContainer.className = "setting-item";
  LanguageSettingTitle.className = "setting-title";
  LanguageSettingSelectBox.className = "setting-select-box";
  LanguageSettingTitle.innerText = Strings.LanguageSetting[UserSettings.CurrentLang];
  LanguageSettingTitle.id = "language-setting-title";
  LanguageSettingSelectBox.id = "language-select-box";
  LanguageSettingContainer.appendChild(LanguageSettingTitle);
  LanguageSettingContainer.appendChild(LanguageSettingSelectBox);
  SettingItemsContainer.appendChild(LanguageSettingContainer);
  // English
  const EN = document.createElement("option");
  EN.innerText = "English";
  EN.id = "lang-en";
  EN.value = "en";
  EN.addEventListener("click", function () {
    LanguageSwitcher("en");
  });
  LanguageSettingSelectBox.appendChild(EN);
  // Parsi/Farsi/Persian
  const FA = document.createElement("option");
  FA.innerText = "پارسی";
  FA.id = "lang-fa";
  FA.value = "fa";
  FA.title = "Persian";
  FA.addEventListener("click", function () {
    LanguageSwitcher("fa");
  });
  LanguageSettingSelectBox.appendChild(FA);
  // Arabic
  const AR = document.createElement("option");
  AR.innerText = "العربية";
  AR.id = "lang-ar";
  AR.value = "ar";
  AR.title = "Arabic";
  AR.addEventListener("click", function () {
    LanguageSwitcher("ar");
  });
  LanguageSettingSelectBox.appendChild(AR);
  // Spanish
  const ES = document.createElement("option");
  ES.innerText = "Español";
  ES.id = "lang-es";
  ES.value = "es";
  ES.title = "Spanish";
  ES.addEventListener("click", function () {
    LanguageSwitcher("es");
  });
  LanguageSettingSelectBox.appendChild(ES);
  // French
  const FR = document.createElement("option");
  FR.innerText = "Français";
  FR.id = "lang-fr";
  FR.value = "fr";
  FR.title = "French";
  FR.addEventListener("click", function () {
    LanguageSwitcher("fr");
  });
  LanguageSettingSelectBox.appendChild(FR);
  // German
  const DE = document.createElement("option");
  DE.innerText = "Deutsch";
  DE.id = "lang-de";
  DE.value = "de";
  DE.title = "German";
  DE.addEventListener("click", function () {
    LanguageSwitcher("de");
  });
  LanguageSettingSelectBox.appendChild(DE);
  // Russian
  const RU = document.createElement("option");
  RU.innerText = "Русский";
  RU.id = "lang-ru";
  RU.value = "ru";
  RU.title = "Russian";
  RU.addEventListener("click", function () {
    LanguageSwitcher("ru");
  });
  LanguageSettingSelectBox.appendChild(RU);
  // Chinese
  const ZH = document.createElement("option");
  ZH.innerText = "中文";
  ZH.id = "lang-zh";
  ZH.value = "zh";
  ZH.title = "Chineese";
  ZH.addEventListener("click", function () {
    LanguageSwitcher("zh");
  });
  LanguageSettingSelectBox.appendChild(ZH);
  // Hindi
  const HI = document.createElement("option");
  HI.innerText = "हिन्दी";
  HI.id = "lang-hi";
  HI.value = "hi";
  HI.title = "Indian";
  HI.addEventListener("click", function () {
    LanguageSwitcher("hi");
  });
  LanguageSettingSelectBox.appendChild(HI);
  // Japanese
  const JA = document.createElement("option");
  JA.innerText = "日本語";
  JA.id = "lang-ja";
  JA.value = "ja";
  JA.title = "Japeneese";
  JA.addEventListener("click", function () {
    LanguageSwitcher("ja");
  });
  // Korean
  const KR = document.createElement("option");
  KR.innerText = "한국어";
  KR.id = "lang-kr";
  KR.value = "kr";
  KR.title = "Korean";
  KR.addEventListener("click", function () {
    LanguageSwitcher("kr");
  });
  LanguageSettingSelectBox.appendChild(KR);
  // Portuguese
  const PT = document.createElement("option");
  PT.innerText = "Português";
  PT.id = "lang-pt";
  PT.value = "pt";
  PT.title = "Portugues";
  PT.addEventListener("click", function () {
    LanguageSwitcher("pt");
  });
  LanguageSettingSelectBox.appendChild(PT);
  // Urdu
  const UR = document.createElement("option");
  UR.innerText = "اردو";
  UR.id = "lang-ur";
  UR.value = "ur";
  UR.title = "Urdu";
  UR.addEventListener("click", function () {
    LanguageSwitcher("ur");
  });
  LanguageSettingSelectBox.appendChild(UR);
  // Sidebar Setting
  const SideBarSettingContainer = document.createElement("section");
  const SideBarSettingTitle = document.createElement("span");
  const SideBarSettingSelectBox = document.createElement("select");
  SideBarSettingContainer.className = "setting-item";
  SideBarSettingTitle.className = "setting-title";
  SideBarSettingTitle.id = "sidebar-setting-title";
  SideBarSettingSelectBox.className = "setting-select-box";
  SideBarSettingTitle.innerText = Strings.SideBarSetting[UserSettings.CurrentLang];
  SideBarSettingContainer.appendChild(SideBarSettingTitle);
  SideBarSettingContainer.appendChild(SideBarSettingSelectBox);
  SettingItemsContainer.appendChild(SideBarSettingContainer);
  // Sidebar Setting Options
  const HideSideBarOption = document.createElement("option");
  HideSideBarOption.innerText = Strings.HideSideBarOption[UserSettings.CurrentLang];
  HideSideBarOption.id = "hide-sidebar-option";
  const ShowSideBarOption = document.createElement("option");
  ShowSideBarOption.innerText = Strings.ShowSideBarOption[UserSettings.CurrentLang];
  ShowSideBarOption.id = "show-sidebar-option";
  SideBarSettingSelectBox.appendChild(ShowSideBarOption);
  SideBarSettingSelectBox.appendChild(HideSideBarOption);
  // Topbar Setting
  const TopBarSettingContainer = document.createElement("section");
  const TopBarSettingTitle = document.createElement("span");
  const TopBarSettingSelectBox = document.createElement("select");
  TopBarSettingContainer.className = "setting-item";
  TopBarSettingTitle.className = "setting-title";
  TopBarSettingTitle.id = "topbar-setting-title";
  TopBarSettingSelectBox.className = "setting-select-box";
  TopBarSettingTitle.innerText = Strings.TopBarSetting[UserSettings.CurrentLang];
  TopBarSettingContainer.appendChild(TopBarSettingTitle);
  TopBarSettingContainer.appendChild(TopBarSettingSelectBox);
  SettingItemsContainer.appendChild(TopBarSettingContainer);
  // Topbar Setting Options
  const DisableTopBarOption = document.createElement("option");
  DisableTopBarOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableTopBarOption.id = "disable-topbar-option";
  const EnableTopBarOption = document.createElement("option");
  EnableTopBarOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableTopBarOption.id = "enable-topbar-option";
  TopBarSettingSelectBox.appendChild(DisableTopBarOption);
  TopBarSettingSelectBox.appendChild(EnableTopBarOption);
  // Auto Writer Setting
  const AutoWriterSettingContainer = document.createElement("section");
  const AutoWriterSettingTitle = document.createElement("span");
  const AutoWriterSettingSelectBox = document.createElement("select");
  AutoWriterSettingContainer.className = "setting-item";
  AutoWriterSettingTitle.className = "setting-title";
  AutoWriterSettingTitle.id = "auto-writer-setting-title";
  AutoWriterSettingSelectBox.className = "setting-select-box";
  AutoWriterSettingTitle.innerText = Strings.AutoWriterSetting[UserSettings.CurrentLang];
  AutoWriterSettingContainer.appendChild(AutoWriterSettingTitle);
  AutoWriterSettingContainer.appendChild(AutoWriterSettingSelectBox);
  SettingItemsContainer.appendChild(AutoWriterSettingContainer);
  // Auto Writer Setting Options
  const DisableAutoWriterOption = document.createElement("option");
  DisableAutoWriterOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableAutoWriterOption.id = "disable-auto-writer-option";
  const EnableAutoWriterOption = document.createElement("option");
  EnableAutoWriterOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableAutoWriterOption.id = "enable-auto-writer-option";
  AutoWriterSettingSelectBox.appendChild(DisableAutoWriterOption);
  AutoWriterSettingSelectBox.appendChild(EnableAutoWriterOption);
  // Auto Backup Setting
  const AutoBackupSettingContainer = document.createElement("section");
  const AutoBackupSettingTitle = document.createElement("span");
  const AutoBackupSettingSelectBox = document.createElement("select");
  AutoBackupSettingContainer.className = "setting-item";
  AutoBackupSettingTitle.className = "setting-title";
  AutoBackupSettingTitle.id = "auto-backup-setting-title";
  AutoBackupSettingSelectBox.className = "setting-select-box";
  AutoBackupSettingTitle.innerText = Strings.AutoBackupSetting[UserSettings.CurrentLang];
  AutoBackupSettingContainer.appendChild(AutoBackupSettingTitle);
  AutoBackupSettingContainer.appendChild(AutoBackupSettingSelectBox);
  SettingItemsContainer.appendChild(AutoBackupSettingContainer);
  // Auto Backup Setting Options
  const DisableAutoBackupOption = document.createElement("option");
  DisableAutoBackupOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableAutoBackupOption.id = "disable-auto-backup-option";
  const EnableAutoBackupOption = document.createElement("option");
  EnableAutoBackupOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableAutoBackupOption.id = "enable-auto-backup-option";
  AutoBackupSettingSelectBox.appendChild(DisableAutoBackupOption);
  AutoBackupSettingSelectBox.appendChild(EnableAutoBackupOption);
  // DatePicker Setting
  const DatePickerSettingContainer = document.createElement("section");
  const DatePickerSettingTitle = document.createElement("span");
  const DatePickerSettingSelectBox = document.createElement("select");
  DatePickerSettingContainer.className = "setting-item";
  DatePickerSettingTitle.className = "setting-title";
  DatePickerSettingTitle.id = "date-picker-setting-title";
  DatePickerSettingSelectBox.className = "setting-select-box";
  DatePickerSettingTitle.innerText = Strings.DatePickerSetting[UserSettings.CurrentLang];
  DatePickerSettingContainer.appendChild(DatePickerSettingTitle);
  DatePickerSettingContainer.appendChild(DatePickerSettingSelectBox);
  SettingItemsContainer.appendChild(DatePickerSettingContainer);
  // DatePicker Setting Options
  const LunarDatePickerOption = document.createElement("option");
  LunarDatePickerOption.innerText = Strings.LunarOption[UserSettings.CurrentLang];
  LunarDatePickerOption.id = "lunar-option";
  LunarDatePickerOption.addEventListener("click", () => {
    DatePickerSwitcher("Lunar");
  });
  const SolarDatePickerOption = document.createElement("option");
  SolarDatePickerOption.innerText = Strings.SolarOption[UserSettings.CurrentLang];
  SolarDatePickerOption.id = "solar-option";
  SolarDatePickerOption.addEventListener("click", () => {
    DatePickerSwitcher("Solar");
  });
  const GregorianDatePickerOption = document.createElement("option");
  GregorianDatePickerOption.innerText = Strings.GregorianOption[UserSettings.CurrentLang];
  GregorianDatePickerOption.id = "gregorian-option";
  GregorianDatePickerOption.addEventListener("click", () => {
    DatePickerSwitcher("Gregorian");
  });
  DatePickerSettingSelectBox.appendChild(LunarDatePickerOption);
  DatePickerSettingSelectBox.appendChild(SolarDatePickerOption);
  DatePickerSettingSelectBox.appendChild(GregorianDatePickerOption);
  // Clock Setting
  const ClockSettingContainer = document.createElement("section");
  const ClockSettingTitle = document.createElement("span");
  const ClockSettingSelectBox = document.createElement("select");
  ClockSettingContainer.className = "setting-item";
  ClockSettingTitle.className = "setting-title";
  ClockSettingTitle.id = "clock-setting-title";
  ClockSettingSelectBox.className = "setting-select-box";
  ClockSettingTitle.innerText = Strings.ClockSetting[UserSettings.CurrentLang];
  ClockSettingContainer.appendChild(ClockSettingTitle);
  ClockSettingContainer.appendChild(ClockSettingSelectBox);
  SettingItemsContainer.appendChild(ClockSettingContainer);
  // Clock Setting Options
  const TwelveHourClockOption = document.createElement("option");
  TwelveHourClockOption.innerText = "12h";
  TwelveHourClockOption.id = "12h-option";
  const TwentyFourHourClockOption = document.createElement("option");
  TwentyFourHourClockOption.innerText = "24h";
  TwentyFourHourClockOption.id = "24h-option";
  ClockSettingSelectBox.appendChild(TwelveHourClockOption);
  ClockSettingSelectBox.appendChild(TwentyFourHourClockOption);
  // Theme Setting
  const ThemeSettingContainer = document.createElement("section");
  const ThemeSettingTitle = document.createElement("span");
  const ThemeSettingSelectBox = document.createElement("select");
  ThemeSettingContainer.className = "setting-item";
  ThemeSettingTitle.className = "setting-title";
  ThemeSettingTitle.id = "theme-setting-title";
  ThemeSettingSelectBox.className = "setting-select-box";
  ThemeSettingTitle.innerText = Strings.ThemeSetting[UserSettings.CurrentLang];
  ThemeSettingContainer.appendChild(ThemeSettingTitle);
  ThemeSettingContainer.appendChild(ThemeSettingSelectBox);
  SettingItemsContainer.appendChild(ThemeSettingContainer);
  // Theme Setting Options
  const DarkThemeOption = document.createElement("option");
  DarkThemeOption.innerText = Strings.DarkThemeOption[UserSettings.CurrentLang];
  DarkThemeOption.id = "dark-theme-option";
  const LightThemeOption = document.createElement("option");
  LightThemeOption.innerText = Strings.LightThemeOption[UserSettings.CurrentLang];
  LightThemeOption.id = "light-theme-option";
  const NeonThemeOption = document.createElement("option");
  NeonThemeOption.innerText = Strings.NeonThemeOption[UserSettings.CurrentLang];
  NeonThemeOption.id = "neon-theme-option";
  ThemeSettingSelectBox.appendChild(DarkThemeOption);
  ThemeSettingSelectBox.appendChild(LightThemeOption);
  ThemeSettingSelectBox.appendChild(NeonThemeOption);
  // Cloud Storge Settings Section
  const CloudStorgeButton = document.createElement("button");
  const CloudStorgeButtonIcon = document.createElement("img");
  const CloudStorgeButtonText = document.createElement("span");
  CloudStorgeButtonIcon.className = "side-bar-item-icon";
  CloudStorgeButtonIcon.src = `Icons/CloudStorgeIcon.png`;
  CloudStorgeButtonText.className = "side-bar-item-text";
  CloudStorgeButton.id = "cloud-storge-button";
  CloudStorgeButtonText.id = "cloud-storge-button-text";
  CloudStorgeButtonText.innerText = Strings.CouldStorgeButton[UserSettings.CurrentLang];
  CloudStorgeButton.addEventListener("click", () => {});
  CloudStorgeButton.appendChild(CloudStorgeButtonIcon);
  CloudStorgeButton.appendChild(CloudStorgeButtonText);
  SettingItemsContainer.appendChild(CloudStorgeButton);
  // Generate BackUp section
  const GenerateBackUpFileButton = document.createElement("button");
  const GenerateBackUpFileButtonIcon = document.createElement("img");
  const GenerateBackUpFileButtonText = document.createElement("span");
  GenerateBackUpFileButtonIcon.className = "side-bar-item-icon";
  GenerateBackUpFileButtonIcon.src = `Icons/GenerateBackUpIcon.png`;
  GenerateBackUpFileButtonText.className = "side-bar-item-text";
  GenerateBackUpFileButton.id = "generate-backup-button";
  GenerateBackUpFileButtonText.id = "generate-backup-button-text";
  GenerateBackUpFileButtonText.innerText = Strings.GenerateBackUpButton[UserSettings.CurrentLang];
  GenerateBackUpFileButton.addEventListener("click", () => {});
  GenerateBackUpFileButton.appendChild(GenerateBackUpFileButtonIcon);
  GenerateBackUpFileButton.appendChild(GenerateBackUpFileButtonText);
  SettingItemsContainer.appendChild(GenerateBackUpFileButton);
  //
  void SettingsContainer.offsetWidth;
  SettingsContainer.classList.add("setting-in");
  DisplayUserSettingIntoDom("DisplayLang");
}
function HideSettings() {
  if (DoesElementExist("settings-container")) {
    document.getElementById("settings-container").classList.add("setting-out");
  }
  setTimeout(() => {
    document.getElementById("settings-container").remove();
  }, 800);
}
function LanguageSwitcher(Lang) {
  UserSettings.CurrentLang = Lang;
  FixDirection();
  RefreshItemsInnerText();
  ShowDateAndClock();
  localStorage.setItem("Lang", Lang.toString());
}
function DatePickerSwitcher(Type) {
  UserSettings.Calendar = Type;
  DatePickerSettings.type = Type;
  localStorage.setItem("DatePickerType", Type);
}
function LoadUserSettings(Action) {
  if (Action === "LoadLang") {
    UserSettings.CurrentLang = localStorage.getItem("Lang") ? localStorage.getItem("Lang") : "en";
  }
  if (Action === "LoadDatePickerType") {
    UserSettings.Calendar = localStorage.getItem("DatePickerType")
      ? localStorage.getItem("DatePickerType")
      : "Gregorian";
    DatePickerSettings.type = localStorage.getItem("DatePickerType")
      ? localStorage.getItem("DatePickerType")
      : "Gregorian";
  }
}
function DisplayUserSettingIntoDom(Action) {
  if (Action === "DisplayLang") {
    switch (UserSettings.CurrentLang) {
      case "fa":
        const FA = document.getElementById("lang-fa");
        FA.selected = true;
        break;
      case "en":
        const EN = document.getElementById("lang-en");
        EN.selected = true;
        break;
      case "ar":
        const AR = document.getElementById("lang-ar");
        AR.selected = true;
        break;
      case "es":
        const ES = document.getElementById("lang-es");
        ES.selected = true;
        break;
      case "fr":
        const FR = document.getElementById("lang-fr");
        FR.selected = true;
        break;
      case "de":
        const DE = document.getElementById("lang-de");
        DE.selected = true;
        break;
      case "ru":
        const RU = document.getElementById("lang-ru");
        RU.selected = true;
        break;
      case "zh":
        const ZH = document.getElementById("lang-zh");
        ZH.selected = true;
        break;
      case "hi":
        const HI = document.getElementById("lang-hi");
        HI.selected = true;
        break;
      case "ja":
        const JA = document.getElementById("lang-ja");
        JA.selected = true;
        break;
      case "kr":
        const KR = document.getElementById("lang-kr");
        KR.selected = true;
        break;
      case "pt":
        const PT = document.getElementById("lang-pt");
        PT.selected = true;
        break;
      case "ur":
        const UR = document.getElementById("lang-ur");
        UR.selected = true;
        break;
    }
  }
}
