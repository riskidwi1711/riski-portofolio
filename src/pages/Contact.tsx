
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useProfile } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

const Contact = () => {
  const { data: profileData, isLoading, isError } = useProfile();

  console.log(profileData)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-64 w-64" />
      </div>
    );
  }

  if (isError || !profileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-400 bg-background p-8">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to Load Contact Information</h2>
        <p>There was an error fetching your profile data. Please try again later.</p>
      </div>
    );
  }

  // Ensure contact object and its properties are defined
  const contactData = {
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    linkedin: profileData?.linkedin || "",
    portofolio: profileData?.portofolio || "",
  };

  // If after providing defaults, essential contact info is still missing, show error
  if (!contactData.email && !contactData.phone && !contactData.linkedin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-400 bg-background p-8">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Incomplete Contact Information</h2>
        <p>The API provided incomplete contact details. Please ensure email, phone, or social links are available.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
      </div>
      <div className="relative z-10">
        <ScrollReveal>
          <ContactSection contact={contactData} name={profileData.name} />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
