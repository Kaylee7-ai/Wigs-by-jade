import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCt9M77Jar0P4bg6R5T4OYNL6H90nAmTYs",
  authDomain: "wigs-by-jade.firebaseapp.com",
  projectId: "wigs-by-jade",
  storageBucket: "wigs-by-jade.firebasestorage.app",
  messagingSenderId: "367325495539",
  appId: "1:367325495539:web:7342b9e18d36118d96b786",
  measurementId: "G-VJ8HM2TB5H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = id => document.getElementById(id);
const status = (message, error = false) => {
  const el = $("authStatus");
  if (el) { el.textContent = message; el.style.color = error ? "#a12c46" : "#76505d"; }
};
let mode = "login";

$("accountButton")?.addEventListener("click", () => $("authModal")?.classList.add("open"));
$("authClose")?.addEventListener("click", () => $("authModal")?.classList.remove("open"));
$("authModal")?.addEventListener("click", e => {
  if (e.target.id === "authModal") e.currentTarget.classList.remove("open");
});
$("authMode")?.addEventListener("click", () => {
  mode = mode === "login" ? "register" : "login";
  $("authTitle").textContent = mode === "login" ? "Welcome back" : "Create your account";
  $("authSubmit").textContent = mode === "login" ? "Sign in" : "Create account";
  $("authMode").textContent = mode === "login" ? "New here? Create an account" : "Already registered? Sign in";
  $("displayNameField").hidden = mode === "login";
  $("authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
  status("");
});
$("authForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;
  const displayName = $("authDisplayName").value.trim();
  $("authSubmit").disabled = $("authMode").disabled = $("authReset").disabled = true;
  status("Please wait…");
  try {
    if (mode === "register") {
      if (password.length < 6) throw new Error("Choose a password with at least 6 characters.");
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(credential.user, { displayName });
      await setDoc(doc(db, "profiles", credential.user.uid), {
        displayName: displayName || "",
        email: credential.user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      status("Your account has been created.");
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      status("You are signed in.");
    }
    $("authForm").reset();
    setTimeout(() => $("authModal")?.classList.remove("open"), 700);
  } catch (error) {
    const messages = {
      "auth/email-already-in-use": "An account already exists for this email. Try signing in.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/weak-password": "Choose a stronger password.",
      "auth/too-many-requests": "Too many attempts. Please wait and try again.",
      "auth/network-request-failed": "Network issue. Check your connection and try again."
    };
    status(messages[error.code] || error.message || "Something went wrong. Please try again.", true);
  } finally {
    $("authSubmit").disabled = $("authMode").disabled = $("authReset").disabled = false;
  }
});
$("authReset")?.addEventListener("click", async () => {
  const email = $("authEmail").value.trim();
  if (!email) return status("Enter your email address first.", true);
  try {
    await sendPasswordResetEmail(auth, email);
    status("If an account exists for that email, a password-reset email has been sent.");
  } catch (error) { status(error.message || "Could not send the reset email.", true); }
});
onAuthStateChanged(auth, user => {
  const button = $("accountButton");
  if (button) {
    button.textContent = user ? "Sign out" : "My account";
    button.onclick = user ? async () => { try { await signOut(auth); } catch (e) { status(e.message, true); } } : () => $("authModal")?.classList.add("open");
  }
  document.dispatchEvent(new CustomEvent("wigs-auth-changed", {
    detail: { signedIn: !!user, displayName: user?.displayName || "", email: user?.email || "" }
  }));
});
