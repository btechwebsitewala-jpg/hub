import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { FileSearch, CheckCircle, Clock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const inquirySchema = z.object({
  referenceNumber: z.string().min(3, "Please enter a valid reference number").max(50),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

type ResultStatus = "pending" | "processing" | "ready" | "not_found";

interface ResultData {
  status: ResultStatus;
  patientName: string;
  testName: string;
  collectionDate: string;
  expectedDate: string;
  referenceNumber: string;
  price: number;
  time: string;
  collection: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    description: "Your sample is awaiting processing",
    color: "bg-warning text-warning-foreground",
  },
  processing: {
    icon: Loader2,
    label: "Processing",
    description: "Your test is currently being processed",
    color: "bg-primary text-primary-foreground",
  },
  ready: {
    icon: CheckCircle,
    label: "Ready",
    description: "Your results are ready for collection",
    color: "bg-success text-success-foreground",
  },
  not_found: {
    icon: AlertCircle,
    label: "Not Found",
    description: "No results found for this reference number",
    color: "bg-destructive text-destructive-foreground",
  },
};

const ResultsInquiryPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { referenceNumber: "" },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSearching(true);
    const searchRef = data.referenceNumber.trim();
    try {
      // 1. Try Appointments Table (Main Booking)
      let { data: itemData, error: aptError } = await supabase
        .from("appointments")
        .select("*")
        .ilike("reference_number", searchRef)
        .maybeSingle();

      if (itemData) {
        const statusMap: Record<string, ResultStatus> = {
          pending: "pending",
          confirmed: "processing",
          completed: "ready",
          cancelled: "not_found",
          no_show: "not_found",
        };
        const expectedDate = new Date(itemData.appointment_date);
        expectedDate.setDate(expectedDate.getDate() + 2);
        setResult({
          status: itemData.results_status === "ready" ? "ready" : (statusMap[itemData.status] || "pending"),
          patientName: `${itemData.first_name} ${itemData.last_name}`,
          testName: itemData.test_type,
          collectionDate: new Date(itemData.appointment_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          expectedDate: expectedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          referenceNumber: searchRef,
          price: 0,
          time: itemData.time_slot,
          collection: itemData.sample_collection
        });
        setIsSearching(false);
        return;
      }

      // 2. Try Test Bookings Table (Alternative Booking)
      let { data: tbData } = await supabase
        .from("test_bookings")
        .select("*")
        .ilike("reference_number", searchRef)
        .maybeSingle();

      if (tbData) {
        const expectedDate = new Date(tbData.preferred_date);
        expectedDate.setDate(expectedDate.getDate() + 2);
        setResult({
          status: tbData.status === "completed" ? "ready" : "pending",
          patientName: tbData.patient_name,
          testName: tbData.test_name,
          collectionDate: new Date(tbData.preferred_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          expectedDate: expectedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          referenceNumber: searchRef,
          price: tbData.test_price,
          time: tbData.preferred_time,
          collection: tbData.sample_collection
        });
        setIsSearching(false);
        return;
      }

      // 3. Try Inquiries Table (Quotes/General)
      let { data: inqData } = await supabase
        .from("inquiries")
        .select("*")
        .ilike("reference_number", searchRef)
        .maybeSingle();

      if (inqData) {
        const expectedDate = new Date(inqData.created_at);
        expectedDate.setDate(expectedDate.getDate() + 2);
        setResult({
          status: inqData.status === "completed" ? "ready" : "pending",
          patientName: inqData.name,
          testName: inqData.subject || "Diagnosis Request",
          collectionDate: new Date(inqData.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          expectedDate: expectedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          referenceNumber: searchRef,
          price: 0,
          time: "N/A",
          collection: "Quote Request"
        });
        setIsSearching(false);
        return;
      }

      // Not Found in any table
      setResult({
        status: "not_found",
        patientName: "",
        testName: "",
        collectionDate: "",
        expectedDate: "",
        referenceNumber: searchRef,
        price: 0,
        time: "",
        collection: ""
      });

    } catch (error) {
      console.error("Search error:", error);
      toast({ title: "Error", description: "Failed to fetch results. Please try again.", variant: "destructive" });
    } finally {
      setIsSearching(false);
    }
  };

  const StatusIcon = result ? statusConfig[result.status].icon : null;

  return (
    <Layout>
      <SEOHead
        title="Check Test Results - Result Inquiry"
        description="Check your diagnostic test results online at Diagnostics Hub Rewa. Enter your reference number to track your lab report status."
        canonical="/results-inquiry"
        keywords="check lab results Rewa, test report status, diagnostic results online, pathology report inquiry"
      />
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-8 md:py-12">
        <div className="container relative px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="absolute top-0 left-4 flex items-center gap-2 text-slate-600 hover:text-primary transition-colors pl-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold">Back</span>
          </Button>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Check Test Results</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Enter your reference number to check the status of your test results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container max-w-lg px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileSearch className="h-5 w-5 text-primary" />
                Results Inquiry
              </CardTitle>
              <CardDescription>
                Enter your reference number to check your test status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Number</FormLabel>
                        <FormControl>
                          <Input placeholder="TB-12345678 or APT-12345678" {...field} />
                        </FormControl>
                        <FormDescription>
                          You received this when you booked your test
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Check Status"
                    )}
                  </Button>
                </form>
              </Form>

              {result && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-full ${statusConfig[result.status].color} mb-3`}>
                      {StatusIcon && <StatusIcon className={`h-7 w-7 ${result.status === "processing" ? "animate-spin" : ""}`} />}
                    </div>
                    <Badge className={statusConfig[result.status].color}>
                      {statusConfig[result.status].label}
                    </Badge>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {statusConfig[result.status].description}
                    </p>
                  </div>

                  {result.status === "not_found" ? (
                    <div className="bg-destructive/5 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Reference <span className="font-bold text-foreground">{result.referenceNumber}</span> was not found.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Please check your reference number and try again, or contact us at +91 7649885936.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-muted rounded-lg p-4 space-y-3">
                        {[
                          { label: "Reference", value: result.referenceNumber },
                          { label: "Patient", value: result.patientName },
                          { label: "Test", value: result.testName },
                          { label: "Collection Date", value: result.collectionDate },
                          { label: "Expected Ready", value: result.expectedDate },
                        ].map(item => (
                          <div key={item.label} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <div className="text-right">
                              <span className="font-medium text-foreground">
                                {item.value.split(' [')[0]}
                              </span>
                              {item.label === 'Test' && item.value.includes('[') && (
                                <div className="mt-0.5">
                                  <Badge variant="outline" className="text-[10px] h-4 bg-primary/5 text-primary border-primary/20 px-1 font-bold">
                                    {item.value.match(/\[(.*?)\]/)?.[1]}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {result.status === "ready" && (
                        <div className="mt-4 p-4 bg-success/10 rounded-lg text-center">
                          <p className="text-sm text-success font-medium mb-2">
                            Your results are ready!
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Please visit our lab to collect your report or login to download it online.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsInquiryPage;
