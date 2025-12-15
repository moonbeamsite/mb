import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Loader2 } from "lucide-react";
import { usePublicJournalEntries } from "@/hooks/usePublicData";

const Journal = () => {
  const { data: journalEntries, isLoading } = usePublicJournalEntries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Daily Journal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Daily musings and moments from our Kumaoni journey
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-lavender" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lavender via-royal to-lavender/20" />

            {/* Journal Entries */}
            <div className="space-y-8">
              {journalEntries?.map((entry) => (
                <div key={entry.id} className="relative pl-20">
                  {/* Timeline node */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-lavender shadow-mystical ring-4 ring-background" />

                  <Card
                    className={`hover:shadow-mystical transition-all duration-300 border-2 bg-card/80 backdrop-blur-sm overflow-hidden ${
                      entry.is_featured
                        ? "border-lavender shadow-lavender"
                        : "border-lavender/20 hover:border-lavender"
                    }`}
                  >
                    {entry.image_url && (
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={entry.image_url} 
                          alt={entry.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-royal mb-2">
                            {entry.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {entry.entry_date ? new Date(entry.entry_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              }) : 'No date'}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {entry.is_featured && (
                            <Badge className="bg-gradient-mystical">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-base text-foreground/90 leading-relaxed">
                        {entry.excerpt || entry.content}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>Written with love from the hills</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {journalEntries?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No journal entries available at the moment.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
