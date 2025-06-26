
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, TrendingUp, Clock } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";
import { useDocuments } from "@/hooks/useDocuments";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const AdminAnalytics = () => {
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const { data: documents, isLoading: documentsLoading } = useDocuments();

  if (profilesLoading || documentsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Memuat data analisa...</div>
      </div>
    );
  }

  // Calculate user statistics
  const totalUsers = profiles?.length || 0;
  const adminUsers = profiles?.filter(p => p.role === 'admin').length || 0;
  const regularUsers = totalUsers - adminUsers;
  
  // Calculate document statistics
  const totalDocuments = documents?.length || 0;
  const pendingDocs = documents?.filter(d => d.status === 'PENDING').length || 0;
  const processingDocs = documents?.filter(d => d.status === 'PROCESSING').length || 0;
  const completedDocs = documents?.filter(d => d.status === 'COMPLETED').length || 0;
  const rejectedDocs = documents?.filter(d => d.status === 'REJECTED').length || 0;

  // User registration trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const userTrendData = last7Days.map(date => {
    const usersOnDate = profiles?.filter(p => 
      p.created_at.split('T')[0] === date
    ).length || 0;
    
    return {
      date: new Date(date).toLocaleDateString('id-ID', { 
        month: 'short', 
        day: 'numeric' 
      }),
      users: usersOnDate
    };
  });

  // Document status distribution
  const statusData = [
    { name: 'Pending', value: pendingDocs, color: '#f59e0b' },
    { name: 'Processing', value: processingDocs, color: '#3b82f6' },
    { name: 'Completed', value: completedDocs, color: '#10b981' },
    { name: 'Rejected', value: rejectedDocs, color: '#ef4444' }
  ];

  // Monthly document activity
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthName = date.toLocaleDateString('id-ID', { month: 'short' });
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    
    const docsInMonth = documents?.filter(d => 
      d.created_at >= monthStart && d.created_at <= monthEnd
    ).length || 0;
    
    return {
      month: monthName,
      documents: docsInMonth
    };
  });

  const chartConfig = {
    users: {
      label: "Pengguna",
      color: "#3b82f6"
    },
    documents: {
      label: "Dokumen",
      color: "#10b981"
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {adminUsers} admin, {regularUsers} user biasa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Semua dokumen yang dikirim
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokumen Selesai</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedDocs}</div>
            <p className="text-xs text-muted-foreground">
              {totalDocuments > 0 ? Math.round((completedDocs / totalDocuments) * 100) : 0}% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Proses</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocs + processingDocs}</div>
            <p className="text-xs text-muted-foreground">
              {pendingDocs} pending, {processingDocs} processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Analisa Dokumen</TabsTrigger>
          <TabsTrigger value="users">Analisa Pengguna</TabsTrigger>
          <TabsTrigger value="activity">Aktivitas Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Status Dokumen</CardTitle>
                <CardDescription>
                  Persentase dokumen berdasarkan status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Document Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Tren Dokumen Bulanan</CardTitle>
                <CardDescription>
                  Jumlah dokumen yang dikirim per bulan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="documents" fill="#10b981" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Registration Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Registrasi Pengguna (7 Hari Terakhir)</CardTitle>
                <CardDescription>
                  Jumlah pengguna baru yang mendaftar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={userTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* User Role Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Role Pengguna</CardTitle>
                <CardDescription>
                  Perbandingan admin dan pengguna biasa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Admin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{adminUsers}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {totalUsers > 0 ? Math.round((adminUsers / totalUsers) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">User Biasa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{regularUsers}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {totalUsers > 0 ? Math.round((regularUsers / totalUsers) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${totalUsers > 0 ? (adminUsers / totalUsers) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Aktivitas Sistem</CardTitle>
              <CardDescription>
                Statistik keseluruhan sistem SuratAman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{completedDocs}</div>
                  <div className="text-sm text-muted-foreground">Dokumen Berhasil</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{pendingDocs + processingDocs}</div>
                  <div className="text-sm text-muted-foreground">Dalam Proses</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{rejectedDocs}</div>
                  <div className="text-sm text-muted-foreground">Ditolak</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Tingkat Keberhasilan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dokumen Selesai</span>
                    <span>{totalDocuments > 0 ? Math.round((completedDocs / totalDocuments) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${totalDocuments > 0 ? (completedDocs / totalDocuments) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
