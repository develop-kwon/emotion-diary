import './App.css';
import { Route, Routes } from 'react-router-dom';
import { createContext, useReducer, useRef } from 'react';
import New from './pages/New';
import Diary from './pages/Diary';
import Home from './pages/Home';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
// assets폴더에 이미지를 저장해서 import하여 불러온다면 브라우저에서 캐시에 저장하여 다시 불러올 필요가 없어진다.

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-08-29").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2025-08-28").getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2025-07-28").getTime(),
    emotionId: 3,
    content: "3번 일기 내용"
  }
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) =>
        String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}> {/* state를 공유할 수 있도록 해줌 */}
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>  {/* 기능 공유 */}
          <Routes>    {/* Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다. */}
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />   {/* 위의 3개의 주소가 아니면 해당 페이지를 렌더링한다. */}
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;