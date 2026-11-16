import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Mail, Phone } from "lucide-react";

export default function JobDescription(props: {
  email?: string;
  phone?: string;
  description?: string;
}) {
  const { description, email, phone } = props;
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <CardTitle>
              <div className="flex">
                <Button size="sm">
                  <Mail />
                  {email}
                </Button>
                <Button size="sm">
                  <Phone />
                  {phone}
                </Button>
              </div>
            </CardTitle>
            {description}
          </div>
          <div className="mt-2">Applied at: 01/01/2026 10:30</div>
        </div>
      </CardContent>
    </Card>
  );
}
