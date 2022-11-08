export interface DefaultPayload {
  limit?: string;
  skip?: string;
  sort?: string;
}

export interface HistoryPayload extends DefaultPayload {
  before?: string;
  after?: string;
}

export interface ActionPayload extends HistoryPayload {
  name?: string;
}
