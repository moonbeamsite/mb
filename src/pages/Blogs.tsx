import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { usePublicBlogs } from "@/hooks/usePublicData";

const Blogs = () => {
  const { data: blogs, isLoading } = usePublicBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories, recipes, and insights from the heart of Kumaon
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-lavender" />
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-mystical transition-all duration-300 border-2 border-lavender/20 hover:border-lavender bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col"
                >
                  {post.cover_image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <Badge className="w-fit mb-3 bg-lavender text-lavender-foreground">
                      Article
                    </Badge>
                    <CardTitle className="text-2xl text-royal group-hover:text-lavender transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base pt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        }) : 'Draft'}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-lavender/10 transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {blogs?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No blog posts available at the moment.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
