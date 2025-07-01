
# Document Verification System

Sistem verifikasi dokumen digital yang aman dan terintegrasi dengan teknologi blockchain untuk memastikan keaslian dan integritas dokumen.

## 🚀 Fitur Utama

- **Verifikasi Dokumen Digital**: Upload dan verifikasi keaslian dokumen
- **Dashboard Admin**: Kelola dokumen, pengguna, dan sistem audit
- **Audit Trail**: Lacak semua aktivitas sistem
- **Integrasi API**: Dukungan untuk integrasi dengan sistem eksternal
- **Sertifikat Digital**: Generate dan kelola sertifikat verifikasi
- **Real-time Updates**: Update status dokumen secara real-time

## 🛠️ Teknologi

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: TanStack React Query
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Prasyarat

- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git

## 🏗️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📁 Struktur Project

```
src/
├── components/           # Komponen UI
│   ├── ui/              # shadcn/ui components
│   ├── Admin*.tsx       # Komponen admin dashboard
│   ├── Document*.tsx    # Komponen terkait dokumen
│   └── ...
├── pages/               # Halaman aplikasi
│   ├── AdminDashboard.tsx
│   ├── Auth.tsx
│   ├── KirimSurat.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useDocuments.ts
│   ├── useAuth.ts
│   └── ...
├── integrations/        # Konfigurasi eksternal
│   └── supabase/
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🔧 Konfigurasi Database (Supabase)

### Tables Schema

- `documents` - Menyimpan data dokumen
- `profiles` - Profile pengguna
- `audit_trail` - Log aktivitas sistem
- `certificates` - Sertifikat verifikasi
- `verification_results` - Hasil verifikasi

### Setup RLS (Row Level Security)

Semua tabel menggunakan RLS untuk keamanan data. Pastikan policies sudah dikonfigurasi dengan benar.

## 🎯 Penggunaan

### Untuk User Biasa

1. **Upload Dokumen**: Gunakan halaman "Kirim Surat"
2. **Cek Status**: Monitor progress di "Cek Progress"
3. **Verifikasi**: Cek keaslian dokumen di "Cek Keaslian"

### Untuk Admin

1. **Login Admin**: Akses `/admin` dengan kredensial admin
2. **Kelola Dokumen**: Review dan ubah status dokumen
3. **Monitor Analytics**: Lihat statistik sistem
4. **Audit Trail**: Pantau aktivitas pengguna

## 🔌 API Integration

Sistem mendukung integrasi dengan API eksternal melalui:

```typescript
// Contoh penggunaan API Integration
import { ApiIntegrationService } from '@/utils/apiIntegration';

const apiService = new ApiIntegrationService(config);
const result = await apiService.verifyDocument(documentData);
```

## 📊 Monitoring & Logging

- **Console Logs**: Gunakan browser dev tools
- **Supabase Dashboard**: Monitor database dan auth
- **Audit Trail**: Lacak aktivitas melalui dashboard admin

## 🚀 Deployment

### Deploy ke Lovable

1. Klik tombol "Publish" di Lovable editor
2. Aplikasi akan deploy otomatis

### Deploy Manual

1. Build aplikasi:
```bash
npm run build
```

2. Upload folder `dist/` ke hosting provider

## 🔗 Custom Domain

Untuk menggunakan domain custom:

1. Buka Project > Settings > Domains di Lovable
2. Ikuti instruksi untuk connect domain
3. Memerlukan Lovable paid plan

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build lokal
- `npm run lint` - Check linting

## 🐛 Troubleshooting

### Common Issues

1. **Build Error**: Pastikan semua dependencies terinstall
2. **Auth Error**: Check konfigurasi Supabase
3. **Database Error**: Verifikasi RLS policies

### Getting Help

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

Copyright © 2025. All rights reserved.

## 🔗 Links

- **Live Demo**: [Your App URL]
- **Lovable Project**: https://lovable.dev/projects/515efacc-8b08-4d2a-b892-3b962260d2b7
- **GitHub**: [Your GitHub Repository]

---

> 💡 **Tip**: Gunakan Lovable editor untuk development yang lebih cepat dan efisien!
