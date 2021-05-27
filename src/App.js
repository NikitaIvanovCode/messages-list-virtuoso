import React, { useEffect, useState, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { data } from './utils';

function App() {
  const [dataState, setDataState] = useState([]);
  const listRef = useRef();

  useEffect(() => {
    data.map((item, index) => {
      setTimeout(() => {
        setDataState(prev => [...prev, item]);
      }, 300 * index);
    });
  }, []);

  useEffect(() => {
    listRef.current.scrollToIndex({
      index: dataState.length - 1,
      behavior: 'smooth',
    });
  }, [dataState]);

  return (
    <div>
      <Virtuoso
        ref={listRef}
        style={{
          height: '300px',
          width: '750px',
          border: '1px solid #cbcbcb',
        }}
        totalCount={dataState.length}
        itemContent={index => (
          <div
            style={{
              padding: '5px',
              border: '1px solid #c1c1c1',
              margin: '5px 0 5px 5px',
              width: '80%',
            }}
            key={index}
          >
            <div>{dataState[index]}</div>
          </div>
        )}
      />
    </div>
  );
}

export default App;
