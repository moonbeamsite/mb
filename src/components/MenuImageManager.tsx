import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Eye } from "lucide-react";

interface MenuImageManagerProps {
  onImagesChange: (images: string[]) => void;
  initialImages?: string[];
}

export const MenuImageManager = ({ onImagesChange, initialImages = [] }: MenuImageManagerProps) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => {
          const newImages = [...prev, result];
          onImagesChange(newImages);
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      onImagesChange(newImages);
      return newImages;
    });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    setImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      onImagesChange(newImages);
      return newImages;
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Menu Image Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="menu-upload"
          />
          <label htmlFor="menu-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <p className="text-amber-700 font-medium">Click to upload menu images</p>
            <p className="text-sm text-amber-600 mt-1">PNG, JPG, JPEG up to 10MB each</p>
          </label>
        </div>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Menu page ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Controls */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setPreviewImage(image)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Page Number */}
                <div className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-1 rounded">
                  Page {index + 1}
                </div>

                {/* Reorder Controls */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {index > 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-6 h-6 p-0 text-xs"
                      onClick={() => moveImage(index, index - 1)}
                    >
                      ←
                    </Button>
                  )}
                  {index < images.length - 1 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-6 h-6 p-0 text-xs"
                      onClick={() => moveImage(index, index + 1)}
                    >
                      →
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">Instructions:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Upload your menu images in the order you want them to appear</li>
            <li>• Use high-resolution images for best quality</li>
            <li>• Recommended aspect ratio: 3:4 (portrait)</li>
            <li>• You can reorder pages using the arrow buttons</li>
            <li>• Click the eye icon to preview an image</li>
          </ul>
        </div>

        {/* Preview Modal */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="max-w-4xl max-h-full">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};