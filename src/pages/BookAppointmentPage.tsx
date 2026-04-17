import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckCircle, Clock, FileText, Home, Building2, Star, Upload, X, FileUp, TestTube2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { tests, packages, formatINR } from "@/data/testsData";
import { useCart } from "@/context/CartContext";
import { syncToGoogleSheets } from "@/lib/googleSheets";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name required").max(50),
  lastName: z.string().min(2, "Last name required").max(50),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().min(10, "Valid phone required").max(20),
  date: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  testType: z.string().min(1, "Please select a test"),
  sampleCollection: z.enum(["lab", "home"]),
  address: z.string().min(10, "Please enter a valid address"),
  notes: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

// Build test options from testsData with prices
const allTestOptions = [
  ...tests.map(t => ({ value: t.name, label: t.name, price: t.price })),
  ...packages.map(p => ({ value: p.name, label: `${p.name} (Package)`, price: p.price })),
  { value: "Other", label: "Other (Specify in notes)", price: 0 },
];

const BookTestPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const { toast } = useToast();
  const { cartItems, totalAmount, clearCart } = useCart();

  const preselectedTest = searchParams.get("test");
  const preselectedTests = searchParams.get("tests");
  const preselectedLab = searchParams.get("lab");
  const preselectedTotal = searchParams.get("total");

  const isCartMode = cartItems.length > 0;
  const initialTestType = isCartMode
    ? cartItems.map(item => item.name).join(" | ")
    : (preselectedTests ? preselectedTests : (preselectedTest || ""));

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const currentPath = window.location.pathname + window.location.search;
        navigate(`/auth?redirect=${encodeURIComponent(currentPath)}`);
      }
      setAuthLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        const currentPath = window.location.pathname + window.location.search;
        navigate(`/auth?redirect=${encodeURIComponent(currentPath)}`);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      timeSlot: "",
      testType: initialTestType,
      sampleCollection: "home",
      address: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isCartMode) {
      form.setValue("testType", cartItems.map(item => item.name).join(", "));
    } else if (preselectedTest) {
      form.setValue("testType", preselectedTest);
    }
  }, [isCartMode, cartItems, preselectedTest, form]);

  const selectedTestName = form.watch("testType");
  const selectedTestData = allTestOptions.find(t => t.value === selectedTestName);
  const selectedPrice = isCartMode
    ? totalAmount
    : (preselectedTotal ? parseInt(preselectedTotal) : (selectedTestData?.price || 0));

  const decodedLabName = decodeURIComponent(preselectedLab || "");
  if (decodedLabName) {
    localStorage.setItem('active_hub_lab', decodedLabName);
  }
  const effectiveLabName = preselectedLab || (isCartMode ? cartItems[0]?.labName : null) || localStorage.getItem('active_hub_lab');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const refNum = `TB-${Date.now().toString().slice(-8)}`;
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      let prescriptionUrl: string | null = null;
      if (prescriptionFile) {
        const ext = prescriptionFile.name.split('.').pop() || 'pdf';
        const filePath = `${userId}/${refNum}-prescription.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("prescriptions")
          .upload(filePath, prescriptionFile);

        if (uploadError) {
          toast({ title: "Upload Failed", description: "Could not upload prescription. Booking will continue without it.", variant: "destructive" });
        } else {
          prescriptionUrl = filePath;
        }
      }


      const { error } = await supabase.from("appointments").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        appointment_date: format(data.date, "yyyy-MM-dd"),
        time_slot: data.timeSlot,
        test_type: effectiveLabName ? `${data.testType} [${effectiveLabName}]` : data.testType,
        sample_collection: data.sampleCollection,
        collection_address: data.address || null,
        notes: prescriptionUrl ? `${data.notes || ''}\n[Prescription: ${prescriptionUrl}]`.trim() : (data.notes || null),
        reference_number: refNum,
        status: "pending",
        user_id: session?.user?.id || null,
      });

      if (error) throw error;

      // Sync to Google Sheets
      await syncToGoogleSheets('booking', {
        'ID': refNum,
        'Name': `${data.firstName} ${data.lastName}`,
        'Email': data.email,
        'Phone': data.phone,
        'Test Type': effectiveLabName ? `${data.testType} [${effectiveLabName}]` : data.testType,
        'Appointment Date': format(data.date, "yyyy-MM-dd"),
        'Appointment Time': data.timeSlot,
        'Address': data.address || 'Lab Visit',
        'Message': data.notes || '',
        'Status': 'pending',
        'Created At': new Date().toISOString()
      });

      setReferenceNumber(refNum);
      if (isCartMode) clearCart();

      setSubmittedData({
        refNumber: refNum,
        testName: data.testType,
        price: selectedPrice,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        date: format(data.date, "dd MMM yyyy"),
        timeSlot: data.timeSlot,
        lab: effectiveLabName || "Diagnostics Hub Partner",
        address: data.address,
      });
      setIsSubmitted(true);
      toast({
        title: "Test Booked!",
        description: `Your reference number is ${refNum}`,
      });
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-12 md:py-20">
          <div className="container max-w-lg px-4">
            <Card>
              <CardContent className="pt-8 text-center">
                <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Test Booked Successfully!</h2>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  Your test has been booked. You will receive confirmation shortly.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                  <p className="text-2xl font-bold text-primary">{referenceNumber}</p>
                </div>
                {submittedData && (
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Test:</span>
                      <span className="font-medium text-foreground">{submittedData.testName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-bold text-primary">{formatINR(submittedData.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{submittedData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{submittedData.timeSlot}</span>
                    </div>
                    {submittedData.lab && (
                      <div className="flex justify-between border-t border-muted-foreground/10 pt-2 mt-2">
                        <span className="text-muted-foreground">Lab:</span>
                        <span className="font-semibold text-primary">{submittedData.lab}</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-6">
                  Please save this reference number for future inquiries.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => navigate("/dashboard")} className="w-full">
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Book Test"
        description="Book your diagnostic test at Diagnostics Hub Rewa. Choose from 100+ tests with home sample collection. Easy online booking with instant confirmation."
        canonical="/book-appointment"
        keywords="book lab test rewa, diagnostic test rewa, home sample collection booking Rewa MP, pathology test booking, online blood test booking India"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-8 md:py-12">
        <div className="container relative px-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="absolute top-0 left-4 flex items-center gap-2 text-slate-600 hover:text-primary transition-colors pl-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold">Back</span>
          </Button>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Book Your Test</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Select your test, choose a date & time, and book home sample collection.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container max-w-3xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <TestTube2 className="h-5 w-5 text-primary" />
                {selectedTestName ? selectedTestName : "Book Test"}
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>Fill in your details to book a test</span>
                {selectedPrice > 0 && (
                  <span className="text-lg font-bold text-primary">{formatINR(selectedPrice)}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Test Selection - moved to top */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <TestTube2 className="h-4 w-4 text-primary" />
                      {isCartMode ? "Tests from Cart" : "Select Test"}
                    </h3>

                    {isCartMode ? (
                      <div className="p-4 rounded-lg border bg-slate-50">
                        <ul className="space-y-2 mb-3">
                          {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between text-sm">
                              <span className="font-medium text-slate-700">{item.name}</span>
                              <span className="text-slate-500">{formatINR(item.discountPrice || item.price)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-800">
                          <span>Total Tests Cost</span>
                          <span>{formatINR(totalAmount)}</span>
                        </div>
                        <input type="hidden" {...form.register("testType")} value={initialTestType} />
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Test / Package</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select test or package" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-60">
                                {allTestOptions.map((test) => (
                                  <SelectItem key={test.value} value={test.value}>
                                    <span className="flex items-center justify-between gap-2 w-full">
                                      <span>{test.label}</span>
                                      <span className="text-primary font-semibold ml-2">{formatINR(test.price)}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Price display */}
                    {selectedPrice > 0 && (
                      <div className="p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground text-sm">Test Price</p>
                            <p className="text-xs text-muted-foreground">+ ₹99 home collection fee</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{formatINR(selectedPrice)}</p>
                            <p className="text-xs text-muted-foreground">Total: {formatINR(selectedPrice + 99)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg text-foreground pb-2 border-b">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" className="h-11 shadow-sm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" className="h-11 shadow-sm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="h-11 shadow-sm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" className="h-11 shadow-sm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-6 pt-4">
                    <h3 className="font-semibold text-lg text-foreground pb-2 border-b">Schedule</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Preferred Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 h-11 text-left font-normal shadow-sm",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return date < today || date.getDay() === 0;
                                  }}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Time Slot</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11 shadow-sm">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Home Collection */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                      <div className="flex items-center gap-3">
                        <Home className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">Home Sample Collection</p>
                          <p className="text-sm text-muted-foreground">Our phlebotomist will visit your location (+₹99 service fee)</p>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" {...form.register("sampleCollection")} value="home" />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collection Address <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your full address for home sample collection"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions or requirements..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Upload Prescription PDF */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <FileUp className="h-4 w-4 text-primary" />
                      Upload Prescription (Optional)
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">Upload your doctor's prescription (PDF or Image, max 5MB)</p>
                    {prescriptionFile ? (
                      <div className="flex items-center gap-2 p-2 bg-card rounded border">
                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground truncate flex-1">{prescriptionFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setPrescriptionFile(null)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to select PDF or Image</span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                toast({ title: "File too large", description: "Maximum file size is 5MB", variant: "destructive" });
                                return;
                              }
                              const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
                              if (!validTypes.includes(file.type)) {
                                toast({ title: "Invalid file", description: "Please upload a PDF or image file", variant: "destructive" });
                                return;
                              }
                              setPrescriptionFile(file);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Total Summary */}
                  {selectedPrice > 0 && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-muted-foreground">Test Price</span>
                        <span>{formatINR(selectedPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-muted-foreground">Home Collection Fee</span>
                        <span>₹99</span>
                      </div>
                      <div className="border-t border-primary/20 pt-2 flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">{formatINR(selectedPrice + 99)}</span>
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : `Book Test${selectedPrice > 0 ? ` - ${formatINR(selectedPrice + 99)}` : ''}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default BookTestPage;
