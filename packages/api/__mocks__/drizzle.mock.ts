import type { DeepMockProxy } from "vitest-mock-extended";
import { mockDeep } from "vitest-mock-extended";

import type { db } from "@acme/db";

const dbMock: DeepMockProxy<typeof db> = mockDeep();
export default dbMock;
