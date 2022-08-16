import { useState,useRef} from "react";
function App() {
  const nameRef = useRef(null);
  const surRef = useRef(null);
  const emRef = useRef(null);
  const pwRef = useRef(null);
  const emRef2 = useRef(null);
  const pwRef2 = useRef(null);
  const [name, setName] = useState('');
  const [surname, setSur] = useState('');
  const [email, setEm] = useState('');
  const [pword, setPw] = useState('');
  const [email2, setEm2] = useState('');
  const [pword2, setPw2] = useState('');

  const emls = {};
  
  
  function checkArr(_email, _pword){
    var flag = false;
    for(var key in emls){
      if(key === _email){
        flag = true;
        break;
      }
    }
    if(!flag){
      emls[_email] = _pword;
    }
    console.log(emls);
  }

  function log(){
    setEm2(emRef2.current.value);
    setPw2(pwRef2.current.value);
    if(login(email2,pword2)){
      console.log("success!");
    }
  }
 
  function login(_email, _pword){
    for(var key in emls){
      if(key === _email){
        if(emls[key] === _pword){
          return true;
        }
      }
    }
    return false;
  }

  function handleClick() {
    setName(nameRef.current.value);
    setSur(surRef.current.value);
    setEm(emRef.current.value);
    setPw(pwRef.current.value);
    checkArr(email,pword);
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <h2>Name:</h2>
      <input 
        ref={nameRef}
        type="text" 
        id="name"
        name="name"
      />
      <h2>Surname :</h2>
      <input 
        ref={surRef}
        type="text" 
        id="surname"
        name="surname"
      />
      <h2>Email :</h2>
      <input 
        ref={emRef}
        type="text" 
        id="email"
        name="email"
      />
      <h2>Password :</h2>
      <input 
        ref={pwRef}
        type="password" 
        id="pword"
        name="pword"
      />
      <br></br>
      <button onClick={handleClick}> Submit</button>
      <h2>Contact:</h2>
      <p> {name} {surname}</p>
      <h2>Email:</h2>
      <p>{email}</p>

      <h1>Login</h1>
      <h2>Email :</h2>
      <input 
        ref={emRef2}
        type="text" 
        id="email2"
        name="email2"
      />
      <h2>Password :</h2>
      <input 
        ref={pwRef2}
        type="password" 
        id="pword2"
        name="pword2"
      />
      <button onClick={log}> Submit</button>
    </div>
    
  );
};

export default App;
