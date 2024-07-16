let PushUpdatesController = new AbortController();
let PushUpdatesSignal = PushUpdatesController.signal;

function SignUp(DataObj) {
  return new Promise((Resolve, Reject) => {
    fetch("https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(DataObj),
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        Reject(Error);
      });
  });
}

function ValidateUserName(UserName) {
  const UserNameRegex = /^[A-Za-z0-9]{6,}$/;
  return UserNameRegex.test(UserName);
}
function ValidateEmail(Email) {
  const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return EmailRegEx.test(Email);
}
function ValidatePassword(Password) {
  const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return PasswordRegex.test(Password);
}
async function GetAllUsers() {
  let Users = await fetch("https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
  let ParsedUsers = await Users.json();
  let UsersArray = ParsedUsers ? Object.entries(ParsedUsers) : null;
  return UsersArray;
}
async function GetUserByEmail(Email) {
  let Users = await fetch("https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
  let ParsedUsers = await Users.json();
  let UsersArray = ParsedUsers ? Object.entries(ParsedUsers) : null;
  if (!UsersArray) return null;
  let User = UsersArray.find((User) => {
    return User[1].Email.toLowerCase().trim() === Email.toLowerCase().trim();
  });
  return User;
}
async function GetUserByUserName(UserName) {
  let Users = await fetch("https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
  let ParsedUsers = await Users.json();
  let UsersArray = ParsedUsers ? Object.entries(ParsedUsers) : null;
  if (!UsersArray) return null;
  let User = UsersArray.find((User) => {
    return User[1].UserName.toLowerCase().trim() === UserName.toLowerCase().trim();
  });
  return User;
}
async function DeleteUser(UserName) {
  let Users = await GetAllUsers();
  let User = Users.find((User) => {
    return User[1].UserName === UserName.toLowerCase().trim();
  });
  if (!User) {
    console.error(`Couldn't find ${UserName} in the database`);
    return;
  }
  let DatabaseID = User[0];
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${DatabaseID}.json`, {
      method: "DELETE",
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          console.log(`${UserName} has been deleted`);
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        console.error(Error);
        Reject(Error);
      });
  });
}
async function UpdateUserPassword(UserName, NewPassword) {
  if (!UserName.trim() || !NewPassword.trim()) {
    DisplayMessage("Error", "Please pass both parameters to EditUserPassword(");
    return;
  }

  UserName = UserName.trim().toLowerCase();
  NewPassword = NewPassword.trim();

  let UserDataBaseID;
  let Users;
  let User;

  try {
    if (!ValidateUserName(UserName)) {
      throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
    }

    Users = await GetAllUsers();
    User = Users.find((User) => {
      return User[1].UserName === UserName;
    });
    if (!User) {
      throw new Error(`Couldn't find ${UserName} in the database`);
    }
    UserDataBaseID = User[0];

    if (!ValidatePassword(NewPassword)) {
      throw new Error(Strings.PasswordFormatError[UserSettings.Lang]);
    }
    if (NewPassword === User[1].Password) {
      throw new Error(Strings.YouAlreadyHaveThisPasswordError[UserSettings.Lang]);
    }
  } catch (Error) {
    DisplayMessage("Error", Error);
    return;
  }
  // All the above code are not actually meant to be inside this function they will be inside an EditUser modal
  let NewUserObj = {
    UserName: User[1].UserName,
    Email: User[1].Email,
    Password: NewPassword,
    UserData: User[1].UserData,
  };
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${UserDataBaseID}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewUserObj),
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          console.log(Reasponse);
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        console.error(Error);
        Reject(Error);
      });
  });
}
async function UpdateUserEmail(UserName, NewEmail) {
  if (!UserName.trim() || !NewEmail.trim()) {
    DisplayMessage("Error", "Please pass both parameters to EditUserEmail(");
    return;
  }

  UserName = UserName.trim().toLowerCase();
  NewEmail = NewEmail.trim().toLowerCase();

  let UserDataBaseID;
  let Users;
  let User;

  try {
    if (!ValidateUserName(UserName)) {
      throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
    }

    Users = await GetAllUsers();
    User = Users.find((User) => {
      return User[1].UserName === UserName;
    });
    if (!User) {
      throw new Error(`Couldn't find ${UserName} in the database`);
    }
    UserDataBaseID = User[0];

    if (!ValidateEmail(NewEmail)) {
      throw new Error(Strings.EmailFormatError[UserSettings.Lang]);
    }

    let EmailFlag = await DoesEmailExist(NewEmail);
    if (EmailFlag) {
      throw new Error(Strings.EmailExistsError[UserSettings.Lang]);
    }

    if (NewEmail === User[1].Email) {
      throw new Error(Strings.YouAlreadyHaveThisEmailError[UserSettings.Lang]);
    }
  } catch (Error) {
    DisplayMessage("Error", Error);
    return;
  }
  // All the above code are not actually meant to be inside this function they will be inside an EditUser modal
  let NewUserObj = {
    UserName: User[1].UserName,
    Email: NewEmail,
    Password: User[1].Password,
    UserData: User[1].UserData,
  };
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${UserDataBaseID}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewUserObj),
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          console.log(Reasponse);
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        console.error(Error);
        Reject(Error);
      });
  });
}
async function UpdateUserUserName(UserName, NewUserName) {
  if (!UserName.trim() || !NewUserName.trim()) {
    DisplayMessage("Error", "Please pass both parameters to EditUserPassword(");
    return;
  }

  UserName = UserName.trim().toLowerCase();
  NewUserName = NewUserName.trim().toLowerCase();

  let UserDataBaseID;
  let Users;
  let User;

  try {
    if (!ValidateUserName(UserName)) {
      throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
    }

    Users = await GetAllUsers();
    User = Users.find((User) => {
      return User[1].UserName === UserName;
    });
    if (!User) {
      throw new Error(`Couldn't find ${UserName} in the database`);
    }
    UserDataBaseID = User[0];

    if (!ValidateUserName(NewUserName)) {
      throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
    }

    let UserNameFlag = await DoesUserNameExist(NewUserName);
    if (UserNameFlag) {
      throw new Error(Strings.UserNameExistsError[UserSettings.Lang]);
    }

    if (NewUserName === User[1].UserName) {
      throw new Error(Strings.YouAlreadyHaveThisUserNameError[UserSettings.Lang]);
    }
  } catch (Error) {
    DisplayMessage("Error", Error);
    return;
  }
  // All the above code are not actually meant to be inside this function they will be inside an EditUser modal
  let NewUserObj = {
    UserName: NewUserName,
    Email: User[1].Email,
    Password: User[1].Password,
    UserData: User[1].UserData,
  };
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${UserDataBaseID}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewUserObj),
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        Reject(Error);
      });
  });
}
async function UpdateUserData(UserName, NewData) {
  if (!UserName.trim() || !NewData.trim()) {
    DisplayMessage("Error", "Please pass both parameters to UpdateUserData()");
    return;
  }

  UserName = UserName.trim().toLowerCase();

  let UserDataBaseID;
  let Users;
  let User;

  try {
    if (!ValidateUserName(UserName)) {
      throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
    }
    Users = await GetAllUsers();
    User = Users.find((User) => {
      return User[1].UserName === UserName;
    });
    if (!User) {
      throw new Error(`Couldn't find ${UserName} in the database`);
    }
    UserDataBaseID = User[0];
  } catch (Error) {
    DisplayMessage("Error", Error);
    return;
  }
  // All the above code are not actually meant to be inside this function they will be inside an EditUser modal
  let NewUserObj = {
    UserName: UserName,
    Email: User[1].Email,
    Password: User[1].Password,
    UserData: NewData,
  };
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${UserDataBaseID}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewUserObj),
    })
      .then((Reasponse) => {
        if (Reasponse.ok) {
          Resolve(Reasponse);
        }
      })
      .catch((Error) => {
        Reject(Error);
      });
  });
}

async function DoesUserNameExist(UserName) {
  let Users = await GetAllUsers();
  if (!Users) return false; // Because if there are no users then it defentially means the UserName is ok
  let Flag = Users.some((User) => {
    return User[1].UserName === UserName;
  });
  return Flag;
}
async function DoesEmailExist(Email) {
  let Users = await GetAllUsers();
  if (!Users) return false; // Because if there are no users then it defentially means the Email is ok
  let Flag = Users.some((User) => {
    return User[1].Email === Email;
  });
  return Flag;
}
function Login(Email_UserName, Password) {
  return new Promise(async (Resolve, Reject) => {
    let Users = await GetAllUsers();
    let User = Users.find((User) => {
      return User[1].UserName === Email_UserName.toLowerCase().trim() || User[1].Email === Email_UserName.toLowerCase().trim();
    });
    try {
      if (!User) {
        throw new Error(Strings.EmailOrUserDoesNotExist[UserSettings.Lang]);
      }
      if (User[1].Password !== Password) {
        throw new Error(Strings.IncorrectPassword[UserSettings.Lang]);
      }
      if (await IsUserLoggedIn()) {
        throw new Error(Strings.YouAreAlreadyLoggedIn[UserSettings.Lang]);
      }
    } catch (Error) {
      console.log("Login rejected");
      Reject(Error);
      return;
    }
    localStorage.setItem("UserLoginInfo", JSON.stringify({ Email: User[1].Email, UserName: User[1].UserName, Password }));
    localStorage.setItem("UserDataBackUp", FetchLocalStorage());
    Resolve(Strings.LoginSuccessMessage[UserSettings.Lang]);
    // RestoreFromText(User[1].UserData);
  });
}
async function IsUserLoggedIn() {
  if (CheckForSave("UserLoginInfo")) {
    let UserLoginInfo = JSON.parse(localStorage.getItem("UserLoginInfo"));
    let Users = await GetAllUsers();
    console.log(Users);
    let User = Users.find((User) => {
      return (
        User[1].UserName.toLowerCase().trim() === UserLoginInfo.UserName.toLowerCase().trim() && User[1].Email.toLowerCase().trim() === UserLoginInfo.Email.toLowerCase().trim()
      );
    });
    if (!User) {
      return false;
    }
    if (User[1].Password !== UserLoginInfo.Password) {
      return false;
    }
    if (User && User[1].Password === UserLoginInfo.Password) {
      return true;
    }
  } else {
    return false;
  }
}
async function PushUpdates() {
  if (!(await IsUserLoggedIn())) {
    console.log("User not logged in quiting PushUpdates()");
    return;
  }
  PushUpdatesController.abort();
  let UserLoginInfo = JSON.parse(localStorage.getItem("UserLoginInfo"));
  let User = await GetUserByUserName(UserLoginInfo.UserName);
  if (User[1].UserData === FetchLocalStorage()) {
    console.log("UserLocalStorage is already synced with cloud storage data quiting PushUpdates()");
    return;
  }
  UpdateUserData(User[1].UserName, FetchLocalStorage(), { signal: PushUpdatesSignal })
    .then((Reasponse) => {
      console.log("Pushed updates successfully", Reasponse);
    })
    .catch((Error) => {
      console.error("Failed to push updates", Error);
    });
}
async function GetUpdates() {
  if (!(await IsUserLoggedIn())) {
    console.log("User not logged in quiting GetUpdates()");
    return;
  }
  let UserLoginInfo = JSON.parse(localStorage.getItem("UserLoginInfo"));
  let User = await GetUserByUserName(UserLoginInfo.UserName);
  if (User[1].UserData === FetchLocalStorage()) {
    console.log("UserLocalStorage is already synced with cloud storage data quiting GetUpdates()");
    return;
  }
  console.log("Recived updates successfully");
  RestoreFromText(User[1].UserData);
}
