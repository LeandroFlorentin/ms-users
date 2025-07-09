const { RD_PASSWORD, RD_PORT, RD_HOST } = process.env;
export const cacheCfg = {
  RD_PASSWORD: RD_PASSWORD as string,
  RD_PORT: Number(RD_PORT) as number,
  RD_HOST: RD_HOST as string,
};
