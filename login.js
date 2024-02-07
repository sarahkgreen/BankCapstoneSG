import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function Login(){
	const firebaseConfig = {
		apiKey: process.env.REACT_APP_API_KEY,
		authDomain: process.env.REACT_APP_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_APP_ID,
	};

    const app = initializeApp(firebaseConfig);

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');
    const logout = document.getElementById('logout');

	login.addEventListener('click', e => {
		const auth  = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => console.log(e.message));
	});

	signup.addEventListener('click', e => {
		const auth  = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
		promise.catch(e => console.log(e.message));
	});

	logout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			logout.style.display = 'inline';
			login.style.display  = 'none';
			signup.style.display = 'none';
		} else{
			console.log('User is not logged in');
			logout.style.display = 'none';
			login.style.display  = 'inline';
			signup.style.display = 'inline';
		}
	});
}

export default firebaseConfig;
