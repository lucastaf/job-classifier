import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Mail, Phone } from "lucide-react";

export default function JobDescription() {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <CardTitle>
              <div className="flex">
                <Button size="sm">
                  <Mail />
                  jobemail@company.com
                </Button>
                <Button size="sm">
                  <Phone />
                  (99) 99999-9999
                </Button>
              </div>
            </CardTitle>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </div>
          <div className="mt-2">Applied at: 01/01/2026 10:30</div>
        </div>
      </CardContent>
    </Card>
  );
}
