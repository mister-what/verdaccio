// flow-typed signature: 8a00827df30cf07bf07c18e57cc76caa
// flow-typed version: <<STUB>>/prismjs_v1.15.0/flow_v0.69.0

declare module 'prismjs' {
  declare type grammar = {[string]: any};
  declare type languages = {[string]: grammar};
  declare module.exports: {
    languages: languages,
    highlight: (text: string, grammar?: grammar, language?: string) => string
  };
}

declare module 'prismjs/components/index' {
  declare function loadLanguages(languages?: Array<string>): void;
  declare module.exports: loadLanguages;
}
