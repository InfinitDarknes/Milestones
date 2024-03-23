let NotesArray = [];
function NewNoteConstructor(ID, NumericDate, Title, Text) {
  this.ID = ID;
  this.Title = Title;
  this.NumericDate = NumericDate;
  this.Text = Text;
}
function NewNote(Title, Text) {
  let NoteTitle = Title ? Title : Text.substring(0, 20);
  let NoteID = `Note-${GenerateUniqeID(5)}`;
  let NotenumericDate = new Date().getTime();
  let NewNote = new NewNoteConstructor(NoteID, NotenumericDate, NoteTitle, Text);
  NotesArray.push(NewNote);
  SaveNotes();
  DisplayNotesIntoDOM();
}
function DeleteNote(ID) {
  let NoteIndex = NotesArray.findIndex((Note) => {
    return Note.ID === ID;
  });
  NotesArray.splice(NoteIndex, 1);
  HideModal();
  SaveNotes();
  DisplayNotesIntoDOM();
}
function DisplayNotes() {
  if (DoesElementExist("notes-window")) return;
  const Window = document.querySelector(".window");
  if (Window) Window.remove();
  if (DoesElementExist("settings-container")) HideSettings();
  CurrentWindow = "Notes";
  const NotesWindow = document.createElement("section");
  const WindowHeader = document.createElement("header");
  const HeaderText = document.createElement("span");
  const HeaderIcon = document.createElement("img");
  const NotesContainer = document.createElement("section");
  const AddNotesBtn = document.createElement("button");
  const AddNotesBtnText = document.createElement("span");
  const AddNotesBtnIcon = document.createElement("img");
  // Id and Class
  NotesWindow.id = "notes-window";
  NotesWindow.className = "window";
  WindowHeader.className = "window-header";
  WindowHeader.id = "notes-header";
  HeaderText.className = "header-title";
  HeaderIcon.className = "header-icon";
  NotesContainer.id = "notes-container";
  AddNotesBtn.id = "add-notes-btn";
  AddNotesBtnText.id = "add-notes-btn-text";
  AddNotesBtnIcon.id = "add-notes-btn-icon";
  // Innertext and Src
  HeaderText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
  AddNotesBtnText.innerText = Strings.AddNote[UserSettings.CurrentLang];
  HeaderIcon.src = IconsSrc.MyNotesIcon[UserSettings.Theme];
  AddNotesBtnIcon.src = IconsSrc.AddNotesIcon[UserSettings.Theme];
  // Events
  AddNotesBtn.addEventListener("click", AddNoteModal);
  // Appending
  AddNotesBtn.append(AddNotesBtnText, AddNotesBtnIcon);
  WindowHeader.append(AddNotesBtn, HeaderIcon, HeaderText);
  NotesWindow.append(WindowHeader, NotesContainer);
  document.body.append(NotesWindow);
  DisplayNotesIntoDOM();
}
function SaveNotes() {
  localStorage.setItem("Notes", JSON.stringify(NotesArray));
}
function LoadSavedNotes() {
  if (localStorage.getItem("Notes")) {
    NotesArray = JSON.parse(localStorage.getItem("Notes"));
  }
}
function DisplayNotesIntoDOM() {
  const NotesContainer = document.getElementById("notes-container");
  NotesContainer.innerHTML = "";
  NotesArray.forEach((Note) => {
    const NoteContainer = document.createElement("div");
    const NoteTitle = document.createElement("span");
    const NoteText = document.createElement("p");
    const ViewNoteBtn = document.createElement("btn");
    // Attributes
    NoteTitle.setAttribute("dir", "auto");
    NoteText.setAttribute("dir", "auto");
    //Classnames
    NoteContainer.className = "note-container";
    NoteTitle.className = "note-title";
    NoteText.className = "note-text";
    ViewNoteBtn.className = "view-note-btn";
    //InnerText
    NoteTitle.innerText = Note.Title;
    NoteText.innerHTML = Note.Text;
    ViewNoteBtn.innerText = Strings.Read[UserSettings.CurrentLang];
    //Events
    ViewNoteBtn.addEventListener("click", () => {
      ReadNote(Note.ID);
    });
    //Append
    NoteContainer.append(NoteTitle, NoteText, ViewNoteBtn);
    NotesContainer.appendChild(NoteContainer);
  });
}
function ReadNote(ID) {
  let TargetNote = NotesArray.find((Note) => {
    return Note.ID === ID;
  });
  let NoteTitle = TargetNote.Title;
  let NoteID = TargetNote.ID;
  let NoteDate = TargetNote.NumericDate;

  let NoteText = TargetNote.Text;
  ReadNoteModal(NoteTitle, NoteID, NoteDate, NoteText);
}
function ActivateReadNoteModalEditMode() {
  const NoteModal = document.querySelector(`.read-note-modal`);
  if (!NoteModal) return;
  console.log("");
  const NoteModalText = document.querySelector(`.note-modal-text`);
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  const NoteModalDeleteBtn = document.querySelector(`.delete-note-btn`);
  const NoteModalEditBtn = document.querySelector(`.edit-note-btn`);
  const ApplyEditBtn = document.querySelector(`.apply-note-edit-btn`);
  const CancelEditBtn = document.querySelector(`.cancel-note-edit-btn`);
  NoteModalText.contentEditable = true;
  NoteModalTitle.contentEditable = true;
  NoteModalDeleteBtn.style.display = "none";
  NoteModalEditBtn.style.display = "none";
  ApplyEditBtn.style.display = "flex";
  CancelEditBtn.style.display = "flex";
}
function ExitNoteEditMode() {
  const NoteModal = document.querySelector(`.read-note-modal`);
  if (!NoteModal) return;
  const NoteModalText = document.querySelector(`.note-modal-text`);
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  const NoteModalDeleteBtn = document.querySelector(`.delete-note-btn`);
  const NoteModalEditBtn = document.querySelector(`.edit-note-btn`);
  const ApplyEditBtn = document.querySelector(`.apply-note-edit-btn`);
  const CancelEditBtn = document.querySelector(`.cancel-note-edit-btn`);
  NoteModalText.contentEditable = false;
  NoteModalTitle.contentEditable = false;
  NoteModalText.click();
  NoteModalTitle.click();
  NoteModalDeleteBtn.style.display = "flex";
  NoteModalEditBtn.style.display = "flex";
  ApplyEditBtn.style.display = "none";
  CancelEditBtn.style.display = "none";
}
function ApplyEdit(NoteID) {
  const NoteModalText = document.querySelector(`.note-modal-text`);
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  let TargetNote = NotesArray.find((Note) => {
    return Note.ID === NoteID;
  });
  TargetNote.Text = NoteModalText.innerText;
  if (!NoteModalTitle.innerText) {
    TargetNote.Title = NoteModalText.innerText.substring(0, 20);
  } else {
    TargetNote.Title = NoteModalTitle.innerText;
  }
  SaveNotes();
  DisplayNotesIntoDOM();
  ExitNoteEditMode();
}
function CancelEdit(NoteID) {
  const NoteModalText = document.querySelector(`.note-modal-text`);
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  let TargetNote = NotesArray.find((Note) => {
    return Note.ID === NoteID;
  });
  NoteModalText.innerText = TargetNote.Text;
  NoteModalTitle.innerText = TargetNote.Title;
  ExitNoteEditMode();
}
