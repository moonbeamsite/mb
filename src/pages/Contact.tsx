import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us for any queries or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2 border-lavender/20 hover:border-lavender bg-card/80 backdrop-blur-sm shadow-lavender">
            <CardHeader>
              <CardTitle className="text-3xl text-royal">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="border-lavender/30 focus:border-lavender"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-lavender/30 focus:border-lavender"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="border-lavender/30 focus:border-lavender"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="border-lavender/30 focus:border-lavender resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-mystical hover:shadow-lavender transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-royal flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-lavender" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  Kumaon Hills, Uttarakhand<br />
                  India - 263001
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-royal flex items-center gap-2">
                  <Phone className="h-6 w-6 text-lavender" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  +91 XXXXX XXXXX<br />
                  +91 XXXXX XXXXX
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-royal flex items-center gap-2">
                  <Mail className="h-6 w-6 text-lavender" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  hello@moonbeamkumaon.com<br />
                  info@moonbeamkumaon.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-royal flex items-center gap-2">
                  <Clock className="h-6 w-6 text-lavender" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  Monday - Saturday: 9:00 AM - 9:00 PM<br />
                  Sunday: 10:00 AM - 8:00 PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
