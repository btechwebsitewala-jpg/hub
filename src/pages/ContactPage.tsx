import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const WHATSAPP_NUMBER = "917649885936";
const INSTAGRAM_URL = "https://www.instagram.com/diagnostics_hub?igsh=MzNzanJpN2tlODhs";
const TELEGRAM_BOT = "https://t.me/HubPathologyLab_bot";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().min(10, "Valid phone required").max(20).optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "appointment", label: "Appointment Related" },
  { value: "results", label: "Test Results" },
  { value: "pricing", label: "Pricing & Packages" },
  { value: "home-collection", label: "Home Collection Service" },
  { value: "corporate", label: "Corporate Testing" },
  { value: "feedback", label: "Feedback" },
  { value: "complaint", label: "Complaint" },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const refNum = `INQ-${Date.now().toString().slice(-8)}`;
      
      const { error } = await supabase.from("inquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        inquiry_type: "contact" as const,
        reference_number: refNum,
        status: "pending" as const,
        user_id: user?.id || null,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: `Reference: ${refNum}. We'll get back to you soon.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Us - Diagnostics Hub Rewa"
        description="Contact Diagnostics Hub Rewa for appointments, test inquiries & home sample collection. Call +91 7649885936 or visit us at Karahiya No.1, Rewa, MP 486001."
        canonical="/contact"
        keywords="contact diagnostics hub rewa, pathology lab phone number, lab address rewa, blood test labs Rewa, diagnostic centers Rewa Madhya Pradesh"
      />
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-muted-foreground hover:text-primary">
                        +91 7649885936
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Mon-Sat: 7 AM - 7 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-success/50">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-success hover:text-success/80 font-medium"
                      >
                        +91 7649885936
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Quick response guaranteed!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Send className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telegram Bot</h3>
                      <a 
                        href={TELEGRAM_BOT}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @HubPathologyLab_bot
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">24/7 automated support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                      <a 
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline"
                      >
                        @diagnostics_hub
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Follow for updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground text-sm">
                        In front of New Krishi Upaj Mandi,<br />
                        Beside Kotak Mahindra Bank, Karahiya No.1,<br />
                        Rewa (Madhya Pradesh) 486001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                      <p className="text-muted-foreground text-sm">
                        Monday - Saturday: 7:00 AM - 7:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem key={subject.value} value={subject.value}>
                                      {subject.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?"
                                rows={5}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
