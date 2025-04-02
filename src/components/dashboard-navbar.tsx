import { Card, CardContent } from "./ui/card";

interface DashboardNavbarProps {
  header: string;
  icon?: React.ReactNode | null;
}
export function DashboardNavbar({ header, icon }: DashboardNavbarProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-2">
        <div className="flex items-center gap-2">
          {icon && icon}
          <span className="text-lg">{header}</span>
        </div>
      </CardContent>
    </Card>
  );
}
