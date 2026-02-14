// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//     tailwindcss(),
//   ],
// })








// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [["babel-plugin-react-compiler"]],
//       },
//     }),
//     tailwindcss(),
//   ],

//   server: {
//     proxy: {
//       "/api": {
//         target: "https://nanmastagingapi.milma.in",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Nanmamilma/", // 👈 ADD THIS (your repo name)

  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://nanmastagingapi.milma.in",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
