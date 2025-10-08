'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { isDark } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/register');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <style jsx global>{`
        body {
          background: var(--background);
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }

        :root {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --border: rgba(148, 163, 184, 0.2);
        }

        [data-theme="light"] {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --border: rgba(15, 23, 42, 0.2);
        }

        .profile-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .profile-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        [data-theme="light"] .profile-card {
          background: rgba(255, 255, 255, 0.95);
        }

        .profile-card h1 {
          color: var(--text-primary);
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .profile-card p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-size: 14px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 2px solid var(--border);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">
          <h1>Welcome, {user.fullName}!</h1>
          <p>Email: {user.email}</p>
          <p>You have successfully logged in to your account.</p>
          
          <div className="button-group">
            <Link href="/" className="btn btn-primary">
              Go to Home
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}