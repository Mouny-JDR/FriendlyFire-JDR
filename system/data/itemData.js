export class dhsItemData extends foundry.abstract.DocumentData {
    static defineSchema() {
        return {
          startTime: fields.field(fields.NUMERIC_FIELD, {default: null}),
          seconds: fields.NONNEGATIVE_INTEGER_FIELD,
          combat: fields.STRING_FIELD,
          rounds: fields.NONNEGATIVE_INTEGER_FIELD,
          turns: fields.NONNEGATIVE_INTEGER_FIELD,
          startRound: fields.NONNEGATIVE_INTEGER_FIELD,
          startTurn: fields.NONNEGATIVE_INTEGER_FIELD
        }
      }
}