import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Briefcase } from "lucide-react";

interface Professional {
  id: number;
  name: string;
  photo: string;
  position: string;
  city: string;
  area: string;
  mainSkills: string[];
}

interface ProfileCardProps {
  professional: Professional;
  onClick: () => void;
}

export const ProfileCard = ({ professional, onClick }: ProfileCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-card border-border"
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img
            src={professional.photo}
            alt={professional.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/10"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-card" />
        </div>

        <div className="space-y-2 w-full">
          <h3 className="font-semibold text-lg text-card-foreground">{professional.name}</h3>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Briefcase className="w-4 h-4" />
            <span>{professional.position}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{professional.city}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {professional.mainSkills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};