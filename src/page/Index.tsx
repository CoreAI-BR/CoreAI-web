import { useState, useMemo } from "react";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileModal } from "../components/ProfileModal";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { ThemeToggle } from "../components/ThemeToggle";
import { Users } from "lucide-react";
import professionalsData from "../data/professionals.json";

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

const Index = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const professionals: Professional[] = professionalsData;

  const areas = useMemo(() => {
    return Array.from(new Set(professionals.map((p) => p.area))).sort();
  }, []);

  const cities = useMemo(() => {
    return Array.from(new Set(professionals.map((p) => p.city))).sort();
  }, []);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesSearch =
        searchQuery === "" ||
        professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.mainSkills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        professional.technicalSkills?.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesArea = selectedArea === "all" || professional.area === selectedArea;
      const matchesCity = selectedCity === "all" || professional.city === selectedCity;

      return matchesSearch && matchesArea && matchesCity;
    });
  }, [professionals, searchQuery, selectedArea, selectedCity]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ProConnect</h1>
                <p className="text-sm text-muted-foreground">O Futuro do Trabalho</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Conecte-se com os melhores profissionais
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre talentos, compartilhe experiências e construa o futuro do trabalho juntos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters
            selectedArea={selectedArea}
            selectedCity={selectedCity}
            onAreaChange={setSelectedArea}
            onCityChange={setSelectedCity}
            areas={areas}
            cities={cities}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProfessionals.length} profissionai
            {filteredProfessionals.length !== 1 ? "s" : ""} encontrado
            {filteredProfessionals.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProfessionals.map((professional) => (
            <ProfileCard
              key={professional.id}
              professional={professional}
              onClick={() => setSelectedProfessional(professional)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou a busca para encontrar mais resultados
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 ProConnect - O Futuro do Trabalho está aqui</p>
          </div>
        </div>
      </footer>

      {/* Profile Modal */}
      <ProfileModal
        professional={selectedProfessional}
        open={!!selectedProfessional}
        onOpenChange={(open) => !open && setSelectedProfessional(null)}
      />
    </div>
  );
};

export default Index;