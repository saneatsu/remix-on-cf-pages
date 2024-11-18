import { Suspense } from "react";

import { Await, useLoaderData } from "@remix-run/react";

export type Todo = {
  id: number,
  userId: number,
  title: string
  completed: boolean
}

/**
 * ToDoを200件取得する
 */
async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return todos as Todo[]
}

export async function loader() {
  const todos = getTodos()
  return { todos };
}

export default function JsonPlaceholder200Page() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl">JSON Placeholder から 200件取得</h1>

      <Suspense
        fallback={
          <div>
            <p>loading...</p>
          </div>
        }
      >
        <Await resolve={todos} errorElement={<p>error</p>}>
          {(todos) => {
            console.dir(todos);
            if (!todos) {
              return <p>no data</p>
            }

            return <ul>
              {todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
            </ul>
          }}
        </Await>
      </Suspense>
    </div>
  );
}
