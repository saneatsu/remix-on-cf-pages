import { Suspense } from "react";

import type { Company, PrismaClient, User } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";

async function getUsers(client: PrismaClient): Promise<User[]> {
  try {
    const users = await client.user.findMany();
    return users
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch users')
  }
}

async function getCompanies(client: PrismaClient): Promise<Company[]> {
  try {
    const companies = await client.company.findMany();
    return companies
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch companies')
  }
}

export async function loader({ context }: LoaderFunctionArgs) {
  const users = getUsers(context.db)
  const companies = getCompanies(context.db)
  return { users, companies };
}

export default function DbConnectPage() {
  const { users, companies } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-10">
      <h1 className="text-2xl">DB（Turso）からデータを取得</h1>

      <h2 className="text-xl">ユーザー一覧</h2>
      <Suspense
        fallback={
          <div>
            <p>loading...</p>
          </div>
        }
      >
        <Await resolve={users} errorElement={<p>error</p>}>
          {(users) => {
            console.dir(users);
            if (!users) {
              return <p>no data</p>
            }

            return <ul>
              {users.map((user) => <li key={user.id}>{user.email}</li>)}
            </ul>
          }}
        </Await>
      </Suspense>

      <h2 className="text-xl">会社</h2>
      <Suspense
        fallback={
          <div>
            <p>loading...</p>
          </div>
        }
      >
        <Await resolve={companies} errorElement={<p>error</p>}>
          {(companies) => {
            console.dir(companies);
            if (!companies) {
              return <p>no data</p>
            }

            return <ul>
              {companies.map((company) => <li key={company.id}>{company.name}</li>)}
            </ul>
          }}
        </Await>
      </Suspense>
    </div>
  );
}
