import { Array as Arr } from "effect";
import type { ReactNode } from "react";

import { usePerson } from "#/pages/person/api/use-person";

import { CreditsTable } from "./credits-table";

const PersonPage = (): ReactNode => {
  const person = usePerson();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{person.name}</h1>
      {Arr.isReadonlyArrayNonEmpty(person.aliases) && (
        <p className="text-muted-foreground text-sm">{`別名義: ${person.aliases.join("、")}`}</p>
      )}
      <CreditsTable />
    </div>
  );
};

export { PersonPage };
