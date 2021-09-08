type ModuleData = {
  queries: any;
  mutations: any;
}

const makeSchemaStorage = () => {
  let queries = {};
  let mutations = {};

  return {
    getModuleData: () => ({ queries, mutations }),
    registerModule: (moduleData: ModuleData) => {
      queries = { ...queries, ...moduleData.queries };
      mutations = { ...mutations, ...moduleData.mutations };
    }
  }
};

type Dependencies = {
  registerModule: (moduleData: ModuleData) => void;
}

const withModuleRegister = (moduleData: ModuleData) => ({ registerModule }: Dependencies) => registerModule(moduleData)

export { makeSchemaStorage, withModuleRegister };