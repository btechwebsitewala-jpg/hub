import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Calendar,
  FileText,
  BarChart3,
  Loader2,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  RefreshCw,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Upload,
  Users,
  Download,
  User,
  Star,
  Mail,
  Phone,
  TestTube2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateReceipt } from "@/utils/receiptGenerator";
import { tests, packages, formatINR } from "@/data/testsData";
import { labTests } from "@/data/labTests";
import { drLalTests } from "@/data/drLalTests";
import { metropolisTests } from "@/data/metropolisTests";
import { pathkindTests } from "@/data/pathkindTests";

const allTestCatalogs = [
  ...tests as any[],
  ...packages as any[],
  ...labTests as any[],
  ...drLalTests as any[],
  ...metropolisTests as any[],
  ...pathkindTests as any[]
];

const getTestPrice = (name: string): number => {
  const normalizedName = name.trim().toUpperCase();
  const searchName = normalizedName.split(' [')[0].trim(); // Remove lab suffix if present
  const found = allTestCatalogs.find(t => t.name.trim().toUpperCase() === searchName);
  return found?.price || 0;
};

/* ─── Prescription Viewer Component ─── */
const PrescriptionViewer = ({ notes, referenceNumber }: { notes: string; referenceNumber: string }) => {
  const [prescriptionUrl, setPrescriptionUrl] = useState<string | null>(null);
  const [loadingPrescription, setLoadingPrescription] = useState(false);
  const [prescriptionType, setPrescriptionType] = useState<'image' | 'pdf'>('image');
  const { toast } = useToast();

  const handleView = async () => {
    const match = notes.match(/\[Prescription: (.+?)\]/);
    if (!match?.[1]) return;

    setLoadingPrescription(true);
    try {
      const { data, error } = await supabase.storage
        .from('prescriptions')
        .download(match[1]);

      if (error || !data) {
        toast({ title: "Error", description: error?.message || "Could not load prescription.", variant: "destructive" });
        return;
      }

      const ext = match[1].split('.').pop()?.toLowerCase() || '';
      const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
      setPrescriptionType(isImage ? 'image' : 'pdf');

      const url = URL.createObjectURL(data);

      if (isImage) {
        setPrescriptionUrl(url);
      } else {
        // For PDF, trigger download directly
        const a = document.createElement('a');
        a.href = url;
        a.download = `prescription-${referenceNumber}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast({ title: "Downloaded", description: "Prescription PDF downloaded." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to load prescription.", variant: "destructive" });
    } finally {
      setLoadingPrescription(false);
    }
  };

  return (
    <div className="sm:col-span-2">
      <p className="text-sm text-muted-foreground mb-2">Prescription</p>
      {!prescriptionUrl ? (
        <Button size="sm" variant="outline" onClick={handleView} disabled={loadingPrescription}>
          {loadingPrescription ? (
            <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Loading...</>
          ) : (
            <><FileText className="h-4 w-4 mr-1.5" /> View Prescription</>
          )}
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="border rounded-lg overflow-hidden bg-muted/30 max-h-[400px] overflow-y-auto">
            <img
              src={prescriptionUrl}
              alt="Prescription"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => {
              const a = document.createElement('a');
              a.href = prescriptionUrl;
              a.download = `prescription-${referenceNumber}.jpg`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}>
              <Download className="h-4 w-4 mr-1.5" /> Download
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { URL.revokeObjectURL(prescriptionUrl); setPrescriptionUrl(null); }}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [testBookings, setTestBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [uploadingReport, setUploadingReport] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [discountAmount, setDiscountAmount] = useState<string>("0");
  const [savingBilling, setSavingBilling] = useState(false);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: appts, error: apptsErr }, { data: inqs, error: inqsErr }, { data: bookings, error: bookingsErr }, { data: profilesData, error: profilesErr }] = await Promise.all([
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("test_bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      ]);

      if (apptsErr) console.error("Appointments error:", apptsErr);
      if (inqsErr) console.error("Inquiries error:", inqsErr);
      if (bookingsErr) console.error("Bookings error:", bookingsErr);
      if (profilesErr) console.error("Profiles error:", profilesErr);

      setAppointments(appts || []);
      setInquiries(inqs || []);
      setTestBookings(bookings || []);
      setUsers(profilesData || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
    }
    setLoading(false);
  };

  const updateAppointmentStatus = async (id: string, status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show") => {
    const { error } = await supabase.from("appointments").update({
      status,
      ...(status === "confirmed" ? { confirmed_at: new Date().toISOString(), confirmed_by: user?.id } : {})
    }).eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: "Appointment status updated." });
    fetchData();
    setDetailsOpen(false);
  };

  const updateInquiryStatus = async (id: string, status: "pending" | "in_progress" | "completed" | "cancelled") => {
    const updates: any = { status };
    if (responseText && (status === "completed" || status === "in_progress")) {
      updates.admin_response = responseText;
      updates.responded_at = new Date().toISOString();
      updates.responded_by = user?.id;
    }
    const { error } = await supabase.from("inquiries").update(updates).eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: "Inquiry status updated." });
    setResponseText("");
    fetchData();
    setDetailsOpen(false);
  };

  const updateTestBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("test_bookings").update({ status }).eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: "Test booking status updated." });
    fetchData();
    setDetailsOpen(false);
  };

  const updateBilling = async () => {
    if (!selectedItem) return;
    setSavingBilling(true);
    try {
      const table = selectedItem.type === 'appointment' ? 'appointments' : (selectedItem.type === 'booking' ? 'test_bookings' : null);
      if (!table) return;

      const currentNotes = selectedItem.type === 'appointment' ? (selectedItem.admin_notes || "") : (selectedItem.notes || "");
      const newNote = currentNotes.includes("[Discount:") 
        ? currentNotes.replace(/\[Discount: \d+\]/, `[Discount: ${discountAmount}]`)
        : `${currentNotes} [Discount: ${discountAmount}]`.trim();

      const { error } = await supabase.from(table).update({
        [selectedItem.type === 'appointment' ? 'admin_notes' : 'notes']: newNote
      }).eq("id", selectedItem.id);

      if (error) throw error;
      toast({ title: "Success", description: "Billing updated successfully!" });
      fetchData();
      setSelectedItem({ ...selectedItem, [selectedItem.type === 'appointment' ? 'admin_notes' : 'notes']: newNote });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSavingBilling(false);
    }
  };

  const handleDownloadReceipt = async (item: any) => {
    const isAppt = item.type === 'appointment';
    const isBooking = item.type === 'booking';
    const labMatch = isAppt ? item.test_type?.match(/\[(.*?)\]/) : null;
    const extractedLabName = labMatch ? labMatch[1] : (item.lab_name || null);

    let testPrice = 0;
    let collectionFee = 0;
    const isHome = item.sample_collection === 'home';

    if (isAppt) {
      const baseMatch = item.notes?.match(/\[Base Price: ₹(\d+)\]/);
      const feeMatch = item.notes?.match(/\[Fee: ₹(\d+)\]/);
      const totalMatch = item.notes?.match(/\[Total Price: ₹(\d+)\]/);
      
      if (baseMatch && feeMatch) {
          testPrice = parseInt(baseMatch[1]);
          collectionFee = parseInt(feeMatch[1]);
      } else {
          const totalStored = totalMatch ? parseInt(totalMatch[1]) : 0;
          if (isHome) {
              // Threshold logic for legacy data
              if (totalStored < 1000) {
                  collectionFee = totalStored >= 150 ? 150 : 0;
                  testPrice = totalStored - collectionFee;
              } else {
                  collectionFee = 0;
                  testPrice = totalStored;
              }
          } else {
              testPrice = totalStored;
              collectionFee = 0;
          }
      }
    } else if (isBooking) {
      testPrice = item.test_price || 0;
      collectionFee = (isHome && testPrice < 1000) ? 150 : 0;
    }

    const discountMatch = (isAppt ? (item.admin_notes || "") : (item.notes || "")).match(/\[Discount: (\d+)\]/);
    const discount = discountMatch ? parseInt(discountMatch[1]) : 0;

    const testsList = isAppt ? item.test_type.split(' [')[0].split('|').map((t: string) => t.trim()).filter((t: string) => t !== "") : [item.test_name];
    const individualPrices = testsList.map((t: string) => getTestPrice(t));

    const data = {
      referenceNumber: item.reference_number,
      bookingDate: new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      patientName: isAppt ? `${item.first_name} ${item.last_name}` : item.patient_name,
      patientEmail: item.email,
      patientPhone: isAppt ? item.phone : item.patient_phone,
      patientAddress: isAppt ? item.collection_address : item.patient_address,
      testName: isAppt ? item.test_type.split(' [')[0] : item.test_name,
      labName: extractedLabName,
      testPrice: testPrice,
      collectionFee: collectionFee,
      discount: discount,
      sampleCollection: isHome ? 'Home' : 'Lab Visit',
      appointmentDate: new Date(isAppt ? item.appointment_date : item.preferred_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      appointmentTime: isAppt ? item.time_slot : (item.preferred_time || "N/A"),
      individualPrices: individualPrices,
    };

    await generateReceipt(data);
  };

  const handleReportUpload = async (appointmentId: string) => {
    if (!reportFile) {
      toast({ title: "Error", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }
    setUploadingReport(true);
    try {
      const fileExt = reportFile.name.split('.').pop();
      const filePath = `${appointmentId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('medical-reports')
        .upload(filePath, reportFile);

      if (uploadError) throw uploadError;

      // Generate report number
      const { data: reportNum } = await supabase.rpc('generate_report_number');

      // Create report record - store the file path, not public URL
      const { error: reportError } = await supabase
        .from('reports')
        .insert({
          appointment_id: appointmentId,
          report_number: reportNum || `RPT${Date.now()}`,
          test_results: 'Report uploaded',
          file_url: filePath,
          created_by: user?.id,
          report_status: 'final',
        });

      if (reportError) throw reportError;

      // Update appointment with report info
      await supabase
        .from('appointments')
        .update({
          results_status: 'ready',
          results_ready_at: new Date().toISOString(),
          report_id: null // we link via appointment_id in reports table
        })
        .eq('id', appointmentId);

      toast({ title: "Success", description: "Report uploaded successfully!" });
      setReportFile(null);
      fetchData();
      setDetailsOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to upload report.", variant: "destructive" });
    } finally {
      setUploadingReport(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; icon: any }> = {
      pending: { variant: "secondary", icon: Clock },
      confirmed: { variant: "default", icon: CheckCircle2 },
      completed: { variant: "default", icon: CheckCircle2 },
      in_progress: { variant: "secondary", icon: RefreshCw },
      cancelled: { variant: "destructive", icon: XCircle },
      no_show: { variant: "destructive", icon: XCircle },
      sample_collected: { variant: "secondary", icon: CheckCircle2 },
      processing: { variant: "secondary", icon: RefreshCw },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.replace(/_/g, " ")}
      </Badge>
    );
  };

  const openDetails = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setResponseText(item.admin_response || "");
    
    // Parse discount
    const currentNotes = type === 'appointment' ? (item.admin_notes || "") : (item.notes || "");
    const discountMatch = currentNotes.match(/\[Discount: (\d+)\]/);
    setDiscountAmount(discountMatch ? discountMatch[1] : "0");
    
    setDetailsOpen(true);
  };

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === "pending").length,
    totalInquiries: inquiries.length,
    pendingInquiries: inquiries.filter(i => i.status === "pending").length,
    totalBookings: testBookings.length,
    pendingBookings: testBookings.filter(b => b.status === "pending").length,
    totalUsers: users.length,
  };

  const filteredAppointments = appointments.filter(a =>
    a.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.reference_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(i =>
    i.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.reference_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = testBookings.filter(b =>
    b.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.reference_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.patient_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalAppointments}</p>
                <p className="text-xs text-muted-foreground">Total Appts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{stats.pendingAppointments}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalInquiries}</p>
                <p className="text-xs text-muted-foreground">Inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{stats.pendingInquiries}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-xs text-muted-foreground">Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{stats.pendingBookings}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
        <Button onClick={() => setActiveTab("book test")} variant="outline" size="sm">
          View Book Test
        </Button>
        <Button onClick={() => setActiveTab("inquiries")} variant="outline" size="sm">
          View Inquiries
        </Button>
        <Button onClick={() => setActiveTab("test bookings")} variant="outline" size="sm">
          View Bookings
        </Button>
        <Button onClick={() => setActiveTab("users")} variant="outline" size="sm">
          View Users
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Book Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : appointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No appointments yet</p>
            ) : (
              <div className="space-y-3">
                {appointments.slice(0, 5).map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer" onClick={() => openDetails(apt, 'appointment')}>
                    <div>
                      <p className="font-medium text-sm">{apt.first_name} {apt.last_name}</p>
                      <p className="text-xs text-muted-foreground">{apt.test_type}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(apt.status)}
                      <p className="text-xs text-muted-foreground mt-1">{new Date(apt.appointment_date).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Recent Test Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : testBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {testBookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer" onClick={() => openDetails(booking, 'booking')}>
                    <div>
                      <p className="font-medium text-sm">{booking.patient_name}</p>
                      <p className="text-xs text-muted-foreground">{booking.test_name}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(booking.status)}
                      <p className="text-xs text-muted-foreground mt-1">₹{booking.test_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle>All Book Test</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button onClick={fetchData} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map(apt => (
                    <TableRow key={apt.id}>
                      <TableCell className="font-mono text-sm">{apt.reference_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{apt.first_name} {apt.last_name}</p>
                          <p className="text-xs text-muted-foreground">{apt.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{apt.test_type}</TableCell>
                      <TableCell className="font-semibold text-success">
                        {apt.notes?.includes('[Total Price: ₹') ? `₹${apt.notes.match(/\[Total Price: ₹(\d+)\]/)?.[1]}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{new Date(apt.appointment_date).toLocaleDateString('en-IN')}</p>
                          <p className="text-xs text-muted-foreground">{apt.time_slot}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={apt.status}
                          onValueChange={(val) => updateAppointmentStatus(apt.id, val as any)}
                        >
                          <SelectTrigger className="w-[120px] h-8 text-xs border-none bg-transparent hover:bg-slate-100 p-0 shadow-none">
                            <SelectValue>{getStatusBadge(apt.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => openDetails(apt, 'appointment')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderInquiries = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle>All Inquiries</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button onClick={fetchData} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No inquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map(inq => (
                    <TableRow key={inq.id}>
                      <TableCell className="font-mono text-sm">{inq.reference_number}</TableCell>
                      <TableCell><Badge variant="outline">{inq.inquiry_type}</Badge></TableCell>
                      <TableCell className="font-semibold text-success">
                        {inq.subject?.includes('[₹') ? `₹${inq.subject.match(/\[₹(\d+)\]/)?.[1]}` : 'N/A'}
                      </TableCell>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{inq.email}</p>
                          <p className="text-xs text-muted-foreground">{inq.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={inq.status}
                          onValueChange={(val) => updateInquiryStatus(inq.id, val as any)}
                        >
                          <SelectTrigger className="w-[120px] h-8 text-xs border-none bg-transparent hover:bg-slate-100 p-0 shadow-none">
                            <SelectValue>{getStatusBadge(inq.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => openDetails(inq, 'inquiry')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderBookings = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle>All Test Bookings</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button onClick={fetchData} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-sm">{booking.reference_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.patient_name}</p>
                          <p className="text-xs text-muted-foreground">{booking.patient_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.test_name}</TableCell>
                      <TableCell>{new Date(booking.preferred_date).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>₹{booking.test_price}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={booking.status}
                          onValueChange={async (val) => {
                            await supabase.from('test_bookings').update({ status: val }).eq('id', booking.id);
                            fetchData();
                            toast({ title: "Status Updated", description: `Booking status changed to ${val}.` });
                          }}
                        >
                          <SelectTrigger className="w-[120px] h-8 text-xs border-none bg-transparent hover:bg-slate-100 p-0 shadow-none">
                            <SelectValue>{getStatusBadge(booking.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => openDetails(booking, 'booking')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderUsers = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Registered Users ({users.length})
        </CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button onClick={fetchData} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <p className="font-medium">{u.first_name || ''} {u.last_name || ''}</p>
                      </TableCell>
                      <TableCell>{u.email || 'N/A'}</TableCell>
                      <TableCell>{u.phone || 'N/A'}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{u.address || 'N/A'}</TableCell>
                      <TableCell>{new Date(u.created_at).toLocaleDateString('en-IN')}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "book test": return renderAppointments();
      case "inquiries": return renderInquiries();
      case "test bookings": return renderBookings();
      case "users": return renderUsers();
      default: return renderDashboard();
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === 'appointment' && 'Book Test Details'}
              {selectedItem?.type === 'inquiry' && 'Inquiry Details'}
              {selectedItem?.type === 'booking' && 'Test Booking Details'}
            </DialogTitle>
            <DialogDescription>
              Reference: {selectedItem?.reference_number}
            </DialogDescription>
          </DialogHeader>

          {selectedItem?.type === 'appointment' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-medium">{selectedItem.first_name} {selectedItem.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedItem.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedItem.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p>{new Date(selectedItem.appointment_date).toLocaleDateString('en-IN')} - {selectedItem.time_slot}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sample Collection</p>
                  <p>{selectedItem.sample_collection}</p>
                </div>
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <TestTube2 className="h-4 w-4 text-primary" /> Booked Tests Summary
                    </p>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[10px]">
                      {selectedItem.test_type.split(' [')[0].split('|').filter(t => t.trim() !== "").length} Items
                    </Badge>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2 font-bold text-slate-600 w-12 text-center">#</th>
                          <th className="px-3 py-2 font-bold text-slate-600">Test / Package Name</th>
                          <th className="px-3 py-2 font-bold text-slate-600 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(() => {
                          const testsList = selectedItem.test_type.split(' [')[0].split('|').map(t => t.trim()).filter(t => t !== "");
                          const total = testsList.reduce((acc, t) => acc + getTestPrice(t), 0);
                          return (
                            <>
                              {testsList.map((test, index) => {
                                const price = getTestPrice(test);
                                return (
                                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-3 py-2.5 font-bold text-primary border-r border-slate-100 text-center">{index + 1}</td>
                                    <td className="px-3 py-2.5 font-medium text-slate-700">{test}</td>
                                    <td className="px-3 py-2.5 font-bold text-slate-900 text-right">{formatINR(price)}</td>
                                  </tr>
                                );
                              })}
                              <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                                <td colSpan={2} className="px-3 py-3 text-slate-700 text-right">Total Tests Cost:</td>
                                <td className="px-3 py-3 text-primary text-right text-base">{formatINR(total)}</td>
                              </tr>
                            </>
                          );
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
                {selectedItem.collection_address && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Collection Address</p>
                    <p>{selectedItem.collection_address}</p>
                  </div>
                )}
                {selectedItem.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p>{selectedItem.notes.replace(/\[Prescription:.*?\]/g, '').trim() || '-'}</p>
                  </div>
                )}
                {selectedItem.notes && /\[Prescription: (.+?)\]/.test(selectedItem.notes) && (
                  <PrescriptionViewer notes={selectedItem.notes} referenceNumber={selectedItem.reference_number} />
                )}
              </div>

              {/* Report Upload Section */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Report
                </p>
                {selectedItem.results_status === 'ready' ? (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Report already uploaded</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                    />
                    <Button
                      onClick={() => handleReportUpload(selectedItem.id)}
                      disabled={!reportFile || uploadingReport}
                      size="sm"
                      className="w-full"
                    >
                      {uploadingReport ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Report
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Billing Section */}
              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Billing & Discount
                </p>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Add Discount (₹)</label>
                    <Input 
                      type="number" 
                      value={discountAmount} 
                      onChange={(e) => setDiscountAmount(e.target.value)}
                      placeholder="Enter discount amount"
                    />
                  </div>
                  <Button onClick={updateBilling} disabled={savingBilling} variant="outline">
                    {savingBilling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Billing"}
                  </Button>
                </div>
              </div>

              <DialogFooter className="flex-wrap gap-2 pt-4 border-t">
                <Button onClick={() => handleDownloadReceipt(selectedItem)} className="bg-success hover:bg-success/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Select onValueChange={(val) => updateAppointmentStatus(selectedItem.id, val as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </DialogFooter>
            </div>
          )}

          {selectedItem?.type === 'inquiry' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant="outline">{selectedItem.inquiry_type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedItem.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedItem.phone || 'N/A'}</p>
                </div>
                {selectedItem.subject && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Subject</p>
                    <p>{selectedItem.subject}</p>
                  </div>
                )}
                {selectedItem.message && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Message</p>
                    <p className="bg-muted p-3 rounded-lg">{selectedItem.message}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Admin Response</label>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write a response..."
                  className="mt-1"
                />
              </div>
              <DialogFooter className="flex-wrap gap-2">
                <Select onValueChange={(val) => updateInquiryStatus(selectedItem.id, val as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </DialogFooter>
            </div>
          )}

          {selectedItem?.type === 'booking' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-medium">{selectedItem.patient_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedItem.patient_email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedItem.patient_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Test</p>
                  <p>{selectedItem.test_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p>{selectedItem.test_category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">₹{selectedItem.test_price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Date</p>
                  <p>{new Date(selectedItem.preferred_date).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sample Collection</p>
                  <p>{selectedItem.sample_collection}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{selectedItem.patient_address}</p>
                </div>
              </div>
              {/* Billing Section for Bookings */}
              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Billing & Discount
                </p>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Add Discount (₹)</label>
                    <Input 
                      type="number" 
                      value={discountAmount} 
                      onChange={(e) => setDiscountAmount(e.target.value)}
                      placeholder="Enter discount amount"
                    />
                  </div>
                  <Button onClick={updateBilling} disabled={savingBilling} variant="outline">
                    {savingBilling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Billing"}
                  </Button>
                </div>
              </div>

              <DialogFooter className="flex-wrap gap-2 pt-4 border-t">
                <Button onClick={() => handleDownloadReceipt(selectedItem)} className="bg-success hover:bg-success/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Select onValueChange={(val) => updateTestBookingStatus(selectedItem.id, val)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="sample_collected">Sample Collected</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPage;
