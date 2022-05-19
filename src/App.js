import './App.css';
import Form from './Components/Form/Form';
import PostList from './Components/PostList/PostList';
import Edit from './Components/Edit/Edit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <>
      <Router>
    
        <Routes>
          <Route exact path='/' element={<PostList />} />
          <Route exact path='/Form' element={<Form />} />
          <Route exact path='/postlist' element={<PostList />} />
          <Route exact path='/form' element={<Form />} />
          <Route exact path='/edit/:id' element={<Edit />} />
          
          
        </Routes>

      </Router>
      
    </>
  );
}

export default App;
