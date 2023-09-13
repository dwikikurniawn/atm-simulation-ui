// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return userStr;
  else return null;
};

// remove user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("user");
};

// set user from the session storage
export const setUserSession = (user) => {
  sessionStorage.setItem("user", user);
};
