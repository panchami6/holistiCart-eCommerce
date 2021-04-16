// import { createContext, useState, useContext } from "react";

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [darktheme, setDarkTheme] = useState(false);
//   const color = {
//     dark: {
//       color: "#fff",
//       backgroundColor: "#000"
//     },
//     light: {
//       color: "#000",
//       backgroundColor: "#fff"
//     }
//   };
//   return (
//     <ThemeContext.Provider
//       value={{ colorTheme: darktheme ? color.dark : color.light }}
//     >
//       <button onClick={() => setDarkTheme(!darktheme)}>Switch Theme</button>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }
