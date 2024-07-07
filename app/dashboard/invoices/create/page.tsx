import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

/**
 * 請求書作成ページ
 * @returns 
 */
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      {/* ページ階層リンク */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      {/* 請求書入力エリア */}
      <Form customers={customers} />
      
    </main>
  );
}