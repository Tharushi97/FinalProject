// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl:'http://localhost:3000/api',
  backendUrl: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyBeuv4W3gxzkirVHwfgJg9NvZJ7xAgfgFw",
    authDomain: "geveo-australasia.firebaseapp.com",
    databaseURL: "https://geveo-australasia.firebaseio.com",
    projectId: "geveo-australasia",
    storageBucket: "geveo-australasia.appspot.com",
    messagingSenderId: "152191750494",
    appId: "1:152191750494:web:cc98d81ca80798c50cbfcf"
}
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
