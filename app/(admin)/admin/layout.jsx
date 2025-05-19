import Link from "next/link";

export default function AdminLayout({ children }) {


  return (
    <html lang="en">
      <body>
        <div>
           <aside >
            <h2>Admin Panel</h2>
            <ul>
              <li><Link href="/admin/orders">Manage Orders</Link></li>
              <li><Link href="/admin/products">Manage Products</Link></li>
              <li><Link href="/admin/users">Manage Users</Link></li>
            </ul>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}