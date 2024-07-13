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
  if (!UserName.trim() || !NewPassword.trim()) {
    DisplayMessage("Error", "Please pass both parameters to EditUserPassword(");
    return;
  }
  try {
    if (ValidateUserName(UserName)) {
      throw new Error("Invalid username format passed to EditUser()");
    }

    let Users = await GetAllUsers();
    let User = Users.find((User) => {
      return User[1].UserName === UserName;
    });
    if (!User) {
      throw new Error(`Couldn't find ${UserName} in the database`);
    }

    if (ValidatePassword(NewPassword)) {
      throw new Error("Invalid password passed to EditUser()");
    }
    if (NewPassword === User[1].Password) {
      throw new Error(Strings.YouAlreadyHaveThisPasswordError[UserSettings.Lang]);
    }
  } catch (Error) {
    DisplayMessage("Error", Error);
  }
  // All the above code are not actually meant to be inside this function they will be inside an EditUser modal
  let NewUserObj = {
    UserName: User[1].UserName,
    Email: User[1].Email,
    Password: NewPassword,
    UserData: User[1].UserData,
  };
  return new Promise((Resolve, Reject) => {
    fetch(`https://milestonesx-1998-default-rtdb.asia-southeast1.firebasedatabase.app/users/${DatabaseID}.json`, {
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
function Login() {}
