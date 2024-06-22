let AppObj = {
  SelectMode: false,
  EditMode: false,
  CurrentWindow: null,
  SelectedUserCategory: null,
  DragModalMode: false,
  ValidWindowInput:
    /^(Trash-(All|Today|Tomorrow|In2Days)|Home-(Unfinished|Today|Tomorrow|In2Days|Failed|Completed)|Notes|UserCategory-[0-9]{8}-(Unfinished|Today|Tomorrow|In2Days|Completed|Failed))$/,
  UserCategoryPattern: /^UserCategory-[0-9]{8}$/,
  ThemePattern: /^[a-zA-Z0-9]+$/,
  Themes: ["Dark", "Light"],
};
let ProxyHandler = {
  get: function (target, property) {
    return property in target ? target[property] : undefined;
  },
  set: function (target, property, value) {
    if (!(property in target)) {
      throw new Error(`You are not allowed to create new properties (${property}) on this object`);
    }
    if (property === "SelectMode") {
      if (typeof value === "boolean") {
        target[property] = value;
        return true;
      } else {
        throw new Error("AppObj.SelectMode property can only get boolean values.");
      }
    }
    if (property === "EditMode") {
      if (typeof value === "boolean") {
        target[property] = value;
        return true;
      } else {
        throw new Error("AppObj.EditMode property can only get boolean values.");
      }
    }
    if (property === "CurrentWindow") {
      if (AppObj.ValidWindowInput.test(value)) {
        target[property] = value;
        return true;
      } else {
        throw new Error(`Invalid 'CurrentWindow' value detected , value : ${value}`);
      }
    }
    if (property === "DragModalMode") {
      if (typeof value === "boolean") {
        target[property] = value;
        return true;
      } else {
        throw new Error("AppObj.DragModalMode property can only get boolean values.");
      }
    }
    if (property === "SelectedUserCategory") {
      if (AppObj.UserCategoryPattern.test(value)) {
        target[property] = value;
        return true;
      } else {
        throw new Error("Invalid 'UserCategory' format detected.");
      }
    }
    if (property === "ValidWindowInput" || property === "UserCategoryPattern") {
      throw new Error("You are not allowed to change this property");
    }
    if (property === "Themes") {
      if (typeof value === "string") {
        if (!AppObj.ThemePattern.test(value)) {
          throw new Error("Invalid 'Theme' format detected.");
        } else {
          target[property] = value;
          return true;
        }
      }
      if (Array.isArray(value)) {
        let HasInvalidItem = value.some((Item) => {
          return !AppObj.ThemePattern.test(Item);
        });
        if (HasInvalidItem) {
          throw new Error("Invalid 'Theme' format detected.");
        } else {
          target[property] = value;
          return true;
        }
      }
    }
  },
  deleteProperty: function () {
    throw new Error("You can not delete AppObj object properties this will cause the application to crash.");
  },
};
AppObj = new Proxy(AppObj, ProxyHandler);
