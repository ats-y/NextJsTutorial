// サーバアクションであることを宣言。
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// オブジェクト型の検証スキーマを定義する。
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// 検証スキーマからidとdateを検証対象から除外する。
const CreateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * 請求書を生成し、DBに登録する。
 * @param formData フォームで入力された請求書情報
 */
export async function createInvoice(formData: FormData) {

  // 妥当性を検証する。
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // 請求額はセントにする。
  const amountInCents = amount * 100;

  // 日付はISO8601形式にする。
  const date = new Date().toISOString().split('T')[0];

  // 請求書情報をDBに登録する。
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // 請求書一覧ページのクライアント側のルータキャッシュをクリアし、リダイレクトする。
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * 請求書情報を更新する。
 * @param id 請求書ID
 * @param formData フォームで入力された請求書情報
 */ 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/**
 * 請求書情報を削除する。
 * @param id 請求書ID
 */
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}