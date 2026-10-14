import type { ReactNode } from "react";

import { PersonLink } from "#/entities/catalog";
import { useSearchResults } from "#/pages/search/api/use-search-results";

const FoundPeople = (): ReactNode => {
  const { people } = useSearchResults();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`担当者（${people.length.toString()}）`}</h2>
      <div className="flex flex-col gap-2">
        {people.map((person) => (
          <PersonLink key={person.id} id={person.id} name={person.name} />
        ))}
      </div>
    </section>
  );
};

export { FoundPeople };
