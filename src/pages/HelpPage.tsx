import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Phone, 
  MessageCircle, 
  FileText, 
  Calendar,
  Home,
  FileSearch,
  Send,
  Instagram
} from "lucide-react";

const WHATSAPP_NUMBER = "917649885936";
const INSTAGRAM_URL = "https://www.instagram.com/diagnostics_hub?igsh=MzNzanJpN2tlODhs";
const TELEGRAM_BOT = "https://t.me/HubPathologyLab_bot";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our website by visiting the 'Book Appointment' page, calling us at +91 7649885936, or messaging us on WhatsApp. You can also use our Telegram bot @HubPathologyLab_bot for 24/7 booking assistance."
  },
  {
    question: "What are your working hours?",
    answer: "Our lab is open Monday to Saturday from 7:00 AM to 7:00 PM. We are closed on Sundays. For home collection, we recommend early morning appointments for fasting tests."
  },
  {
    question: "Do you offer home sample collection?",
    answer: "Yes, we offer home sample collection services for an additional fee of ₹150. Our trained phlebotomists will visit your home at your preferred time slot. You can book home collection through our website or by calling us."
  },
  {
    question: "How do I get my test results?",
    answer: "Test results are available through multiple channels: 1) You can view them online through your patient dashboard after logging in, 2) We can send them via email, 3) WhatsApp delivery is also available, 4) You can collect a printed copy from our lab."
  },
  {
    question: "Is fasting required for all tests?",
    answer: "Not all tests require fasting. Tests like Lipid Profile, Glucose Fasting, and certain metabolic panels require 10-12 hours of fasting. Our team will inform you about specific requirements when you book your appointment."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit/debit cards, UPI payments (Google Pay, PhonePe, Paytm), and net banking. For corporate clients, we also offer credit facilities."
  },
  {
    question: "How long does it take to get results?",
    answer: "Most routine tests are completed within 24 hours. Some specialized tests may take 2-5 days. Urgent tests can be processed faster with additional charges. You'll be informed about the expected turnaround time when booking."
  },
  {
    question: "Do you offer corporate health checkups?",
    answer: "Yes, we offer comprehensive corporate health checkup packages. We can customize packages based on your organization's requirements and provide on-site testing facilities. Contact us through the Quote Request page for details."
  },
  {
    question: "Are your tests accurate?",
    answer: "Yes, we are a NABL accredited laboratory and maintain the highest standards of quality. We use advanced automated analyzers and follow strict quality control protocols. All results are verified by qualified pathologists."
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer: "Yes, you can cancel or reschedule your appointment by calling us at +91 7649885936 or messaging us on WhatsApp at least 4 hours before your scheduled time. You can also manage appointments through your patient dashboard."
  }
];

const quickLinks = [
  {
    icon: Calendar,
    title: "Book Test",
    description: "Schedule your lab visit or home collection",
    link: "/book-appointment"
  },
  {
    icon: FileSearch,
    title: "Results Inquiry",
    description: "Check the status of your test results",
    link: "/results-inquiry"
  },
  {
    icon: FileText,
    title: "View Tests",
    description: "Browse our complete test catalog",
    link: "/tests"
  },
  {
    icon: Home,
    title: "Home Collection",
    description: "Get samples collected at your doorstep",
    link: "/book-appointment"
  }
];

const HelpPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Help & Support"
        description="Get help with Diagnostics Hub Rewa services. FAQs, contact support, book appointments, and get assistance with lab tests and reports."
        canonical="/help"
        keywords="diagnostics hub help, pathology lab support rewa, lab test FAQ, contact diagnostics hub, pathology labs near me Rewa"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
        <div className="container text-center px-4">
          <HelpCircle className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-8 md:py-12">
        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="block">
                  <Phone className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-primary font-medium">+91 7649885936</p>
                  <p className="text-xs text-muted-foreground mt-1">Mon-Sat: 7AM - 7PM</p>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-success/50">
              <CardContent className="p-4 md:p-6">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block">
                  <MessageCircle className="h-8 w-8 md:h-10 md:w-10 text-success mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                  <p className="text-success font-medium">+91 7649885936</p>
                  <p className="text-xs text-muted-foreground mt-1">Quick Response!</p>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="block">
                  <Send className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Telegram Bot</h3>
                  <p className="text-primary font-medium">@HubPathologyLab_bot</p>
                  <p className="text-xs text-muted-foreground mt-1">24/7 Automated Help</p>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Instagram className="h-8 w-8 md:h-10 md:w-10 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                  <p className="text-secondary font-medium">@diagnostics_hub</p>
                  <p className="text-xs text-muted-foreground mt-1">Follow for Updates</p>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickLinks.map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <Link to={item.link} className="block">
                    <item.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-4 md:p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our support team is always ready to assist you. Reach out through any channel below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Contact Form
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HelpPage;
