//checking userstate
auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('2020ElectionCandidates').onSnapshot(snapshot => {
        setupCandidates(snapshot.docs);
        setupUI(user);
      });
    } else {
      setupUI();
      setupCandidates([]);
    }
  })

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const name = signupForm['signup-name'].value;
    //signup user
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        const modal = document.querySelector('#modal-signup');
        cred.user.updateProfile({
        displayName: name
        })
        M.Modal.getInstance(modal).close();
        signupForm.reset();

    });
});
//log out
const logout = document.querySelector('#logout')
logout.addEventListener('click',(e)=>{
    console.log('log out clicked');
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log('user signed out');
    })
})

//log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((getInfo) => {
    console.log(getInfo.user.displayName);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});