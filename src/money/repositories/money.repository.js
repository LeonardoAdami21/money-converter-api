import prisma from "../../config/prisma.config.js";

const create = async (data) => {
  return await prisma.currency.create({
    data: {
      code: data.code.toUpperCase(),
      name: data.name,
      type: data.type,
      conversionRate: {
        create: data.conversionRate
          ? {
              create: data.conversionRate,
            }
          : undefined,
      },
    },
  });
};

const findAll = async () => {
  return await prisma.currency.findMany({
    include: {
      conversionRate: true,
    },
  });
};

const findCurrencyByCode = async (code) => {
  return await prisma.currency.findUnique({
    include: {
      conversionRate: true,
    },
    where: {
      code,
    },
  });
};

const remove = async (code) => {
  return await prisma.currency.delete({
    where: {
      code: code.toUpperCase(),
    },
  });
};

export const moneyRepository = {
  create,
  findAll,
  findCurrencyByCode,
  remove,
};
