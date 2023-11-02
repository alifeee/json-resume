import {buildHTML} from './build-html';
import {buildPDF} from './build-pdf';

export async function buildBoth() {
  await buildHTML();
  await buildPDF();
}

if (import.meta.main) {
  await buildBoth();
}
