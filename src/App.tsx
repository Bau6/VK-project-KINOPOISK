import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from "./pages/first_page/first_page";
import Test from "./pages/test_page/test";

interface AppProps {
}

const App: React.FC<AppProps> = (props) => {
  return (
      <BrowserRouter>
        <AppContent {...props}/>
      </BrowserRouter>
  );
}

interface AppContentProps {

}

const AppContent: React.FC<AppContentProps> = (props) => {
  return (
      <div>
        <Routes>
          <Route path={"/"} element={<FirstPage />}/>
          <Route path={"/"} element={<Test />}/>
        </Routes>
      </div>
  )
}

export default App;