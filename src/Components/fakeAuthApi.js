// Database
import get from "lodash/get";

const Users = [
    {
      username: "panchami",
      password: "panchami123"
    }
  ];
  
  const findUserByUserName = (username) => {
    return Users.find((user) => user.username === username) 
  };
  
  export const fakeAuthApi = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUserByUserName(username);
        const userpassword = get(user, "password");
        if (userpassword === password) {
          resolve({ success: true, status: 200 });
        }
        reject({ success: false, status: 401 });
      }, 1000);
    });
  };
  