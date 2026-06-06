export type KeyValue = {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
};

export type Response = {
  status: number;
  body: string;
};

export type Tab = {
  id: string;
  name: string;
  url: string;
  method: string;
  params: KeyValue[];
  headers: KeyValue[];
  body: string;
  response: Response | null;
};
