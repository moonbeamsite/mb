import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuImageManager } from "@/components/MenuImageManager";
import { MenuFlipbook } from "@/components/MenuFlipbook";
import { menuConfig, menuImageDescriptions } from "@/assets/menu-config";
import { toast } from "sonner";
import { BookOpen, Upload, Eye, Save, FileImage } from "lucide-react";

export const AdminMenu = () => {
  const [menuImages, setMenuImages] = useState<string[]>(menuConfig.pages);
  const [activeTab, setActiveTab] = useState("manage");

  const handleImagesChange = (newImages: string[]) => {
    setMenuImages(newImages);
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('menuImages', JSON.stringify(menuImages));
      toast.success("Menu images saved locally!");
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      toast.error("Failed to save menu images locally.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-lavender/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-royal">
            <BookOpen className="w-5 h-5" />
            Menu Management
          </CardTitle>
          <CardDescription>
            Manage your restaurant's menu flipbook. Upload images of your menu pages and arrange them in order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-lavender/10">
              <TabsTrigger value="manage" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
                <Upload className="w-4 h-4" />
                Manage Images
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
                <Eye className="w-4 h-4" />
                Preview Menu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manage" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-royal">Upload & Arrange Menu Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload high-quality images of your menu pages. Drag to reorder them.
                  </p>
                </div>
                <Button 
                  onClick={saveToLocalStorage}
                  className="bg-lavender hover:bg-lavender-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to Local Storage
                </Button>
              </div>

              <MenuImageManager 
                initialImages={menuImages}
                onImagesChange={handleImagesChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">💡 Tips for Best Results:</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Use high-resolution images (at least 800x1200px)</li>
                    <li>• Portrait orientation (3:4 ratio) works best</li>
                    <li>• Ensure text is clear and readable</li>
                    <li>• Keep file sizes under 10MB for optimal loading</li>
                    <li>• Upload pages in the order customers should read them</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    Replace Hardcoded Images:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Add your menu images to <code className="bg-blue-100 px-1 rounded">src/assets/</code></li>
                    <li>• Name them: menu-page-1.jpg, menu-page-2.jpg, etc.</li>
                    <li>• Update <code className="bg-blue-100 px-1 rounded">menu-config.ts</code> to use local images</li>
                    <li>• Uncomment the local images section in the config</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-royal mb-2">Menu Preview</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  This is how your menu will appear to customers. Test the flipbook functionality.
                </p>
              </div>

              {menuImages.length > 0 ? (
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-6">
                  <MenuFlipbook pages={menuImages} />
                </div>
              ) : (
                <Card className="border-dashed border-2 border-amber-300">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="w-12 h-12 text-amber-400 mb-4" />
                    <h3 className="text-lg font-semibold text-amber-700 mb-2">No Menu Images</h3>
                    <p className="text-amber-600 text-center mb-4">
                      Upload some menu images in the "Manage Images" tab to see the preview.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("manage")}
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};