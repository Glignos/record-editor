export const REFERENCE_SPLITTER_MAP = {
  t: ['title', 'title'],
  j: ['publication_info', 'journal_title'],
  d: ['dois', '-'],
  c: ['collaborations', '-'],
  i: ['isbn'],
  k: ['texkey'],
  o: ['label'],
  u: ['urls', '-', 'value'],
  r: ['report_number'],
  x: ['arxiv_eprint'],
  v: ['publication_info', 'journal_volume'],
  n: ['publication_info', 'journal_issue'],
  y: ['publication_info', 'year'],
  s: ['publication_info', 'page_start'],
  e: ['publication_info', 'page_end'],
  f: ['publication_info', 'artid'],
  b: ['publication_info', 'cnum'],
  p: ['imprint', 'publisher'],
  a: ['authors', '-', 'full_name'],
  l: ['authors', '-', 'inspire_role']
};
