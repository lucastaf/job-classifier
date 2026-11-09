import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Mail, Phone } from "lucide-react";

export default function JobDescription() {
  return (
    <Card className="h-full">
      <CardContent>
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
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
        elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
        cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
        urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
        egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
        hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
        per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
        consectetur adipiscing elit. Quisque faucibus ex sapien vitae
        pellentesque sem placerat. In id cursus mi pretium tellus duis
        convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
        fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada
        lacinia integer nunc posuere. Ut hendrerit semper vel class aptent
        taciti sociosqu. Ad litora torquent per conubia nostra inceptos
        himenaeos.
        <div className="mt-2">Applied at: 01/01/2026 10:30</div>
      </CardContent>
    </Card>
  );
}
