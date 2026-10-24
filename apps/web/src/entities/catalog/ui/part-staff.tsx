import { Array, pipe } from "effect";
import type { ReactNode } from "react";

import type { PartRow, StaffRole } from "#/entities/catalog/lib/part-columns";

import { PersonLink } from "./person-link";

const PartStaff = ({
  part,
  staffRole,
}: Readonly<{ part: PartRow; staffRole: StaffRole }>): ReactNode => (
  <span className="flex flex-wrap gap-x-2">
    {pipe(
      part.staff,
      Array.filter((credit) => credit.role === staffRole),
      Array.map((credit) => (
        <PersonLink key={credit.person.id} id={credit.person.id} name={credit.person.name} />
      )),
    )}
  </span>
);

export { PartStaff };
