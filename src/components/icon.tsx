import { PiPaperPlaneThin } from "react-icons/pi";
import { Card, CardContent } from "./ui/card";

export function Icon() {
  return (
    <Card className="p-0">
      <CardContent className="p-2">
        <PiPaperPlaneThin className="h-8 w-8" />
      </CardContent>
    </Card>
  );
}
