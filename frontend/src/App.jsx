import React from 'react';
import Quiz from './components/Quiz';
import PlayQuiz from './components/PlayQuiz';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';


const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<PlayQuiz />} />
          <Route path="/update-answer" element={<Quiz />} />
        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
