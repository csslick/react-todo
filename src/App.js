import {useState, useEffect} from 'react';
import './App.css';
import List from './components/List';
import Alert from './components/Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, 
    msg: 'alert msg',
    type: '',
  });

  // 파라미터 값이 없으면 기본 파라미터로 설정
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({
      show: show, 
      msg: msg,
      type: type,
    })
  }

  const clearList = () => {
    const c = window.confirm('정말로 모든 목록을 삭제할까요?')
    if(c) {
      showAlert(true, '목록을 전부 삭제함', "danger");
      setList([]);      
    } else {
      return;
    }
  }

  const removeItem = (id) => {
    showAlert(true, '해당 목록을 삭제함', 'danger');
    const newList = list.filter(item => {
      return item.id !== id
    })
    setList(newList);
  }

  const editItem = (id) => {
    setIsEditing(true);
    const editItem = list.find(item => {
      return item.id === id
    })
    setEditID(id);
    setName(editItem.title)
    console.log(editItem.title);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      // 빈값인 경우(alert 표시)
      showAlert(true, '값을 입력해 주세요.', 'danger');
    } else if(name && isEditing){
      // 변경 내용 업데이트
      showAlert(true, "수정됨", 'success'); 
      const newList = list.map(item => {
        if(item.id == editID) {
          item.title = name;
        }
        return item;
      })
      // 상태 업데이트
      setList(newList);
      setIsEditing(false)
      setName('');
      console.log(list)
    } else {
      // 새글 추가
      showAlert(true, "항목이 추가됨", 'success');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([...list, newItem]); // 기존 list 데이터에 추가
      setName(''); // 입력값 초기화
      console.log(list)
    }
  }

  return (
    <section>
      <div className="todo-container">
        <form onSubmit={ handleSubmit }>
          {alert.show && <Alert alert={alert} removeAlert={showAlert} list={list} />}
          <h3>Todo List</h3>
          <div className="form-control">
            <input 
              type="text" 
              placeholder="내용 입력"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }} 
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="list-container">
            <List 
              list={list} 
              removeItem={removeItem} 
              editItem={editItem}
            />
            <button 
              className="clear-btn"
              onClick={clearList}
            >clear items</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
