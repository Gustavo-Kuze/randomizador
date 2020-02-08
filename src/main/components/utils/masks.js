/* eslint-disable no-useless-escape */

export const unmaskCpf = cpf => cpf.replace(/([.|-])/gm, '');

export const unmaskCnpj = cnpj => cnpj.replace(/[.|\/|-]/gm, '');

export const maskCpf = (cpf = '') =>
  unmaskCpf(cpf || '').replace(
    /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/gm,
    `$1.$2.$3-$4`,
  );

export const maskCnpj = cnpj =>
  cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
