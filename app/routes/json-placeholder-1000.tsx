import { Suspense } from "react";

import { Await, useLoaderData } from "@remix-run/react";
import type { Todo } from "./json-placeholder-200";

/**
 * ToDoを1000件取得する
 */
async function getTodos() {
  const response1 = await fetch('https://jsonplaceholder.typicode.com/todos');
  const response2 = await fetch('https://jsonplaceholder.typicode.com/todos');
  const response3 = await fetch('https://jsonplaceholder.typicode.com/todos');
  const response4 = await fetch('https://jsonplaceholder.typicode.com/todos');
  const response5 = await fetch('https://jsonplaceholder.typicode.com/todos');

  const todos = await Promise.all([
    response1.json(),
    response2.json(),
    response3.json(),
    response4.json(),
    response5.json(),
  ]);

  return todos.flat()  as Todo[]
}

export async function loader() {
  const todos = getTodos()
  return { todos };
}

export default function JsonPlaceholder1000Page() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl">JSON Placeholder から 1000件取得</h1>

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
              {/* id がかぶるのでindexも使用している */}
              {todos.map((todo, index) => <li key={`${todo.id}_${index}`}>{todo.title}</li>)}
            </ul>
          }}
        </Await>
      </Suspense>
    </div>
  );
}
