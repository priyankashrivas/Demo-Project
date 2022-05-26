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





function App() {
  return (
    <>
     
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<SignUp />} />
          <Route exact path='/Form' element={<Form />} />
          <Route exact path='/postlist' element={<PostList />} />
          {/* <Route exact path='/form' element={<Form />} /> */}
          <Route exact path='/edit/:id' element={<Edit />} />
          <Route exact path='/view' element={<ViewUSer />} />
          <Route exact path='postList/view/:id' element={<ViewUSer />} />
          <Route exact path='/SignUp' element={<SignUp />} />
          <Route exact path='/SignIn' element={<SignIn />} />
        </Routes>
      </Router>
      < ToastContainer />
      
      
      
    </>
  );
}

export default App;
