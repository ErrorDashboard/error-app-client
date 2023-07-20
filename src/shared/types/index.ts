import { type ChangeEvent } from 'react';

export type EventChangeType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
