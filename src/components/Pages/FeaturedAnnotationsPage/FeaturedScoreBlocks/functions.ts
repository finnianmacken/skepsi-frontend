// type variables impossible in tsx?
export const optionizeArray = <T>(vals: T[]) => vals.map(x => ({key: x, text: x, value: x}))
