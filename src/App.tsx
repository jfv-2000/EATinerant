import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebaseCredentials from "./credentials";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./pages/Login";
import Main from "./pages/Main";

firebase.initializeApp(firebaseCredentials);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth as any);

  return (
    <div>
      {user ? (
        <Main firestore={firestore} firebase={firebase} auth={auth} />
      ) : (
        <Login firebase={firebase} auth={auth} />
      )}
    </div>
  );
}

export default App;
