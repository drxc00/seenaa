"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ModelSelect({
  completionModel,
  setCompletionModel,
  MODELS,
}: {
  completionModel: string;
  setCompletionModel: (value: string) => void;
  MODELS: Record<
    string,
    {
      id: string;
      name: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }
  >;
}) {
  return (
    <Select
      defaultValue={completionModel}
      onValueChange={(value) => {
        setCompletionModel(value);
      }}
    >
      <SelectTrigger className="max-w-48">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-auto">
        {Object.keys(MODELS).map((model) => {
          const modelData = MODELS[model];
          return (
            <SelectItem key={modelData.id} value={modelData.id}>
              <div className="flex items-center gap-2">
                <modelData.icon className="h-4 w-4" />
                <span>{modelData.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
