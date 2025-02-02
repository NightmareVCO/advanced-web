"use server";

import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createStudent(prevState: any, formData: FormData) {
  const student = Object.fromEntries(formData.entries());

  const response = await fetch('http://app-prod:8080/api/v1/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const result = await response.json();

  revalidatePath('/students');
  return result;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function updateStudent(prevState: any, formData: FormData) {
  const id = Number(formData.get('id'));
  const student = Object.fromEntries(formData.entries());

  const response = await fetch(`http://app-prod:8080/api/v1/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const result = await response.json();

  revalidatePath('/students');
  return result;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deleteStudent(prevState: any, formData: FormData) {
  const id = Number(formData.get('id'));
  const response = await fetch(`http://app-prod:8080/api/v1/students/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();

  revalidatePath('/students');
  return result;
}