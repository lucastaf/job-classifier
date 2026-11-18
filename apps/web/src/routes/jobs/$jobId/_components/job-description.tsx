import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { format } from "date-fns";
import { Mail, Phone } from "lucide-react";

export default function JobDescription(props: {
  email?: string;
  phone?: string;
  description?: string;
  applicationDate: string;
}) {
  const { description, email, phone, applicationDate } = props;
  const formatedDate = format(applicationDate, "dd/MM/yyyy HH:mm");

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
          <div className="mt-2">Applied at: {formatedDate}</div>
        </div>
      </CardContent>
    </Card>
  );
}
