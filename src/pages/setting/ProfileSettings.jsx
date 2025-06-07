import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiSave, FiUser, FiMail, FiPhone, FiCalendar, FiX, FiCheck, FiBookOpen } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase/config';
import ReadHistory from '../../components/ReadHistory';

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const ProfileSettings = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: currentUser?.email || '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
  });

  // Set initial form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: currentUser.gender || '',
      });
      
      if (currentUser.photoURL) {
        setPreview(currentUser.photoURL);
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 500;
          const maxHeight = 500;
          let width = img.width;
          let height = img.height;

          // Hitung ulang ukuran gambar
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Set ukuran canvas
          canvas.width = width;
          canvas.height = height;
          
          // Gambar ulang dengan kualitas 0.8 (80%)
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Konversi ke blob dengan kualitas 80%
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            'image/jpeg',
            0.8
          );
        };
      };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.match('image.*')) {
      setError('File harus berupa gambar');
      return;
    }

    // Validasi ukuran file (maks 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimal 5MB');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setPhoto(file);
      
      // Buat preview langsung dari file yang dipilih
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLoading(false);
      };
      reader.onerror = () => {
        setError('Gagal memuat gambar');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Gagal memproses gambar');
      setLoading(false);
    }
  };

  const uploadPhoto = async (file) => {
    if (!file) return null;
    
    try {
      // Buat nama file unik dengan timestamp
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.uid}_${timestamp}.${fileExt}`;
      
      // Buat referensi ke storage dengan nama file unik
      const storageRef = ref(storage, `profile_photos/${currentUser.uid}/${fileName}`);
      
      // Upload file ke Firebase Storage dengan metadata cache-control
      const metadata = {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // Cache 1 tahun
      };
      
      // Upload file langsung tanpa kompresi
      const uploadTask = uploadBytes(storageRef, file, metadata);
      
      // Tampilkan progress upload jika diperlukan
      // uploadTask.on('state_changed', 
      //   (snapshot) => {
      //     // Progress function
      //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log('Upload is ' + progress + '% done');
      //   },
      //   (error) => {
      //     console.error('Upload error:', error);
      //     throw error;
      //   }
      // );
      
      const snapshot = await uploadTask;
      
      // Dapatkan URL download
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw new Error('Gagal mengunggah foto profil: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let photoURL = currentUser?.photoURL || '';
      let shouldUpdatePhoto = false;
      
      // Jika ada foto baru, unggah ke storage
      if (photo) {
        try {
          // Tampilkan pesan bahwa upload sedang berlangsung
          toast.loading('Mengunggah foto profil...', { 
            id: 'upload-photo',
            duration: 3000,
            position: 'top-right',
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              padding: '12px 16px',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            },
            icon: <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>,
          });
          
          // Upload foto tanpa menunggu selesai
          const uploadPromise = uploadPhoto(photo);
          
          // Update UI terlebih dahulu
          const displayName = formData.displayName || currentUser?.displayName || '';
          await updateProfile(displayName, URL.createObjectURL(photo));
          
          // Tunggu upload selesai di background
          uploadPromise
            .then(url => {
              // Update dengan URL asli setelah upload selesai
              updateProfile(displayName, url);
              
              // Tampilkan notifikasi sukses
              toast.success('Foto profil berhasil diperbarui!', { 
                id: 'upload-photo',
                duration: 3000,
                position: 'top-right',
                style: {
                  background: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                  padding: '12px 16px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                },
                icon: <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>,
              });
              
              // Refresh halaman setelah 1 detik untuk memastikan semua komponen terupdate
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch(err => {
              console.error('Background upload error:', err);
              toast.error('Gagal mengunggah foto. Silakan coba lagi.', { 
                id: 'upload-photo',
                duration: 5000,
                position: 'top-right',
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  padding: '12px 16px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                },
                icon: <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>,
              });
            });
            
          shouldUpdatePhoto = true;
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error('Gagal mengunggah foto. Pastikan ukuran file tidak melebihi 5MB dan formatnya sesuai.', { 
            id: 'upload-photo',
            duration: 5000,
            position: 'top-right'
          });
          throw new Error('Gagal mengunggah foto: ' + (uploadError.message || 'Ukuran file mungkin terlalu besar'));
        }
      } else {
        // Jika tidak ada foto baru, langsung update profil
        const displayName = formData.displayName || currentUser?.displayName || '';
        await updateProfile(displayName, photoURL);
        
        // Tampilkan notifikasi sukses update profil
        toast.success('Profil berhasil diperbarui!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
            padding: '12px 16px',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          },
          icon: <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>,
        });
      }
      
      // Reset form photo
      setPhoto(null);
      
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      // Tampilkan notifikasi error
      toast.error(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const [showReadHistory, setShowReadHistory] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Toast Notifications */}
      
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 shadow rounded-lg p-6">
            {/* Header */}
            <div className="pb-5 border-b border-gray-200 mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 p-2 rounded-full hover:bg-gray-100"
                >
                  <FiArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Pengaturan Profil</h2>
              </div>
            </div>

            {/* Success/Error Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 relative">
                      {loading ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                      ) : preview ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={preview} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreview('');
                              setPhoto(null);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            aria-label="Hapus foto"
                            disabled={loading}
                          >
                            <FiX className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiUser className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label 
                      className={`absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={loading ? 'Mengunggah...' : 'Unggah foto profil'}
                    >
                      {loading ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FiCamera className="h-4 w-4" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                        disabled={loading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    {loading ? 'Mengunggah...' : 'Klik ikon kamera untuk mengubah foto'}
                  </p>
                </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {formData.displayName || 'Pengguna'}
              </h3>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Nama Lengkap */}
                <div className="sm:col-span-6">
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="displayName"
                      id="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                </div>

                {/* Email (readonly) */}
                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      readOnly
                      className="bg-gray-100 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Email tidak dapat diubah
                  </p>
                </div>

                {/* Nomor Telepon */}
                <div className="sm:col-span-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Contoh: 081234567890"
                    />
                  </div>
                </div>

                {/* Tanggal Lahir */}
                <div className="sm:col-span-3">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div className="sm:col-span-3">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'Menyimpan...'
                    ) : (
                      <>
                        <FiSave className="-ml-1 mr-2 h-5 w-5" />
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Read History Section */}
        <div className="mt-12">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-50 text-green-600 mr-4">
                <FiBookOpen size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Reading History</h2>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ReadHistory 
              onArticleClick={(article) => {
                // Navigate to the article
                window.location.href = `/education/article/${article.id}`;
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
