
// app/components/LeadForm.tsx
import { createLead } from "@/server/actions/lead-actions";
// import { SubmitButtons } from "./SubmitButtons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Plus } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { SubmitButtons } from "./LeadButton";

// function SubmitButtons() { Este botão foi inserido dentro de ./LeadButton.jsx
//     const { pending } = useFormStatus();
//     return (
//         <>
//       <DialogClose asChild>
//         <Button type="button" variant="outline" disabled={pending}>
//           Cancelar
//         </Button>
//       </DialogClose>
//       <Button type="submit" disabled={pending}>
//         {pending ? "Salvando..." : "Salvar"}
//       </Button>
//     </>
//   );
// }

export function LeadForm() {
  return (
    <form action={createLead}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Novo lead <Plus size={16} weight="bold" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[90%] w-[60%] sm:h-[90%] h-[60%]">
        <DialogHeader className="max-h-max">
          <DialogTitle>Novo Lead</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo lead.
          </DialogDescription>
        </DialogHeader>

        {<div className="max-h-max">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name-1">Nome</Label>
                <Input id="name-1" name="name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company-1">Empresa</Label>
                <Input id="company-1" name="company" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email-1">Email</Label>
                <Input id="email-1" name="email" type="email" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone-1">Telefone</Label>
                <Input id="phone-1" name="phone" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="jobTitle-1">Cargo</Label>
                <Input id="jobTitle-1" name="jobTitle" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="origin-1">Origem</Label>
                <Input
                  id="origin-1"
                  name="origin"
                  placeholder="Site, Anúncio, Indicação..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="score-1">Score</Label>
                <Input
                  id="score-1"
                  name="score"
                  type="number"
                  min={0}
                  max={100}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ownerId-1">Vendedor Responsável (ID)</Label>
                <Input id="ownerId-1" name="ownerId" type="number" min={1} />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <Label htmlFor="notes-1">Observações</Label>
                <textarea
                  id="notes-1"
                  name="notes"
                  className="flex min-h-[80px] max-h-[400px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background resize-y"
                />
              </div>

              {/* Se quiser permitir informar valor e/ou estágio inicial: */}
              {/* <div className="grid gap-2">
                <Label htmlFor="value-1">Valor (R$)</Label>
                <Input id="value-1" name="value" inputMode="decimal" placeholder="1000,00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stage-1">Estágio</Label>
                <select id="stage-1" name="stage" className="border rounded-md px-3 py-2 text-sm">
                  <option value="LEAD">LEAD</option>
                  <option value="MQL">MQL</option>
                  <option value="ANALISE_MQL">ANALISE_MQL</option>
                  <option value="SQL">SQL</option>
                  <option value="REUNIAO">REUNIAO</option>
                </select>
              </div> */}
            </div>
          </div>}

        <DialogFooter className="max-h-max">
          <SubmitButtons />
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
