import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { 
  updateEmail, 
  sendEmailVerification, 
  reauthenticateWithCredential, 
  EmailAuthProvider, 
  updatePassword, 
  deleteUser 
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle email update
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error('Email baru harus diisi');
      return;
    }
    
    if (newEmail === currentUser?.email) {
      toast.error('Email baru harus berbeda dengan email saat ini');
      return;
    }
    
    try {
      setLoading(true);
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser?.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update email
      await updateEmail(auth.currentUser, newEmail);
      
      // Send verification email
      await sendEmailVerification(auth.currentUser);
      
      toast.success('Email berhasil diubah. Silakan verifikasi email baru Anda.');
      setNewEmail('');
      setCurrentPassword('');
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error(`Gagal memperbarui email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Kata sandi baru tidak cocok');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Kata sandi minimal 6 karakter');
      return;
    }
    
    try {
      setLoading(true);
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, newPassword);
      
      toast.success('Kata sandi berhasil diubah');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setPasswordError('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(`Gagal memperbarui kata sandi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan!')) {
      return;
    }
    
    try {
      setLoading(true);
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Delete user account
      await deleteUser(auth.currentUser);
      
      // Logout and redirect
      await logout();
      toast.success('Akun berhasil dihapus');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error(`Gagal menghapus akun: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Kembali"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan Akun</h1>
        </div>
        
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Memproses...</p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Header */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Kelola pengaturan akun Anda di sini. Semua perubahan akan disimpan secara otomatis.
                </p>
              </div>
            </div>
          </div>


          
          {/* Ubah Email */}
          <div className="border-b border-gray-200 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ubah Email</h2>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label htmlFor="current-email" className="block text-sm font-medium text-gray-700">Email Saat Ini</label>
                <input
                  type="email"
                  id="current-email"
                  value={currentUser?.email || ''}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="new-email" className="block text-sm font-medium text-gray-700">Email Baru</label>
                <input
                  type="email"
                  id="new-email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="current-password-email" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="current-password-email"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Simpan Perubahan Email
              </button>
            </form>
          </div>
          
          {/* Ubah Password */}
          <div className="border-b border-gray-200 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ubah Kata Sandi</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 block w-full rounded-md ${passwordError ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pr-10`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Simpan Kata Sandi Baru
              </button>
            </form>
          </div>

          {/* Aksi Berbahaya */}
          <div className="pt-6">
            <h2 className="text-lg font-medium text-red-700 mb-4">Zona Berbahaya</h2>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Hapus Akun</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Setelah Anda menghapus akun, tidak ada jalan kembali. Harap pastikan.</p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="delete-account-password" className="block text-sm font-medium text-red-700">Konfirmasi Kata Sandi</label>
                      <input
                        type="password"
                        id="delete-account-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Masukkan kata sandi Anda"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Hapus Akun Saya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
