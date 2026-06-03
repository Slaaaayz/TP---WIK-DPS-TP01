export interface CounterStore {
  increment(): void;
  get(): number;
}

export class MemoireCounterStore implements CounterStore {
  private count = 0;

  increment(): void {
    this.count++;
  }

  get(): number {
    return this.count;
  }
}


