let NotesArray = [];
function NewNoteConstructor(...Args) {
  let [ID, NumericDate, Title, Text] = Args;
  return {
    ID,
    Title,
    NumericDate,
    Text,
  };
}
function NewNote(Title, Text) {
  let NoteTitle = Title;
  let NoteID = `Note-${GenerateUniqeID(5)}`;
  let NoteNumericDate = new Date().getTime();
  let NewNote = NewNoteConstructor(NoteID, NoteNumericDate, NoteTitle, Text);
  NotesArray.push(NewNote);
  Save("Notes");
  DisplayNotesIntoDOM();
  DisplayMessage("Success", MessageBoxStrings.NoteSuccess[UserSettings.Lang]);
}
function DeleteNote(ID) {
  let NoteIndex = NotesArray.findIndex((Note) => {
    return Note.ID === ID;
  });
  NotesArray.splice(NoteIndex, 1);
  HideModal();
  Save("Notes");
  DisplayNotesIntoDOM();
}
function LoadSavedNotes() {
  if (localStorage.getItem("Notes")) {
    NotesArray = JSON.parse(localStorage.getItem("Notes"));
  }
}
function DisplayNotesIntoDOM() {
  const NotesContainer = document.querySelector(".notes-container");
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
    ViewNoteBtn.innerText = Strings.Read[UserSettings.Lang];
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
  AppObj.EditNoteMode = true;
  const NoteModalText = document.querySelector(`.note-modal-text`);
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  const NoteModalDeleteBtn = document.querySelector(`.delete-note-btn`);
  const NoteModalEditBtn = document.querySelector(`.edit-note-btn`);
  const ApplyEditBtn = document.querySelector(`.apply-note-edit-btn`);
  const CancelEditBtn = document.querySelector(`.cancel-note-edit-btn`);
  NoteModalText.click();
  NoteModalTitle.click();
  tinymce.activeEditor.mode.set("design");
  NoteModalTitle.contentEditable = true;
  NoteModalDeleteBtn.style.display = "none";
  NoteModalEditBtn.style.display = "none";
  ApplyEditBtn.style.display = "flex";
  CancelEditBtn.style.display = "flex";
}
function ExitNoteEditMode() {
  const NoteModal = document.querySelector(`.read-note-modal`);
  if (!NoteModal) return;
  AppObj.EditNoteMode = false;
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  const NoteModalDeleteBtn = document.querySelector(`.delete-note-btn`);
  const NoteModalEditBtn = document.querySelector(`.edit-note-btn`);
  const ApplyEditBtn = document.querySelector(`.apply-note-edit-btn`);
  const CancelEditBtn = document.querySelector(`.cancel-note-edit-btn`);
  tinymce.activeEditor.mode.set("readonly");
  NoteModalTitle.contentEditable = false;
  NoteModalDeleteBtn.style.display = "flex";
  NoteModalEditBtn.style.display = "flex";
  ApplyEditBtn.style.display = "none";
  CancelEditBtn.style.display = "none";
}
function ApplyEdit(NoteID) {
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  let TargetNote = NotesArray.find((Note) => {
    return Note.ID === NoteID;
  });
  TargetNote.Text = tinymce.activeEditor.getContent({ format: "raw" });
  if (!NoteModalTitle.innerText) {
    DisplayMessage("Error", MessageBoxStrings.EmptyNoteTitle[UserSettings.Lang]);
    return;
  } else {
    TargetNote.Title = NoteModalTitle.innerText;
  }
  Save("Notes");
  DisplayNotesIntoDOM();
  ExitNoteEditMode();
}
function CancelEdit(NoteID) {
  const NoteModalTitle = document.querySelector(`.note-modal-title`);
  let TargetNote = NotesArray.find((Note) => {
    return Note.ID === NoteID;
  });
  tinymce.activeEditor.setContent(TargetNote.Text);
  NoteModalTitle.innerText = TargetNote.Title;
  ExitNoteEditMode();
}
