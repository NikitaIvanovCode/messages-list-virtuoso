import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { Component } from './Component';

const instanse = axios.create({
  baseURL: 'http://localhost:6969',
});

instanse.interceptors.request.use(config => {
  config.headers = { Authorization: '0100101' };
  return config;
});

instanse.interceptors.response.use(response => {
  response.data.code = 200;
  return response;
});

function App() {
  const [text, setText] = useState('hello');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const btnGetHandler = async () => {
  //   const res = await axios.get(instanse.baseURL);
  //   setText(res.data.message);
  // };

  const btnPostHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      method: 'post',
      url: '/data',
      data: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    };

    const res = await instanse(config);
    setIsLoading(false);
    console.log(res.data);
  };

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: 'http://localhost:6969',
    },
    { manual: true }
  );

  useEffect(() => {
    if (data?.message) {
      setText(data.message);
    }
  }, [data]);

  const btnGetHandler = () => {
    execute();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <button onClick={btnGetHandler}>refetch</button>
      <div>{text}</div>
      <hr />
      <form onSubmit={btnPostHandler}>
        <div>
          <input type="text" name="email" placeholder="email" />
        </div>
        <div>
          <input type="text" name="password" placeholder="password" />
        </div>
        <button>post</button>
      </form>
      {isLoading && <div>loading...</div>}
      <div>{message}</div>
      <Component text={text} />
    </div>
  );
}

export default App;
