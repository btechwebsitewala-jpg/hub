import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar, FileText, User, LogOut, Clock, CheckCircle, AlertCircle,
  Loader2, Plus, Settings, Pencil, Save, X, TestTube2,
  Activity, Phone, MapPin, RefreshCw, IndianRupee, Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { tests, packages, formatINR } from "@/data/testsData";

const allTestOptions = [
  ...tests.map(t => ({ value: t.name, price: t.price })),
  ...packages.map(p => ({ value: p.name, price: p.price })),
];

const lookupTestPrice = (testType: string): number => {
  // testType may contain lab name like "CBC (Dr. Lal Path Lab)", strip it
  const cleanName = testType.replace(/\s*\(.*\)\s*$/, '').trim();
  const found = allTestOptions.find(t => t.value === cleanName || testType.startsWith(t.value));
  return found?.price || 0;
};

interface Appointment {
  id: string;
  reference_number: string;
  appointment_date: string;
  time_slot: string;
  test_type: string;
  status: string;
  results_status: string;
  created_at: string;
  first_name: string;
  last_name: string;
  sample_collection: string;
}

interface Report {
  id: string;
  report_number: string;
  report_date: string;
  file_url: string | null;
  report_status: string | null;
  test_results: string;
  appointment_id: string;
}

interface Inquiry {
  id: string;
  reference_number: string;
  inquiry_type: string;
  subject: string | null;
  status: string;
  created_at: string;
  admin_response: string | null;
}

interface TestBooking {
  id: string;
  reference_number: string;
  test_name: string;
  test_category: string;
  test_price: number;
  preferred_date: string;
  preferred_time: string;
  status: string;
  sample_collection: string;
  created_at: string | null;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
}

interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
}

const statusConfig: Record<string, { className: string; icon: typeof Clock }> = {
  pending: { className: "bg-warning/15 text-warning border-warning/30", icon: Clock },
  confirmed: { className: "bg-primary/15 text-primary border-primary/30", icon: CheckCircle },
  completed: { className: "bg-success/15 text-success border-success/30", icon: CheckCircle },
  cancelled: { className: "bg-destructive/15 text-destructive border-destructive/30", icon: X },
  in_progress: { className: "bg-primary/15 text-primary border-primary/30", icon: Activity },
  processing: { className: "bg-primary/15 text-primary border-primary/30", icon: Clock },
  ready: { className: "bg-success/15 text-success border-success/30", icon: CheckCircle },
  no_show: { className: "bg-muted text-muted-foreground border-border", icon: AlertCircle },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`${config.className} gap-1 capitalize font-medium text-xs`}>
      <Icon className="h-3 w-3" />
      {status.replace("_", " ")}
    </Badge>
  );
};

/* ─── Booking Row (shared between both tabs for consistent sizing) ─── */
const BookingRow = ({
  title, date, time, refNumber, status, price, resultsStatus, extra, badge
}: {
  title: string; date: string; time: string; refNumber: string; status: string;
  price?: number | string; resultsStatus?: string | null; extra?: string; badge?: React.ReactNode;
}) => (
  <div className="p-4 bg-muted/30 rounded-xl border border-border/30 hover:border-border/60 transition-colors">
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm leading-tight inline-block mr-2">
                {title.split(' [')[0]}
              </p>
              {title.includes('[') && (
                <Badge variant="outline" className="text-[10px] h-5 bg-primary/5 text-primary border-primary/20 font-bold mb-1">
                  {title.match(/\[(.*?)\]/)?.[1]}
                </Badge>
              )}
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" />
              {time}
            </span>
            <span className="col-span-2 sm:col-span-1">Ref: <span className="font-medium text-foreground">{refNumber}</span></span>
            {price !== undefined && (
              <span className="flex items-center gap-1 font-semibold text-primary">
                <IndianRupee className="h-3 w-3 flex-shrink-0" />
                {typeof price === 'number' ? price.toLocaleString('en-IN') : price}
              </span>
            )}
            {extra && <span className="col-span-2 sm:col-span-1">{extra}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          {badge}
          {resultsStatus === "ready" && (
            <Badge className="bg-success/15 text-success border border-success/30 gap-1 text-xs">
              <CheckCircle className="h-3 w-3" /> Results Ready
            </Badge>
          )}
          {resultsStatus === "processing" && (
            <Badge className="bg-primary/15 text-primary border border-primary/30 gap-1 text-xs">
              <Clock className="h-3 w-3" /> Processing
            </Badge>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Profile Section ─── */
const ProfileSection = ({ profile, user, onProfileUpdate }: { profile: Profile | null; user: any; onProfileUpdate: (p: Profile) => void }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", phone: "", address: "", date_of_birth: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    setForm({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      date_of_birth: profile?.date_of_birth || "",
    });
  }, [profile]);

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    const updates = {
      first_name: form.first_name.trim() || null,
      last_name: form.last_name.trim() || null,
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      date_of_birth: form.date_of_birth || null,
    };
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: "Profile update failed.", variant: "destructive" });
    } else {
      toast({ title: "✅ Profile Updated" });
      onProfileUpdate({ ...profile, ...updates, email: profile?.email || null });
      setEditing(false);
    }
  };

  const fields = [
    { key: "first_name", label: "First Name", type: "text", icon: User },
    { key: "last_name", label: "Last Name", type: "text", icon: User },
    { key: "phone", label: "Phone", type: "tel", icon: Phone },
    { key: "address", label: "Address", type: "text", icon: MapPin },
    { key: "date_of_birth", label: "Date of Birth", type: "date", icon: Calendar },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            My Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="h-4 w-4 mr-1.5" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setEditing(false); setForm({ first_name: profile?.first_name || "", last_name: profile?.last_name || "", phone: profile?.phone || "", address: profile?.address || "", date_of_birth: profile?.date_of_birth || "" }); }}>
              <X className="h-4 w-4 mr-1.5" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Save className="h-4 w-4 mr-1.5" />}
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-xl border border-border/30">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Email</p>
            <p className="font-medium text-foreground text-sm break-all">{user?.email || profile?.email || "Not set"}</p>
          </div>
          {fields.map(f => (
            editing ? (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={f.key} className="text-xs font-medium">{f.label}</Label>
                <Input
                  id={f.key}
                  type={f.type}
                  value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="h-10"
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                />
              </div>
            ) : (
              <div key={f.key} className="p-4 bg-muted/50 rounded-xl border border-border/30">
                <p className="text-xs font-medium text-muted-foreground mb-1.5">{f.label}</p>
                <p className="font-medium text-foreground text-sm">
                  {(profile as any)?.[f.key] || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/* ─── Main Dashboard ─── */
const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [testBookings, setTestBookings] = useState<TestBooking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const fetchData = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const [aptsRes, inqRes, reportsRes, bookingsRes, profileRes] = await Promise.all([
        supabase.from("appointments").select("*").or(`email.eq.${user.email},user_id.eq.${user.id}`).order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").or(`email.eq.${user.email},user_id.eq.${user.id}`).order("created_at", { ascending: false }),
        supabase.from("reports").select("*").order("created_at", { ascending: false }),
        supabase.from("test_bookings").select("*").or(`patient_email.eq.${user.email}`).order("created_at", { ascending: false }),
        supabase.from("profiles").select("first_name, last_name, email, phone, address, date_of_birth").eq("user_id", user.id).maybeSingle(),
      ]);

      setAppointments(aptsRes.data || []);
      setInquiries(inqRes.data || []);
      setReports(reportsRes.data || []);
      setTestBookings(bookingsRes.data || []);
      setProfile(profileRes.data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const resultsReady = appointments.filter(a => a.results_status === "ready").length;

  return (
    <Layout>
      <SEOHead
        title="My Bookings"
        description="View your test bookings, reports and profile at Diagnostics Hub Rewa."
        canonical="/dashboard"
        keywords="patient dashboard, diagnostic reports, test bookings, pathology lab rewa"
      />

      <section className="py-6 md:py-10 bg-gradient-to-b from-primary/5 to-background min-h-[calc(100vh-200px)]">
        <div className="container max-w-6xl px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {profile?.first_name ? `Welcome, ${profile.first_name}!` : "My Bookings"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your test bookings, reports & profile
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">
                    <Settings className="h-4 w-4 mr-1.5" /> Admin
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSignOut} className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button asChild size="sm">
              <Link to="/tests"><Plus className="h-4 w-4 mr-1.5" /> Book Test</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/tests"><TestTube2 className="h-4 w-4 mr-1.5" /> Browse Tests</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/results-inquiry"><FileText className="h-4 w-4 mr-1.5" /> Result Inquiry</Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Bookings", count: appointments.length + testBookings.length, icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
              { label: "Reports", count: reports.length, icon: FileText, color: "text-accent-foreground", bg: "bg-accent" },
              { label: "Results Ready", count: resultsReady, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
            ].map((stat, index) => (
              <Card key={`${stat.label}-${index}`} className="border-border/40">
                <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                  <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-bold text-foreground">{stat.count}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-4">
            <TabsList className="w-full grid grid-cols-4 h-auto gap-0.5 p-1 bg-muted/60">
              <TabsTrigger value="bookings" className="gap-1 text-[10px] sm:text-sm py-2 px-1 sm:px-3 flex-col sm:flex-row">
                <Calendar className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                <span>Bookings</span>
                {(appointments.length + testBookings.length) > 0 && (
                  <Badge variant="secondary" className="h-4 min-w-[16px] p-0 justify-center text-[9px] rounded-full hidden sm:flex">{appointments.length + testBookings.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-1 text-[10px] sm:text-sm py-2 px-1 sm:px-3 flex-col sm:flex-row">
                <Download className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="gap-1 text-[10px] sm:text-sm py-2 px-1 sm:px-3 flex-col sm:flex-row">
                <FileText className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                <span>Inquiries</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-1 text-[10px] sm:text-sm py-2 px-1 sm:px-3 flex-col sm:flex-row">
                <User className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* All Bookings Tab (merged) */}
            <TabsContent value="bookings">
              <Card className="border-border/40">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      My Bookings
                    </CardTitle>
                    <CardDescription>All your test bookings in one place</CardDescription>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/tests">
                      <Plus className="h-4 w-4 mr-1.5" /> Book Test
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>
                  ) : (appointments.length === 0 && testBookings.length === 0) ? (
                    <div className="text-center py-12">
                      <Calendar className="h-14 w-14 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium mb-1">No bookings yet</p>
                      <p className="text-xs text-muted-foreground mb-4">Book your first test to get started</p>
                      <Button asChild size="sm"><Link to="/tests">Book Test</Link></Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map(apt => (
                        <BookingRow
                          key={`apt-${apt.id}`}
                          title={apt.test_type}
                          date={apt.appointment_date}
                          time={apt.time_slot}
                          refNumber={apt.reference_number}
                          status={apt.status}
                          resultsStatus={apt.results_status}
                          extra={`Patient: ${apt.first_name} ${apt.last_name}`}
                          badge={apt.sample_collection ? <Badge variant="outline" className="capitalize text-xs flex-shrink-0">{apt.sample_collection}</Badge> : undefined}
                        />
                      ))}
                      {testBookings.map(booking => (
                        <BookingRow
                          key={`tb-${booking.id}`}
                          title={booking.test_name}
                          date={booking.preferred_date}
                          time={booking.preferred_time}
                          refNumber={booking.reference_number}
                          status={booking.status}
                          price={booking.test_price}
                          extra={booking.test_category}
                          badge={<Badge variant="outline" className="capitalize text-xs flex-shrink-0">{booking.sample_collection}</Badge>}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card className="border-border/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    My Reports
                  </CardTitle>
                  <CardDescription>Download your lab test reports</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>
                  ) : reports.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-14 w-14 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium mb-1">No reports available</p>
                      <p className="text-xs text-muted-foreground">Reports will appear here when your test results are ready</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reports.map(report => {
                        const apt = appointments.find(a => a.id === report.appointment_id);
                        return (
                          <div key={report.id} className="p-4 bg-muted/30 rounded-xl border border-border/30 hover:border-border/60 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <p className="font-semibold text-foreground text-sm">{apt?.test_type || "Lab Report"}</p>
                                  <Badge variant="outline" className="bg-success/15 text-success border-success/30 text-xs capitalize">
                                    {report.report_status || "Final"}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                                  <span>Report #: <span className="font-medium text-foreground">{report.report_number}</span></span>
                                  <span>{new Date(report.report_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                  {apt && <span>Ref: {apt.reference_number}</span>}
                                </div>
                              </div>
                              {report.file_url && !report.file_url.startsWith("data:") ? (
                                <Button size="sm" variant="outline" className="flex-shrink-0" onClick={async () => {
                                  const { data, error } = await supabase.storage
                                    .from('medical-reports')
                                    .createSignedUrl(report.file_url!, 300);
                                  if (data?.signedUrl) {
                                    window.open(data.signedUrl, '_blank');
                                  } else {
                                    toast({ title: "Error", description: "Could not generate download link.", variant: "destructive" });
                                  }
                                }}>
                                  <Download className="h-4 w-4 mr-1.5" /> Download
                                </Button>
                              ) : (
                                <Badge variant="secondary" className="text-xs flex-shrink-0">No file</Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="inquiries">
              <Card className="border-border/40">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      My Inquiries
                    </CardTitle>
                    <CardDescription>Track your contact requests and quotes</CardDescription>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/contact"><Plus className="h-4 w-4 mr-1.5" /> New Inquiry</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>
                  ) : inquiries.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-14 w-14 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium mb-1">No inquiries yet</p>
                      <p className="text-xs text-muted-foreground mb-4">Send us a question or request a quote</p>
                      <Button asChild size="sm" variant="outline"><Link to="/contact">Contact Us</Link></Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map(inq => (
                        <div key={inq.id} className="p-4 bg-muted/30 rounded-xl border border-border/30 hover:border-border/60 transition-colors">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs capitalize">{inq.inquiry_type}</Badge>
                                <p className="font-semibold text-foreground text-sm">{inq.subject || "General Inquiry"}</p>
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                                <span>Ref: <span className="font-medium text-foreground">{inq.reference_number}</span></span>
                                <span>{new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                              </div>
                              {inq.admin_response && (
                                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <p className="text-xs text-primary font-semibold mb-1">Admin Response:</p>
                                  <p className="text-xs text-foreground leading-relaxed">{inq.admin_response}</p>
                                </div>
                              )}
                            </div>
                            <StatusBadge status={inq.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <ProfileSection profile={profile} user={user} onProfileUpdate={updated => setProfile(updated)} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
