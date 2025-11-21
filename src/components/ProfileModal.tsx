import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Mail, ThumbsUp, MapPin, Briefcase, GraduationCap, Award, Heart } from "lucide-react";
import { toast } from "sonner";

interface Professional {
  id: number;
  name: string;
  photo: string;
  position: string;
  city: string;
  area: string;
  mainSkills: string[];
  bio: string;
  education: string;
  experience: string;
  technicalSkills: string[];
  softSkills: string[];
  hobbies: string[];
  email: string;
}

interface ProfileModalProps {
  professional: Professional | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileModal = ({ professional, open, onOpenChange }: ProfileModalProps) => {
  if (!professional) return null;

  const handleRecommend = () => {
    toast.success(`Você recomendou ${professional.name}!`, {
      description: "Sua recomendação foi enviada com sucesso.",
    });
  };

  const handleMessage = () => {
    toast.success(`Mensagem enviada para ${professional.name}!`, {
      description: "Você será notificado quando houver uma resposta.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-6 pb-4">
            <div className="relative">
              <img
                src={professional.photo}
                alt={professional.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/10"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-card" />
            </div>
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-2xl">{professional.name}</DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span>{professional.position}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{professional.city}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-foreground">{professional.bio}</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3>Formação</h3>
            </div>
            <p className="text-muted-foreground ml-7">{professional.education}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3>Experiência</h3>
            </div>
            <p className="text-muted-foreground ml-7">{professional.experience}</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Award className="w-5 h-5 text-primary" />
              <h3>Habilidades Técnicas</h3>
            </div>
            <div className="flex flex-wrap gap-2 ml-7">
              {professional.technicalSkills.map((skill, index) => (
                <Badge key={index} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Award className="w-5 h-5 text-primary" />
              <h3>Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 ml-7">
              {professional.softSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Heart className="w-5 h-5 text-primary" />
              <h3>Hobbies e Interesses</h3>
            </div>
            <div className="flex flex-wrap gap-2 ml-7">
              {professional.hobbies.map((hobby, index) => (
                <Badge key={index} variant="outline">
                  {hobby}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex gap-3 pt-2">
            <Button onClick={handleRecommend} className="flex-1 gap-2">
              <ThumbsUp className="w-4 h-4" />
              Recomendar Profissional
            </Button>
            <Button onClick={handleMessage} variant="outline" className="flex-1 gap-2">
              <Mail className="w-4 h-4" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};