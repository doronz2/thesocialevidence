import { readable } from "svelte/store";
//registering to firebase. First create the object (data) and then send this as a post request
export const user = readable(null, function (set) {
  if (typeof firebase == "undefined") return;
  firebase.auth().onAuthStateChanged(async (user) => {
    set(user);
    const data = {
      firebaseId: user.uid,
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL,
    };
    const response = await fetch("/api/user/login.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),//the body of the post request
    });
    const result = await response.json();
  });
});

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

export function logout() {
  firebase.auth().signOut();
}
