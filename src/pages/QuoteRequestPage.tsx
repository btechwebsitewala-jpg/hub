import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Calculator, CheckCircle, Building2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { syncToGoogleSheets } from "@/lib/googleSheets";

const quoteSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().min(2, "Name required").max(100),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().min(10, "Valid phone required").max(20),
  inquiryType: z.enum(["individual", "corporate"]),
  tests: z.array(z.string()).min(1, "Select at least one test"),
  estimatedVolume: z.string().optional(),
  additionalInfo: z.string().max(1000).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const availableTests = [
  { id: "cbc", name: "Complete Blood Count (CBC)", price: 25 },
  { id: "lipid", name: "Lipid Profile", price: 35 },
  { id: "thyroid", name: "Thyroid Panel", price: 45 },
  { id: "hba1c", name: "HbA1c (Diabetes)", price: 30 },
  { id: "lft", name: "Liver Function Test", price: 40 },
  { id: "kft", name: "Kidney Function Test", price: 38 },
  { id: "vitamin-d", name: "Vitamin D", price: 35 },
  { id: "vitamin-b12", name: "Vitamin B12", price: 40 },
  { id: "iron", name: "Iron Studies", price: 55 },
  { id: "basic-pkg", name: "Basic Health Package", price: 99 },
  { id: "comprehensive-pkg", name: "Comprehensive Package", price: 199 },
  { id: "cardiac-pkg", name: "Cardiac Health Package", price: 149 },
];

const QuoteRequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      inquiryType: "individual",
      tests: [],
      estimatedVolume: "",
      additionalInfo: "",
    },
  });

  const inquiryType = form.watch("inquiryType");
  const selectedTests = form.watch("tests");

  const calculateTotal = () => {
    return selectedTests.reduce((total, testId) => {
      const test = availableTests.find((t) => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    const ref = `QT-${Date.now().toString().slice(-8)}`;
    
    // Sync to Google Sheets
    await syncToGoogleSheets('inquiry', {
      'ID': ref,
      'Name': data.contactName,
      'Email': data.email,
      'Phone': data.phone,
      'Subject': `Quote Request: ${data.inquiryType}`,
      'Message': `Tests: ${data.tests.join(", ")}\nVolume: ${data.estimatedVolume || 'N/A'}\nNotes: ${data.additionalInfo || 'N/A'}${data.companyName ? `\nCompany: ${data.companyName}` : ''}`,
      'Inquiry Type': data.inquiryType,
      'Status': 'pending',
      'Created At': new Date().toISOString()
    });

    setQuoteRef(ref);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Quote Request Submitted!",
      description: `Reference: ${ref}. We'll contact you within 24 hours.`,
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container max-w-lg">
            <Card>
              <CardContent className="pt-8 text-center">
                <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Quote Request Received!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest. Our team will prepare a customized quote for you.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                  <p className="text-2xl font-bold text-primary">{quoteRef}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll contact you within 24 hours with your personalized quote.
                </p>
                <Button onClick={() => { setIsSubmitted(false); form.reset(); }}>
                  Submit Another Request
                </Button>
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
        title="Request a Quote - Bulk & Corporate Testing"
        description="Request a quote for bulk or corporate diagnostic testing at Diagnostics Hub Rewa. Competitive pricing for organizations and businesses."
        canonical="/quote-request"
        keywords="corporate lab testing Rewa, bulk blood test quote, diagnostic testing quote India"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Request a Quote</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized pricing for individual tests or corporate health programs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Quote Request Form
              </CardTitle>
              <CardDescription>
                Select your tests and we'll provide a detailed quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Inquiry Type */}
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inquiry Type</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => field.onChange("individual")}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              field.value === "individual"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-medium">Individual</p>
                            <p className="text-sm text-muted-foreground">Personal testing</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange("corporate")}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              field.value === "corporate"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="h-4 w-4" />
                              <p className="font-medium">Corporate</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Bulk / Employee testing</p>
                          </button>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Contact Info */}
                  <div className="space-y-4">
                    {inquiryType === "corporate" && (
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC Corporation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Test Selection */}
                  <FormField
                    control={form.control}
                    name="tests"
                    render={() => (
                      <FormItem>
                        <FormLabel>Select Tests / Packages</FormLabel>
                        <FormDescription>Choose the tests you're interested in</FormDescription>
                        <div className="grid sm:grid-cols-2 gap-2 mt-2">
                          {availableTests.map((test) => (
                            <FormField
                              key={test.id}
                              control={form.control}
                              name="tests"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-muted/50">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(test.id)}
                                      onCheckedChange={(checked) => {
                                        const value = field.value || [];
                                        if (checked) {
                                          field.onChange([...value, test.id]);
                                        } else {
                                          field.onChange(value.filter((v) => v !== test.id));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{test.name}</p>
                                  </div>
                                  <span className="text-sm font-semibold text-primary">₹{test.price}</span>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estimated Total */}
                  {selectedTests.length > 0 && (
                    <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Total</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedTests.length} test(s) selected
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-primary">₹{calculateTotal()}</p>
                    </div>
                  )}

                  {inquiryType === "corporate" && (
                    <FormField
                      control={form.control}
                      name="estimatedVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Number of Employees</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-100">51-100 employees</SelectItem>
                              <SelectItem value="101-500">101-500 employees</SelectItem>
                              <SelectItem value="500+">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements or questions..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Request Quote"}
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

export default QuoteRequestPage;
