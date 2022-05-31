import './App.css';
import Form from './Components/Form/Form';
import PostList from './Components/PostList/PostList';
import Edit from './Components/Edit/Edit';
import ViewUSer from './Components/View/ViewUSer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import { ToastContainer } from 'react-toastify';
import NavBar from './Components/NavBar/NavBar';
import AddField from './Components/AddField/AddField';

let token = JSON.parse(localStorage.getItem("userDetails"));
let auth = token && token.data.idToken

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<SignUp />} />
          {!auth && <Route exact path='/SignIn' element={<SignIn />} />}
          {auth && <Route exact path='/Form' element={<Form />} />}
          {auth && <Route exact path='/postlist' element={<PostList />} />}
          {auth && <Route exact path='/Edit/:id' element={<Edit />} />}
          {auth && <Route exact path='/view' element={<ViewUSer />} />}
          <Route exact path='postlist/view/:id' element={<ViewUSer />} />
          {auth && <Route exact path='/field' element={<AddField />} />}
          {/* <Route exact path='postlist/Edit/:id' element={<Edit/>}/> */}
        </Routes>
      </Router>
      < ToastContainer />
    </>
  );
}

export default App;
