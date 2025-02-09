'use server';

import { createSession } from "@lib/auth/session";

export async function logIn(prevState: unknown, formData: FormData) {
  try {
      const loginDTO = Object.fromEntries(formData.entries());
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginDTO),
      });

      const result = await response.json();
      await createSession(result.jwt, new Date(result.expiresAt));

      return result;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} catch (error: any) {
      return {
          errors: {
              login: error.message,
          },
      };
  }
}