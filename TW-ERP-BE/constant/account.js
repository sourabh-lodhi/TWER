const professional_tax_slabs = (salary, month) => {
  if (salary >= 400001) {
    return month !== 12 ? 208 : 212;
  } else if (salary >= 300001 && salary <= 400000) {
    return month !== 12 ? 166 : 174;
  } else if (salary >= 225001 && salary <= 300000) {
    return 125;
  } else {
    return 0;
  }
};

const calculatePF = (salary) => {
  const pf_per = (salary * 13) / 100;
  if (pf_per < 1800) {
    return pf_per.toFixed(2);
  } else {
    return 1800;
  }
};
module.exports = { professional_tax_slabs, calculatePF };
