"use client";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useState, FormEvent} from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
};
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        username,
        password
      });

      if (response.status === 200) {
        // Redirect to the main page on successful login
        router.push('/');
      } else {
        // Handle login error
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-white rounded"
        onSubmit={handleSubmit}>
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black rounded p-2"
          name="email" />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black rounded p-2"
            name="password" />
        </div>
        <button className="w-full border border-solid border-black rounded">
          Sign In
        </button>
        <Link
          href="/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black">
          Don't have an account?
        </Link>
      </form>
    </section>
);
  // return (
    
  //   <div className="flex h-screen w-full items-center justify-center">
  //     <form action="">
  //       <div className="w-full max-w-lg px-4">
  //         <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
  //           <Legend className="text-base/7 font-semibold text-white">
  //             Войти в Мастерскую
  //           </Legend>
  //           <Field>
  //             <Input
  //               className={clsx(
  //                 "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
  //                 "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
  //               )}
  //               placeholder="Логин"
  //                value={username}
  //               onChange={e => setUsername(e.target.value)}
  //             />
  //           </Field>
  //           <Field>
  //             <Input
  //               className={clsx(
  //                 "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
  //                 "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
  //               )}
  //               placeholder="Пароль"
  //               value={password}
  //               onChange={e => setPassword(e.target.value)}
  //             />
  //           </Field>
  //           <Button type="submit" className="rounded bg-green-700 px-4 py-2 text-sm text-white data-active:bg-green-900 data-hover:bg-green-500">
  //             Войти
  //           </Button>
  //         </Fieldset>
  //       </div>
  //     </form>
  //   </div>
  // );
}
