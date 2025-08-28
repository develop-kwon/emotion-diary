import './App.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import New from './pages/New';
import Diary from './pages/Diary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { getEmotionImage } from './util/get-emtion-image';
import Button from './components/Button';
import Header from './components/Header';
// assets폴더에 이미지를 저장해서 import하여 불러온다면 브라우저에서 캐시에 저장하여 다시 불러올 필요가 없어진다.

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/new");
  };

  return (
    <>
      <Header
        title={"Header"}
        leftChild={<Button text={"left"} />}
        rightChild={<Button text={"right"} />}
      />
      <Button
        text={"test"}
        onClick={() => {
          console.log("test click")
        }}
      />
      <Button
        text={"test"}
        type={"POSITIVE"}
        onClick={() => {
          console.log("test click")
        }}
      />
      <Button
        text={"test"}
        type={"NEGATIVE"}
        onClick={() => {
          console.log("test click")
        }}
      />
      <Routes>    {/* Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다. */}
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<NotFound />} />   {/* 위의 3개의 주소가 아니면 해당 페이지를 렌더링한다. */}
      </Routes>
    </>
  );
}

export default App;