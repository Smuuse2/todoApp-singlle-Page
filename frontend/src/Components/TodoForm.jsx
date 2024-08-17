import React, { useState, useEffect } from "react";
import InputModels from "./Models/InputModels";
import TodoServices from '../Services/Todo';

function TodoForm() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // Create Component
  const CreateComponent = ({ cancelCreate }) => {
    const [title, setTitle] = useState('');

    const submitHandler = (e) => {
      e.preventDefault();
      TodoServices.create({ title }).then((response) => {
        console.log(response.data);
        setTodo(prevTodos => [...prevTodos, response.data]);
        setTitle('');
        cancelCreate();
      });
    };

    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              Todo App
            </h2>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <InputModels setValue={setTitle} value={title} type="text" />
              <button
                type="submit"
                className="flex w-full mt-3 justify-center bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={cancelCreate}
                className="flex w-full mt-3 justify-center bg-gray-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Update Component
  const UpdateComponent = ({ cancelUpdate, todo }) => {
    const [title, setTitle] = useState(todo.title);

    const submitHandler = (e) => {
      e.preventDefault();
      TodoServices.update(todo.id, { title }).then((response) => {
        console.log(response.data);
        setTodo(prevTodos =>
          prevTodos.map(t => (t.id === todo.id ? response.data : t))
        );
        setTitle('');
        cancelUpdate();
      });
    };

    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              Update Todo
            </h2>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <InputModels setValue={setTitle} value={title} type="text" />
              <button
                type="submit"
                className="flex w-full mt-3 justify-center bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={cancelUpdate}
                className="flex w-full mt-3 justify-center bg-gray-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    TodoServices.findAll()
      .then((res) => {
        setTodo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeTodo = (id) => {
    TodoServices.elete(id)
      .then((response) => {
        console.log(response);
        setTodo(todo.filter(todo => todo.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTodo = (todo) => {
    setIsUpdating(true);
    
    setCurrentTodo(todo);
  };

  if (loading) return <h1 className="mt-4 ml-12 font-medium text-xl">loading...</h1>;

  return (
    <div className="relative flex p-9 flex-col w-full h-full text-gray-700 bg-white">
      <div className="justify-end flex">
        <div>
          {!isCreating && !isUpdating && (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-800 py-2 px-5 text-white mt-3 hover:bg-blue-600 items-center m-4"
            >
              Create
            </button>
          )}
        </div>
        <hr />
      </div>

      {isCreating ? (
        <CreateComponent cancelCreate={() => setIsCreating(false)} />
      ) : isUpdating && currentTodo ? (
        <UpdateComponent
          cancelUpdate={() => {
            setIsUpdating(false);
            setCurrentTodo(null);
          }}
          todo={currentTodo}
        />
      ) : (
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                  ID
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Title
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Edit
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Delete
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {todo.map((todo) => (
              <tr key={todo.id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {todo.id}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {todo.title}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button
                    onClick={() => editTodo(todo)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoForm;
