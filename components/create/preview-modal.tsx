import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlogData } from "@/types";
import { LockIcon } from "lucide-react";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogData;
}

export const PreviewDialog = ({
  open,
  onOpenChange,
  blog,
}: PreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
          <Tabs defaultValue="account" className="flex-1">
            <TabsList className="grid w-fit grid-cols-2 bg-muted">
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onOpenChange(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white">
              Done
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center bg-muted/30">
          <TabsContent value="mobile">
            <div className="relative overflow-y-hidden">
              {/* Phone Frame */}
              <div className="w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10 flex items-center justify-between px-6 text-black text-sm font-medium">
                    <span>5:15</span>
                    <div className="w-20 h-6 bg-black rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-black rounded-sm">
                        <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>
                  {/* Content Frame */}
                  <div className="w-full h-full pt-11 overflow-y-auto overflow-x-hidden">
                    <div className="scale-[0.85] origin-top-left w-[120%]">
                      {/* add body content here */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </TabsContent>
          {/* desktop view */}
          <TabsContent value="desktop">
            <div className="max-w-5xl overflow-y-hidden bg-white rounded-lg shadow-2xl">
              {/* Browser Chrome */}
              <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-3">
                {/* Traffic Lights */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                {/* Address Bar */}
                <div className="flex-1 mx-4">
                  <div className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 flex items-center gap-2">
                    <LockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{`https://techtales.vercel.app/blog/${blog.slug}`}</span>
                  </div>
                </div>
              </div>
              {/* Content Frame */}
              <ScrollArea className="w-full h-[calc(100%-48px)]">
                {/* add body here */}
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};
