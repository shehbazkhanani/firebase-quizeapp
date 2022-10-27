import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, onValue, ref, set} from "firebase/database";
import app from "./firebaseconfig";
const auth = getAuth(app);
const database = getDatabase(app);

const signUpUser = (obj) => { 
   const {email, password, name, cAdmin} = obj
    return new Promise ((resolve, reject) =>{
        createUserWithEmailAndPassword(auth, email, password)
    .then((Success) => {
      // Signed in 
      const user = Success.user;
      if("usman@gmail.com" == user.email) {
        obj.cAdmin = true;
        const reference = ref(database, `users/${user.uid}`)
        set(reference, obj).then(() => {
          resolve("data is successfully")
        }).catch((err)=>{
          reject(err)
        })
      }         
      // ...
    })
    .catch((error) => {
reject(error)
      // ..
    })
    ;}) 
}

const logInUser = (obj) => { 
  console.log(obj);
  const {email, password, name, uid, cAdmin} = obj
   return new Promise ((resolve, reject) =>{
    signInWithEmailAndPassword(auth, email, password)
   .then((Success) => {
     // Signed in 
     const user = Success.user;
     const reference = ref(database, `users/${user.uid}`)
     onValue(reference, event => {
      const status = event.exists()
         if(status) {
       resolve({...event.val(), uid : user.uid}) } 
       else {
        reject("Data Not Found")
       }
      })
   })
   .catch((error) => {
reject(error)
     // ..
   })
   ;}) 
}


export {signUpUser, logInUser}