interface Models {
  gptTurbo: string;
  textDavinci003: string;
  textDavinci002: string;
  textAda002: string;
  textCurie001: string;
  textBabbage001: string;
  davinci: string;
  curie: string;
  babbage: string;
  ada: string;
  textModerationLatest: string;
  textModerationStable: string;
  codeDavinci002: string;
  codeCushman002: string;
}

// export const models: Models = {
//   gptTurbo: "gpt-3.5-turbo",
//   textDavinci003: "text-davinci-003",
//   textDavinci002: "text-davinci-002",
//   textAda002: "text-ada-001",
//   textCurie001: "text-curie-001",
//   textBabbage001: "text-babbage-001",
//   davinci: "davinci",
//   curie: "curie",
//   babbage: "babbage",
//   ada: "ada",
//   textModerationLatest: "text-moderation-latest",
//   textModerationStable: "text-moderation-stable",
//   codeDavinci002: "code-davinci-002",
//   codeCushman002: "code-cushman-001"
// }

export const models: { name: string, value: string }[] = Object.entries({
  gptTurbo: "gpt-3.5-turbo",
  textDavinci003: "text-davinci-003",
  textDavinci002: "text-davinci-002",
  textAda002: "text-ada-001",
  textCurie001: "text-curie-001",
  textBabbage001: "text-babbage-001",
  davinci: "davinci",
  curie: "curie",
  babbage: "babbage",
  ada: "ada",
  textModerationLatest: "text-moderation-latest",
  textModerationStable: "text-moderation-stable",
  codeDavinci002: "code-davinci-002",
  codeCushman002: "code-cushman-001"
}).map(([name, value]) => ({ name, value }));
